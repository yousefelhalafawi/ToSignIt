import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import style from "./home.module.scss";
import { useTranslation } from "react-i18next";

export default function BriefCard() {
  const { t } = useTranslation();

  return (
    <section className={style.briefSection}>
      <Container className={style.brief}>
        <Row className="align-items-center">
          <Col lg={7}>
            <h4 className={style.briefPhrase}>
              {t("briefCard.title1")}
              <span className={style.highlight}> {t("briefCard.title2")}</span>
            </h4>
            <p>
              {t("briefCard.title3")}
              <span className={style.highlight}>{t("briefCard.title4")}</span>
              {t("briefCard.title5")}
              <span className={style.highlight}>
                {" "}
                &nbsp; {t("briefCard.title6")}
              </span>
              {t("briefCard.title7")}&nbsp;
              <span className={style.highlight}> {t("briefCard.title8")}</span>
            </p>
          </Col>
          <Col lg={5} className={style.imageCol}>
            <div className={style.briefImage}>
              <Image
                src="/assets/images/d7.jpg"
                alt="Secure digital signing process"
                width={500}
                height={300}
                layout="responsive"
                className={style.mainImage}
              />
              <Image
                src="/assets/images/Vector8.png"
                alt="Decorative element"
                width={200}
                height={200}
                className={style.briefPositioned}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
