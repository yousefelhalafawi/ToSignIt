"use client";

import { Container, Row, Col, Form, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BiUser } from "react-icons/bi";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import CompanyProfile from "@/app/_components/dashboard/company/CompanyProfile";
import { getCompanyData } from "@/app/_redux/slices/companySlice";
import LoadingComponent from "@/app/_components/common/LoadingComponent";

export default function ProfileSettings() {
  const { profileData } = useSelector((state: any) => state.authSlice);
  const { loading } = useSelector((state: any) => state.companySlice);
  const dispatch = useDispatch<any>();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getCompanyData());
  }, [dispatch]);

  const currentDate = new Date();
  const monthNames = [
    t("months.january"),
    t("months.february"),
    t("months.march"),
    t("months.april"),
    t("months.may"),
    t("months.june"),
    t("months.july"),
    t("months.august"),
    t("months.september"),
    t("months.october"),
    t("months.november"),
    t("months.december"),
  ];

  function timeAgo(dateString: string) {
    const now: any = new Date();
    const date: any = new Date(dateString);
    const diffMs = now - date;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (days === 0) {
      return t("time.today");
    } else if (days === 1) {
      return t("time.yesterday");
    } else if (days < 7) {
      return t("time.daysAgo", { count: days });
    } else if (weeks < 4) {
      return t("time.weeksAgo", { count: weeks });
    } else if (months < 12) {
      return t("time.monthsAgo", { count: months });
    } else {
      return t("time.yearsAgo", { count: years });
    }
  }

  return (
    <Container
      fluid
      className="p-4 d-flex flex-column justify-content-between h-100"
    >
      {loading && (
        <div className="overlay">
          <LoadingComponent />
        </div>
      )}
      <Row className="mb-4">
        <Col>
          <h1 className="h3 mb-0">
            {t("profile.greeting", { name: profileData.userName })}
          </h1>
          <p className="main-color">
            {monthNames[currentDate.getUTCMonth()]} , {currentDate.getDate()}
          </p>
        </Col>
        <Col xs="auto" className="d-flex align-items-start ">
          <div className="text-start me-2">
            <p className="mb-0 fw-bold">{profileData.userName}</p>
            <p className="text-muted small">{profileData.jobTitle}</p>
          </div>
          <BiUser size={40} />
        </Col>
      </Row>

      <CompanyProfile />

      <Col xs={12}>
        <Form.Group>
          <Form.Label>{t("profile.myEmail")}</Form.Label>
          <Card className="p-3 bg-light rounded mb-2 d-flex flex-row align-items-center gap-2">
            <div className="bg-primary rounded p-2 text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex-grow-1">
              <div>{profileData.email}</div>
              <small className="text-muted">
                {timeAgo(profileData.createdAt)}
              </small>
            </div>
          </Card>
        </Form.Group>
      </Col>
    </Container>
  );
}
