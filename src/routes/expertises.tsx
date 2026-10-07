import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Check, MessagesSquare } from "lucide-react";
import { services } from "@/data/services";
import { faq } from "@/data/faq";
import heroPhoto from "@/assets/generated/expertises-hero.png";
import { Media } from "@/components/site/Media";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { CtaBand } from "@/components/site/CtaBand";
import { SoilProgress } from "@/components/site/Stratigraphy";
import { Sawtooth } from "@/components/motif/Motif";
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
      description:
        "Études géotechniques G1 à G5, reconnaissance et essais in situ (CPTU), essais de laboratoire, contrôle qualité, instrumentation et expertise de désordres.",
      path: "/expertises",
    }),
    links: [
      { rel: "canonical", href: "/expertises" },
      { rel: "preload", as: "image", href: heroPhoto },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      },
    ],
  }),
  component: Expertises,
});

/* ------------------------------------------------------------------ */
/* Données propres à la page                                           */
/* ------------------------------------------------------------------ */

/** Cycle de vie d'un ouvrage : contenu pédagogique général, sans engagement sur les missions réalisées. */
const lifecycle = [
  {
    t: "Avant-projet",
    d: "Reconnaissance du site, sondages et essais pour connaître le terrain avant de dessiner l'ouvrage.",
    tags: ["Étude G1", "Essais in situ", "Laboratoire"],
  },
  {
    t: "Conception",
    d: "Hypothèses géotechniques et dimensionnement des fondations et des ouvrages en contact avec le sol.",
    tags: ["Étude G2", "Essais de laboratoire"],
  },
  {
    t: "Travaux",
    d: "Contrôle des matériaux, réception des fonds de fouille et suivi géotechnique d'exécution.",
    tags: ["G3 / G4", "Contrôle qualité", "Instrumentation"],
  },
  {
    t: "Ouvrage en service",
    d: "Surveillance des déplacements, diagnostic de désordres et expertise technique.",
    tags: ["Auscultation", "Diagnostic G5", "Expertise"],
  },
];

/* ------------------------------------------------------------------ */
/* Scroll-spy                                                          */
/* ------------------------------------------------------------------ */

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

