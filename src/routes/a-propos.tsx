import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";
import { pageHead } from "@/lib/seo";
import { site } from "@/config/site";

export const Route = createFileRoute("/a-propos")({
  head: () => pageHead({ title: "À propos", description: "Un laboratoire né sur le terrain, au cœur du Nord marocain.", path: "/a-propos" }),
  component: () => (
    <>
      <PageHero title="À propos" intro="Un laboratoire né sur le terrain, au cœur du Nord marocain." crumbs={[{ label: "À propos" }]} />
      <section className="container-site section-y"><p>{site.legalName} — {site.address.full} — {site.phone} — {site.email}</p></section>
      <CtaBand />
    </>
  ),
});
