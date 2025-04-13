"use client";

import { Container, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import style from "./PrivacyPolicy.module.scss";
import CustomNavbar from "@/app/_components/layout/Navbar";
import Footer from "@/app/_components/layout/Footer";

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();

  return (
    <div className={style.privacyPolicyPage}>
      <CustomNavbar />
      <div className={style.pageHeader}>
        <Container>
          <h1 className={style.pageTitle}>Politique de confidentialité</h1>
          <p className={style.lastUpdate}>
            Dernière mise à jour : 26 janvier 2025
          </p>
        </Container>
      </div>

      <Container className={style.contentContainer}>
        <Card className={style.privacyCard}>
          <Card.Body>
            <div className={style.definitionItem}>
              <p>
                Chez To Sign It, on pense que la confiance est essentielle.
                Alors, pour la conserver, il nous semble important de vous aider
                à comprendre nos pratiques en matière de protection de données
                personnelles.
              </p>
              <p>
                Dans le cadre de votre utilisation de notre Site, de votre accès
                à notre Plateforme et de l’utilisation de nos Services, nous
                sommes amenés à recueillir en qualité de Responsable de
                traitement, des Données Personnelles vous concernant.
              </p>
              <p>
                Dans ce cadre, nous nous engageons à respecter la réglementation
                européenne sur la protection des Données Personnelles, en
                particulier le RGPD. Nous disposons pour cela d’une équipe
                dédiée, composée d’un délégué à la protection des données, d’une
                équipe juridique et d’une équipe sécurité.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}> 1. Consentement </h2>

              <p>
                En consultant le Site ou en utilisant les Produits et Services
                proposés par To Sign It et/ou ses filiales, vous acceptez les
                règles de collecte et d’utilisation des informations décrites
                ci-après.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>2. Responsable de traitement </h2>

              <p>
                Les données à caractère personnel sont collectées par la société
                To Sign It pour elle-même et pour le compte de ses filiales.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>
                3. Données Personnelles collectées
              </h2>

              <p>
                En utilisant notre Site et notre Plateforme, vous êtes amenés à
                nous transmettre, directement ou indirectement, des informations
                dont certaines sont de nature à vous identifier directement ou
                indirectement et constituent de ce fait des Données
                Personnelles.
              </p>
              <p>
                Ces informations peuvent contenir notamment les données des
                catégories suivantes :
              </p>
              <ul>
                <li>
                  Des données d’identification et/ou de contact telles que vos
                  nom et prénom(s), adresse postale, email, numéro de téléphone,
                  votre nom d’Utilisateur de la Plateforme, les identifiants
                  techniques qui vous sont assignés, votre voix et votre image
                  lorsqu’un enregistrement téléphonique ou vidéo est réalisé ;
                </li>
                <li>
                  Des données d’identité telles que des vidéos et/ou des images
                  de votre document d'identité et de votre visage (par exemple,
                  si vous êtes un signataire pour la Signature électronique
                  avancée ou qualifiée) ou une copie scannée de votre document
                  d'identité (par exemple, si vous êtes un représentant légal
                  effectuant un Cachet électronique avancé) ;
                </li>
                <li>
                  Des données extraites du document d’identité telles que votre
                  prénom, votre nom, votre date de naissance, votre lieu de
                  naissance, votre nationalité, la validité de votre document
                  d'identité et d'autres informations relatives à votre
                  identité, notamment l’identifiant numérique du document, le
                  type de document, la date d’expiration, le MRZ, le pays
                  d'émission, le statut de validité du document d’identité ;
                </li>
                <li>
                  Des données relatives à votre activité professionnelle telles
                  que l’intitulé de votre poste, votre secteur d’activité, le
                  nom de votre entreprise et sa taille, votre intention d’usage
                  de nos Services ;
                </li>
                <li>
                  Des données de transactions telles que le numéro de votre
                  carte de crédit et votre relevé d’identité bancaire, utilisées
                  pour le paiement de vos souscriptions ;
                </li>
                <li>
                  Des données de connexion et d’utilisation telles que votre
                  adresse IP, le type et la version du navigateur, le système
                  d’exploitation utilisé, les pages visitées et le temps passé,
                  les actions réalisées, les configurations sélectionnées, le
                  jeton et clés API, ainsi que l’horodatage des actions ;
                </li>
                <li>
                  Des données de signature telles que l’identifiant numérique
                  des documents signés, des demandes de signature, les données
                  contenues dans les certificats, le hash et toutes les
                  métadonnées associées.
                </li>
              </ul>
              <p>
                Lors de la collecte directe de vos Données Personnelles, vous
                serez informés si certaines données doivent être obligatoirement
                renseignées ou si elles sont facultatives. A défaut de
                renseigner ces informations obligatoires, l’exécution de la
                demande pourra s’avérer impossible.
              </p>
              <p>
                Certaines de ces Données Personnelles sont collectées via les
                cookies ou traceurs présents sur notre Site ou notre Plateforme.
                Pour en savoir plus, vous pouvez consulter à tout moment notre
                Politique de cookies.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>
                4. Comment collectons-nous vos Données Personnelles ?
              </h2>
              <p>
                Les Données Personnelles traitées par To Sign It sont collectées
                via différents canaux :
              </p>
              <ul>
                <li>
                  <strong>Directement auprès de vous :</strong> lors de la
                  création de votre Compte Organisation/Utilisateur ou de
                  l’utilisation des Services, via les formulaires de contact ou
                  tout autre document disponibles en ligne sur le Site ou
                  fournis lors d’évènements extérieurs, ou lors de vos échanges
                  téléphoniques avec To Sign It.
                </li>
                <li>
                  <strong>Des sources publiques :</strong> To Sign It peut
                  utiliser des Données Personnelles disponibles publiquement.
                </li>
                <li>
                  <strong>Via des sources tierces :</strong> To Sign It peut
                  faire appel aux services de prestataires spécialisés afin
                  d’accéder à des bases de données à jour.
                </li>
                <li>
                  <strong>Automatiquement :</strong> pour établir des
                  statistiques de fréquentation de notre Site et/ou de notre
                  Plateforme, et pour effectuer des campagnes de publicité
                  ciblées.
                </li>
              </ul>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}> 5. Sécurité des données </h2>
              <p>
                Nous avons pris toutes les mesures appropriées afin de préserver
                les données personnelles contre tout accès non autorisé,
                traitement illicite, perte, endommagement accidentel ou
                destruction non autorisée. Un serveur sécurisé est mis à
                disposition pour accéder aux informations de votre compte,
                garantissant le chiffrement de vos informations avant leur
                transmission.
              </p>
              <p>
                Nous nous assurons également que les informations fournies sont
                exactes, à jour et conservées en toute sécurité pendant la durée
                nécessaire. L’accès aux données personnelles est restreint aux
                collaborateurs de To Sign It et de ses prestataires, qui ont été
                formés à respecter la confidentialité.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}> 6. Exploitation des données </h2>

              <p>
                Les Données Personnelles de nos Visiteurs et
                Utilisateurs/Abonnés sont strictement confidentielles et peuvent
                être traitées par les employés de To Sign It et ses filiales,
                uniquement pour réaliser les finalités de la présente Politique.
              </p>
              <p>
                Nous ne transmettons pas vos Données Personnelles à des tiers,
                sauf pour :
              </p>
              <ul>
                <li>
                  Nos prestataires d’hébergement pour la maintenance et
                  l’hébergement des bases de données ;
                </li>
                <li>
                  Nos fournisseurs de services, sous-traitants et partenaires
                  pour l’accès aux services demandés, l’exécution d’une
                  transaction ou la réponse à vos demandes d’assistance.
                </li>
              </ul>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>
                7. Communication des données personnelles
              </h2>

              <p>
                Nous ne vendons ni ne louons aucune donnée à caractère personnel
                à des tiers. Nous partageons les informations uniquement avec
                nos sous-traitants et partenaires, qui reçoivent seulement les
                données nécessaires à la prestation du service et ne sont pas
                autorisés à les utiliser autrement. Nous pouvons toutefois
                communiquer des données personnelles pour nous conformer à la
                législation ou répondre à des demandes d’autorités publiques.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>«8. Hébergement des données </h2>
              <p>
                Les données relatives aux Produits et Services proposés par To
                Sign It et ses filiales sont hébergées exclusivement dans
                l’Espace Économique Européen.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>
                9. Quels sont vos droits sur vos Données Personnelles ?
              </h2>
              <p>To Sign It garantit l’exercice effectif de vos droits :</p>
              <ul>
                <li>Avoir accès à vos Données Personnelles ;</li>
                <li>
                  Rectifier les Données Personnelles inexactes vous concernant ;
                </li>
                <li>Obtenir l’effacement de vos Données Personnelles ;</li>
                <li>Restreindre le traitement de vos Données Personnelles ;</li>
                <li>
                  Retirer votre consentement aux traitements de vos Données
                  Personnelles ;
                </li>
                <li>
                  Vous opposer au traitement de vos Données Personnelles ;
                </li>
                <li>
                  Obtenir une copie de vos Données Personnelles (droit à la
                  portabilité des données) ;
                </li>
                <li>
                  Définir des directives relatives à la conservation,
                  l’effacement et la communication de vos Données Personnelles
                  après votre décès.
                </li>
              </ul>
              <p>
                Certaines exceptions peuvent s’appliquer, notamment concernant
                la rectification ou la suppression du dossier de preuve et des
                résultats de la vérification d’identité, ainsi que l’accès aux
                données relatives aux vérifications d’identité.
              </p>
              <p>
                Vous pouvez exercer ces droits en complétant le formulaire
                disponible sur notre site. Nous pourrons vous demander des
                informations supplémentaires pour vérifier votre identité. Vous
                pouvez également accéder et modifier vos Données Personnelles en
                vous connectant à votre Compte Utilisateur. En cas de réponse
                insatisfaisante, vous pouvez introduire une réclamation auprès
                de l’autorité nationale compétente. En France, adressez-vous à
                la CNIL via{" "}
                <a
                  href="https://www.cnil.fr/fr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  son site web
                </a>
                .
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>
                10. Modifications de la présente Politique de confidentialité
              </h2>
              <p>
                Nous nous réservons le droit de modifier cette Politique de
                confidentialité pour la rendre conforme aux évolutions
                législatives ou réglementaires. En cas de modification, la
                Politique révisée sera mise en ligne sur le Site avec la date de
                la dernière mise à jour.
              </p>
              <p>
                Veuillez consulter régulièrement le Site pour rester informé de
                tout changement ou mise à jour.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>11. Cookies</h2>
              <p>
                To Sign It s’engage à protéger la vie privée des visiteurs et
                clients. Nous n'autorisons pas la divulgation d’informations à
                des tiers sans autorisation.
              </p>
              <p>
                <strong>Qu’est-ce qu’un cookie ?</strong> Un cookie est un petit
                fichier texte envoyé à votre navigateur via notre Site,
                permettant d’enregistrer des informations sur votre visite.
              </p>
              <p>
                <strong>Pourquoi utilisons-nous des cookies ?</strong> Pour
                offrir une meilleure expérience de navigation, personnaliser les
                informations affichées et sécuriser la connexion.
              </p>
              <p>
                <strong>Quels types de cookies utilisons-nous ?</strong>
              </p>
              <ul>
                <li>
                  <strong>Les cookies techniques :</strong> Ils n’ont aucun
                  impact sur vos données personnelles.
                </li>
                <li>
                  <strong>Les cookies d’information ciblée :</strong> Ils
                  permettent d’afficher des informations personnalisées, de
                  limiter le nombre d’apparitions de chaque information et de
                  mesurer l’efficacité d’une campagne d’information.
                </li>
              </ul>
              <p>
                Vous pouvez refuser l’enregistrement des cookies en configurant
                les préférences de votre navigateur, bien que cela puisse
                limiter l’accès à certaines fonctionnalités du Site.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>12. Vie privée des enfants</h2>
              <p>
                Nos Services ne sont ni conçus pour ni offerts aux personnes
                âgées de moins de 18 ans ou à tout autre âge défini par la loi
                applicable. Nous ne collectons pas de Données Personnelles de
                mineurs. Si vous êtes mineur, veuillez ne pas utiliser nos
                Services.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>13. Les formulaires</h2>
              <p>
                Certains formulaires sur le Site ne sont pas obligatoires. Vous
                pouvez choisir de ne pas les remplir, sauf lorsque c’est
                nécessaire pour répondre à votre demande ou pour la gestion de
                vos contrats. En cochant la case prévue, vous acceptez
                l’utilisation de vos données personnelles à des fins de
                prospection commerciale.
              </p>
            </div>

            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>14. Durée de conservation</h2>
              <p>
                Nous ne conservons pas vos données personnelles ou les
                informations de navigation au-delà de la durée nécessaire aux
                finalités du traitement concerné. Les données de navigation sont
                conservées pendant un maximum de 6 mois, conformément aux
                recommandations de la CNIL. Pour les données de recrutement, la
                durée est de deux ans après le dernier contact avec le candidat.
              </p>
            </div>
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </div>
  );
}
