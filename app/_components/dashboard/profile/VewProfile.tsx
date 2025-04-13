"use client";

import { RootState, AppDispatch } from "@/app/_redux/store";
import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Button, Spinner, Modal } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaBriefcase } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { errorToast, successToast } from "../../common/alert/AlertTimer";
import { setToken } from "@/app/_redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const endPoint = process.env.NEXT_PUBLIC_SERVER_URL;

const ProfileView: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { profileData, token } = useSelector(
    (state: RootState) => state.authSlice
  );

  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const hasCompany: boolean =
    Boolean(profileData.companyName) && !profileData.isManager;

  const handleDeleteClick = () => setShowConfirm(true);
  const handleCloseConfirm = () => !isDeleting && setShowConfirm(false);

  const deleteCompany = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.patch(
        `${endPoint}/api/user/separate-user-company`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        successToast(
          response.data.responseMessage || t("profile.companyRemoved")
        );

        dispatch(setToken(response.data.data.token));
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        errorToast(t("profile.deleteFailed"));
      }
    } catch (err: any) {
      console.error("Delete company error:", err);
      const errorMessage =
        err.response?.data?.message || t("profile.unexpectedError");
      errorToast(errorMessage);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <Container className="p-4 bg-white rounded shadow-sm">
      <Row className="mb-3">
        <Col md={6} className="d-flex align-items-center">
          <FaUser size={24} className="me-3 main-color" />
          <div>
            <h5 className="mb-0">{t("profile.firstName")}</h5>
            <p className="text-muted mb-0">{profileData.firstName || "N/A"}</p>
          </div>
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <FaUser size={24} className="me-3 main-color" />
          <div>
            <h5 className="mb-0">{t("profile.lastName")}</h5>
            <p className="text-muted mb-0">{profileData.lastName || "N/A"}</p>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={hasCompany ? 6 : 12} className="d-flex align-items-center">
          <FaEnvelope size={24} className="me-3 main-color" />
          <div>
            <h5 className="mb-0">{t("profile.email")}</h5>
            <p className="text-muted mb-0">{profileData.email || "N/A"}</p>
          </div>
        </Col>

        {hasCompany && (
          <Col
            md={6}
            className="d-flex align-items-center justify-content-between"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "30px 1fr 1fr",
                gridTemplateRows: "repeat(2, 1fr)",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <FaBriefcase
                size={24}
                className="me-3 main-color"
                style={{
                  gridColumn: "1",
                  gridRow: "1 / span 2",
                  alignSelf: "center",
                }}
              />
              <h5
                className="mb-0"
                style={{ gridColumn: "2 / span 2", gridRow: "1" }}
              >
                {t("profile.companyName")}
              </h5>
              <p
                className="text-muted mb-0"
                style={{ gridColumn: "2 / span 2", gridRow: "2" }}
              >
                {profileData.companyName || "N/A"}
              </p>
            </div>
            <Button
              variant="danger"
              onClick={handleDeleteClick}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  {t("profile.deleting")}
                </>
              ) : (
                t("profile.delete")
              )}
            </Button>
          </Col>
        )}
      </Row>

      <Row>
        <Col md={6} className="d-flex align-items-center">
          <FaBriefcase size={24} className="me-3 main-color" />
          <div>
            <h5 className="mb-0">{t("profile.jobTitle")}</h5>
            <p className="text-muted mb-0">{profileData.jobTitle || "N/A"}</p>
          </div>
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <FaPhone size={24} className="me-3 main-color" />
          <div>
            <h5 className="mb-0">{t("profile.phoneNumber")}</h5>
            <p className="text-muted mb-0">
              {profileData.phoneNumber || "N/A"}
            </p>
          </div>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <Modal
        show={showConfirm}
        onHide={handleCloseConfirm}
        centered
        backdrop="static"
        keyboard={!isDeleting}
      >
        <Modal.Header closeButton={!isDeleting}>
          <Modal.Title>{t("profile.confirmDeletionTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("profile.confirmDeletionMessage", {
            company: profileData.companyName,
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseConfirm}
            disabled={isDeleting}
          >
            {t("profile.cancel")}
          </Button>
          <Button
            variant="danger"
            onClick={deleteCompany}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                {t("profile.deleting")}
              </>
            ) : (
              t("profile.delete")
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfileView;
