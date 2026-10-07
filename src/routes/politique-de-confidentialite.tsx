import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";
import { pageHead } from "@/lib/seo";
import { site } from "@/config/site";

export const Route = createFileRoute("/politique-de-confidentialite")({
  head: () => pageHead({ title: "Politique de confidentialité", description: "Ce site ne collecte ni ne stocke aucune donnée personnelle.", path: "/politique-de-confidentialite" }),
  component: () => (
    <>
      <PageHero title="Politique de confidentialité" intro="Ce site ne collecte ni ne stocke aucune donnée personnelle." crumbs={[{ label: "Politique de confidentialité" }]} />
      <section className="container-site section-y"><p>{site.legalName} — {site.address.full} — {site.phone} — {site.email}</p></section>
      <CtaBand />
    </>
  ),
});
