"use client";

import { CheckCircle, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function PaymentSuccess() {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, [router]);

  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center p-4">
      <Card className="border-0 shadow-sm" style={{ maxWidth: "400px" }}>
        <Card.Body className="text-center py-5">
          {/* Phone Icon with Check Circle */}
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
              <CheckCircle
                className="text-success bg-white rounded-circle"
                size={32}
              />
            </div>
          </div>

          {/* Success Text */}
          <div className="mb-4">
            <h1
              className="text-success fw-semibold mb-3"
              style={{ fontSize: "1.5rem" }}
            >
              {t("paymentSuccess.successHeader")}
            </h1>
            <p className="fw-medium mb-2">
              {t("paymentSuccess.successMessage")}
            </p>
            <p className="text-secondary small">
              {t("paymentSuccess.redirectMessage")}
            </p>
          </div>

          {/* Done Button */}
          <Button
            onClick={() => router.push("/")}
            className="px-4 py-2"
            style={{
              backgroundColor: "#7C3AED",
              borderColor: "#7C3AED",
              minWidth: "120px",
            }}
          >
            {t("paymentSuccess.doneButton")}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
