import React, { useEffect, useState } from "react";
import {
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Badge,
  Stack,
  Tabs,
  Tab,
  Modal,
  Spinner,
} from "react-bootstrap";
import { MdOutlineCancel } from "react-icons/md";
import { Info, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { GetRequests } from "@/app/_redux/slices/requestsSlice";
import { SignRequest } from "@/app/_redux/slices/signingSlice";
import Pagination from "@/app/news/_components/Pagination";
import styles from "../../../dashboard/contacts/_style/contacts.module.scss";
import LoadingComponent from "../../common/LoadingComponent";
import { errorToast, successToast } from "../../common/alert/AlertTimer";
import ViewDownloadFile from "./ViewDownloadFile";
import OtpInput from "react-otp-input";
import { verfiyDoc } from "@/app/_redux/slices/documentSlice";

export default function MainRequests() {
  // ---------------- i18n hook ----------------
  const { t } = useTranslation();

  // ---------------- Redux ----------------
  const dispatch = useDispatch<any>();
  const { requestsData, loading } = useSelector(
    (state: any) => state.requestsSlice
  );
  const { loading: signingLoading } = useSelector(
    (state: any) => state.signingSlice
  );

  // ---------------- Local State ----------------
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState<"Pending" | "Signed">("Pending");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>({});
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );

  // Modal states
  const [showSignModal, setShowSignModal] = useState(false);
  const [showVerfiyModal, setShowVerfiyModal] = useState(false);

  // File upload state (for document verification)
  const [fileBase64, setFileBase64] = useState<string | null>(null);

  // ---------------- Pagination ----------------
  const paginate = (pageNumber: number) => setPage(pageNumber);

  // ---------------- Time Ago helper function (localized) ----------------
  function timeAgo(dateString: string) {
    const now: any = new Date();
    const date: any = new Date(dateString);
    const diffMs = now - date;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); // Approximate
    const years = Math.floor(days / 365); // Approximate

    if (days === 0) {
      return t("mainRequests.timeAgo.today");
    } else if (days === 1) {
      return t("mainRequests.timeAgo.yesterday");
    } else if (days < 7) {
      return t("mainRequests.timeAgo.daysAgo", { count: days });
    } else if (weeks < 4) {
      return t("mainRequests.timeAgo.weeksAgo", { count: weeks });
    } else if (months < 12) {
      return t("mainRequests.timeAgo.monthsAgo", { count: months });
    } else {
      return t("mainRequests.timeAgo.yearsAgo", { count: years });
    }
  }

  // ---------------- Fetch requests when component mounts or when status/page changes ----------------
  useEffect(() => {
    dispatch(GetRequests({ params: { status, limit: "5", page } }));
  }, [status, dispatch, page]);

  // ---------------- Search handlers ----------------
  const handleSearch = () => {
    if (searchTerm) {
      dispatch(GetRequests({ params: { requestNumber: searchTerm } }))
        .unwrap()
        .then(() => {
          setSearchMode(true);
        })
        .catch(() => {
          setSearchTerm("");
          errorToast(t("mainRequests.errors.noRequestFoundWithThisNumber"));
        });
    }
  };

  const resetSearch = () => {
    setSearchMode(false);
    setSearchTerm("");
    setStatus("Pending");
    setPage(1);
    dispatch(
      GetRequests({ params: { status: "Pending", limit: "5", page: "1" } })
    );
  };

  const ResetAll = () => {
    setOtp("");
    setStatus("Pending");
    setPage(1);
    setSearchTerm("");
    setSearchMode(false);
  };

  // ---------------- Sign request flow ----------------
  const handleSign = (id: string) => {
    setSelectedRequestId(id);
    setShowSignModal(true);
  };

  const confirmSign = () => {
    if (selectedRequestId) {
      const data = {
        requestId: selectedRequestId,
        ...(selectedRequest.serviceType === "OTP Signing" && otp
          ? { otp: Number(otp) }
          : {}),
      };
      dispatch(
        SignRequest({ data: data, endpoint: selectedRequest.serviceBackUrl })
      )
        .unwrap()
        .then(() => {
          successToast(t("mainRequests.messages.requestSignedSuccessfully"));
          ResetAll();
          setShowSignModal(false);
        })
        .catch(() => {
          errorToast(t("mainRequests.errors.failedToSignRequest"));
          setOtp("");
          setShowSignModal(false);
        });
    }
  };

  const handleCloseModal = () => {
    setShowSignModal(false);
    setSelectedRequestId(null);
  };

  // ---------------- Document verification flow ----------------
  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFileBase64(reader.result as string);
      };
    } else {
      errorToast(t("mainRequests.errors.pleaseSelectAValidPDFFile"));
    }
  }

  function handleVerfiy() {
    if (fileBase64) {
      dispatch(verfiyDoc({ file: fileBase64 }))
        .unwrap()
        .then(() => {
          successToast(t("mainRequests.messages.documentVerifiedSuccessfully"));
          setShowVerfiyModal(false);
          setFileBase64(null);
        })
        .catch(() =>
          errorToast(t("mainRequests.errors.failedToVerifyDocument"))
        );
    } else {
      errorToast(t("mainRequests.errors.pleaseSelectAPDFFileBeforeUploading"));
    }
  }

  // ---------------- Render JSX ----------------
  return (
    <Col md={12}>
      <h3 className="h5 fw-bold mb-4">{t("mainRequests.requestsTitle")}</h3>

      <Card className="mb-4 borderCard">
        <Card.Body style={{ height: "100%", overflowY: "auto" }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            {!searchMode && (
              <Tabs
                id="myRequestsTabs"
                activeKey={status}
                onSelect={(k) => setStatus(k as "Pending" | "Signed")}
                className="mb-3"
              >
                <Tab eventKey="Pending" title={t("mainRequests.pendingTab")} />
                <Tab eventKey="Signed" title={t("mainRequests.signedTab")} />
              </Tabs>
            )}

            <Button
              className="primary-button m-1"
              onClick={() => setShowVerfiyModal(true)}
            >
              {t("mainRequests.buttons.verifyDocument")}
            </Button>
          </div>

          {/* Search Input */}
          <div className="mb-3">
            <div className="d-flex gap-2 align-items-start">
              <InputGroup style={{ maxWidth: "400px" }}>
                <Form.Control
                  placeholder={
                    t("mainRequests.placeholders.requestNumber") as string
                  }
                  aria-label="Request Number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  onClick={searchMode ? resetSearch : handleSearch}
                >
                  {searchMode ? (
                    <MdOutlineCancel size={18} />
                  ) : (
                    <Search size={18} />
                  )}
                </Button>
              </InputGroup>
            </div>
          </div>

          {/* Requests Count */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="mb-0">
              {requestsData?.pdfFiles?.length > 0
                ? `1-${requestsData.pdfFiles.length} ${t(
                    "mainRequests.labels.of"
                  )} ${requestsData.pdfFiles.length} ${t(
                    "mainRequests.labels.requests"
                  )}`
                : t("mainRequests.labels.noRequestsAvailable")}
            </p>
          </div>

          {loading && <LoadingComponent />}

          {/* Requests List */}
          {!loading &&
            requestsData?.pdfFiles?.map((request: any, index: number) => (
              <Card key={request._id + index} className="mb-3">
                <Card.Body>
                  <div className="d-flex align-items-center gap-3">
                    {/* Request Info */}
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-star text-muted"></i>
                      <Stack>
                        <div className="d-flex align-items-center gap-2">
                          <span className="fw-medium">
                            {t("mainRequests.labels.requestNumber")}:{" "}
                            {request.requestNumber ||
                              t("mainRequests.labels.newRequest")}
                          </span>
                          <Badge bg="primary" pill>
                            {request.id}
                          </Badge>
                        </div>
                        <small className="text-muted">
                          {t("mainRequests.labels.created")}{" "}
                          {timeAgo(request.createdAt)} |{" "}
                          {t("mainRequests.labels.by")}{" "}
                          <span className="text-success">
                            {request.userOne.userName ||
                              t("mainRequests.labels.unknown")}
                          </span>
                        </small>
                      </Stack>
                    </div>

                    {/* Request Actions */}
                    <div className="ms-auto d-flex align-items-center gap-3">
                      <Badge bg="white" text="dark" className="p-3">
                        {status === "Pending"
                          ? t("mainRequests.pendingTab")
                          : t("mainRequests.signedTab")}
                      </Badge>
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => {
                          setSelectedRequest(request);
                          handleSign(request._id);
                        }}
                      >
                        <Info size={18} />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}

          {!searchMode && (
            <div className={styles.contactsWrapper2}>
              <Pagination
                currentPage={requestsData.currentPage}
                totalPages={requestsData.totalPages}
                paginate={paginate}
              />
            </div>
          )}
        </Card.Body>
      </Card>

      {/* ---------- Confirm Sign Modal ---------- */}
      <Modal
        show={showSignModal}
        onHide={signingLoading ? () => {} : handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {status === "Pending"
              ? t("mainRequests.modals.confirmSign.title")
              : t("mainRequests.modals.signedDocumentTitle")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {status === "Pending" && (
            <>
              <div className="alert alert-warning" role="alert">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <div>
                    <h6 className="alert-heading mb-1">
                      {t("mainRequests.modals.confirmSign.warningTitle")}
                    </h6>
                    <p className="mb-0">
                      {t("mainRequests.modals.confirmSign.message")}{" "}
                      <span className="fw-bold ms-1">
                        {selectedRequest?.requestNumber}
                      </span>
                      ?
                    </p>
                    <p className="mt-2 mb-0 small text-muted">
                      {t("mainRequests.modals.confirmSign.note")}
                    </p>
                  </div>
                </div>
              </div>
              {selectedRequest.serviceType === "OTP Signing" && (
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span className="otp-separator">-</span>}
                  renderInput={(props) => (
                    <input {...props} className="otp-input" />
                  )}
                  containerStyle="otp-input-container"
                />
              )}
            </>
          )}
          <ViewDownloadFile
            dataUrl={selectedRequest?.pdfContent}
            requestNumber={selectedRequest?.requestNumber}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={signingLoading ? () => {} : handleCloseModal}
          >
            {t("mainRequests.buttons.cancel")}
          </Button>
          {status === "Pending" && (
            <Button
              variant="success"
              onClick={signingLoading ? () => {} : confirmSign}
              disabled={
                selectedRequest.serviceType === "OTP Signing"
                  ? otp.length !== 6
                  : false
              }
            >
              {signingLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                t("mainRequests.buttons.confirm")
              )}
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* ---------- Verify Modal ---------- */}
      <Modal
        show={showVerfiyModal}
        onHide={() => setShowVerfiyModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {t("mainRequests.modals.verifyDocument.title")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile">
            <Form.Label>
              {t("mainRequests.modals.verifyDocument.selectPDF")}
            </Form.Label>
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVerfiyModal(false)}>
            {t("mainRequests.buttons.cancel")}
          </Button>
          <Button
            variant="primary"
            onClick={handleVerfiy}
            disabled={!fileBase64}
          >
            {t("mainRequests.buttons.verifyDocument")}
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
}
