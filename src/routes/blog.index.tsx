import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";
import { pageHead } from "@/lib/seo";
import { site } from "@/config/site";

export const Route = createFileRoute("/blog/")({
  head: () => pageHead({ title: "Blog", description: "Comprendre le sol, sécuriser vos ouvrages.", path: "/blog" }),
  component: () => (
    <>
      <PageHero title="Blog" intro="Comprendre le sol, sécuriser vos ouvrages." crumbs={[{ label: "Blog" }]} />
      <section className="container-site section-y"><p>{site.legalName} — {site.address.full} — {site.phone} — {site.email}</p></section>
      <CtaBand />
    </>
  ),
});
