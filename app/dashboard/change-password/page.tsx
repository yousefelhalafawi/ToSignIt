"use client";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { BiUser } from "react-icons/bi";
import { useState } from "react";
import EditProfile from "@/app/_components/dashboard/profile/EditProfile";
import ProfileView from "@/app/_components/dashboard/profile/VewProfile";
import ChangePassword from "@/app/_components/dashboard/profile/ChangePassword";
import { useTranslation } from "react-i18next";

export default function ProfileSettings() {
  const { t } = useTranslation();
  const { profileData } = useSelector((state: any) => state.authSlice);
  const currentDate = new Date();
  // Retrieve localized month names from translation (returns an array)
  const monthNames = t("profileSettings.monthNames", {
    returnObjects: true,
  }) as string[];

  const timeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (days === 0) {
      return t("profileSettings.today");
    } else if (days === 1) {
      return t("profileSettings.yesterday");
    } else if (days < 7) {
      return t("profileSettings.daysAgo", { count: days });
    } else if (weeks < 4) {
      return t("profileSettings.weeksAgo", { count: weeks });
    } else if (months < 12) {
      return t("profileSettings.monthsAgo", { count: months });
    } else {
      return t("profileSettings.yearsAgo", { count: years });
    }
  };

  return (
    <Container
      fluid
      className="p-4 d-flex flex-column justify-content-between h-100"
    >
      <Row className="mb-4">
        <Col>
          <h1 className="h3 mb-0">
            {t("profileSettings.greeting", { name: profileData.userName })}
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
      <Row className="mb-4">
        <ChangePassword />
      </Row>
      <Row></Row>
    </Container>
  );
}
