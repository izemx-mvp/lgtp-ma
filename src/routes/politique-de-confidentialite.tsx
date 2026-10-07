import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Mail, ServerOff } from "lucide-react";
import { site } from "@/config/site";
import { LegalPage, type LegalSection } from "@/components/site/LegalPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/politique-de-confidentialite")({
  head: () => ({
    ...pageHead({
      title: "Politique de confidentialité",
      description:
        "Le site LGTP ne stocke aucune donnée personnelle : vos demandes sont transmises directement par WhatsApp ou par e-mail.",
      path: "/politique-de-confidentialite",
    }),
    links: [{ rel: "canonical", href: "/politique-de-confidentialite" }],
  }),
  component: Politique,
});

/* À VÉRIFIER avec le client avant mise en ligne (notamment si des outils de mesure d'audience sont ajoutés). */
const UPDATED = "octobre 2026";

const sections: LegalSection[] = [
  {
    id: "principe",
    title: "Notre principe",
    body: (
      <>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: ServerOff, t: "Aucun stockage", d: "Le site n'enregistre aucune donnée sur un serveur." },
            { icon: MessageCircle, t: "WhatsApp", d: "Vous envoyez vous-même votre demande." },
            { icon: Mail, t: "E-mail", d: "Ou depuis votre propre messagerie." },
          ].map((x) => (
            <div key={x.t} className="surface-card p-5">
              <x.icon className="h-5 w-5 text-primary" aria-hidden />
              <p className="mt-3 font-display text-sm font-semibold text-heading">{x.t}</p>
              <p className="mt-1 text-sm">{x.d}</p>
            </div>
          ))}
        </div>
        <p>
          Ce site est un site vitrine. Il ne dispose d'aucune base de données et ne collecte ni ne stocke de données
          personnelles.
        </p>
      </>
    ),
  },
  {
    id: "formulaire",
    title: "Formulaire de demande de devis",
    body: (
      <>
        <p>
          Le formulaire de contact sert uniquement à préparer votre message dans votre navigateur. Les informations saisies
          (nom, société, téléphone, e-mail, description du projet) ne sont pas envoyées au site : c'est vous qui choisissez
          de transmettre le message par WhatsApp ou par e-mail.
        </p>
        <p>
          Une fois reçues, ces informations sont utilisées par {site.legalName} pour répondre à votre demande et, le cas
          échéant, établir un devis. Elles ne sont ni vendues ni cédées à des tiers.
        </p>
      </>
    ),
  },
  {
    id: "tiers",
    title: "Services tiers",
    body: (
      <p>
        Lorsque vous utilisez WhatsApp, votre messagerie électronique, LinkedIn ou Google Maps depuis ce site, vos données
        sont traitées par ces services selon leurs propres politiques de confidentialité.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <p>
        Le site n'utilise pas de cookies publicitaires ni de traceurs de mesure d'audience. Votre choix concernant le
        bandeau d'information n'est conservé que le temps de votre visite.
      </p>
    ),
  },
  {
    id: "droits",
    title: "Vos droits",
    body: (
      <>
        <p>
          Conformément à la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des
          données à caractère personnel, vous disposez d'un droit d'accès, de rectification et d'opposition concernant les
          informations que vous nous avez transmises.
        </p>
        <p>
          Pour exercer ces droits, écrivez-nous à <a href={`mailto:${site.email}`}>{site.email}</a> ou appelez le{" "}
          <a href={site.phoneHref}>{site.phone}</a>.
        </p>
      </>
    ),
  },
  {
    id: "modifications",
    title: "Modifications",
    body: (
      <p>
        Cette politique peut être mise à jour, notamment en cas d'évolution du site. La date de dernière mise à jour est
        indiquée sur cette page.
      </p>
    ),
  },
];

function Politique() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="Ce site ne collecte ni ne stocke aucune donnée personnelle. Voici comment sont traitées les informations que vous choisissez de nous envoyer."
      updated={UPDATED}
      sections={sections}
    />
  );
}