"use client";
import React from "react";
import LoginForm from "../_components/login/LoginForm";
import { Image } from "react-bootstrap";
import withAuthHOC from "../_Auth/wihAuth";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Link from "next/link";

function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      <div
        className="d-flex flex-column align-items-center w-100"
        style={{ minHeight: "100vh" }}
      >
        <div className="header-layout" style={{ height: "60px" }}>
          <Image
            className="h-100"
            style={{
              cursor: "pointer",
            }}
            src="/assets/images/logoComp.png"
            alt={t("loginPage.logoAlt")}
            suppressHydrationWarning
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        <p
          className="color-lightBlue fw-bold mb-4 mt-3"
          style={{ fontSize: "2rem" }}
        >
          {t("loginPage.loginHeader")}
        </p>

        <LoginForm />
      </div>
      <div
        className="login-layout__footer"
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
        }}
      >
        © 2025 ToSignIT |&nbsp;
        <Link className="login-layout__link" href="/terms/generalConditions">
          {t("loginPage.termsAndConditions")}
        </Link>
      </div>
    </>
  );
}

export default withAuthHOC(LoginPage);
