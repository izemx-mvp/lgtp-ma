import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { services } from "@/data/services";
import { faq } from "@/data/faq";
import { PageHero } from "@/components/site/PageHero";
import { Media } from "@/components/site/Media";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { CtaBand } from "@/components/site/CtaBand";
import { SoilProgress } from "@/components/site/Stratigraphy";
import { Reveal } from "@/components/motion/Reveal";
import { Button, BtnArrow } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { pageHead } from "@/lib/seo";
import { fr } from "@/lib/fr";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/expertises")({
  head: () => ({
    ...pageHead({
      title: "Expertises géotechniques : études, essais, contrôle, instrumentation",
      description: "Études géotechniques G1 à G5, reconnaissance et essais in situ (CPTU), essais de laboratoire, contrôle qualité, instrumentation et expertise de désordres.",
      path: "/expertises",
    }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }) }],
  }),
  component: Expertises,
});

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

const ids = services.map((s) => s.id);

function Expertises() {
  const active = useScrollSpy(ids);
  return (
    <>
      <SoilProgress />
      <PageHero eyebrow="Expertises" title="De la reconnaissance du sol au suivi de l'ouvrage." intro="Six domaines complémentaires, menés selon des méthodes normalisées et une traçabilité complète des données." crumbs={[{ label: "Expertises" }]} />
      <div className="container-site grid gap-12 py-20 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Sommaire des expertises" className="hidden lg:block">
          <ul className="sticky top-28 space-y-1 border-l">
            {services.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={cn("-ml-px block border-l-2 py-2 pl-4 text-sm transition-colors", active === s.id ? "border-amber font-semibold text-heading" : "border-transparent hover:text-heading")}>
                  <span className="tabular mr-2 text-primary/60">{s.number}</span>{s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-24 md:space-y-32">
          {services.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28" aria-labelledby={`${s.id}-t`}>
              <div className={cn("grid items-start gap-10 xl:grid-cols-2", i % 2 && "xl:[&>*:first-child]:order-2")}>
                <Reveal>
                  <Media src={s.imageSrc} alt={s.imageAlt} isRealPhoto={s.isRealPhoto} position={s.imagePosition} className="aspect-[4/3] rounded-2xl" />
                </Reveal>
                <Reveal delay={0.08}>
                  <div className="flex items-center gap-4">
                    <span className="tabular flex h-11 w-11 items-center justify-center rounded-full bg-amber font-display text-sm font-semibold text-amber-foreground">{s.number}</span>
                    <ServiceIcon name={s.icon} className="h-6 w-6 text-primary" />
                  </div>
                  <h2 id={`${s.id}-t`} className="text-display-md mt-5 font-semibold">{s.title}</h2>
                  <p className="mt-4">{fr(s.description)}</p>
                  <h3 className="eyebrow mt-8 text-primary">Ce que nous réalisons</h3>
                  <ul className="mt-4 space-y-2.5">
                    {s.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[0.95rem]"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{fr(it)}</li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm"><strong className="font-display text-heading">Pour qui : </strong>{fr(s.forWhom)}</p>
                  <Button asChild variant="devis" className="mt-8">
                    <Link to="/contact" search={{ service: s.id }}>Demander un devis pour ce service <BtnArrow /></Link>
                  </Button>
                </Reveal>
              </div>
            </section>
          ))}

          <section aria-labelledby="faq-t" className="scroll-mt-28" id="faq">
            <p className="eyebrow text-primary">Questions fréquentes</p>
            <h2 id="faq-t" className="text-display-md mt-3 font-semibold">Vos questions sur la géotechnique</h2>
            <Accordion type="single" collapsible className="mt-8 surface-card px-6">
              {faq.map((f) => (
                <AccordionItem key={f.id} value={f.id}>
                  <AccordionTrigger className="font-display text-left text-base font-semibold text-heading hover:no-underline">{fr(f.question)}</AccordionTrigger>
                  <AccordionContent className="text-[0.95rem] leading-relaxed">{fr(f.answer)}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </div>
      <CtaBand />
    </>
  );
}
