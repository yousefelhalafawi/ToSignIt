import React from "react";
import { Container, Row } from "react-bootstrap";
import FeatureCard from "./FeatureCard";
import style from "./home.module.scss";
import { useTranslation } from "react-i18next";

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      imgPath: "/assets/images/fe1.png",
      imgAlt: t("features.feature1.imgAlt"),
      header: t("features.feature1.header"),
      phrase: t("features.feature1.phrase"),
    },
    {
      imgPath: "/assets/images/fe3.png",
      imgAlt: t("features.feature2.imgAlt"),
      header: t("features.feature2.header"),
      phrase: t("features.feature2.phrase"),
    },
    {
      imgPath: "/assets/images/fe2.png",
      imgAlt: t("features.feature3.imgAlt"),
      header: t("features.feature3.header"),
      phrase: t("features.feature3.phrase"),
    },
  ];

  return (
    <section className={style.bgGradient}>
      <Container className={style.features}>
        <div className={style.headerWrapper}>
          <h2 className={style.header}>
            {t("features.title1")}{" "}
            {/* <span className={style.highlight}>{t("features.title2")}</span> */}
            {/* <br /> */}
            <span className={style.signIt}>
              {t("features.title3")}
              <span className={style.it}>{t("features.title4")} </span>
            </span>{" "}
            ?{/* {t("features.title5")} */}
          </h2>
        </div>
        <Row className={style.featureRow}>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </Row>
      </Container>
    </section>
  );
}
