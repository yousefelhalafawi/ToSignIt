"use client";

import { Container, Card } from "react-bootstrap";

import style from "./GeneralConditions.module.scss";
import Footer from "@/app/_components/layout/Footer";
import CustomNavbar from "@/app/_components/layout/Navbar";

export default function GeneralConditionsPage() {
  return (
    <div className={style.generalConditionsPage}>
      <CustomNavbar />
      <div className={style.pageHeader}>
        <Container>
          <h1 className={style.pageTitle}>
            CONDITIONS GÉNÉRALES DES SITES ET SERVICES TO SIGN IT
          </h1>
          <p className={style.lastUpdate}>
            Dernière mise à jour : 26 janvier 2025
          </p>
        </Container>
      </div>

      <Container className={style.contentContainer}>
        <Card className={style.generalConditionsCard}>
          <Card.Body>
            <div className={style.definitionItem}>
              <p>
                <strong className={style.termTitle}>AVIS IMPORTANT :</strong>{" "}
                LES PRÉSENTES CONDITIONS GÉNÉRALES CONTIENNENT UNE CLAUSE
                D’ARBITRAGE OBLIGATOIRE, DE RENONCIATION AUX PROCÈS DEVANT JURY
                ET AUX RECOURS COLLECTIFS RÉGISSANT LES LITIGES RÉSULTANT DE
                L’UTILISATION DES SERVICES TO SIGN IT. LADITE CLAUSE AFFECTE VOS
                DROITS RECONNUS PAR LA LOI TEL QUE PRÉVU PAR LA SECTION RELATIVE
                À L’ARBITRAGE OBLIGATOIRE ET DANS LA SECTION RELATIVE À LA
                RENONCIATION AUX ACTIONS DE GROUPE. VEUILLEZ LES LIRE
                ATTENTIVEMENT.
              </p>

              <p>
                Les présentes Conditions générales de services de To Sign It («
                Conditions ») régissent l’accès aux sites Web et services
                (collectivement, le « Site ») de To Sign It (« To Sign It » ou «
                Nous ») et leur utilisation par les Visiteurs du site («
                Visiteurs du site ») ainsi que par les personnes physiques ou
                morales qui achètent des services (« Services de To Sign It »)
                ou créent un compte (« Compte ») et leurs Utilisateurs autorisés
                (collectivement, les « Clients »). En utilisant le Site ou les
                Services de To Sign It, vous acceptez les présentes Conditions
                en tant que Client ou Visiteur du site.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>
                1. MISES À JOUR ET COMMUNICATIONS
              </h2>
              <div className={style.definitionItem}>
                <h3 className={style.termTitle2}>
                  1.1 Modifications des conditions générales
                </h3>
                <p>
                  Nous pouvons modifier les présentes Conditions ou toutes
                  autres dispositions applicables relatives à un Service de To
                  Sign It en vue de tenir compte des changements législatifs ou
                  des changements apportés aux Services. Nous publierons les
                  conditions modifiées sur le Site assorties d’une date de «
                  dernière mise à jour ». Veuillez consulter le site
                  régulièrement pour prendre connaissance en temps opportun de
                  toute modification. Si vous continuez d’utiliser les Services
                  après la prise d’effet des modifications, vous acceptez d’être
                  lié par les Conditions modifiées.
                </p>
              </div>
              <div className={style.definitionItem}>
                <h3 className={style.termTitle2}>
                  1.2 Communications électroniques
                </h3>
                <p>
                  Vous acceptez de recevoir toutes les communications, accords
                  et avis que nous fournissons en rapport avec les Services («
                  Communications »), notamment par e-mail, SMS, notifications
                  intégrées au produit ou en les affichant sur le Site ou via
                  les Services. Vous acceptez que ces communications répondent
                  aux exigences légales qui leur sont applicables.
                </p>
              </div>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>2. OBJET</h2>
              <p>
                Les présentes Conditions d’Abonnement et d’Utilisation (ci-après
                nommées « CAU ») ont pour objet de définir (i) les conditions
                d’abonnement et d’utilisation des Services de To Sign It et (ii)
                les droits et obligations de chaque Partie dans le cadre de
                l’Abonnement.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>3. DÉFINITIONS</h2>
              <p>
                Tous les termes en majuscules qui ne sont pas définis dans les
                présentes CAU ont la signification qui leur est donnée ici.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>4. ABONNEMENT</h2>
              <p>
                <strong className={style.termTitle2}>4.1</strong> Si vous
                utilisez To Sign It Signature, vous acceptez les conditions de
                l’Annexe relative à To Sign It Signature.
              </p>
              <p>
                <strong className={style.termTitle2}>4.2</strong> Le Service de
                Signature électronique est le service principal de To Sign It.
                Dès lors, l’Abonné reconnaît et accepte que toute souscription à
                des Services Supplémentaires nécessite au préalable un
                Abonnement valide au Service de Signature électronique.
              </p>
              <p>
                <strong className={style.termTitle2}>4.3</strong> L’Abonné et le
                Particulier reconnaissent (i) avoir vérifié l’adéquation des
                Services à leurs besoins et ceux des Utilisateurs ; (ii) avoir
                reçu de To Sign It toutes les informations et conseils
                nécessaires pour souscrire en connaissance de cause ; et (iii)
                que leur consentement aux CAU ne repose pas sur la mise à
                disposition d’une fonctionnalité des Services à venir ou d’une
                stratégie de développement de futurs produits.
              </p>
              <p>
                <strong className={style.termTitle2}>4.4</strong> L’Abonné est
                invité à souscrire aux Services en suivant les étapes de
                souscription sur l’Application To Sign It ou en signant un
                Devis. Il peut, à tout moment, commander de nouveaux Services,
                ajouter des Abonnements et/ou des Services via la Plateforme ou
                en acceptant un nouveau Devis.
              </p>
              <p>
                <strong className={style.termTitle2}>4.5</strong> En souscrivant
                aux Services, l’Abonné accepte les présentes CAU et renonce
                expressément à toutes autres conditions générales ou
                particulières, y compris d’éventuelles conditions générales
                d’achat. En cas de conflit entre les dispositions du Devis et
                les CAU, les dispositions des CAU prévaudront, sauf si le Devis
                contient des conditions particulières qui, dans ce cas,
                primeront.
              </p>
              <p>
                <strong className={style.termTitle2}>4.6</strong> To Sign It se
                réserve le droit de refuser une demande d’Abonnement pour motif
                légitime.
              </p>
              <p>
                <strong className={style.termTitle2}>4.7</strong> Dans le cadre
                de l’Abonnement, l’Abonné s’engage à :
              </p>
              <ul>
                <li>
                  Communiquer à To Sign It toutes les informations nécessaires à
                  la fourniture des Services, à la facturation et au paiement,
                  et à actualiser ces informations en cas de changement ;
                </li>
                <li>
                  Permettre l’accès à la Plateforme uniquement aux Utilisateurs
                  autorisés et informer To Sign It en cas de tentative
                  d’intrusion ;
                </li>
                <li>Assurer la coopération des Utilisateurs ;</li>
                <li>
                  Veiller à ce que les Données Abonné, Données Utilisateur, et
                  Données de Tiers signataire ne portent pas préjudice aux
                  droits des tiers et soient autorisées à être reproduites et
                  diffusées ;
                </li>
                <li>
                  Maintenir l’Abonnement au Service de Signature électronique
                  pendant toute la durée de l’Abonnement des Services
                  supplémentaires.
                </li>
              </ul>
              <p>
                <strong className={style.termTitle2}>4.8</strong> L'accès du
                Particulier au Service est limité au Plan gratuit. Tout passage
                vers un Plan payant implique la reconnaissance que le
                Particulier deviendra un Abonné et utilisera To Sign It
                exclusivement pour ses activités professionnelles.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>5. COMPTES UTILISATEURS</h2>
              <p>
                <strong className={style.termTitle2}>
                  5.1 Création des Comptes Utilisateurs
                </strong>
              </p>
              <p>
                Dans le cadre des Plans Payants, l’Abonné peut désigner un
                Utilisateur Propriétaire ou l’occuper lui-même. Chaque
                Utilisateur reçoit un email de confirmation avec un lien pour
                gérer ses Identifiants et ouvrir son compte. Pour accéder au
                Plan gratuit, l’Utilisateur doit créer un Compte Utilisateur,
                lire et accepter les CAU et valider son adresse email.
              </p>
              <p>
                Dans la gestion de son compte, l’Utilisateur s’engage à fournir
                des informations exactes, ne pas créer de fausse identité,
                mettre à jour ses données en cas de modification, conserver ses
                Identifiants secrets, et avertir To Sign It en cas d’utilisation
                non autorisée.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>6. GARANTIES</h2>
              <p>
                Chaque Utilisateur est responsable de l’utilisation des
                Services, du niveau de Signature électronique sélectionné et des
                Dossiers de preuve. L’Abonné garantit la qualité, l’exactitude
                et l’exhaustivité des données fournies et des Documents
                téléchargés ou sauvegardés sur la Plateforme.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>7. MAINTENANCES ET VERSIONS</h2>
              <p>
                <strong className={style.termTitle2}>7.1 Maintenance</strong>
              </p>
              <p>
                Des opérations de maintenance pourront être réalisées par To
                Sign It afin d’assurer le bon fonctionnement des Services. Les
                Parties feront leur possible pour minimiser la durée et les
                conséquences de ces opérations. L'inscription en ligne permet de
                recevoir des alertes en cas de maintenance.
              </p>
              <p>
                <strong className={style.termTitle2}>
                  7.2 Versions de la Plateforme
                </strong>
              </p>
              <p>
                L’Abonné ou le Particulier accepte que To Sign It puisse
                modifier l’infrastructure technique et mettre en œuvre des mises
                à jour ou de nouvelles versions de la Plateforme afin
                d’améliorer la qualité et les fonctionnalités des Services. Les
                mises à jour font partie intégrante des Services et sont
                soumises au Contrat.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>
                8. OBLIGATIONS, RESPONSABILITÉS ET GARANTIES DE TO SIGN IT
              </h2>
              <p>
                La Plateforme est fournie en mode « SaaS » standard. To Sign It
                n’offre aucune garantie au-delà des limites légales applicables,
                et s’engage à fournir les Services via des moyens techniques
                adaptés. En cas de défaillance, la partie victime devra prendre
                des mesures pour limiter le préjudice.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>
                9. PRIX – FACTURATION – MODALITÉS DE PAIEMENT
              </h2>
              <p>
                <strong className={style.termTitle2}>9.1 Prix</strong> –
                L’Abonné s’engage à payer les Coûts de Services figurant sur les
                factures électroniques, exprimés en devise du Devis et toutes
                taxes comprises.
              </p>
              <p>
                <strong className={style.termTitle2}>
                  9.2 Modification des prix
                </strong>{" "}
                – To Sign It peut modifier les tarifs, l’Abonné étant informé un
                mois avant l’entrée en vigueur des nouveaux tarifs et pouvant
                résilier le Contrat en cas de refus.
              </p>
              <p>
                <strong className={style.termTitle2}>9.3 Facturation</strong> –
                Les factures sont transmises par voie électronique via le Compte
                Utilisateur et par email selon la périodicité de l’Abonnement.
              </p>
              <p>
                <strong className={style.termTitle2}>
                  9.4 Modalités de paiement
                </strong>{" "}
                – Les paiements se font par prélèvement automatique à la date
                indiquée sur la facture. L’Abonné doit mettre à jour ses
                informations en cas de changement.
              </p>
              <p>
                <strong className={style.termTitle2}>
                  9.5 Incidents de paiement
                </strong>{" "}
                – En cas de retard, des intérêts de retard et une indemnité
                forfaitaire pour frais de recouvrement seront appliqués.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>
                10. PREREQUIS ET MISE À DISPOSITION DU SERVICE DE SIGNATURE
                ÉLECTRONIQUE
              </h2>
              <p>
                <strong className={style.termTitle2}>10.1</strong> Le service
                concerne la signature électronique de documents en face à face
                (applications mobiles ou web) ainsi que l’accès au tableau de
                bord administratif et au portail collaboratif.
              </p>
              <p>
                <strong className={style.termTitle2}>
                  10.2 Signature électronique
                </strong>{" "}
                – Plusieurs niveaux de Signature électronique sont proposés
                conformément au Règlement eIDAS. Le processus est décrit dans
                les Politiques de Certification.
              </p>
              <p>
                <strong className={style.termTitle2}>
                  10.3 Cachet électronique
                </strong>{" "}
                – Le Service de Cachet électronique permet de sceller un
                Document.
              </p>
              <p>
                <strong className={style.termTitle2}>
                  10.4 Dossier de preuve
                </strong>{" "}
                – Les Dossiers de preuve sont archivés pendant dix (10) ans et
                peuvent être restitués sur demande.
              </p>
              <p>
                <strong className={style.termTitle2}>
                  10.5 Horodatage électronique
                </strong>{" "}
                – Les horodatages lient la date et l’heure aux données,
                conformément au Règlement eIDAS.
              </p>
              <p>
                <strong className={style.termTitle2}>
                  10.6 Gestion des Documents
                </strong>{" "}
                – Les Documents sont conservés sur le Compte de l’Abonné ou de
                l’Utilisateur pendant la durée de l’Abonnement. To Sign It peut
                imposer des limites d’utilisation.
              </p>
              <p>
                <strong className={style.termTitle2}>
                  10.7 Construction du flux de signature
                </strong>{" "}
                – L’Abonné peut créer son propre flux de signature en suivant
                les étapes définies dans la Documentation et en fournissant les
                informations requises.
              </p>
              <p>
                <strong className={style.termTitle2}>
                  10.8 Service d’Archivage des Documents
                </strong>{" "}
                – Permet d’archiver les Documents signés pendant dix (10) ans,
                avec restitution selon la grille tarifaire.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>11. PROPRIÉTÉ INTELLECTUELLE</h2>
              <p>
                To Sign It détient tous les droits de Propriété Intellectuelle
                sur la Plateforme, les Services et les marques associées. Aucun
                droit n’est transféré par le Contrat.
              </p>
            </div>

            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>12. DURÉE</h2>
              <p>
                Le Contrat est conclu pour une durée indéterminée à compter de
                la Date d’entrée en vigueur et se renouvelle automatiquement,
                sauf résiliation selon les modalités prévues.
              </p>
            </div>

            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>
                13. PROTECTION DES DONNÉES PERSONNELLES
              </h2>
              <p>
                L’Abonné et/ou l’Utilisateur s’engagent à respecter l’Accord de
                traitement des données et à se conformer à la Politique de
                confidentialité de To Sign It.
              </p>
            </div>

            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>14. CONFIDENTIALITÉ</h2>
              <p>
                Les Parties s’engagent à préserver la confidentialité des
                Informations Communiquées et à ne pas les divulguer, sauf dans
                les cas prévus par le Contrat ou la loi.
              </p>
            </div>

            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>15. SUSPENSION</h2>
              <p>
                <strong className={style.termTitle2}>
                  15.1 Suspension avec préavis
                </strong>{" "}
                – To Sign It peut suspendre l’accès aux Services en cas de
                manquement contractuel ou incident de paiement, après mise en
                demeure restée sans effet pendant sept (7) jours.
              </p>
              <p>
                <strong className={style.termTitle2}>
                  15.2 Suspension sans préavis
                </strong>{" "}
                – To Sign It peut suspendre ou limiter l’accès sans préavis en
                cas de menace pour la sécurité ou l’image de la société.
              </p>
            </div>

            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>16. RÉSILIATION</h2>
              <p>
                <strong className={style.termTitle2}>
                  16.1 Résiliation par l’Abonné et/ou l’Utilisateur du Plan
                  gratuit
                </strong>{" "}
                – L’Abonné peut résilier le Contrat par email via{" "}
                <a href="mailto:unsubscribe@tosignit.com">
                  unsubscribe@tosignit.com
                </a>
                , en respectant un délai de préavis en fonction de la durée de
                l’Abonnement.
              </p>
              <p>
                <strong className={style.termTitle2}>
                  16.2 Résiliation par To Sign It
                </strong>{" "}
                – To Sign It peut résilier le Contrat, avec ou sans préavis, en
                cas de manquement ou d’incident de paiement.
              </p>
              <p>
                <strong className={style.termTitle2}>
                  16.3 Effet de la résiliation
                </strong>{" "}
                – La résiliation entraîne la suppression des accès aux Services
                et aux Documents.
              </p>
              <p>
                <strong className={style.termTitle2}>
                  16.4 Procédures collectives
                </strong>{" "}
                – En cas de cessation d’activité d’une Partie, le Contrat pourra
                être résilié après notification.
              </p>
            </div>

            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>17. CESSION DU CONTRAT</h2>
              <p>
                L’Abonné et To Sign It peuvent céder leurs droits et obligations
                sous réserve d’en informer l’autre Partie un (1) mois à
                l’avance.
              </p>
            </div>

            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>18. LIMITES DE RESPONSABILITÉ</h2>
              <p>
                La responsabilité de To Sign It est limitée aux dommages directs
                et prévisibles liés à l’inexécution fautive de ses obligations
                contractuelles, dans la limite des sommes payées par le Client
                au cours des douze (12) mois précédant l’événement.
              </p>
            </div>

            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>19. FORCE MAJEURE</h2>
              <p>
                Aucune Partie n’est responsable en cas de force majeure
                empêchant l’exécution de ses obligations. Si le cas persiste
                au-delà de trente (30) jours, le Contrat peut être résilié de
                plein droit.
              </p>
            </div>

            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>20. DIVERS</h2>
              <p>
                Les Parties garantissent disposer des compétences nécessaires
                pour conclure et exécuter le Contrat. Le Contrat ne crée pas de
                relation employé/employeur et, pour les professionnels, est régi
                par le Code de commerce. Les modifications du Contrat seront
                notifiées avec un préavis de trente (30) jours, sauf
                circonstances exceptionnelles.
              </p>
            </div>

            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>
                21. RÈGLEMENT AMIABLE - DROIT APPLICABLE ET ATTRIBUTION DE
                COMPÉTENCE
              </h2>
              <p>
                <strong className={style.termTitle2}>
                  21.1 Règlement amiable
                </strong>{" "}
                – Les Parties s’efforcent de régler à l’amiable tout différend
                relatif au Contrat avant d’engager une action contentieuse.
              </p>
              <p>
                <strong className={style.termTitle2}>
                  21.2 Droit applicable et attribution de compétence pour les
                  Abonnés
                </strong>{" "}
                – Pour les Abonnés et les Utilisateurs professionnels, les CAU
                sont soumis au droit français. En cas de litige, le différend
                sera soumis aux tribunaux compétents dans le ressort de la Cour
                d’appel de Paris.
              </p>
              <p>
                <strong className={style.termTitle2}>
                  21.3 Droit applicable et attribution de compétence pour les
                  Particulier
                </strong>{" "}
                – Pour les Particulier, les CAU sont soumis au droit de la
                juridiction de résidence, ou, le cas échéant, aux tribunaux
                compétents dans le ressort de la Cour d’appel de Paris.
              </p>
            </div>
            <div className={style.definitionItem}>
              <h2 className={style.termTitle}>22. RÉFÉRENCES</h2>
              <p>
                Les informations et documents référencés, y compris les liens
                hypertextes, font partie intégrante du Contrat.
              </p>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
}
