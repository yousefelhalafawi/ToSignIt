"use client";

import Image from "next/image";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/app/_redux/store";
import { Logout } from "@/app/_redux/slices/authSlice";
import logo from "../../../public/assets/images/logoWord.png";
import style from "./style/Navbar.module.scss";
import { useTranslation } from "react-i18next";

function CustomNavbar() {
  const { token } = useSelector((state: RootState) => state.authSlice);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Navbar expand="lg" className={style.navBar}>
      <Container>
        <Navbar.Brand href="/">
          <Image
            width={120}
            height={60}
            src={logo}
            alt={t("navbar.logoAlt")}
            priority
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {token ? (
              <>
                <Nav.Link href="/news" className={style.navLink}>
                  {t("navbar.news")}
                </Nav.Link>
                <Nav.Link href="/dashboard" className={style.navLink}>
                  {t("navbar.dashboard")}
                </Nav.Link>
                <Button
                  variant="outline-primary"
                  className={style.navButton}
                  onClick={() => {
                    dispatch(Logout());
                    router.push("/");
                  }}
                >
                  {t("navbar.logout")}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-primary"
                  href="/login"
                  className={`${style.navButton} me-2`}
                >
                  {t("navbar.login")}
                </Button>
                <Button
                  variant="primary"
                  href="/register"
                  className={style.navButton}
                >
                  {t("navbar.signUp")}
                </Button>
              </>
            )}
            {/* Language selector using a plain HTML select element */}
            <select
              value={i18n.language}
              onChange={handleLanguageChange}
              style={{
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                padding: "8px 32px 8px 12px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#333",
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                cursor: "pointer",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                backgroundImage:
                  "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 8px center",
                backgroundSize: "16px",
                transition: "all 0.2s ease",
                margin: "0 12px",
              }}
            >
              <option value="en" style={{ padding: "8px", fontSize: "14px" }}>
                EN
              </option>
              <option value="fr" style={{ padding: "8px", fontSize: "14px" }}>
                FR
              </option>
            </select>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
