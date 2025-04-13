"use client";

import { Container, Card } from "react-bootstrap";

import style from "./CookiesManagementPage.module.scss";
import CustomNavbar from "@/app/_components/layout/Navbar";
import Footer from "@/app/_components/layout/Footer";

export default function CookiesManagementPage() {
  return (
    <div className={style.cookiesManagementPage}>
      <CustomNavbar />
      <div className={style.pageHeader}>
        <Container>
          <h1 className={style.pageTitle}>Gestion des cookies</h1>
          <p className={style.lastUpdate}>
            Dernière mise à jour : 26 janvier 2025
          </p>
        </Container>
      </div>

      <Container className={style.contentContainer}>
        <Card className={style.cookiesCard}>
          <Card.Body>
            <p>
              Nous et nos partenaires plaçons des cookies, accédons et utilisons
              des informations non sensibles de votre appareil pour améliorer
              nos produits et personnaliser les publicités et autres contenus
              sur ce site web. Vous pouvez accepter tout ou partie de ces
              opérations. Pour en savoir plus sur les cookies, nos partenaires
              et la manière dont nous utilisons vos données, pour revoir vos
              options ou ces opérations pour chaque partenaire, consultez notre
              politique de confidentialité.
            </p>
            <p>
              <strong className={style.termTitle}>Vous autorisez</strong>
            </p>
            <ul>
              <li>Develop and improve services</li>
              <li>
                Understand audiences through statistics or combinations of data
                from different sources
              </li>
              <li>Measure content performance</li>
              <li>Measure advertising performance</li>
              <li>Use profiles to select personalised content</li>
              <li>Create profiles to personalise content</li>
              <li>Use profiles to select personalised advertising</li>
              <li>Create profiles for personalised advertising</li>
              <li>Use limited data to select advertising</li>
              <li>Store and/or access information on a device</li>
            </ul>
            <p>
              En donnant votre consentement aux fins ci-dessus, vous autorisez
              également ce site Web et ses partenaires à effectuer les
              traitements de données suivants : Diffuser et présenter de la
              publicité et du contenu, Assurer la sécurité, prévenir et détecter
              les fraudes et corriger les erreurs, Relier différents appareils,
              Associer et combiner des données provenant d'autres sources de
              données, et Enregistrer et communiquer les choix de
              confidentialité.
            </p>
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </div>
  );
}
