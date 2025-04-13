"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Modal,
  Form,
} from "react-bootstrap";
import { FileText, Download, Trash2 } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  DeleteDoc,
  GetDocs,
  addDoc,
  verfiyDoc,
} from "@/app/_redux/slices/documentSlice";
import { errorToast } from "@/app/_components/common/alert/AlertTimer";

export default function DocumentPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch<any>();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  // Fetch documents on mount
  useEffect(() => {
    dispatch(GetDocs({}));
  }, [dispatch]);

  // Redux state
  const { DocsData, loading, error } = useSelector(
    (state: any) => state.documentSlice
  );
  const documents = DocsData?.documents || [];

  const formatDate = (dateString: string) => {
    if (!dateString) return t("notApplicable");
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  function base64Size(base64: string) {
    let padding = (base64.match(/=/g) || []).length;
    let base64Length = base64.replace(/=/g, "").length;
    let sizeInBytes = Math.floor((base64Length * 3) / 4) - padding;
    let sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(2);
  }

  function DownLoadFile(file: string, fileName: string) {
    const link = document.createElement("a");
    link.href = file;
    link.download = `${fileName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleDeleteConfirm(id: string) {
    setDeleteId(id);
    setShowConfirm(true);
  }

  function handleDelete() {
    if (deleteId) {
      dispatch(DeleteDoc(deleteId))
        .unwrap()
        .then(() => {
          dispatch(GetDocs({}));
        });
      setShowConfirm(false);
      setDeleteId(null);
    }
  }

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      let nameWithoutExtension = file.name.replace(/\.pdf$/i, "");
      setFileName(nameWithoutExtension);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFileBase64(reader.result as string);
      };
    } else {
      errorToast(t("pleaseSelectAValidPDFFile"));
    }
  }

  function handleUpload() {
    if (fileBase64 && fileName) {
      dispatch(addDoc({ fileName, fileContent: fileBase64 }))
        .unwrap()
        .then(() => {
          dispatch(GetDocs({}));
          setShowUploadModal(false);
          setFileBase64(null);
          setFileName("");
        })
        .catch(() => errorToast(t("failedToUploadDocument")));
    } else {
      errorToast(t("pleaseSelectAPDFFileBeforeUploading"));
    }
  }

  function handleVerfiy() {
    if (fileBase64 && fileName) {
      dispatch(verfiyDoc({ file: fileBase64 }))
        .unwrap()
        .then(() => {
          dispatch(GetDocs({}));
          setShowUploadModal(false);
          setFileBase64(null);
          setFileName("");
        })
        .catch(() => errorToast(t("failedToVerifyDocument")));
    } else {
      errorToast(t("pleaseSelectAPDFFileBeforeUploading"));
    }
  }

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{t("document.loading")}</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <div className="alert alert-danger" role="alert">
          {t("document.errorLoadingDocuments")}
        </div>
      </Container>
    );
  }

  if (documents.length === 0) {
    return (
      <Container className="mt-5">
        <Card className="text-center p-5">
          <Card.Body>
            <FileText size={48} className="mb-3 text-muted" />
            <Card.Title>{t("document.noDocumentsFoundTitle")}</Card.Title>
            <Card.Text>{t("document.noDocumentsFoundText")}</Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                setShowUploadModal(true);
              }}
            >
              {t("document.uploadDocument")}
            </Button>
          </Card.Body>
        </Card>
        <Modal
          show={showUploadModal}
          onHide={() => setShowUploadModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("document.uploadDocument")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formFile">
              <Form.Label>{t("document.selectPDFFile")}</Form.Label>
              <Form.Control
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowUploadModal(false)}
            >
              {t("document.cancel")}
            </Button>
            <Button
              variant="primary"
              onClick={handleUpload}
              disabled={!fileBase64}
            >
              {t("document.uploadDocument")}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-4">{t("document.yourDocuments")}</h2>
        <div>
          <Button
            className="primary-button m-1"
            onClick={() => setShowUploadModal(true)}
          >
            {t("document.uploadDocument")}
          </Button>
        </div>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {documents.map((doc: any) => (
          <Col key={doc.id || doc._id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <FileText className="me-2 text-primary" />
                  <Card.Title className="mb-0 text-truncate">
                    {doc.fileName || t("untitledDocument")}
                  </Card.Title>
                </div>
                <div className="mb-3">
                  <Badge bg="light" text="dark" className="me-2">
                    {t("document.document")}
                  </Badge>
                  <Badge bg="light" text="dark">
                    {base64Size(doc.fileContent)} MB
                  </Badge>
                </div>
                <Card.Text className="text-muted small">
                  {t("document.createdAt")}{" "}
                  {formatDate(doc.createdAt || doc.lastModified)}
                </Card.Text>
                <Card.Text className="text-muted small">
                  {t("document.expiryDate")}{" "}
                  {formatDate(doc.expiryDate || doc.lastModified)}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="bg-white border-top-0">
                <div className="d-flex justify-content-between">
                  <Button
                    className="main-btn"
                    size="sm"
                    onClick={() => DownLoadFile(doc.fileContent, doc.fileName)}
                  >
                    <Download size={16} className="me-1" />
                    {t("document.download")}
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    className="text-danger"
                    onClick={() => handleDeleteConfirm(doc._id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Upload Modal */}
      <Modal
        show={showUploadModal}
        onHide={() => setShowUploadModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("document.uploadDocument")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile">
            <Form.Label>{t("document.selectPDFFile")}</Form.Label>
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
            {t("document.cancel")}
          </Button>
          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={!fileBase64}
          >
            {t("document.uploadDocument")}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t("document.confirmDeletion")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("document.deleteConfirmationText")}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            {t("document.cancel")}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {t("document.delete")}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
