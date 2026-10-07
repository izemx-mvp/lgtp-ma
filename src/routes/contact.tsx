import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PageHero } from "@/components/site/PageHero";
import { pageHead, localBusinessJsonLd } from "@/lib/seo";
import { site, whatsappLink, mailtoLink } from "@/config/site";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ service: z.string().optional() }),
  head: () => ({ ...pageHead({ title: "Contact et demande de devis", description: "Contactez LGTP à Tanger pour vos études géotechniques, essais et expertises.", path: "/contact" }), scripts: [localBusinessJsonLd()] }),
  component: () => (
    <>
      <PageHero title="Contact et demande de devis" intro="Décrivez votre projet : nous revenons vers vous rapidement." crumbs={[{ label: "Contact" }]} />
      <section className="container-site section-y space-y-3">
        <p>{site.address.full}</p>
        <p><a href={site.phoneHref} className="text-primary">{site.phone}</a> · <a href={`mailto:${site.email}`} className="text-primary">{site.email}</a></p>
        <div className="flex gap-3"><Button asChild variant="whatsapp"><a href={whatsappLink()}>WhatsApp</a></Button><Button asChild variant="outline"><a href={mailtoLink("Demande de devis", "")}>E-mail</a></Button></div>
      </section>
    </>
  ),
});
