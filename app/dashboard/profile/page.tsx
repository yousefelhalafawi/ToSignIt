"use client";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
  Accordion,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BiUser } from "react-icons/bi";
import { useEffect, useState } from "react";
import EditProfile from "@/app/_components/dashboard/profile/EditProfile";
import ProfileView from "@/app/_components/dashboard/profile/VewProfile";
import { otpIncrease, StripPayment } from "@/app/_redux/slices/packagesSlice";
import type { AppDispatch, RootState } from "@/app/_redux/store";
import { useRouter } from "next/navigation";
import { errorToast } from "@/app/_components/common/alert/AlertTimer";
import { useTranslation } from "react-i18next";
import { getUserData } from "@/app/_redux/slices/authSlice";
import LoadingComponent from "@/app/_components/common/LoadingComponent";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ProfileSettings() {
  const { t } = useTranslation();
  const { profileData, userSignature, loading } = useSelector(
    (state: RootState) => state.authSlice
  );

  const currentDate = new Date();
  const [mode, setMode] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${
      monthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCount, setOtpCount] = useState(1);

  // Function to handle OTP increase request
  const handleOtpIncrease = () => {
    dispatch(otpIncrease({ otpIncreasing: otpCount }))
      .unwrap()
      .then((response: any) => {
        window.open(response.paymentRedirectUrl, "_self");
      })
      .catch((error: any) => {
        errorToast(t("profileSettings.increaseOtpSignaturesError"));
      });
  };
  useEffect(() => {
    dispatch(getUserData());
  }, []);
  return (
    <>
      {loading && (
        <div className="overlay">
          <LoadingComponent />
        </div>
      )}
      <Container fluid className="p-4   h-100">
        <Row className="mb-4">
          <Col>
            <h1 className="h3 mb-0">
              {t("profileSettings.hello", { userName: profileData.userName })}
            </h1>
            <p className="main-color">
              {t("profileSettings.today", {
                month: monthNames[currentDate.getUTCMonth()],
                date: currentDate.getDate(),
              })}
            </p>
          </Col>
          <Col xs="auto" className="d-flex align-items-start ">
            <div className="text-start me-2">
              <p className="mb-0 fw-bold">{profileData.userName}</p>
              <p className="text-muted small">{profileData.jobTitle}</p>
            </div>
            <BiUser size={40} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="mb-4">
            {userSignature && (
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0" className="border-0 shadow-sm">
                  <Accordion.Header className="bg-main-header">
                    <h5 className="mb-0">
                      {t("profileSettings.subscriptionDetails")}
                    </h5>
                  </Accordion.Header>
                  <Accordion.Body className="p-0">
                    <Card className="border-0">
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <div className="mb-3">
                              <h6 className="text-muted mb-1">
                                {t("profileSettings.status")}
                              </h6>
                              <p className="fw-bold mb-0">
                                <span
                                  className={`badge ${
                                    userSignature?.active
                                      ? "bg-success"
                                      : "bg-secondary"
                                  }`}
                                >
                                  {userSignature?.active
                                    ? t("profileSettings.active")
                                    : t("profileSettings.notActive")}
                                </span>
                              </p>
                            </div>
                          </Col>

                          <Col md={6}>
                            <div className="mb-3">
                              <h6 className="text-muted mb-1">
                                {t("profileSettings.startDate")}
                              </h6>
                              <p className="fw-bold mb-0">
                                {formatDate(userSignature?.createdAt || "")}
                              </p>
                            </div>
                          </Col>

                          <Col md={6}>
                            <div className="mb-3">
                              <h6 className="text-muted mb-1">
                                {t("profileSettings.renewalDate")}
                              </h6>
                              <p className="fw-bold mb-0">
                                {formatDate(
                                  userSignature?.subscriptionExpiryDate || ""
                                )}
                              </p>
                            </div>
                          </Col>

                          <Col md={6}>
                            {userSignature?.subscriptionWayName && (
                              <div className="mb-3">
                                <h6 className="text-muted mb-1">
                                  {t("profileSettings.billingCycle")}
                                </h6>
                                <p className="fw-bold mb-0">
                                  {userSignature?.subscriptionWayName}
                                </p>
                              </div>
                            )}
                          </Col>

                          <Col md={6}>
                            <div className="mb-3">
                              <h6 className="text-muted mb-1">
                                {t("profileSettings.amount")}
                              </h6>
                              <p className="fw-bold mb-0">
                                <span className="ms-1 me-1">
                                  {userSignature?.price || "0.00"}
                                </span>
                                <span>{userSignature?.currency}</span>
                              </p>
                            </div>
                          </Col>

                          {userSignature?.allowedServices?.includes("otp") && (
                            <Col md={6}>
                              <div className="mb-3">
                                <h6 className="text-muted mb-1">
                                  {t("profileSettings.otpSignatureRemaining")}
                                </h6>
                                <p className="fw-bold mb-0">
                                  <span>{userSignature.otpSignature}</span>
                                </p>
                              </div>
                            </Col>
                          )}
                        </Row>

                        <div className="d-flex justify-content-end">
                          {userSignature?.allowedServices?.includes("otp") && (
                            <Button
                              className="primary-button m-1"
                              onClick={() => setShowOtpModal(true)}
                            >
                              {t("profileSettings.increaseOtpSignatures")}
                            </Button>
                          )}

                          {!profileData.isUsingFree && (
                            <Button
                              className="primary-button m-1"
                              onClick={() =>
                                router.push("/dashboard/subscriptions")
                              }
                            >
                              {t("profileSettings.renewPackage")}
                            </Button>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
          </Col>

          <Col md={12} lg={12}>
            <Button className="primary-button" onClick={() => setMode(!mode)}>
              {mode ? t("profileSettings.edit") : t("profileSettings.view")}
            </Button>
          </Col>
          <Col md={12} lg={12}>
            {mode ? <ProfileView /> : <EditProfile setMode={setMode} />}
          </Col>
        </Row>
        {/* OTP Increase Modal */}
      </Container>
      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t("profileSettings.otpModalTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>{t("profileSettings.otpModalText")}</p>
          <div className="d-flex justify-content-center align-items-center">
            <Button
              variant="outline-primary"
              onClick={() => setOtpCount(Math.max(1, otpCount - 1))}
            >
              -
            </Button>
            <span className="mx-3 fw-bold">{otpCount}</span>
            <Button
              variant="outline-primary"
              onClick={() => setOtpCount(otpCount + 1)}
            >
              +
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
            {t("profileSettings.cancel")}
          </Button>
          <Button className="button bg-success" onClick={handleOtpIncrease}>
            {t("profileSettings.confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
