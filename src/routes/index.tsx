import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/generated/hero-forage-tanger.webp";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";
import { sectors } from "@/data/regions";
import { Button, BtnArrow } from "@/components/ui/button";
import { Sawtooth, TriangleField } from "@/components/motif/Motif";
import { Reveal, CountUp } from "@/components/motion/Reveal";
import { SoilProfileHero, CptuConeDiagram } from "@/components/diagrams/Diagrams";
import { SectionHeading } from "@/components/site/PageHero";
import { PostCard, ProjectCard, ServiceCard } from "@/components/site/Cards";
import { CtaBand } from "@/components/site/CtaBand";
import { Stratigraphy } from "@/components/site/Stratigraphy";
import { localBusinessJsonLd, pageHead } from "@/lib/seo";
import { fr } from "@/lib/fr";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead({
      title: "LGTP — Laboratoire de géotechnique à Tanger | Études, essais et expertises",
      description: "Études géotechniques, reconnaissance des sols, essais CPTU, essais de laboratoire, contrôle qualité et instrumentation pour vos ouvrages au Maroc.",
      path: "/",
    }),
    links: [{ rel: "canonical", href: "/" }, { rel: "preload", as: "image", href: hero }],
    scripts: [localBusinessJsonLd()],
  }),
  component: Home,
});

const steps = [
  { t: "Demande", d: "Vous nous décrivez le projet, le terrain et vos contraintes." },
  { t: "Reconnaissance", d: "Nous définissons et réalisons les investigations sur site." },
  { t: "Analyse", d: "Essais en laboratoire et interprétation des mesures." },
  { t: "Rapport et recommandations", d: "Un rapport clair, avec des recommandations exploitables." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy text-navy-foreground">
        <img src={hero} alt="" width={1920} height={1088} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center] opacity-35" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--navy)_30%,transparent_95%)]" aria-hidden />
        <TriangleField className="-z-10 opacity-70" />
        <div className="container-site grid items-center gap-12 pb-28 pt-36 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <Reveal><p className="eyebrow text-amber">Laboratoire de géotechnique — {site.address.city}</p></Reveal>
            <Reveal delay={0.08}>
              <h1 className="text-display-xl mt-6 max-w-4xl font-semibold text-navy-foreground">La connaissance du sol, au service de la solidité de vos ouvrages.</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-lg text-navy-muted">
                Études géotechniques, essais, contrôle qualité et expertise pour les bâtiments, les ports, les routes et les infrastructures.
              </p>
            </Reveal>
            <Reveal delay={0.24} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="devis" size="lg"><Link to="/contact">Demander un devis <BtnArrow /></Link></Button>
              <Button asChild variant="outlineLight" size="lg"><Link to="/expertises">Découvrir nos expertises</Link></Button>
            </Reveal>
          </div>
          <div className="hidden lg:block"><SoilProfileHero className="ml-auto w-full max-w-sm" /></div>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <div className="container-site border-t border-navy-border py-5">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-display text-xs font-medium uppercase tracking-[0.14em] text-navy-muted">
              {["Études géotechniques", "Essais", "Contrôle qualité", "Instrumentation", "Expertise"].map((k, i) => (
                <li key={k} className="flex items-center gap-6">{i > 0 && <span aria-hidden className="text-amber">▲</span>}{k}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CHIFFRES */}
      <section className="container-site -mt-px py-16 md:py-20" aria-label="Chiffres clés">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border lg:grid-cols-4">
          {site.keyFigures.map((k, i) => (
            <Reveal key={k.label} delay={i * 0.07} className="bg-card p-6 md:p-8">
              <dt className="text-sm">{k.label}</dt>
              <dd className="mt-2 font-display text-4xl font-semibold text-heading md:text-5xl"><CountUp value={k.value} suffix={k.suffix} /></dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* EXPERTISES */}
      <section className="container-site section-y pt-8" aria-labelledby="exp-title">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Nos expertises" title="Six métiers, une même exigence de rigueur." intro="Du premier sondage au suivi de l'ouvrage, nous accompagnons chaque étape géotechnique de votre projet." />
          <Link to="/expertises" className="link-underline shrink-0 font-display text-sm font-semibold text-primary">Toutes les expertises</Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <Reveal key={s.id} delay={(i % 3) * 0.07}><ServiceCard s={s} /></Reveal>)}
        </div>
      </section>

      {/* STRATIGRAPHIE */}
      <section className="relative bg-navy text-navy-foreground" aria-labelledby="strat-title">
        <Sawtooth className="-mt-px text-background" flip />
        <div className="container-site section-y grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading light eyebrow="Le sol, couche par couche" title="Une mission se lit comme une coupe de terrain." intro="Chaque phase repose sur la précédente, comme les couches d'un sol. Faites défiler pour descendre." />
          </div>
          <Stratigraphy />
        </div>
        <Sawtooth className="text-background" />
      </section>

      {/* ETAPES */}
      <section className="container-site section-y" aria-labelledby="steps-title">
        <SectionHeading eyebrow="Méthode" title="Une mission, quatre étapes." />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          <div aria-hidden className="absolute left-0 right-0 top-5 hidden h-px bg-border md:block" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.t} delay={i * 0.08} className="relative">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber bg-background font-display text-sm font-semibold text-heading tabular">{i + 1}</span>
              <h3 className="mt-5 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm">{fr(s.d)}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* CPTU */}
      <section className="bg-secondary" aria-labelledby="cptu-title">
        <div className="container-site section-y grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Équipement à la pointe" title="Pénétromètre statique CPTU à acquisition automatique." />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl">Mesure continue de la résistance de pointe <strong className="text-heading">qc</strong>, du frottement latéral <strong className="text-heading">fs</strong> et de la pression interstitielle <strong className="text-heading">u</strong>, avec un enregistrement numérique immédiat et sécurisé.</p>
              <Button asChild className="mt-8"><Link to="/equipements">Voir nos équipements <BtnArrow amber /></Link></Button>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="surface-card p-8"><CptuConeDiagram className="h-80" /></Reveal>
        </div>
      </section>

      {/* REALISATIONS */}
      <section className="container-site section-y" aria-labelledby="real-title">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Réalisations" title="Des missions sur le terrain, du bâtiment au portuaire." />
          <Link to="/realisations" className="link-underline shrink-0 font-display text-sm font-semibold text-primary">Toutes les réalisations</Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {projects.map((p, i) => <Reveal key={p.slug} delay={i * 0.07}><ProjectCard p={p} /></Reveal>)}
        </div>
      </section>

      {/* BLOG */}
      <section className="container-site pb-24" aria-labelledby="blog-title">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Derniers articles" title="Comprendre le sol, sécuriser vos ouvrages." />
          <Link to="/blog" className="link-underline shrink-0 font-display text-sm font-semibold text-primary">Tout le blog</Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => <Reveal key={p.slug} delay={i * 0.07}><PostCard p={p} /></Reveal>)}
        </div>
      </section>

      {/* SECTEURS */}
      <section className="container-site pb-28" aria-labelledby="sect-title">
        <SectionHeading eyebrow="Secteurs d'intervention" title="Là où le sol décide de la tenue de l'ouvrage." />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, i) => (
            <Reveal as="li" key={s} delay={i * 0.06} className="surface-card flex items-center justify-between px-6 py-5">
              <span className="font-display font-semibold text-heading">{s}</span>
              <ArrowRight className="h-4 w-4 text-amber" aria-hidden />
            </Reveal>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
