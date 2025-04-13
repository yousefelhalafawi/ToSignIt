"use client";

import React from "react";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Button } from "react-bootstrap";
import style from "./home.module.scss";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_redux/store";
import { useTranslation } from "react-i18next";

export default function MainContent() {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    authSlice: { token },
  } = useSelector((state: RootState) => state);
  return (
    <main className={style.mainContent}>
      {/* Background decorative elements */}
      <div className={style.decorativeElements}>
        <div className={style.circle1} />
        <div className={style.circle2} />
        <div className={style.dots} />
        <div className={style.line} />
      </div>

      <div className={style.contentWrapper}>
        <div className={style.textContent}>
          <h4 className={style.title}>
            <span className={style.highlight}>
              To Sign
              <span className={style.it}>IT</span>
            </span>{" "}
          </h4>
          <h4 className="d-inline">{t("mainContent.title4")}</h4>
          <br />
          <h4 className={style.title2}>{t("mainContent.title5")}</h4>
          <h4 className={style.it2}>{t("mainContent.title6")}</h4>
          <p className={style.description}>{t("mainContent.description")}</p>
          <div className={style.buttonGroup}>
            {!token && (
              <Button
                className={style.primaryButton}
                size="lg"
                onClick={() => {
                  router.push("/register");
                }}
              >
                {t("mainContent.startTrial")}
              </Button>
            )}
            <Button
              variant="outline-primary"
              size="lg"
              className={style.secondaryButton}
            >
              <a href="#packages" className="text-decoration-none main-color">
                {t("mainContent.seePricing")}
              </a>
              <FaLongArrowAltRight className={style.arrow} />
            </Button>
          </div>
        </div>

        <div className={style.illustrationWrapper}>
          <svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background */}
            <rect width="400" height="400" fill="#F8F9FA" />

            {/* Document */}
            <rect
              x="100"
              y="50"
              width="200"
              height="300"
              fill="white"
              stroke="#00072D"
              strokeWidth="4"
            />

            {/* Document lines */}
            <line
              x1="120"
              y1="100"
              x2="280"
              y2="100"
              stroke="#A6E1FA"
              strokeWidth="2"
            />
            <line
              x1="120"
              y1="140"
              x2="280"
              y2="140"
              stroke="#A6E1FA"
              strokeWidth="2"
            />
            <line
              x1="120"
              y1="180"
              x2="280"
              y2="180"
              stroke="#A6E1FA"
              strokeWidth="2"
            />

            {/* Signature line */}
            <line
              x1="120"
              y1="280"
              x2="280"
              y2="280"
              stroke="#534EE8"
              strokeWidth="2"
            />

            {/* Digital signature */}
            <path
              d="M140 270 Q160 250, 180 270 T220 270"
              stroke="#534EE8"
              strokeWidth="4"
              fill="none"
            />

            {/* Pen */}
            <path
              d="M260 250 L280 230 L290 240 L270 260 Z"
              fill="#FCD0A1"
              stroke="#00072D"
              strokeWidth="2"
            />

            {/* Digital elements */}
            <circle cx="50" cy="50" r="20" fill="#534EE8" opacity="0.1" />
            <circle cx="350" cy="350" r="30" fill="#00A57B" opacity="0.1" />
            <rect
              x="320"
              y="80"
              width="40"
              height="40"
              fill="#FCD0A1"
              opacity="0.1"
            />

            {/* Binary code */}
            <text x="30" y="380" fill="#00072D" fontSize="12" opacity="0.5">
              10110101 01001010 11001101
            </text>
          </svg>
          <div className={style.floatingCard}>
            <div className={style.cardContent}>
              <div className={style.checkIcon}>✓</div>
              <span>{t("mainContent.floatingCardText")}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
