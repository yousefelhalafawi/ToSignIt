import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import style from "./home.module.scss";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_redux/store";
import { useTranslation } from "react-i18next";

export default function SignDashboard() {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    authSlice: { token },
  } = useSelector((state: RootState) => state);
  return (
    <section className={style.signDashboard}>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className={style.contentCol}>
            <div className={style.content}>
              <h2 className={style.title}>{t("signDashboard.title")}</h2>
              <p className={style.description}>
                {t("signDashboard.description")}
              </p>
              <button
                className={style.ctaButton}
                onClick={() => {
                  router.push(token ? "/dashboard" : "/register");
                }}
              >
                {t("signDashboard.button")}
                <FaArrowRight className={style.arrowIcon} />
              </button>
            </div>
          </Col>
          <Col lg={6} className={style.imageCol}>
            <div className={style.imageWrapper}>
              <Image
                src="/assets/images/NewD.png"
                alt={t("signDashboard.dashboardImageAlt")}
                fluid
                className={style.dashboardImage}
              />
              <div className={style.decorativeElement1}></div>
              <div className={style.decorativeElement2}></div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
