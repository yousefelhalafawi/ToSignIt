"use client";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import style from "./style/Footer.module.scss";
import { useTranslation } from "react-i18next";

// Legal links from the image
const legalLinks = [
  {
    text: "CONDITIONS GÉNÉRALES DES SITES ET SERVICES",
    href: "/terms/generalConditions",
  },
  { text: "Définitions", href: "/terms/definition" },
  { text: "Gestion des cookies", href: "/terms/legalNotices" },
  { text: "Mentions Legales", href: "/terms/legalNotices" },
  {
    text: "Politique de confidentialité",
    href: "/terms/privacyPolicy",
  },
];

export default function Footer() {
  const { t, i18n } = useTranslation();
  const socialLinks = [
    {
      icon: <FaFacebookF />,
      href: `https://www.facebook.com/profile.php?id=61574060054165&locale=${i18n.language}`,
    },
    { icon: <FaXTwitter />, href: "https://x.com/ToSignIt" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/to.sign.it/" },
    {
      icon: <FaLinkedinIn />,
      href: "https://www.linkedin.com/company/to-sign-it",
    },
    { icon: <FaYoutube />, href: "https://www.youtube.com/@ToSignIt" },
    { icon: <FaTiktok />, href: "https://www.tiktok.com/@tosignit" },
  ];

  // Define useful links within the component so we can use translations.
  const usefulLinks = [
    { text: t("footer.pricing"), href: "/dashboard/subscriptions" },
    { text: t("footer.contactUsTitle"), href: "/contact-us" },
    { text: t("footer.news"), href: "/news" },
  ];

  return (
    <footer className={style.footer}>
      <Container>
        <Row className={style.mainContent}>
          <Col lg={4} md={6} className={style.companyInfo}>
            <Image
              src="/assets/images/logo.png"
              alt={t("footer.logoAlt")}
              width={60}
              height={60}
            />
            <p className={style.companyDescription}>
              {t("footer.companyDescription")}
            </p>
            <div className={style.socialLinks}>
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  target="_blank"
                  href={link.href}
                  className={style.socialIcon}
                  aria-label={t("footer.visitSocial", {
                    social: link.icon.type.name.replace("Fa", ""),
                  })}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </Col>
          <Col lg={2} md={6} className={style.linksColumn}>
            <h6 className={style.columnTitle}>
              {t("footer.usefulLinksTitle")}
            </h6>
            <ul className={style.linksList}>
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col lg={3} md={6} className={style.linksColumn}>
            <h6 className={style.columnTitle}>{t("footer.contactUsTitle")}</h6>
            <ul className={style.contactList}>
              <li>
                <FaMapMarkerAlt className={style.contactIcon} />
                <span>{t("footer.address")}</span>
              </li>
              <li>
                <FaEnvelope className={style.contactIcon} />
                <a href="mailto:support@tosignit.com">support@tosignit.com</a>
              </li>
              <li>
                <FaPhone className={style.contactIcon} />
                <a href="tel:+33619098344">+33 6 19 09 83 44</a>
              </li>
            </ul>
          </Col>
          <Col lg={3} md={6} className={style.newsletterColumn}>
            <h6 className={style.columnTitle}>{t("footer.newsletterTitle")}</h6>
            <p>{t("footer.newsletterText")}</p>
          </Col>
        </Row>
      </Container>

      <div className={style.bottomBar}>
        <Container>
          <p style={{ marginBottom: "1rem" }}>
            © {2025} To SignIT. All rights reserved.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              fontSize: "0.85rem",
            }}
          >
            {legalLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                style={{
                  color: "#fff",
                  opacity: 0.8,
                  transition: "all 0.3s ease",
                }}
                className={style.legalLink}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
