import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Database, FileCheck2, ShieldCheck } from "lucide-react";
import cptuPhoto from "@/assets/generated/cptu-terrain.png";
import { equipments, equipmentPhotos } from "@/data/equipments";
import { SectionHeading } from "@/components/site/PageHero";
import { PhotoHero } from "@/components/site/PhotoHero";
import { CptuChart, CptuConeDiagram } from "@/components/diagrams/Diagrams";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { Media } from "@/components/site/Media";
import { CtaBand } from "@/components/site/CtaBand";
import { CornerTriangle, Sawtooth } from "@/components/motif/Motif";
import { Reveal } from "@/components/motion/Reveal";
import { Button, BtnArrow } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";
import { fr } from "@/lib/fr";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/equipements")({
  head: () => ({
    ...pageHead({
      title: "Équipements : pénétromètre CPTU, forage, laboratoire",
      description:
        "Pénétromètre statique CPTU à acquisition automatique (qc, fs, u), ateliers de sondage, laboratoire sols et matériaux, instrumentation inclinométrique.",
      path: "/equipements",
    }),
    links: [
      { rel: "canonical", href: "/equipements" },
      { rel: "preload", as: "image", href: cptuPhoto },
    ],
  }),
  component: Equipements,
});

/* ------------------------------------------------------------------ */
/* Contenu                                                             */
/* ------------------------------------------------------------------ */

const readings = [
  { k: "qc", l: "Résistance de pointe", d: "Résistance du sol à l'enfoncement du cône." },
  { k: "fs", l: "Frottement latéral", d: "Frottement mobilisé le long du manchon." },
  { k: "u", l: "Pression interstitielle", d: "Pression de l'eau dans les pores du sol." },
];

/** Déroulement général d'un essai CPTU (contenu pédagogique). */
const cptuSteps = [
  { t: "Mise en station", d: "Implantation du point d'essai et calage de la machine." },
  { t: "Fonçage", d: "Le cône est enfoncé à vitesse constante dans le sol." },
  { t: "Acquisition", d: "qc, fs et u sont enregistrés en continu avec la profondeur." },
  { t: "Exploitation", d: "Profil de sol fin, interprété et intégré au rapport." },
];

const pipeline = ["Point d'essai", "Mesure", "Enregistrement", "Vérification", "Rapport"];

