import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Anchor,
  ArrowRight,
  ArrowUpRight,
  Building2,
  ClipboardCheck,
  Database,
  Factory,
  FileCheck2,
  FlaskConical,
  Map as MapIcon,
  MessagesSquare,
  Mountain,
  Pickaxe,
  Route as RouteIcon,
  Scale,
  Timer,
  Triangle,
  type LucideIcon,
} from "lucide-react";
import hero from "@/assets/generated/hero-forage-tanger.webp";
import cptuPhoto from "@/assets/generated/cptu-terrain.png";
import laboPhoto from "@/assets/generated/engagements-labo.png";
import carottePhoto from "@/assets/generated/strat-carotte.png";
import ctaPhoto from "@/assets/generated/cta-fond.png";
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
import { Stratigraphy } from "@/components/site/Stratigraphy";
import { localBusinessJsonLd, pageHead } from "@/lib/seo";
import { fr } from "@/lib/fr";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead({
      title: "LGTP — Laboratoire de géotechnique à Tanger | Études, essais et expertises",
      description:
        "Études géotechniques, reconnaissance des sols, essais CPTU, essais de laboratoire, contrôle qualité et instrumentation pour vos ouvrages au Maroc.",
      path: "/",
    }),
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: hero },
    ],
    scripts: [localBusinessJsonLd()],
  }),
  component: Home,
});

/* ------------------------------------------------------------------ */
/* Contenu propre à la page d'accueil                                  */
/* ------------------------------------------------------------------ */

const heroKeywords = [
  "Études géotechniques",
  "Reconnaissance des sols",
  "Essais CPTU",
  "Essais de laboratoire",
  "Contrôle qualité",
  "Instrumentation",
  "Expertise",
];

const steps: { t: string; d: string; icon: LucideIcon }[] = [
  { t: "Demande", d: "Vous nous décrivez le projet, le terrain et vos contraintes.", icon: MessagesSquare },
  { t: "Reconnaissance", d: "Nous définissons et réalisons les investigations sur site.", icon: Pickaxe },
  { t: "Analyse", d: "Essais en laboratoire et interprétation des mesures.", icon: FlaskConical },
  { t: "Rapport et recommandations", d: "Un rapport clair, avec des recommandations exploitables.", icon: FileCheck2 },
];

/** Enchaînement des missions géotechniques selon la norme NF P 94-500 (contenu pédagogique général). */
const missions = [
  {
    code: "G1",
    phase: "Étude préalable",
    t: "Étude géotechnique préalable",
    d: "Phase étude de site (ES) puis principes généraux de construction (PGC) : identification des premiers risques géotechniques et adaptation du projet au site.",
  },
  {
    code: "G2",
    phase: "Conception",
    t: "Étude géotechnique de conception",
    d: "Phases avant-projet, projet et DCE/ACT : hypothèses géotechniques, dimensionnement des fondations et des ouvrages géotechniques.",
  },
  {
    code: "G3",
    phase: "Exécution",
    t: "Étude et suivi géotechniques d'exécution",
    d: "Côté entreprise : étude d'exécution puis suivi des travaux, avec adaptation aux conditions de sol réellement rencontrées.",
  },
  {
    code: "G4",
    phase: "Exécution",
    t: "Supervision géotechnique d'exécution",
    d: "Côté maître d'ouvrage : supervision de l'étude et du suivi d'exécution menés par l'entreprise.",
  },
  {
    code: "G5",
    phase: "À tout moment",
    t: "Diagnostic géotechnique",
    d: "Étude ciblée d'un élément géotechnique spécifique, d'un désordre ou d'un ouvrage existant.",
  },
];

const cptuReadings = [
  { k: "qc", l: "Résistance de pointe", d: "Résistance du sol à l'enfoncement du cône, mesurée en continu." },
  { k: "fs", l: "Frottement latéral", d: "Frottement mobilisé le long du manchon, utile à l'identification des sols." },
  { k: "u", l: "Pression interstitielle", d: "Pression de l'eau dans les pores du sol pendant l'enfoncement." },
];

