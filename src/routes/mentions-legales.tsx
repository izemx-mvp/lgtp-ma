import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/config/site";
import { InfoTable, LegalPage, type LegalSection } from "@/components/site/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    ...pageHead({
      title: "Mentions légales",
      description: "Informations légales relatives au site LGTP : éditeur, hébergement, propriété intellectuelle et responsabilité.",
      path: "/mentions-legales",
    }),
    links: [{ rel: "canonical", href: "/mentions-legales" }],
  }),
  component: MentionsLegales,
});

/*
 * À COMPLÉTER PAR LE CLIENT avant mise en ligne.
 * Les champs laissés vides ne sont pas affichés sur le site.
 */
const legal = {
  capital: "",
  rc: "",
  ice: "",
  directeurPublication: "",
  hebergeur: "",
  hebergeurAdresse: "",
  updated: "octobre 2026",
};

const sections: LegalSection[] = [
  {
    id: "editeur",
    title: "Éditeur du site",
    body: (
      <>
        <p>Le présent site est édité par :</p>
        <InfoTable
          rows={[
            ["Raison sociale", site.legalName],
            ["Forme juridique", "Société à responsabilité limitée (SARL)"],
            ["Capital social", legal.capital],
            ["Siège social", site.address.full],
            ["Registre du commerce", legal.rc],
            ["ICE", legal.ice],
            ["Téléphone", <a href={site.phoneHref}>{site.phone}</a>],
            ["E-mail", <a href={`mailto:${site.email}`}>{site.email}</a>],
            ["Directeur de la publication", legal.directeurPublication],
          ]}
        />
      </>
    ),
  },
  {
    id: "hebergement",
    title: "Hébergement",
    body: legal.hebergeur ? (
      <InfoTable rows={[["Hébergeur", legal.hebergeur], ["Adresse", legal.hebergeurAdresse]]} />
    ) : (
      <p>Les informations relatives à l'hébergeur du site sont disponibles sur simple demande auprès de l'éditeur.</p>
    ),
  },
  {
    id: "conception",
    title: "Conception et réalisation",
    body: (
      <p>
        Site conçu et réalisé par{" "}
        <a href="https://izemx.com" target="_blank" rel="noopener noreferrer">
          IZEMX
        </a>
        .
      </p>
    ),
  },
  {
    id: "propriete",
    title: "Propriété intellectuelle",
    body: (
      <>
        <p>
          L'ensemble des contenus de ce site (textes, logo, illustrations, schémas, mises en page) est la propriété de{" "}
          {site.legalName} ou fait l'objet d'une autorisation d'utilisation.
        </p>
        <p>
          Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est
          interdite.
        </p>
        <p>
          Certains visuels présentés sur le site sont des images d'illustration ; ils sont signalés comme tels lorsqu'ils
          accompagnent la présentation d'une réalisation.
        </p>
      </>
    ),
  },
  {
    id: "responsabilite",
    title: "Responsabilité",
    body: (
      <>
        <p>
          Les informations publiées sur ce site, notamment les articles du blog, sont fournies à titre informatif et
          général. Elles ne constituent pas un avis technique et ne remplacent pas une étude géotechnique adaptée à un
          terrain et à un projet donnés.
        </p>
        <p>
          L'éditeur s'efforce d'assurer l'exactitude des informations diffusées, sans pouvoir garantir qu'elles soient
          exhaustives ou exemptes d'erreurs.
        </p>
      </>
    ),
  },
  {
    id: "liens",
    title: "Liens externes",
    body: (
      <p>
        Le site peut contenir des liens vers des sites tiers (WhatsApp, LinkedIn, Google Maps…). L'éditeur n'exerce aucun
        contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
      </p>
    ),
  },
  {
    id: "donnees",
    title: "Données personnelles",
    body: (
      <p>
        Pour savoir comment sont traitées les informations que vous nous transmettez, consultez notre{" "}
        <Link to="/politique-de-confidentialite">politique de confidentialité</Link>.
      </p>
    ),
  },
  {
    id: "droit",
    title: "Droit applicable",
    body: <p>Les présentes mentions légales sont régies par le droit marocain.</p>,
  },
];

function MentionsLegales() {
  return (
    <LegalPage
      title="Mentions légales"
      intro="Informations relatives à l'éditeur du site, à son hébergement et à son utilisation."
      updated={legal.updated}
      sections={sections}
    />
  );
}