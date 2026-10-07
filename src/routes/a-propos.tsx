import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ClipboardCheck, Database, FlaskConical, HardHat, MapPin, Scale, ShieldCheck, Timer, Users } from "lucide-react";
import laboPhoto from "@/assets/generated/engagements-labo.png";
import cptuPhoto from "@/assets/generated/cptu-terrain.png";
import carottePhoto from "@/assets/generated/strat-carotte.png";
import { site } from "@/config/site";
import { PhotoHero } from "@/components/site/PhotoHero";
import { CtaBand } from "@/components/site/CtaBand";
import { Sawtooth } from "@/components/motif/Motif";
import { Reveal, CountUp } from "@/components/motion/Reveal";
import { Button, BtnArrow } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";
import { fr } from "@/lib/fr";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    ...pageHead({
      title: "À propos de LGTP — Laboratoire de géotechnique à Tanger",
      description:
        "LGTP, laboratoire de géotechnique et travaux publics basé à Tanger : études de sol, essais, contrôle qualité, instrumentation et expertise.",
      path: "/a-propos",
    }),
    links: [{ rel: "canonical", href: "/a-propos" }],
  }),
  component: About,
});

/* Contenu général — À VÉRIFIER avec le client avant mise en ligne. */
const values = [
  { t: "Rigueur", d: "Des méthodes normalisées et des procédures suivies à chaque étape, du prélèvement au rapport.", icon: ClipboardCheck },
  { t: "Indépendance", d: "Un avis technique objectif, au service de la sécurité et de la durabilité de l'ouvrage.", icon: Scale },
  { t: "Traçabilité", d: "Des mesures enregistrées numériquement et des résultats documentés, vérifiables à tout moment.", icon: Database },
  { t: "Réactivité", d: "Des équipes basées à Tanger, mobilisables au plus près de vos chantiers.", icon: Timer },
];

const means = [
  { t: "Ingénieurs", d: "Conception des missions, interprétation des essais et rédaction des rapports.", icon: Users },
  { t: "Techniciens terrain", d: "Sondages, essais in situ, contrôles sur chantier et instrumentation.", icon: HardHat },
  { t: "Laboratoire", d: "Essais d'identification et essais mécaniques sur sols et matériaux.", icon: FlaskConical },
];

