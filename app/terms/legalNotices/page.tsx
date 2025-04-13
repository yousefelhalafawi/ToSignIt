"use client";

import { Container, Card } from "react-bootstrap";

import style from "./LegalNotices.module.scss";
import CustomNavbar from "@/app/_components/layout/Navbar";
import Footer from "@/app/_components/layout/Footer";

export default function LegalNoticesPage() {
  return (
    <div className={style.legalNoticesPage}>
      <CustomNavbar />
      <div className={style.pageHeader}>
        <Container>
          <h1 className={style.pageTitle}>Mentions Légales</h1>
          <p className={style.lastUpdate}>
            Dernière mise à jour : 26 janvier 2025
          </p>
        </Container>
      </div>

      <Container className={style.contentContainer}>
        <Card className={style.legalCard}>
          <Card.Body>
            <h2 className={style.termTitle}>Éditeur du Site – Hébergeur</h2>
            <p>
              Ce site est la propriété de la SASU AG TECH, société au capital
              social de 100€, immatriculée au RCS de Evry sous le numéro 941 063
              976, dont le siège social se situe au 2 allee Louis Aragon, 91000
              Evry Courcouronnes, France.
            </p>
            <p>Numéro de la TVA intracommunautaire : 00 000 000 000 00.</p>

            <h2 className={style.termTitle}>Contact</h2>
            <p>
              To Sign It
              <br />
              (+33) 6 19 09 83 44
              <br />
              contact@tosignit.com
            </p>

            <h2 className={style.termTitle}>Conditions d'utilisation</h2>
            <p>
              Toute personne qui accède au site de To Sign It s’engage à
              respecter les présentes conditions d’utilisation.
            </p>
            <p>
              To Sign It décline toute responsabilité quant au contenu, à
              l’exactitude, à la fiabilité, à la précision, à la pertinence et à
              l’exhaustivité des informations et données diffusées sur le
              présent site, sous quelque forme que ce soit (liens hypertexte,
              encarts de cotation, fichiers, publicité, etc…). Notamment, To
              Sign It ne pourra voir sa responsabilité engagée du fait d’erreurs
              ou de retards dans la transmission desdites informations.
            </p>
            <p>
              Toutes les informations et données diffusées sur le présent site
              ne sont fournies qu’à titre indicatif et ne dispensent pas
              l’utilisateur de procéder à leur vérification et de les utiliser
              avec discernement et esprit critique. To Sign It ne pourra être
              tenu pour responsable des décisions, quelles que soient leur
              nature, prises par l’utilisateur sur la base des informations
              diffusées sur ce site.
            </p>
            <p>
              Les offres et devis proposés par To Sign It sur le site ne
              sauraient avoir de caractère contractuel et ne lient pas To Sign
              It. Il appartient à l’utilisateur de se mettre en contact
              directement avec un conseiller.
            </p>
            <p>
              To Sign It décline toute responsabilité quant aux difficultés
              techniques que pourrait rencontrer l’utilisateur, quelle qu’en
              soit la cause, notamment en cas de bogues, d’inadéquation du
              terminal utilisé, de perte d’intégrité de l’information sur le
              réseau ou de tout risque lié à la sécurité du réseau.
            </p>
            <p>
              To Sign It se réserve le droit d’apporter toutes modifications et
              améliorations qu’il jugera nécessaires pour le bon fonctionnement
              de ses services.
            </p>

            <h2 className={style.termTitle}>
              En ce qui concerne vos données personnelles
            </h2>
            <p>
              Les informations recueillies sur ce site peuvent faire l’objet
              d’un traitement informatique destiné à répondre à votre demande.
            </p>
            <p>
              Les données à caractère personnel collectées par To Sign It sont
              conservées pour la durée nécessaire à la réalisation des finalités
              précisées, augmentée des délais légaux ou de prescription en
              vigueur.
            </p>
            <p>
              Ces données sont traitées et hébergées en France et dans l’Union
              Européenne. Elles sont destinées aux services internes de To Sign
              It, à ses partenaires, sous-traitants, établissements bancaires et
              postaux, ainsi qu’aux distributeurs éventuels des services
              proposés.
            </p>
            <p>
              Toute reproduction ou représentation, totale ou partielle, de ces
              éléments sans l’autorisation expresse de To Sign It est interdite
              et constituerait une contrefaçon sanctionnée par le Code de la
              propriété intellectuelle.
            </p>
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </div>
  );
}
