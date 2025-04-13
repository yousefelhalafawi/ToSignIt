"use client";
import { useRef, useState, useEffect, useCallback, useTransition } from "react";
import {
  UserPlus,
  Upload,
  X,
  ChevronLeft,
  ChevronRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

import * as pdfjsLib from "pdfjs-dist/webpack";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import styles from "../_style/pdfSign.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_redux/store";
import { handleSubmit } from "../_utils/pdfutils";
import AddContact from "./AddContact";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { Rnd } from "react-rnd";
import axios from "axios";
import { Contact, SignaturePosition, TextField } from "../_utils/types";
import { useTranslation } from "react-i18next";

/**
 * Set up pdf.js worker:
 */
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Remove all extra white space (margins set to 0).
const PDF_LEFT_MARGIN = 0;
const PDF_RIGHT_MARGIN = 0;
const PDF_TOP_MARGIN = 0;
const PDF_BOTTOM_MARGIN = 0;

// Helper: Convert Uint8Array to string
function uint8ArrayToString(uint8Array: Uint8Array): string {
  let output = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < uint8Array.length; i += chunkSize) {
    const chunk = Array.from(uint8Array.subarray(i, i + chunkSize));
    output += String.fromCharCode(...chunk);
  }
  return output;
}

// Embed text using PDF-lib.
// For x: we use the stored xPosition directly.
// For y: we assume the stored yPosition is the canvas coordinate (from the top)
// and convert it to PDF coordinates by computing: pdfY = pageHeight – field.yPosition.
// (We no longer subtract the fontSize.)
async function embedTextWithPdfLibFancySingleScale(
  base64Pdf: string,
  textFields: TextField[],
  docScale: number
): Promise<string> {
  let cleaned = base64Pdf;
  if (cleaned.startsWith("data:")) {
    cleaned = cleaned.split(",")[1];
  }
  cleaned = cleaned.replace(/\s/g, "");
  const pdfData = Uint8Array.from(atob(cleaned), (c) => c.charCodeAt(0));
  const pdfDoc = await PDFDocument.load(pdfData);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await pdfDoc.embedFont(
    StandardFonts.HelveticaOblique
  );
  const helveticaBoldOblique = await pdfDoc.embedFont(
    StandardFonts.HelveticaBoldOblique
  );
  const pages = pdfDoc.getPages();
  const fontSize = 14;
  const lineHeight = fontSize * 0.8;

  textFields.forEach((field) => {
    const page = pages[field.page - 1];
    if (!page) return;
    const pageHeight = page.getHeight();
    // Compute PDF y: invert canvas y (no extra offset)
    const pdfBoxTop = pageHeight - field.yPosition - 15;
    const lines = field.text.split(/\r?\n/);
    lines.forEach((line, i) => {
      // Calculate position with proper line height
      const pdfY = pdfBoxTop - i * lineHeight;
      // Select font based on text formatting
      let font = helvetica;
      if (field.isBold && field.isItalic) {
        font = helveticaBoldOblique;
      } else if (field.isBold) {
        font = helveticaBold;
      } else if (field.isItalic) {
        font = helveticaOblique;
      }

      // Draw the text
      page.drawText(line, {
        x: field.xPosition,
        y: pdfY,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });

      // Add underline if needed
      if (field.isUnderline) {
        const textWidth = font.widthOfTextAtSize(line, fontSize);
        const underlineY = pdfY - fontSize * 0.15; // Position properly below the text

        page.drawLine({
          start: { x: field.xPosition, y: underlineY },
          end: { x: field.xPosition + textWidth, y: underlineY },
          thickness: 1,
          color: rgb(0, 0, 0),
        });
      }
    });
  });

  const updated = await pdfDoc.save();
  const binStr = uint8ArrayToString(updated);
  return btoa(binStr);
}

