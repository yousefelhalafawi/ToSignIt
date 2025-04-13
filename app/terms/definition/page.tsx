"use client";

import { Container, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import style from "./De.module.scss";
import CustomNavbar from "@/app/_components/layout/Navbar";
import Footer from "@/app/_components/layout/Footer";

export default function DefinitionsPage() {
  const { t } = useTranslation();

  return (
    <div className={style.definitionsPage}>
      {/* < /> */}
      <CustomNavbar />
      <div className={style.pageHeader}>
        <Container>
          <h1 className={style.pageTitle}>Définitions</h1>
          <p className={style.lastUpdate}>
            Dernière mise à jour : 26 janvier 2025
          </p>
        </Container>
      </div>

      <Container className={style.contentContainer}>
        <Card className={style.definitionsCard}>
          <Card.Body>
            <p className={style.introText}>
              Les expressions ci-dessous utilisées dans les CAU commençant par
              une majuscule auront la signification suivante :
            </p>

            <div className={style.definitionsList}>
              <div className={style.definitionItem}>
                <h3 className={style.termTitle}>« Abonné »</h3>
                <p>
                  désigne toute personne physique professionnelle exerçant à son
                  compte (aussi dénommé dans les CAU comme "Utilisateur
                  Propriétaire") ou toute personne morale ayant souscrit aux
                  Services, par l'intermédiaire de son représentant légal ou
                  d'une personne ayant le pouvoir de l'engager, en signant les
                  Conditions d'Abonnement et d'Utilisation.
                </p>
              </div>

              <div className={style.definitionItem}>
                <h3 className={style.termTitle}>« Abonnement »</h3>
                <p>désigne la souscription aux Services.</p>
              </div>

              <div className={style.definitionItem}>
                <h3 className={style.termTitle}>« Client »</h3>
                <p>
                  Personne morale ou personne physique agissant en qualité de
                  professionnel et souhaitant utiliser le Service de Signature
                  Electronique pour informer, valider, signer ou faire signer
                  des Documents électroniquement.
                </p>
              </div>

              <div className={style.definitionItem}>
                <h3 className={style.termTitle}>
                  « Accord de traitement des Données personnelles »
                </h3>
                <p>
                  désigne l'accord entre l'Utilisateur/l'Abonné et To Sign It
                  encadrant les Traitements des Données personnelles effectués
                  par To Sign It pour l'exécution des Services à la demande de
                  l'Abonné et/ou de l'Utilisateur.
                </p>
              </div>

              <div className={style.definitionItem}>
                <h3 className={style.termTitle}>« Application To Sign It »</h3>
                <p>
                  désigne l'application en ligne éditée par To Sign It et
                  accessible sur le Site en mode « SaaS » (Software as a
                  Service).
                </p>
              </div>

              <div className={style.definitionItem}>
                <h3 className={style.termTitle}>« API To Sign It »</h3>
                <p>
                  désigne l'interface de programmation d'application mise à la
                  disposition et créée par To Sign It et intégrée sur le système
                  informatique de l'Abonné.
                </p>
              </div>

              <div className={style.definitionItem}>
                <h3 className={style.termTitle}>« Certificat »</h3>
                <p>
                  désigne l'attestation électronique qui associe les attributs
                  du sujet, rendue infalsifiable par chiffrement par l'autorité
                  de certification qui l'a délivrée. Dans le contexte de la
                  signature électronique les attributs du sujet peuvent être des
                  attributs d'identification d'une personne physique, ou
                  l'identification légale d'une personne morale.
                </p>
              </div>

              <div className={style.definitionItem}>
                <h3 className={style.termTitle}>« Cessation d'activité »</h3>
                <p>
                  désigne l'arrêt définitif de l'activité d'une Partie, de
                  manière volontaire ou à la suite de l'ouverture d'une
                  procédure en vertu du droit applicable en matière de faillite
                  ou d'insolvabilité, et correspond à l'abandon de l'ensemble
                  des activités professionnelles. Les opérations de fusion
                  intra-groupe ou toute restructuration interne ne sont pas
                  considérées comme une Cessation d'activité. Une Cessation
                  d'activité est caractérisée par la radiation du RCS ou de tout
                  autre registre auquel serait enregistrée la Partie concernée,
                  la dissolution ou la liquidation de l'entreprise,
                  justificatifs à l'appui.
                </p>
              </div>

              {/* Add more definitions as needed */}
              <div className={style.definitionItem}>
                <h3 className={style.termTitle}>« Compte Utilisateur »</h3>
                <p>
                  désigne le compte personnel attaché à un Utilisateur lui
                  permettant d'avoir accès aux fonctionnalités des Services en
                  fonction de la souscription prise et de ses droits associés.
                </p>
              </div>

              <div className={style.definitionItem}>
                <h3 className={style.termTitle}>« Compte Organisation »</h3>
                <p>
                  désigne l'espace partagé entre Abonné et/ou Utilisateur
                  Administrateur.
                </p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </div>
  );
}