const method = [
  { icon: FileCheck2, t: "Modes opératoires", d: "Essais conduits selon les normes de référence applicables." },
  { icon: Database, t: "Traçabilité", d: "Données brutes conservées et rattachées à chaque essai." },
  { icon: ShieldCheck, t: "Vérification", d: "Relecture technique des résultats avant diffusion." },
];

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function Equipements() {
  return (
    <>
      <PhotoHero
        size="lg"
        eyebrow="Équipements"
        title="Des moyens de mesure fiables, des données traçables."
        intro="Le laboratoire investit dans des équipements d'investigation à haute résolution pour fournir des résultats fiables et documentés."
        image={cptuPhoto}
        imagePosition="75% center"
        crumbs={[{ label: "Équipements" }]}
      >
        <Button asChild variant="devis" size="lg">
          <Link to="/contact">
            Demander un devis <BtnArrow />
          </Link>
        </Button>
        <Button asChild variant="outlineLight" size="lg">
          <a href="#cptu">Découvrir le CPTU</a>
        </Button>
      </PhotoHero>

      <Cptu />
      <Gallery />
      <Catalogue />
      <Method />
      <CtaBand />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* CPTU                                                                */
/* ------------------------------------------------------------------ */

function Cptu() {
  return (
    <section id="cptu" className="container-site section-y scroll-mt-28" aria-label="Pénétromètre statique CPTU">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow="Équipement phare" title="Pénétromètre statique CPTU" />
          <Reveal delay={0.08}>
            <p className="mt-5 text-[1.05rem]">
              Avec acquisition automatique des données, notre CPTU mesure en continu trois grandeurs, pour un profil de sol
              fin et exploitable sans ressaisie.
            </p>
          </Reveal>

          <ul className="mt-8 grid gap-3">
            {readings.map((r, i) => (
              <Reveal
                as="li"
                key={r.k}
                delay={0.1 + i * 0.07}
                className="surface-card group flex items-center gap-5 p-4 transition-colors hover:border-primary/50"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy font-display text-lg font-semibold italic text-amber transition-transform duration-300 group-hover:-rotate-6">
                  {r.k}
                </span>
                <div>
                  <p className="font-display font-semibold text-heading">{r.l}</p>
                  <p className="text-sm">{fr(r.d)}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3}>
            <h3 className="eyebrow mt-12 text-primary">Déroulement d'un essai</h3>
          </Reveal>
          <ol className="relative mt-5 space-y-6 border-l pl-8">
            {cptuSteps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={0.32 + i * 0.07} className="relative">
                <span className="absolute -left-[45px] top-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-amber bg-background font-display text-xs font-semibold text-heading tabular">
                  {i + 1}
                </span>
                <p className="font-display font-semibold text-heading">{s.t}</p>
                <p className="mt-1 text-sm">{fr(s.d)}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <Reveal delay={0.1} className="surface-card relative overflow-hidden p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <p className="eyebrow text-primary">Profil CPTU</p>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs">Exemple illustratif</span>
            </div>
            <CptuChart />
          </Reveal>
          <Reveal delay={0.16} className="rounded-3xl bg-navy p-6 text-navy-foreground shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <p className="eyebrow text-amber">Anatomie du cône</p>
              <span className="text-xs text-navy-muted">Survolez ou touchez chaque partie</span>
            </div>
            <div className="rounded-2xl bg-card p-4">
              <CptuConeDiagram className="h-64" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Galerie photo (bento)                                               */
/* ------------------------------------------------------------------ */

function Gallery() {
  if (equipmentPhotos.length === 0) return null;
  return (
    <section className="container-site pb-8" aria-label="Galerie des équipements">
      <div className="grid gap-5 md:auto-rows-[220px] md:grid-cols-3">
        {equipmentPhotos.map((p, i) => (
          <Reveal
            key={p.alt}
            delay={i * 0.07}
            className={cn("group relative overflow-hidden rounded-2xl", i === 0 && "md:col-span-2 md:row-span-2")}
          >
            <Media
              src={p.imageSrc}
              alt={p.alt}
              isRealPhoto={p.isRealPhoto}
              position={p.position}
              className="aspect-[4/3] h-full w-full transition-transform duration-700 group-hover:scale-[1.04] md:aspect-auto"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(15,30,61,0.55),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <p className="pointer-events-none absolute bottom-4 left-5 right-5 translate-y-2 font-display text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {p.alt}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Catalogue des moyens                                                */
/* ------------------------------------------------------------------ */

function Catalogue() {
  return (
    <section className="container-site section-y" aria-label="Nos moyens">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <SectionHeading
          eyebrow="Nos moyens"
          title="Du forage au traitement des données."
          intro="Des moyens complémentaires pour couvrir chaque étape de la reconnaissance et du contrôle."
        />
        <p aria-hidden className="font-display text-7xl font-semibold leading-none text-primary/15 md:text-8xl">
          {pad(equipments.length)}
        </p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {equipments.map((e, i) => (
          <Reveal key={e.id} delay={(i % 3) * 0.07} className="h-full">
            <article className="group surface-card relative h-full overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-navy hover:shadow-lift">
              <CornerTriangle />
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-amber group-hover:text-navy">
                  <ServiceIcon name={e.icon} className="h-6 w-6" />
                </div>
                <span className="font-display text-sm font-semibold tabular text-primary/40 transition-colors group-hover:text-amber">
                  {pad(i + 1)}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold transition-colors duration-300 group-hover:text-navy-foreground">{e.title}</h3>
              <p className="mt-2 text-[0.95rem] transition-colors duration-300 group-hover:text-navy-muted">{fr(e.description)}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Normes et méthode                                                   */
/* ------------------------------------------------------------------ */

function Method() {
  const reduce = useReducedMotion();
  return (
    <section className="relative bg-navy text-navy-foreground" aria-label="Normes et méthode">
      <Sawtooth className="-mt-px text-background" flip />
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div className="container-site section-y relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            light
            eyebrow="Normes et méthode"
            title="Des méthodes normalisées, des résultats vérifiables."
            intro="Nos essais suivent des modes opératoires de référence. Chaque mesure est identifiée, datée et rattachée à son échantillon ou à son point d'essai."
          />
        </div>

        {/* Chaîne de la donnée */}
        <div className="relative mt-14">
          <div aria-hidden className="absolute left-0 right-0 top-[18px] hidden h-px bg-navy-border md:block" />
          <motion.div
            aria-hidden
            className="absolute left-0 right-0 top-[18px] hidden h-px origin-left bg-amber md:block"
            initial={{ scaleX: reduce ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          <ol className="relative grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
            {pipeline.map((p, i) => (
              <Reveal as="li" key={p} delay={0.1 + i * 0.12} className="flex flex-col items-start md:items-center md:text-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber font-display text-sm font-semibold text-navy tabular">
                  {i + 1}
                </span>
                <span className="mt-3 font-display text-sm font-semibold text-navy-foreground">{p}</span>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {method.map((x, k) => {
            const Icon = x.icon;
            return (
              <Reveal
                key={x.t}
                delay={k * 0.08}
                className="rounded-2xl border border-navy-border p-7 transition-colors hover:border-amber/60"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-foreground/10 text-amber">
                  <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-navy-foreground">{x.t}</h3>
                <p className="mt-2 text-sm text-navy-muted">{fr(x.d)}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
      <Sawtooth className="text-background" />
    </section>
  );
}