function About() {
  return (
    <>
      <PhotoHero
        size="lg"
        eyebrow="À propos"
        title="Un laboratoire né sur le terrain, au cœur du Nord marocain."
        intro="Nous aidons les maîtres d'ouvrage, entreprises et bureaux d'études à construire sur un sol connu, mesuré et maîtrisé."
        image={laboPhoto}
        crumbs={[{ label: "À propos" }]}
      >
        <Button asChild variant="devis" size="lg">
          <Link to="/contact">
            Nous contacter <BtnArrow />
          </Link>
        </Button>
        <Button asChild variant="outlineLight" size="lg">
          <Link to="/expertises">Nos expertises</Link>
        </Button>
      </PhotoHero>

      <Story />
      <Values />
      <Means />
      <Area />
      <Certifications />
      <CtaBand />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Story() {
  return (
    <section className="container-site section-y" aria-labelledby="story-t">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow text-primary">Qui sommes-nous</p>
            <h2 id="story-t" className="text-display-md mt-3 font-semibold">
              La géotechnique, au service de la solidité des ouvrages.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-[1.05rem] leading-relaxed">
              {fr(
                "LGTP est un laboratoire indépendant de géotechnique et de travaux publics basé à Tanger. Nous réalisons des études géotechniques, des reconnaissances de sol, des essais en place et en laboratoire, ainsi que le contrôle qualité des matériaux et des travaux.",
              )}
            </p>
            <p className="mt-4 text-[1.05rem] leading-relaxed">
              {fr(
                "Du bâtiment aux ouvrages portuaires, nous intervenons à chaque étape du projet pour fournir des données fiables et des recommandations claires, directement exploitables par les équipes de conception et de chantier.",
              )}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
              <div className="bg-card p-5">
                <dt className="eyebrow text-primary">Raison sociale</dt>
                <dd className="mt-1 font-display font-semibold text-heading">{site.legalName}</dd>
              </div>
              <div className="bg-card p-5">
                <dt className="eyebrow text-primary">Siège</dt>
                <dd className="mt-1 font-display font-semibold text-heading">{site.address.full}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="grid grid-cols-5 gap-4">
            <img
              src={cptuPhoto}
              alt="Essai au pénétromètre CPTU sur le terrain"
              width={900}
              height={1200}
              loading="lazy"
              decoding="async"
              className="col-span-3 aspect-[3/4] w-full rounded-3xl object-cover shadow-xl"
            />
            <div className="col-span-2 flex flex-col gap-4 pt-16">
              <img
                src={carottePhoto}
                alt="Carottes de sol présentant plusieurs couches"
                width={900}
                height={1350}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full rounded-3xl object-cover shadow-xl"
              />
              <div className="rounded-2xl bg-amber p-5 text-navy">
                <p className="font-display text-3xl font-semibold leading-none">06</p>
                <p className="mt-2 text-sm font-medium">domaines d'expertise complémentaires</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Values() {
  return (
    <section className="bg-secondary" aria-labelledby="values-t">
      <div className="container-site section-y">
        <Reveal>
          <p className="eyebrow text-primary">Nos valeurs</p>
          <h2 id="values-t" className="text-display-md mt-3 max-w-2xl font-semibold">
            Quatre principes qui guident chaque mission.
          </h2>
        </Reveal>
        <ol className="mt-12 divide-y rounded-3xl border bg-card">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal
                as="li"
                key={v.t}
                delay={i * 0.07}
                className="group grid items-center gap-4 px-6 py-7 transition-colors hover:bg-primary/[0.03] md:grid-cols-[90px_220px_1fr_auto] md:px-10"
              >
                <span className="font-display text-4xl font-semibold text-primary/20 tabular transition-colors group-hover:text-amber">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-semibold text-heading">{v.t}</h3>
                <p className="max-w-xl">{fr(v.d)}</p>
                <span className="hidden h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground md:flex">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Means() {
  return (
    <section className="relative bg-navy text-navy-foreground" aria-labelledby="means-t">
      <Sawtooth className="-mt-px text-secondary" flip />
      <div className="container-site section-y">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-3 text-amber">
              <span aria-hidden className="h-px w-8 bg-amber" />
              L'équipe et les moyens
            </p>
            <h2 id="means-t" className="text-display-md mt-4 font-semibold text-navy-foreground">
              Des compétences et des équipements réunis sous un même toit.
            </h2>
          </Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-navy-border bg-navy-border">
            {site.keyFigures.map((k, i) => (
              <Reveal key={k.label} delay={i * 0.06} className="flex flex-col-reverse bg-navy p-6">
                <dt className="mt-2 text-sm text-navy-muted">{k.label}</dt>
                <dd className="font-display text-4xl font-semibold text-amber">
                  <CountUp value={k.value} {...(k.suffix !== undefined ? { suffix: k.suffix } : {})} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {means.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal
                key={m.t}
                delay={i * 0.08}
                className="group rounded-2xl border border-navy-border p-7 transition-colors hover:border-amber/60"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber text-navy">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy-foreground">{m.t}</h3>
                <p className="mt-2 text-sm text-navy-muted">{fr(m.d)}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
      <Sawtooth className="text-background" />
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Area() {
  const reduce = useReducedMotion();
  return (
    <section className="container-site section-y" aria-labelledby="area-t">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            {[1, 0.78, 0.56, 0.34].map((scale, i) => (
              <motion.span
                key={scale}
                aria-hidden
                className="absolute inset-0 m-auto rounded-full border border-primary/20"
                style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
              />
            ))}
            {!reduce && (
              <motion.span
                aria-hidden
                className="absolute inset-0 m-auto h-1/3 w-1/3 rounded-full bg-amber/20"
                animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <div className="absolute inset-0 m-auto flex h-24 w-24 flex-col items-center justify-center rounded-full bg-navy text-navy-foreground shadow-2xl">
              <MapPin className="h-5 w-5 text-amber" aria-hidden />
              <span className="mt-1 font-display text-sm font-semibold">{site.address.city}</span>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow text-primary">Où nous intervenons</p>
            <h2 id="area-t" className="text-display-md mt-3 font-semibold">
              Basés à {site.address.city}, au plus près des chantiers du Nord.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            {/* À VÉRIFIER : zone d'intervention exacte avec le client. */}
            <p className="mt-6 text-[1.05rem] leading-relaxed">
              {fr(
                "Notre implantation à Tanger nous permet d'intervenir rapidement sur les projets de la région, des zones urbaines aux ouvrages portuaires. Pour les projets situés ailleurs au Maroc, contactez-nous : nous étudions chaque demande.",
              )}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <Button asChild variant="devis" className="mt-8">
              <Link to="/contact">
                Parler de votre projet <BtnArrow />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Certifications() {
  return (
    <section className="container-site pb-24" aria-labelledby="cert-t">
      <Reveal className="surface-card flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:p-10">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ShieldCheck className="h-7 w-7" aria-hidden />
        </span>
        <div className="flex-1">
          <h2 id="cert-t" className="font-display text-xl font-semibold text-heading">
            Agréments et accréditations
          </h2>
          <p className="mt-2 max-w-2xl">Informations disponibles sur demande, pour vos dossiers d'appel d'offres et de consultation.</p>
        </div>
        <Link to="/contact" className="link-underline shrink-0 font-display text-sm font-semibold text-primary">
          Nous les demander
        </Link>
      </Reveal>
    </section>
  );
}
