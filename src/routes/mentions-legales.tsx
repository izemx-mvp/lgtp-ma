import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";
import { pageHead } from "@/lib/seo";
import { site } from "@/config/site";

export const Route = createFileRoute("/mentions-legales")({
  head: () => pageHead({ title: "Mentions légales", description: "Informations légales relatives au site LGTP.", path: "/mentions-legales" }),
  component: () => (
    <>
      <PageHero title="Mentions légales" intro="Informations légales relatives au site LGTP." crumbs={[{ label: "Mentions légales" }]} />
      <section className="container-site section-y"><p>{site.legalName} — {site.address.full} — {site.phone} — {site.email}</p></section>
      <CtaBand />
    </>
  ),
});