function SignaturePad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<pdfjsLib.RenderTask | null>(null);

  // Redux state
  const { token, profileData, userSignature } = useSelector(
    (state: RootState) => state.authSlice
  );

  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [originalPdfBase64, setOriginalPdfBase64] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [mySignaturePosition, setMySignaturePosition] =
    useState<SignaturePosition | null>(null);
  const [isMySignature, setIsMySignature] = useState(false);
  const [isContactSignature, setIsContactSignature] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [textFields, setTextFields] = useState<TextField[]>([]);
  const [isAddingText, setIsAddingText] = useState(false);
  const [signaturePositions, setSignaturePositions] = useState<
    SignaturePosition[]
  >([]);
  const [loadingUpload, startSubmit] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");

  // New state for text formatting
  const [activeTextField, setActiveTextField] = useState<string | null>(null);
  const [showTextFormatting, setShowTextFormatting] = useState(false);

  // State for canvas dimensions (for Rnd boundaries)
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });

  // viewportScale is the scale factor for rendering the PDF on the canvas.
  const [viewportScale, setViewportScale] = useState(1);
  const [pdfPageHeight, setPdfPageHeight] = useState(0);

  const [userEmail] = useState(profileData.email);
  const [signatureType, setSignatureType] = useState<"basic" | "otp">("basic");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [myDocuments, setMyDocuments] = useState<any[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const endPoint =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4040";

  // Fetch My Documents
  const fetchMyDocuments = async () => {
    try {
      const url = `${endPoint}/api/my-documents/get-all/`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.responseCode === 200 && response.data.data?.documents) {
        setMyDocuments(response.data.data.documents);
      } else {
        console.error("Unexpected response structure", response.data);
      }
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  };
  useEffect(() => {
    fetchMyDocuments();
  }, []);

  // Load PDF and render page 1
  const loadPdfFromBase64 = async (base64Str: string) => {
    setOriginalPdfBase64(base64Str);
    let cleaned = base64Str;
    if (cleaned.startsWith("data:")) {
      cleaned = cleaned.split(",")[1];
    }
    cleaned = cleaned.replace(/\s/g, "");
    const bin = atob(cleaned);
    const len = bin.length;
    const buffer = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      buffer[i] = bin.charCodeAt(i);
    }
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    setPdfDoc(pdf);
    setTotalPages(pdf.numPages);
    setCurrentPage(1);
    renderPdfWithSignatures(1);
  };

  const updateTextField = (id: string, updates: Partial<TextField>) => {
    setTextFields((fields) =>
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const removeTextField = (id: string) => {
    setTextFields((fields) => fields.filter((field) => field.id !== id));
    if (activeTextField === id) {
      setActiveTextField(null);
      setShowTextFormatting(false);
    }
  };

  // When submitting, embed text using pdf-lib.
  const onSubmit = async () => {
    startSubmit(async () => {
      if (!originalPdfBase64) return;
      const updatedBase64 = await embedTextWithPdfLibFancySingleScale(
        originalPdfBase64,
        textFields,
        viewportScale
      );
      await handleSubmit({
        pdfDoc: updatedBase64,
        signaturePositions,
        mySignaturePosition,
        token,
        dispatch,
        router,
        signatureType,
      });
    });
  };

  const removeMySignature = () => {
    setMySignaturePosition(null);
  };

  // Toggle text formatting options
  const toggleBold = (fieldId: string) => {
    setTextFields((fields) =>
      fields.map((field) =>
        field.id === fieldId ? { ...field, isBold: !field.isBold } : field
      )
    );
  };

  const toggleItalic = (fieldId: string) => {
    setTextFields((fields) =>
      fields.map((field) =>
        field.id === fieldId ? { ...field, isItalic: !field.isItalic } : field
      )
    );
  };

  const toggleUnderline = (fieldId: string) => {
    setTextFields((fields) =>
      fields.map((field) =>
        field.id === fieldId
          ? { ...field, isUnderline: !field.isUnderline }
          : field
      )
    );
  };

  // Render signatures onto the canvas.
  // Here we use the stored coordinates multiplied by the scale.
  const renderSignaturePositionsOnCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, scale: number) => {
      signaturePositions.forEach(
        ({ xPosition, yPosition, page, userEmail: sigEmail }) => {
          if (page === currentPage) {
            const canvasX = xPosition * scale;
            const canvasY = yPosition * scale;
            const color = sigEmail === userEmail ? "#4f46e5" : "#10b981";
            ctx.fillStyle = color + "40";
            ctx.fillRect(canvasX, canvasY, 150, 150);
            ctx.fillStyle = color;
            ctx.font = "12px sans-serif";
            ctx.fillText(sigEmail, canvasX, canvasY + 100);
            ctx.fillText(
              t("signaturePad.signatureLabel"),
              canvasX + 10,
              canvasY + 40
            );
          }
        }
      );
      if (mySignaturePosition && mySignaturePosition.page === currentPage) {
        const canvasX = mySignaturePosition.xPosition * scale;
        const canvasY = mySignaturePosition.yPosition * scale;
        ctx.fillStyle = "#4f46e5" + "40";
        ctx.fillRect(canvasX, canvasY, 150, 150);
        ctx.fillStyle = "#4f46e5";
        ctx.font = "12px sans-serif";
        ctx.fillText(userEmail, canvasX, canvasY + 100);
        ctx.fillText(
          t("signaturePad.yourSignatureLabel"),
          canvasX + 10,
          canvasY + 40
        );
      }
    },
    [signaturePositions, mySignaturePosition, userEmail, currentPage, t]
  );

  // Render the PDF page onto the canvas and update scale and dimensions.
  const renderPdfWithSignatures = async (pageNum: number) => {
    if (!pdfDoc) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const page = await pdfDoc.getPage(pageNum);
    const unscaledViewport = page.getViewport({ scale: 1 });
    setPdfPageHeight(unscaledViewport.height);
    const maxWidth = 800;
    const containerWidth = Math.min(
      canvas.parentElement?.clientWidth || maxWidth,
      maxWidth
    );
    const scale = containerWidth / unscaledViewport.width;
    setViewportScale(scale);
    const scaledViewport = page.getViewport({ scale });
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
    setCanvasDimensions({
      width: scaledViewport.width,
      height: scaledViewport.height,
    });
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
    }
    const renderTask = page.render({
      canvasContext: ctx,
      viewport: scaledViewport,
    });
    renderTaskRef.current = renderTask;
    try {
      await renderTask.promise;
      renderSignaturePositionsOnCanvas(ctx, scale);
    } catch (error: any) {
      if (error.name !== "RenderingCancelledException") {
        console.error("Rendering error:", error);
      }
    }
  };

  // Handle PDF file changes.
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "application/pdf") return;
    const arrayBuffer = await file.arrayBuffer();
    const uint8Arr = new Uint8Array(arrayBuffer);
    let bin = "";
    for (let i = 0; i < uint8Arr.length; i++) {
      bin += String.fromCharCode(uint8Arr[i]);
    }
    const base64Pdf = btoa(bin);
    setOriginalPdfBase64(base64Pdf);
    const pdf = await pdfjsLib.getDocument({ data: uint8Arr }).promise;
    setPdfDoc(pdf);
    setTotalPages(pdf.numPages);
    setCurrentPage(1);
    renderPdfWithSignatures(1);
  };

  // Handle canvas clicks.
  // We capture the raw canvas coordinates (with no extra margins)
  // so that the stored x and y exactly match what is seen on the canvas.
  const handleCanvasClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!pdfDoc) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / viewportScale;
    const yPos = (e.clientY - rect.top) / viewportScale; // raw canvas y

    if (isAddingText) {
      const newField: any = {
        id: Date.now().toString(),
        xPosition: xPos,
        yPosition: yPos,
        page: currentPage,
        text: "",
        width: 150,
        height: 50,
        isBold: false,
        isItalic: false,
        isUnderline: false,
      };
      setTextFields((prev) => [...prev, newField]);
      setIsAddingText(false);
      return;
    }

    if (isMySignature) {
      setMySignaturePosition({
        xPosition: xPos,
        yPosition: yPos,
        page: currentPage,
        userEmail: profileData.email,
        userPhoneNumber: profileData.phoneNumber,
      });
    } else if (selectedContacts.length > 0 && isContactSignature) {
      const lastContact = selectedContacts[selectedContacts.length - 1];
      setSignaturePositions((prev) => {
        const updated = prev.filter((p) => p.userEmail !== lastContact.email);
        updated.push({
          xPosition: xPos,
          yPosition: yPos,
          page: currentPage,
          userEmail: lastContact.email,
          userPhoneNumber: lastContact.userPhoneNumber,
        });
        return updated;
      });
    }
  };

  const addMySignature = () => {
    setIsMySignature(true);
    setShowContactModal(false);
    setIsAddingText(false);
    setIsContactSignature(false);
  };

  const findContact = () => {
    if (!searchQuery?.trim() || !phoneNumber?.trim()) return;
    const newContact: Contact = {
      userName: searchQuery,
      email: searchQuery,
      userPhoneNumber: phoneNumber,
    };
    setSelectedContacts((prev) => {
      if (prev.some((c) => c.email === newContact.email)) return prev;
      return [...prev, newContact];
    });
    setSearchQuery("");
    setPhoneNumber("");
    setShowContactModal(false);
  };

  const removeContactAndSignature = (contactEmail: string) => {
    setSelectedContacts((prev) => prev.filter((c) => c.email !== contactEmail));
    setSignaturePositions((prev) =>
      prev.filter((pos) => pos.userEmail !== contactEmail)
    );
    renderPdfWithSignatures(currentPage);
  };

  useEffect(() => {
    if (pdfDoc) {
      renderPdfWithSignatures(currentPage);
    }
  }, [currentPage, pdfDoc, signaturePositions, mySignaturePosition]);

  return (
    <div className={styles.signaturePad}>
      <h1 className={`${styles.header} text-2xl font-semibold mb-6`}>
        {t("signaturePad.header")}{" "}
        <span style={{ color: "#00a57b" }}>{t("signaturePad.brand")}</span>
      </h1>

      {/* Signature Type */}
      <Form.Group className="mb-3">
        <Form.Label>{t("signaturePad.selectSignatureType")}</Form.Label>
        <Form.Select
          value={signatureType}
          onChange={(e) => setSignatureType(e.target.value as "basic" | "otp")}
        >
          <option value="basic">{t("signaturePad.basicSignature")}</option>
          {userSignature?.allowedServices?.includes("otp") && (
            <option value="otp">{t("signaturePad.otpSignature")}</option>
          )}
        </Form.Select>
      </Form.Group>

      <div className={styles.toolbar}>
        <button
          onClick={() => {
            setIsMySignature(false);
            setShowContactModal(true);
            setIsAddingText(false);
            setIsContactSignature(true);
          }}
          className={`${styles.addContactButton} ${
            !pdfDoc || !mySignaturePosition ? styles.disabled : ""
          }`}
          disabled={!pdfDoc || !mySignaturePosition}
        >
          <UserPlus className="h-4 w-4" />
          {t("signaturePad.addContact")}
        </button>

        <button
          onClick={addMySignature}
          className={`${styles.addSignatureButton} ${
            isMySignature ? styles.active : ""
          } ${!pdfDoc ? styles.disabled : ""}`}
          disabled={!pdfDoc}
        >
          {t("signaturePad.addMySignature")}
        </button>
        {mySignaturePosition && (
          <button
            onClick={removeMySignature}
            className={styles.removeSignatureButton}
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <button
          onClick={() => {
            setIsAddingText(true);
            setIsMySignature(false);
            setShowContactModal(false);
            setIsContactSignature(false);
            setShowTextFormatting(true);
          }}
          className={`${styles.addSignatureButton} ${
            isAddingText ? styles.active : ""
          } ${!pdfDoc ? styles.disabled : ""}`}
          disabled={!pdfDoc}
        >
          {t("signaturePad.addText")}
        </button>
        {isAddingText && (
          <button
            onClick={() => {
              setIsAddingText(false);
              setShowTextFormatting(false);
            }}
            className={`${styles.addSignatureButton} ${
              isAddingText ? styles.active : ""
            } ${!pdfDoc ? styles.disabled : ""}`}
            disabled={!pdfDoc}
          >
            {t("signaturePad.cancelAddText")}
          </button>
        )}

        {/* Text formatting toolbar - appears when Add Text is clicked */}
        {showTextFormatting && (
          <div
            className={
              styles.textFormattingToolbar || "text-formatting-toolbar"
            }
          >
            {/* Bold */}
            <button
              onClick={() => activeTextField && toggleBold(activeTextField)}
              className={`${styles.formatButton || "format-button"} 
              ${
                activeTextField &&
                textFields.find((f) => f.id === activeTextField)?.isBold
                  ? styles.activeFormat || "active-format"
                  : ""
              }`}
              disabled={!activeTextField}
              title="Bold"
            >
              <Bold className="h-4 w-4 text-black" />
            </button>

            {/* Italic */}
            <button
              onClick={() => activeTextField && toggleItalic(activeTextField)}
              className={`${styles.formatButton || "format-button"} 
              ${
                activeTextField &&
                textFields.find((f) => f.id === activeTextField)?.isItalic
                  ? styles.activeFormat || "active-format"
                  : ""
              }`}
              disabled={!activeTextField}
              title="Italic"
            >
              <Italic className="h-4 w-4 text-black" />
            </button>

            {/* Underline */}
            <button
              onClick={() =>
                activeTextField && toggleUnderline(activeTextField)
              }
              className={`${styles.formatButton || "format-button"} 
              ${
                activeTextField &&
                textFields.find((f) => f.id === activeTextField)?.isUnderline
                  ? styles.activeFormat || "active-format"
                  : ""
              }`}
              disabled={!activeTextField}
              title="Underline"
            >
              <Underline className="h-4 w-4 text-black" />
            </button>
          </div>
        )}

        <label
          className={styles.uploadButton}
          onClick={() => {
            setIsMySignature(false);
            setIsAddingText(false);
          }}
        >
          <Upload className="h-4 w-4" />
          {t("signaturePad.uploadPdf")}
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className={styles.hiddenInput}
          />
        </label>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>{t("signaturePad.chooseMyDocuments")}</Form.Label>
        <Form.Select
          onChange={(e) => {
            const selectedId = e.target.value;
            if (!selectedId) return;
            const doc = myDocuments.find((d) => d._id === selectedId);
            if (doc && doc.fileContent) {
              loadPdfFromBase64(doc.fileContent);
            }
          }}
        >
          <option value="">{t("signaturePad.selectDocument")}</option>
          {myDocuments.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.fileName}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {showContactModal && (
        <AddContact
          token={token}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          setPhoneNumber={setPhoneNumber}
          phoneNumber={phoneNumber}
          findContact={findContact}
          setShowContactModal={setShowContactModal}
        />
      )}

      <div className={styles.selectedContacts}>
        {selectedContacts.map((contact) => (
          <div key={contact.email} className={styles.contactChip}>
            <span>{contact.userName}</span>
            <button
              onClick={() => removeContactAndSignature(contact.email)}
              className={styles.removeContactButton}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Canvas container */}
      <div
        className={styles.canvasContainer}
        style={{
          position: "relative",
          width: canvasDimensions.width,
          height: canvasDimensions.height,
          margin: "auto",
        }}
      >
        {!pdfDoc && (
          <div className={styles.placeholder}>
            <Upload className="h-8 w-8" />
            <p>{t("signaturePad.uploadPdfPlaceholder")}</p>
          </div>
        )}

        {pdfDoc && (
          <>
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className={styles.canvas}
            />
            {textFields
              .filter((field) => field.page === currentPage)
              .map((field) => (
                <Rnd
                  key={field.id}
                  default={{
                    x: field.xPosition * viewportScale,
                    y: field.yPosition * viewportScale,
                    width: field.width * viewportScale,
                    height: field.height * viewportScale,
                  }}
                  bounds="parent"
                  enableResizing={{ right: true, bottom: true }}
                  onDragStop={(e, d) => {
                    updateTextField(field.id, {
                      xPosition: d.x / viewportScale,
                      yPosition: d.y / viewportScale,
                    });
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    updateTextField(field.id, {
                      width: ref.offsetWidth / viewportScale,
                      height: ref.offsetHeight / viewportScale,
                      xPosition: position.x / viewportScale,
                      yPosition: position.y / viewportScale,
                    });
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      border: "1px solid #666",
                      backgroundColor: "#222",
                    }}
                  >
                    <div
                      onClick={() => removeTextField(field.id)}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 2,
                        cursor: "pointer",
                        background: "red",
                        color: "white",
                        padding: "2px 5px",
                        fontSize: "12px",
                      }}
                    >
                      X
                    </div>
                    <textarea
                      value={field.text}
                      onChange={(e) =>
                        updateTextField(field.id, { text: e.target.value })
                      }
                      onFocus={() => {
                        setActiveTextField(field.id);
                        setShowTextFormatting(true);
                      }}
                      placeholder="Enter text..."
                      style={{
                        width: "100%",
                        height: "100%",
                        resize: "none",
                        border: "none",
                        background: "transparent",
                        padding: "4px",
                        fontSize: "14px",
                        color: "white",
                        fontWeight: field.isBold ? "bold" : "normal",
                        fontStyle: field.isItalic ? "italic" : "normal",
                        textDecoration: field.isUnderline
                          ? "underline"
                          : "none",
                      }}
                    />
                  </div>
                </Rnd>
              ))}
          </>
        )}
      </div>

      {pdfDoc && (
        <div className={styles.pageControls}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className={styles.pageNumber}>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <Button
        onClick={onSubmit}
        className="w-100 main-btn m-auto mt-5"
        disabled={loadingUpload}
      >
        {loadingUpload ? t("signaturePad.sending") : t("signaturePad.submit")}
      </Button>
    </div>
  );
}

export default SignaturePad;