const engagements: { t: string; d: string; icon: LucideIcon }[] = [
  { t: "Rigueur", d: "Des méthodes conformes aux normes en vigueur, de la reconnaissance au rapport.", icon: ClipboardCheck },
  { t: "Indépendance", d: "Un regard technique objectif, au service de la sécurité de l'ouvrage.", icon: Scale },
  { t: "Traçabilité", d: "Des mesures enregistrées numériquement et des résultats documentés.", icon: Database },
  { t: "Réactivité", d: "Des équipes basées à Tanger, au plus près de vos chantiers.", icon: Timer },
];

function sectorIcon(label: string): LucideIcon {
  const k = label.toLowerCase();
  if (k.includes("port") || k.includes("marit")) return Anchor;
  if (k.includes("route") || k.includes("voir")) return RouteIcon;
  if (k.includes("talus") || k.includes("pente")) return Mountain;
  if (k.includes("indus")) return Factory;
  if (k.includes("lotis") || k.includes("aménag")) return MapIcon;
  if (k.includes("bât") || k.includes("immo")) return Building2;
  return Triangle;
}

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function Home() {
  return (
    <>
      <Hero />
      <KeyFigures />
      <Expertises />

      {/* STRATIGRAPHIE */}
      <section className="relative bg-navy text-navy-foreground" aria-label="Le sol, couche par couche">
        <Sawtooth className="-mt-px text-background" flip />
        <div className="container-site section-y grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              light
              eyebrow="Le sol, couche par couche"
              title="Une mission se lit comme une coupe de terrain."
              intro="Chaque phase repose sur la précédente, comme les couches d'un sol. Faites défiler pour descendre."
            />
            <Reveal delay={0.15} className="relative mt-10 hidden overflow-hidden rounded-3xl border border-navy-border lg:block">
              <img
                src={carottePhoto}
                alt="Carottes de sol rangées dans une caisse en bois, montrant des couches successives d'argile, de sable et de roche"
                width={900}
                height={1350}
                loading="lazy"
                decoding="async"
                className="h-[340px] w-full object-cover object-center opacity-80"
              />
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,var(--navy),transparent_55%)]" />
              <p className="absolute bottom-5 left-6 right-6 font-display text-xs font-semibold uppercase tracking-[0.16em] text-amber">
                Carottage — lecture des couches
              </p>
            </Reveal>
          </div>
          <Stratigraphy />
        </div>
        <Sawtooth className="text-background" />
      </section>

      <Method />
      <Missions />
      <Cptu />
      <Engagements />
      <Realisations />
      <Blog />
      <Sectors />
      <FinalCta />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.15]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy text-navy-foreground"
    >
      <motion.img
        src={hero}
        alt=""
        width={1920}
        height={1088}
        fetchPriority="high"
        style={{ y: imgY }}
        className="absolute inset-x-0 top-0 -z-20 h-[118%] w-full object-cover object-[70%_center] opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--navy)_32%,transparent_95%)]" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-[linear-gradient(to_top,var(--navy),transparent)]" aria-hidden />
      <TriangleField className="-z-10 opacity-60" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-site grid items-center gap-12 pb-36 pt-36 lg:grid-cols-[1.25fr_0.75fr]"
      >
        <div>
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-3 text-amber">
              <span aria-hidden className="h-px w-8 bg-amber" />
              Laboratoire de géotechnique — {site.address.city}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-display-xl mt-6 max-w-4xl font-semibold text-navy-foreground">
              La connaissance du sol, au service de la{" "}
              <span className="relative inline-block text-amber">
                solidité
                <svg
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  aria-hidden
                  className="absolute -bottom-2 left-0 h-3 w-full"
                >
                  <motion.path
                    d="M2 9 C 50 3, 150 3, 198 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: reduce ? 1 : 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                  />
                </svg>
              </span>{" "}
              de vos ouvrages.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-xl text-lg text-navy-muted">
              Études géotechniques, essais, contrôle qualité et expertise pour les bâtiments, les ports, les routes et les
              infrastructures.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="devis" size="lg">
              <Link to="/contact">
                Demander un devis <BtnArrow />
              </Link>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <Link to="/expertises">Découvrir nos expertises</Link>
            </Button>
          </Reveal>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative ml-auto w-full max-w-sm rounded-3xl border border-navy-border bg-navy/70 p-6 shadow-2xl">
            <SoilProfileHero className="w-full" />
          </div>
          <FloatingChip className="-left-10 top-12" label="Essais CPTU" value="Acquisition automatique" delay={0} />
          <FloatingChip className="-left-4 bottom-10" label="Instrumentation" value="Inclinomètres" delay={1.5} />
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 border-t border-navy-border">
        <Ticker items={heroKeywords} />
      </div>
    </section>
  );
}

