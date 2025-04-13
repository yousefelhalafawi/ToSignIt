"use client";
import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { BiUser } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import MainRequests from "../_components/dashboard/requests/MainRequests";
import withAuthHOC from "../_Auth/wihAuth";

const DashboardPage = () => {
  const { profileData, userSignature } = useSelector(
    (state: any) => state.authSlice
  );
  const currentDate = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const router = useRouter();

  return (
    <div>
      <Container fluid className="p-4">
        {/* Header Row */}
        <Row className="mb-4">
          <Col>
            <h1 className="h3 mb-0 text-capitalize">
              Hello, {profileData.userName}
            </h1>
            <p className="text-main">
              {monthNames[currentDate.getUTCMonth()]} , {currentDate.getDate()}
            </p>
          </Col>
          <Col xs="auto" className="d-flex align-items-start">
            <BiUser size={40} color="#00a47b" />
            <div className="text-start ms-2 text-capitalize">
              <p className="mb-0 fw-bold">{profileData.userName}</p>
              <p className="text-muted small">{profileData.jobTitle}</p>
            </div>
          </Col>
        </Row>

        {/* Main Content Row */}
        <Row>
          {/* Left Half - Requests */}
          <Col md={12}>
            <MainRequests />
          </Col>

          {/* Right Half - Signature and Messages */}
          <Col md={12}>
            {/* Signature Section */}
            <div className={userSignature?.userSignature ? "" : "d-none"}>
              <h3 className="h5 fw-bold mb-4">Signature</h3>
              <Card className="mb-4 borderCard">
                <Card.Body style={{ height: "30vh", overflowY: "auto" }}>
                  <div className="h-100 d-flex justify-content-center">
                    <Image
                      src={userSignature?.userSignature}
                      alt="Signature"
                      className="object-contain"
                      height="100%"
                      // onClick={() => router.push("/dashboard/signature")}
                      // style={{ cursor: "pointer" }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withAuthHOC(DashboardPage, []);
