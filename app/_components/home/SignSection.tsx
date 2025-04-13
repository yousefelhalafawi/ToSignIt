import React from "react";
import { Container, Card, Image } from "react-bootstrap";
import style from "./home.module.scss";
import CardInfo from "./CardInfo";
import { useTranslation } from "react-i18next";

const SignSecureStats: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container className="py-5">
      <section className={style["signContainer"]}>
        <div className={style["info-boxes"]}>
          {/* Column for 180+ Countries */}
          <CardInfo
            // number={t("signSection.cardInfo1.number")}
            style={style}
            head={t("signSection.cardInfo1.head")}
            pharse={t("signSection.cardInfo1.phrase")}
          />
          {/* Column for 98% Uptime */}
          <CardInfo
            // number={t("signSection.cardInfo2.number")}
            style={style}
            head={t("signSection.cardInfo2.head")}
            pharse={t("signSection.cardInfo2.phrase")}
          />
        </div>
        <div className={style["images-boxes"]}>
          {/* Image as Thumbnail */}
          <Image
            src="/assets/images/d5.jpg"
            alt={t("signSection.videoThumbnailAlt")}
            className="rounded-3"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div className={`${style["single-image"]} position-relative`}>
          <Image
            src="/assets/images/d2.jpg"
            alt={t("signSection.videoThumbnailAlt")}
            className="rounded-3"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div className={style["signature-container"]}>
            <div className={style["signature-wrapper"]}>
              <div className={style["signature-content"]}>
                <div className={style["signature-flex"]}>
                  <div className={style["checkbox-like-shape"]}>
                    <svg viewBox="0 0 24 24" className={style["checkmark"]}>
                      <path
                        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <span>{t("signSection.signature.documentSigned")}</span>
                </div>
                <Image
                  src="/assets/images/sign.png"
                  alt={t("signSection.videoThumbnailAlt")}
                  className="rounded-3"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <p className={`${style["signature-title"]} text-muted`}>
                  {t("signSection.signature.signatureTitle")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default SignSecureStats;
