"use client";
import React, { useState } from "react";
import { Button, Modal, Container } from "react-bootstrap";
import { Eye, Download } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ViewDownloadFileProps {
  dataUrl: string;
  requestNumber: number;
}

const ViewDownloadFile = ({
  dataUrl,
  requestNumber,
}: ViewDownloadFileProps) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const startDownload = () => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `Request_${requestNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container className="d-flex align-items-center gap-3 justify-content-center">
      <Button
        variant="outline-primary"
        onClick={() => setShowModal(true)}
        className="d-flex align-items-center gap-2 py-2 px-3"
      >
        <Eye className="w-4 h-4" />
        <span>{t("requests.view")}</span>
      </Button>

      <Button
        variant="outline-primary"
        onClick={startDownload}
        className="d-flex align-items-center gap-2 py-2 px-3"
      >
        <Download className="w-4 h-4" />
        <span>{t("requests.download")}</span>
      </Button>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("requests.documentPreview")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0" style={{ height: "90vh" }}>
          <iframe
            src={dataUrl}
            title="Document Preview"
            className="w-100 h-100 border-0"
            loading="lazy"
            style={{
              borderRadius: "0 0 0.375rem 0.375rem",
            }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ViewDownloadFile;
