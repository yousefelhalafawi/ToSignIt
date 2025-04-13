"use client";

import { useState, useCallback } from "react";
import { Container, Button, Form, Spinner } from "react-bootstrap";
import OtpInput from "react-otp-input";
import styles from "./OtpVerification.module.css";
import { SignRequest } from "../_redux/slices/signingSlice";
import { useDispatch } from "react-redux";
import { FaEnvelope, FaHashtag, FaPhoneAlt } from "react-icons/fa";
import { successToast } from "../_components/common/alert/AlertTimer";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function OtpVerification({ requestId, data }: any) {
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const handleVerify = useCallback(() => {
    if (otp.length !== 6) return;
    setLoading(true);
    setError("");

    dispatch(
      SignRequest({
        data: { otp: Number(otp), requestId, email: data.email },
        endpoint: "third-party/back-otp",
      })
    )
      .unwrap()
      .then(() => {
        setLoading(false);
        successToast(t("otpVerification.success"));
        setTimeout(() => {
          router.push("/");
        }, 3000);
      })
      .catch(() => {
        setError(t("otpVerification.invalidOtp"));
        setLoading(false);
      });
  }, [otp, requestId, dispatch, router, t]);

  return (
    <Container fluid className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{t("otpVerification.title")}</h1>
        <p className={styles.subtitle}>{t("otpVerification.subtitle")}</p>

        {/* User Info Section */}
        <div className={styles.infoSection}>
          <div className={styles.infoItem}>
            <FaEnvelope className={styles.icon} />
            <Form.Control
              defaultValue={data.email}
              readOnly
              disabled
              className={styles.inputField}
            />
          </div>
          <div className={styles.infoItem}>
            <FaHashtag className={styles.icon} />
            <Form.Control
              defaultValue={data.requestNumber}
              readOnly
              disabled
              className={styles.inputField}
            />
          </div>
          <div className={styles.infoItem}>
            <FaPhoneAlt className={styles.icon} />
            <Form.Control
              defaultValue={data.userPhoneNumber}
              readOnly
              disabled
              className={styles.inputField}
            />
          </div>
        </div>

        {/* OTP Input */}
        <div className={styles.otpContainer}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            inputStyle={styles.otpInput}
            shouldAutoFocus
            containerStyle={styles.otpBox}
          />
        </div>

        {/* Error Message */}
        {error && <p className={styles.errorMessage}>{error}</p>}

        {/* Verify Button */}
        <Button
          className={styles.verifyButton}
          onClick={handleVerify}
          disabled={otp.length !== 6 || loading}
        >
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            t("otpVerification.verifyButton")
          )}
        </Button>
      </div>
    </Container>
  );
}
