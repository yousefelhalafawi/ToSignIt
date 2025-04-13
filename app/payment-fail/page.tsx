"use client";

import { XCircle, Smartphone } from "lucide-react";
import { Card, Container, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function PaymentFailure() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center p-4">
      <Card className="border-0 shadow-sm" style={{ maxWidth: "400px" }}>
        <Card.Body className="text-center py-5">
          {/* Phone Icon with X Circle */}
          <div className="position-relative d-inline-block mb-4">
            <div
              className="border rounded-4 p-4"
              style={{ width: "128px", height: "192px" }}
            >
              <Smartphone className="w-100 h-100 text-secondary" />
            </div>
            <div
              className="position-absolute"
              style={{ right: "-8px", bottom: "-8px" }}
            >
              <XCircle
                className="text-danger bg-white rounded-circle"
                size={32}
              />
            </div>
          </div>

          {/* Failure Text */}
          <div className="mb-4">
            <h1
              className="text-danger fw-semibold mb-3"
              style={{ fontSize: "1.5rem" }}
            >
              {t("paymentFailure.failureHeader")}
            </h1>
            <p className="fw-medium mb-2">
              {t("paymentFailure.failureMessage")}
            </p>
            <p className="text-secondary small">
              {t("paymentFailure.failureDetails")}
            </p>
          </div>

          {/* Try Again Button */}
          <Button
            onClick={() => router.push("/")}
            className="px-4 py-2 me-2"
            style={{
              backgroundColor: "#DC3545",
              borderColor: "#DC3545",
              minWidth: "120px",
            }}
          >
            {t("paymentFailure.tryAgain")}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