function FloatingChip({ label, value, className, delay }: { label: string; value: string; className?: string; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -6, 0] }}
      transition={
        reduce
          ? { duration: 0.4 }
          : { opacity: { delay: 0.8 + delay * 0.2, duration: 0.5 }, y: { delay, duration: 6, repeat: Infinity, ease: "easeInOut" } }
      }
      className={`absolute flex items-center gap-3 rounded-xl border border-navy-border bg-navy px-4 py-3 shadow-xl ${className ?? ""}`}
    >
      <span aria-hidden className="h-2 w-2 rotate-45 bg-amber" />
      <div>
        <p className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-amber">{label}</p>
        <p className="text-sm text-navy-foreground">{value}</p>
      </div>
    </motion.div>
  );
}

function Ticker({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((k) => (
        <li key={k} className="flex items-center gap-8 whitespace-nowrap">
          <span>{k}</span>
          <span aria-hidden className="text-amber">▲</span>
        </li>
      ))}
    </ul>
  );

  if (reduce) {
    return (
      <div className="container-site py-5 font-display text-xs font-medium uppercase tracking-[0.14em] text-navy-muted">
        {row()}
      </div>
    );
  }

  return (
    <div className="overflow-hidden py-5 font-display text-xs font-medium uppercase tracking-[0.14em] text-navy-muted [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {row()}
        {row(true)}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CHIFFRES CLÉS                                                       */
/* ------------------------------------------------------------------ */

function KeyFigures() {
  return (
    <section className="container-site py-16 md:py-20" aria-label="Chiffres clés">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border shadow-sm lg:grid-cols-4">
        {site.keyFigures.map((k, i) => (
          <Reveal key={k.label} delay={i * 0.07} className="group relative flex flex-col-reverse bg-card p-6 md:p-8">
            <dt className="mt-3 text-sm">{k.label}</dt>
            <dd className="font-display text-4xl font-semibold text-heading md:text-5xl">
              <CountUp value={k.value} {...(k.suffix !== undefined ? { suffix: k.suffix } : {})} />
            </dd>
            <svg
              viewBox="0 0 20 18"
              aria-hidden
              className="absolute right-5 top-5 h-4 w-4 text-amber transition-transform duration-500 group-hover:rotate-180"
            >
              <polygon points="0,0 20,0 10,18" fill="currentColor" />
            </svg>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-amber transition-transform duration-500 group-hover:scale-x-100"
            />
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* EXPERTISES                                                          */
/* ------------------------------------------------------------------ */

function Expertises() {
  return (
    <section className="container-site section-y pt-8" aria-label="Nos expertises">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <SectionHeading
          eyebrow="Nos expertises"
          title="Six métiers, une même exigence de rigueur."
          intro="Du premier sondage au suivi de l'ouvrage, nous accompagnons chaque étape géotechnique de votre projet."
        />
        <div className="flex items-end gap-6">
          <p aria-hidden className="font-display text-7xl font-semibold leading-none text-primary/15 md:text-8xl">
            {pad(services.length)}
          </p>
          <Link to="/expertises" className="link-underline mb-2 shrink-0 font-display text-sm font-semibold text-primary">
            Toutes les expertises
          </Link>
        </div>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.id} delay={(i % 3) * 0.07} className="relative h-full">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-3 left-6 z-10 rounded-full bg-amber px-2.5 py-0.5 font-display text-xs font-semibold text-navy tabular"
            >
              {pad(i + 1)}
            </span>
            <ServiceCard s={s} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* MÉTHODE                                                             */
/* ------------------------------------------------------------------ */

function Method() {
  const reduce = useReducedMotion();
  return (
    <section className="container-site section-y" aria-label="Méthode">
      <SectionHeading eyebrow="Méthode" title="Une mission, quatre étapes." />
      <ol className="relative mt-14 grid gap-6 md:grid-cols-4">
        <div aria-hidden className="absolute left-5 right-5 top-5 hidden h-px bg-border md:block" />
        <motion.div
          aria-hidden
          className="absolute left-5 right-5 top-5 hidden h-px origin-left bg-amber md:block"
          initial={{ scaleX: reduce ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal as="li" key={s.t} delay={i * 0.12} className="relative">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber bg-background font-display text-sm font-semibold text-heading tabular">
                {i + 1}
              </span>
              <div className="surface-card group mt-6 h-full p-6 transition-shadow hover:shadow-lg">
                <Icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm">{fr(s.d)}</p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* MISSIONS G1 → G5 (nouvelle section)                                 */
/* ------------------------------------------------------------------ */

function Missions() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const m = missions[active];
  if (!m) return null;

  return (
    <section className="bg-secondary" aria-label="Missions géotechniques G1 à G5">
      <div className="container-site section-y">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow="Norme NF P 94-500"
            title="Les missions G1 à G5, de l'esquisse au chantier."
            intro="La géotechnique accompagne le projet à chaque phase. Sélectionnez une mission pour la découvrir."
          />
          <Link to="/blog" className="link-underline mb-2 shrink-0 font-display text-sm font-semibold text-primary">
            En savoir plus sur le blog
          </Link>
        </div>

        <div role="tablist" aria-label="Missions géotechniques" className="mt-12 grid grid-cols-5 gap-2 md:gap-4">
          {missions.map((mi, i) => {
            const selected = i === active;
            return (
              <button
                key={mi.code}
                role="tab"
                id={`mission-tab-${mi.code}`}
                aria-selected={selected}
                aria-controls="mission-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") setActive((active + 1) % missions.length);
                  if (e.key === "ArrowLeft") setActive((active - 1 + missions.length) % missions.length);
                }}
                className={`relative rounded-2xl border px-2 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 md:px-5 md:py-6 ${
                  selected ? "border-primary bg-card shadow-md" : "border-transparent bg-card/50 hover:bg-card"
                }`}
              >
                <span className="block font-display text-2xl font-semibold text-heading md:text-4xl">{mi.code}</span>
                <span className="mt-1 hidden text-xs uppercase tracking-[0.12em] md:block">{mi.phase}</span>
                {selected && (
                  <motion.span
                    {...(reduce ? {} : { layoutId: "mission-indicator" })}
                    aria-hidden
                    className="absolute inset-x-4 -bottom-px h-1 rounded-full bg-amber"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          id="mission-panel"
          role="tabpanel"
          aria-labelledby={`mission-tab-${m.code}`}
          className="surface-card relative mt-6 overflow-hidden p-8 md:p-10"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={m.code}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              {...(reduce ? {} : { exit: { opacity: 0, y: -12 } })}
              transition={{ duration: 0.3 }}
              className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center md:gap-12"
            >
              <p aria-hidden className="font-display text-7xl font-semibold leading-none text-primary/15 md:text-9xl">
                {m.code}
              </p>
              <div>
                <p className="eyebrow text-primary">{m.phase}</p>
                <h3 className="mt-2 text-2xl font-semibold">{m.t}</h3>
                <p className="mt-3 max-w-2xl">{fr(m.d)}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CPTU                                                                */
/* ------------------------------------------------------------------ */

function Cptu() {
  return (
    <section className="relative bg-navy text-navy-foreground" aria-label="Pénétromètre statique CPTU">
      <Sawtooth className="-mt-px text-secondary" flip />
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div className="container-site section-y relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading light eyebrow="Équipement à la pointe" title="Pénétromètre statique CPTU à acquisition automatique." />
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-navy-muted">
              Une investigation à haute résolution, avec un enregistrement numérique immédiat et sécurisé de trois mesures
              en continu.
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-3">
            {cptuReadings.map((r, i) => (
              <Reveal
                as="li"
                key={r.k}
                delay={0.15 + i * 0.08}
                className="group flex items-start gap-5 rounded-2xl border border-navy-border p-5 transition-colors hover:border-amber/60"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber font-display text-lg font-semibold italic text-navy">
                  {r.k}
                </span>
                <div>
                  <p className="font-display font-semibold text-navy-foreground">{r.l}</p>
                  <p className="mt-1 text-sm text-navy-muted">{fr(r.d)}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.4}>
            <Button asChild variant="devis" className="mt-8">
              <Link to="/equipements">
                Voir nos équipements <BtnArrow />
              </Link>
            </Button>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="relative lg:pb-16">
          <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-primary/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl shadow-2xl lg:ml-auto lg:w-[78%]">
            <img
              src={cptuPhoto}
              alt="Pointe du pénétromètre CPTU et tiges en acier enfoncées dans le sol par une machine hydraulique"
              width={900}
              height={1200}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover lg:aspect-[3/4]"
            />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,30,61,0.45),transparent_50%)]" />
          </div>
          <div className="relative mt-4 rounded-3xl bg-card p-5 shadow-2xl lg:absolute lg:bottom-0 lg:left-0 lg:mt-0 lg:w-[52%]">
            <p className="eyebrow mb-2 text-primary">Schéma du cône</p>
            <CptuConeDiagram className="h-56" />
          </div>
        </Reveal>
      </div>
      <Sawtooth className="text-background" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ENGAGEMENTS (nouvelle section)                                      */
/* ------------------------------------------------------------------ */

function Engagements() {
  return (
    <section className="container-site section-y" aria-label="Nos engagements">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Pourquoi LGTP"
            title="Des fondations solides commencent par des données fiables."
            intro="Un projet bien fondé repose sur une lecture juste du sol. C'est ce que nous nous engageons à vous fournir."
          />
          <Reveal delay={0.1} className="relative mt-10">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src={laboPhoto}
                alt="Laboratoire de géotechnique ordonné, avec bancs d'essais, tamis et échantillons de sol"
                width={900}
                height={1200}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
              />
            </div>
            <MotifMosaic className="absolute -bottom-8 -right-4 w-36 drop-shadow-lg md:w-44" />
          </Reveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {engagements.map((e, i) => {
            const Icon = e.icon;
            return (
              <Reveal
                key={e.t}
                delay={i * 0.08}
                className={`surface-card group relative overflow-hidden p-7 transition-all hover:-translate-y-1 hover:shadow-lg ${
                  i % 2 === 1 ? "sm:translate-y-8 sm:hover:translate-y-7" : ""
                }`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{e.t}</h3>
                <p className="mt-2 text-sm">{fr(e.d)}</p>
                <svg
                  viewBox="0 0 40 35"
                  aria-hidden
                  className="absolute -bottom-3 -right-3 h-14 w-14 text-amber/20 transition-transform duration-500 group-hover:rotate-12"
                >
                  <polygon points="0,35 20,0 40,35" fill="currentColor" />
                </svg>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Mosaïque de triangles inspirée du logo : un seul triangle ambre inversé au milieu des triangles bleus. */
function MotifMosaic({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const rows = 5;
  const cols = 9;
  const w = 40;
  const h = 34.64;
  const opacities = [0.08, 0.16, 0.28, 0.45, 0.7];
  const tris: { pts: string; amber: boolean; op: number; i: number }[] = [];
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * (w / 2);
      const y = r * h;
      const up = (r + c) % 2 === 0;
      const pts = up
        ? `${x},${y + h} ${x + w / 2},${y} ${x + w},${y + h}`
        : `${x},${y} ${x + w},${y} ${x + w / 2},${y + h}`;
      tris.push({ pts, amber: r === 2 && c === 5, op: opacities[(r * 3 + c * 7) % opacities.length] ?? 0.2, i: i++ });
    }
  }
  return (
    <svg viewBox={`0 0 ${(cols + 1) * (w / 2)} ${rows * h}`} className={className} aria-hidden>
      {tris.map((t) => (
        <motion.polygon
          key={t.i}
          points={t.pts}
          fill="currentColor"
          className={t.amber ? "text-amber" : "text-primary"}
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: t.amber ? 1 : t.op }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: reduce ? 0 : t.i * 0.012, duration: 0.4 }}
          stroke="var(--background)"
          strokeWidth={1.5}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* RÉALISATIONS                                                        */
/* ------------------------------------------------------------------ */

function Realisations() {
  return (
    <section className="container-site section-y pt-8" aria-label="Réalisations">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading eyebrow="Réalisations" title="Des missions sur le terrain, du bâtiment au portuaire." />
        <Link to="/realisations" className="link-underline shrink-0 font-display text-sm font-semibold text-primary">
          Toutes les réalisations
        </Link>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.07} className="h-full">
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <Link
          to="/contact"
          className="group mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-primary/40 px-7 py-6 transition-colors hover:border-primary hover:bg-primary/5 sm:flex-row sm:items-center"
        >
          <div>
            <p className="font-display text-lg font-semibold text-heading">{fr("Votre projet ici ?")}</p>
            <p className="mt-1 text-sm">Parlez-nous de votre terrain : nous définissons ensemble la mission adaptée.</p>
          </div>
          <span className="inline-flex items-center gap-2 font-display text-sm font-semibold text-primary">
            Demander un devis
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </span>
        </Link>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* BLOG                                                                */
/* ------------------------------------------------------------------ */

function Blog() {
  return (
    <section className="bg-secondary" aria-label="Derniers articles">
      <div className="container-site section-y">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Derniers articles" title="Comprendre le sol, sécuriser vos ouvrages." />
          <Link to="/blog" className="link-underline shrink-0 font-display text-sm font-semibold text-primary">
            Tout le blog
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.07} className="h-full">
              <PostCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* SECTEURS                                                            */
/* ------------------------------------------------------------------ */

function Sectors() {
  return (
    <section className="container-site section-y" aria-label="Secteurs d'intervention">
      <SectionHeading eyebrow="Secteurs d'intervention" title="Là où le sol décide de la tenue de l'ouvrage." />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sectors.map((s, i) => {
          const Icon = sectorIcon(s);
          return (
            <Reveal as="li" key={s} delay={i * 0.06}>
              <Link
                to="/realisations"
                className="surface-card group relative flex h-full items-center gap-5 overflow-hidden px-6 py-6 transition-colors duration-300 hover:bg-navy"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-amber group-hover:text-navy">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-xs tabular text-primary/60 transition-colors group-hover:text-amber">
                    {pad(i + 1)}
                  </span>
                  <span className="font-display font-semibold text-heading transition-colors duration-300 group-hover:text-navy-foreground">
                    {s}
                  </span>
                </span>
                <ArrowRight
                  className="h-4 w-4 text-amber transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA FINAL (avec photo)                                              */
/* ------------------------------------------------------------------ */

function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-navy-foreground" aria-label="Demander un devis">
      <img
        src={ctaPhoto}
        alt=""
        width={1920}
        height={800}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-right opacity-50"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(95deg,var(--navy)_35%,transparent_100%)]" />
      <Sawtooth className="-mt-px text-background" flip />
      <div className="container-site py-24 md:py-32">
        <Reveal>
          <p className="eyebrow inline-flex items-center gap-3 text-amber">
            <span aria-hidden className="h-px w-8 bg-amber" />
            Un projet en cours ?
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold text-navy-foreground md:text-5xl">
            Parlons de votre sol.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-lg text-lg text-navy-muted">
            Décrivez-nous votre terrain et votre ouvrage : nous vous proposons la mission géotechnique adaptée.
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="devis" size="lg">
            <Link to="/contact">
              Demander un devis <BtnArrow />
            </Link>
          </Button>
          <Button asChild variant="outlineLight" size="lg">
            <Link to="/realisations">Voir nos réalisations</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}