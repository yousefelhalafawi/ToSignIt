"use client";

import { useState } from "react";
import styles from "./signup.module.css";
import RegisterForm from "../_components/register/RegisterForm";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div>
          <div className={styles.logo}>{t("signup.logo")}</div>
          <div className={styles.illustration}>
            <img
              src="/assets/images/LogoOnlyBorder.png"
              alt={t("signup.alt")}
              width="90%"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                router.push("/");
              }}
              className="text-center"
            />
          </div>
          <h1 className={styles.heading}>{t("signup.heading")}</h1>
        </div>
        <div className={styles.testimonial}>{t("signup.testimonial")}</div>
      </div>
      <div className={styles.rightPanel}>
        <div className={styles.formContainer}>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
