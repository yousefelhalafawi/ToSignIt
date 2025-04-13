import React, { useRef, useState, useTransition } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Trash2, Save, Eye } from "lucide-react";
import { Form, Button } from "react-bootstrap";
import styles from "../_style/signature.module.scss";
import { colorOptions, SaveSignature } from "../_utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_redux/store";
import { useRouter } from "next/navigation";

export default function DrawSignature() {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const { token } = useSelector((state: RootState) => state.authSlice);
  const signatureRef = useRef<SignatureCanvas>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const clearSignature = () => {
    signatureRef.current?.clear();
    setPreviewImage("");
  };

  const PreviewSignature = () => {
    if (signatureRef.current) {
      const canvas = signatureRef.current.getCanvas();
      const context = canvas.getContext("2d");

      // Create a temporary canvas to draw the signature on a transparent background
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempContext = tempCanvas.getContext("2d");

      if (tempContext) {
        tempContext.fillStyle = "rgba(0,0,0,0)";
        tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempContext.drawImage(canvas, 0, 0);

        const signatureImage = tempCanvas.toDataURL("image/png");
        setPreviewImage(signatureImage);
      }
    } else {
      setPreviewImage("");
    }
  };

  const callSaveSignature = () => {
    startTransition(async () => {
      SaveSignature({
        token,
        router,
        payload: {
          userSignature: previewImage,
        },
        dispatch,
      });
    });
  };

  return (
    <div>
      <div className={styles.tabContent}>
        <div className={styles.canvasContainer}>
          <div className={styles.colorSelector}>
            <Form.Select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="mb-3"
            >
              {colorOptions.map((color) => (
                <option key={color.value} value={color.value}>
                  {color.label}
                </option>
              ))}
            </Form.Select>
          </div>
          <SignatureCanvas
            ref={signatureRef}
            canvasProps={{
              className: previewImage
                ? styles.disabledCanvas
                : styles.signatureCanvas,
              width: 150,
              height: 150,
            }}
            backgroundColor="rgba(0,0,0,0)"
            penColor={selectedColor}
          />
        </div>

        {previewImage && (
          <div className={styles.previewContainer}>
            <h4>Signature Preview</h4>
            <div
              className={`${styles.signaturePreview} ${styles.transparentBg}`}
            >
              {previewImage && (
                <img
                  src={previewImage || "/placeholder.svg"}
                  alt="Signature Preview"
                />
              )}
            </div>
          </div>
        )}

        <div className={styles.buttonGroup}>
          <Button
            variant="outline-secondary"
            onClick={clearSignature}
            className={styles.button}
          >
            <Trash2 />
            Clear
          </Button>
          {previewImage ? (
            <Button
              variant="primary"
              onClick={callSaveSignature}
              className={styles.button}
              disabled={isPending}
            >
              <Save />
              Save Signature
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={PreviewSignature}
              className={styles.button}
            >
              <Eye />
              Preview Signature
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
