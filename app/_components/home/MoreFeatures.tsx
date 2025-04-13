import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FiZap, FiLayers, FiPackage, FiShield } from "react-icons/fi";
import style from "./home.module.scss";
import { useTranslation } from "react-i18next";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className={style.feature}>
    <div className={style.featureIcon}>{icon}</div>
    <h3 className={style.featureTitle}>{title}</h3>
    <p className={style.featureDescription}>{description}</p>
  </div>
);

export default function MoreFeatures() {
  const { t } = useTranslation();

  return (
    <section className={style.moreFeatures} id="moreFeatures">
      <Container>
        <Row className="align-items-center">
          <Col lg={5} className={style.headerContainer}>
            <h2 className={style.header}>
              <span className={style.highlight}>
                {t("moreFeatures.title1")}
              </span>{" "}
              <br />
              {t("moreFeatures.title2")} <br />
              {t("moreFeatures.title3")}
            </h2>
          </Col>
          <Col lg={7}>
            <Row className={style.featuresGrid}>
              <Col md={6}>
                <Feature
                  icon={<FiZap />}
                  title={t("moreFeatures.advancedWorkflows.title")}
                  description={t("moreFeatures.advancedWorkflows.description")}
                />
              </Col>
              <Col md={6}>
                <Feature
                  icon={<FiLayers />}
                  title={t("moreFeatures.whiteLabeled.title")}
                  description={t("moreFeatures.whiteLabeled.description")}
                />
              </Col>
              <Col md={6}>
                <Feature
                  icon={<FiPackage />}
                  title={t("moreFeatures.packageSigning.title")}
                  description={t("moreFeatures.packageSigning.description")}
                />
              </Col>
              <Col md={6}>
                <Feature
                  icon={<FiShield />}
                  title={t("moreFeatures.highTrustSignatures.title")}
                  description={t(
                    "moreFeatures.highTrustSignatures.description"
                  )}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