const ids = services.map((s) => s.id);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function Expertises() {
  const active = useScrollSpy(ids);
  const activeIndex = Math.max(0, ids.indexOf(active ?? ""));

  return (
    <>
      <SoilProgress />
      <Hero />

      <Overview />

      <div className="container-site grid gap-12 pb-24 pt-8 lg:grid-cols-[240px_1fr]">
        <SideNav active={active} activeIndex={activeIndex} />

        <div className="space-y-20 md:space-y-28">
          {services.map((s, i) => (
            <div key={s.id}>
              {i > 0 && <Divider />}
              <ServiceSection s={s} reversed={i % 2 === 1} />
            </div>
          ))}
        </div>
      </div>

      <Lifecycle />
      <Faq />
      <CtaBand />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Hero avec photo                                                     */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
      <img
        src={heroPhoto}
        alt=""
        width={1920}
        height={900}
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[75%_center] opacity-60"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--navy)_30%,rgba(15,30,61,0.55)_60%,transparent_100%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-[linear-gradient(to_top,var(--navy),transparent)]" />

      <div className="container-site pb-20 pt-36 md:pb-28 md:pt-44">
        <Reveal>
          <nav aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 text-sm text-navy-muted">
              <li>
                <Link to="/" className="transition-colors hover:text-navy-foreground">
                  Accueil
                </Link>
              </li>
              <li aria-hidden className="text-amber">
                /
              </li>
              <li aria-current="page" className="text-navy-foreground">
                Expertises
              </li>
            </ol>
          </nav>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="eyebrow mt-8 inline-flex items-center gap-3 text-amber">
            <span aria-hidden className="h-px w-8 bg-amber" />
            Expertises
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-navy-foreground md:text-6xl">
            De la reconnaissance du sol au suivi de l'ouvrage.
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-6 max-w-xl text-lg text-navy-muted">
            Six domaines complémentaires, menés selon des méthodes normalisées et une traçabilité complète des données.
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="devis" size="lg">
            <Link to="/contact">
              Demander un devis <BtnArrow />
            </Link>
          </Button>
          <Button asChild variant="outlineLight" size="lg">
            <a href="#faq">Questions fréquentes</a>
          </Button>
        </Reveal>
      </div>
      <Sawtooth className="text-background" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Vue d'ensemble (navigation rapide, utile aussi sur mobile)          */
/* ------------------------------------------------------------------ */

function Overview() {
  return (
    <section className="container-site pt-12 md:pt-16" aria-label="Vue d'ensemble des expertises">
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {services.map((s, i) => (
          <Reveal as="li" key={s.id} delay={i * 0.05}>
            <a
              href={`#${s.id}`}
              className="surface-card group flex h-full flex-col justify-between gap-6 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-amber group-hover:text-navy">
                  <ServiceIcon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-xs font-semibold tabular text-primary/50">{s.number}</span>
              </div>
              <div className="flex items-end justify-between gap-2">
                <span className="font-display text-sm font-semibold leading-snug text-heading">{s.title}</span>
                <ArrowDown
                  className="h-4 w-4 shrink-0 text-amber transition-transform duration-300 group-hover:translate-y-0.5"
                  aria-hidden
                />
              </div>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Sommaire latéral                                                    */
/* ------------------------------------------------------------------ */

function SideNav({ active, activeIndex }: { active: string | undefined; activeIndex: number }) {
  const progress = ((activeIndex + 1) / Math.max(1, services.length)) * 100;
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 space-y-8">
        <nav aria-label="Sommaire des expertises">
          <p className="eyebrow mb-4 text-primary">Sommaire</p>
          <div className="relative">
            <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-border" />
            <span
              aria-hidden
              className="absolute left-0 top-0 w-0.5 bg-amber transition-[height] duration-500 ease-out"
              style={{ height: `${progress}%` }}
            />
            <ul className="space-y-1">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? "true" : undefined}
                    className={cn(
                      "block py-2 pl-5 text-sm transition-colors",
                      active === s.id ? "font-semibold text-heading" : "hover:text-heading",
                    )}
                  >
                    <span className="tabular mr-2 text-primary/60">{s.number}</span>
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" className="block py-2 pl-5 text-sm transition-colors hover:text-heading">
                  <span className="mr-2 text-amber" aria-hidden>
                    ▲
                  </span>
                  Questions fréquentes
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="rounded-2xl bg-navy p-5 text-navy-foreground">
          <p className="font-display text-sm font-semibold">{fr("Un projet en cours ?")}</p>
          <p className="mt-1 text-xs text-navy-muted">Décrivez-nous votre terrain, nous vous répondons rapidement.</p>
          <Button asChild variant="devis" size="sm" className="mt-4 w-full">
            <Link to="/contact">
              Demander un devis <BtnArrow />
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Section par expertise                                               */
/* ------------------------------------------------------------------ */

type Service = (typeof services)[number];

function ServiceSection({ s, reversed }: { s: Service; reversed: boolean }) {
  return (
    <section id={s.id} className="relative scroll-mt-28" aria-labelledby={`${s.id}-t`}>
      <span
        aria-hidden
        className="pointer-events-none absolute -top-12 right-0 select-none font-display text-[8rem] font-semibold leading-none text-primary/[0.06] md:text-[11rem]"
      >
        {s.number}
      </span>

      <div className={cn("relative grid items-start gap-10 xl:grid-cols-2", reversed && "xl:[&>*:first-child]:order-2")}>
        <Reveal className="relative xl:sticky xl:top-28">
          <Media
            src={s.imageSrc}
            alt={s.imageAlt}
            isRealPhoto={s.isRealPhoto}
            position={s.imagePosition}
            className="aspect-[4/3] rounded-2xl shadow-xl"
          />
          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-xl bg-navy px-4 py-3 shadow-xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber text-navy">
              <ServiceIcon name={s.icon} className="h-5 w-5" />
            </span>
            <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-foreground">
              Expertise {s.number}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="pt-4 xl:pt-0">
          <p className="eyebrow text-primary">Expertise {s.number}</p>
          <h2 id={`${s.id}-t`} className="text-display-md mt-3 font-semibold">
            {s.title}
          </h2>
          <p className="mt-4 text-[1.05rem]">{fr(s.description)}</p>

          <h3 className="eyebrow mt-9 text-primary">Ce que nous réalisons</h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {s.items.map((it) => (
              <li
                key={it}
                className="flex gap-3 rounded-xl border bg-card px-4 py-3 text-[0.92rem] transition-colors hover:border-primary/40"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber/20 text-heading">
                  <Check className="h-3 w-3" aria-hidden />
                </span>
                {fr(it)}
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border-l-4 border-amber bg-secondary px-5 py-4">
            <p className="eyebrow text-primary">Pour qui</p>
            <p className="mt-1 text-[0.95rem]">{fr(s.forWhom)}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button asChild variant="devis">
              <Link to="/contact" search={{ service: s.id }}>
                Demander un devis pour ce service <BtnArrow />
              </Link>
            </Button>
            <Link to="/realisations" className="link-underline font-display text-sm font-semibold text-primary">
              Voir des réalisations
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Divider() {
  return (
    <div aria-hidden className="mb-20 flex items-center gap-4 md:mb-28">
      <span className="h-px flex-1 bg-border" />
      <span className="flex gap-1.5 text-[0.6rem] text-primary/30">
        <span>▲</span>
        <span className="rotate-180 text-amber">▲</span>
        <span>▲</span>
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cycle de vie de l'ouvrage (nouvelle section)                        */
/* ------------------------------------------------------------------ */

function Lifecycle() {
  const reduce = useReducedMotion();
  return (
    <section className="relative bg-navy text-navy-foreground" aria-labelledby="lifecycle-t">
      <Sawtooth className="-mt-px text-background" flip />
      <div className="container-site section-y">
        <Reveal>
          <p className="eyebrow inline-flex items-center gap-3 text-amber">
            <span aria-hidden className="h-px w-8 bg-amber" />
            Une approche intégrée
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 id="lifecycle-t" className="text-display-md mt-4 max-w-3xl font-semibold text-navy-foreground">
            Un seul interlocuteur, du terrain nu à l'ouvrage en service.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 max-w-2xl text-navy-muted">
            Nos expertises s'enchaînent au fil du projet : les données recueillies à chaque étape éclairent la suivante.
          </p>
        </Reveal>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <div aria-hidden className="absolute left-0 right-0 top-[9px] hidden h-px bg-navy-border md:block" />
          <motion.div
            aria-hidden
            className="absolute left-0 right-0 top-[9px] hidden h-px origin-left bg-amber md:block"
            initial={{ scaleX: reduce ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          {lifecycle.map((p, i) => (
            <Reveal as="li" key={p.t} delay={0.1 + i * 0.12} className="relative">
              <svg viewBox="0 0 22 19" aria-hidden className="relative h-5 w-5 text-amber">
                <polygon points="0,0 22,0 11,19" fill="currentColor" />
              </svg>
              <p className="mt-6 font-display text-xs font-semibold uppercase tracking-[0.16em] text-amber">
                Phase {i + 1}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-navy-foreground">{p.t}</h3>
              <p className="mt-3 text-sm text-navy-muted">{fr(p.d)}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-navy-border px-3 py-1 font-display text-[0.7rem] font-medium text-navy-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
      <Sawtooth className="text-background" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

function Faq() {
  return (
    <section id="faq" className="container-site section-y scroll-mt-28" aria-labelledby="faq-t">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow text-primary">Questions fréquentes</p>
            <h2 id="faq-t" className="text-display-md mt-3 font-semibold">
              Vos questions sur la géotechnique
            </h2>
            <p className="mt-4 max-w-md">
              Les réponses aux questions que l'on nous pose le plus souvent avant de lancer une mission.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="surface-card mt-8 flex items-start gap-4 p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MessagesSquare className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="font-display font-semibold text-heading">{fr("Une autre question ?")}</p>
              <p className="mt-1 text-sm">Notre équipe vous répond directement.</p>
              <Link
                to="/contact"
                className="link-underline mt-3 inline-flex items-center gap-2 font-display text-sm font-semibold text-primary"
              >
                Nous contacter <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="surface-card px-6">
            {faq.map((f, i) => (
              <AccordionItem key={f.id} value={f.id}>
                <AccordionTrigger className="text-left font-display text-base font-semibold text-heading hover:no-underline">
                  <span className="flex gap-4">
                    <span className="tabular text-sm text-primary/50">{String(i + 1).padStart(2, "0")}</span>
                    {fr(f.question)}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-10 text-[0.95rem] leading-relaxed">{fr(f.answer)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}