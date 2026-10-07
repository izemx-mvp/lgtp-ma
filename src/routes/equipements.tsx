import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, FileCheck2, Database } from "lucide-react";
import { equipments, equipmentPhotos } from "@/data/equipments";
import { PageHero, SectionHeading } from "@/components/site/PageHero";
import { CptuChart, CptuConeDiagram } from "@/components/diagrams/Diagrams";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { Media } from "@/components/site/Media";
import { CtaBand } from "@/components/site/CtaBand";
import { CornerTriangle } from "@/components/motif/Motif";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { fr } from "@/lib/fr";

export const Route = createFileRoute("/equipements")({
  head: () => pageHead({
    title: "Équipements : pénétromètre CPTU, forage, laboratoire",
    description: "Pénétromètre statique CPTU à acquisition automatique (qc, fs, u), ateliers de sondage, laboratoire sols et matériaux, instrumentation inclinométrique.",
    path: "/equipements",
  }),
  component: Equipements,
});

function Equipements() {
  return (
    <>
      <PageHero eyebrow="Équipements" title="Des moyens de mesure fiables, des données traçables." intro="Le laboratoire investit dans des équipements d'investigation à haute résolution pour fournir des résultats fiables et documentés." crumbs={[{ label: "Équipements" }]} />

      <section className="container-site section-y" aria-labelledby="cptu-t">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Équipement phare" title="Pénétromètre statique CPTU" />
            <Reveal delay={0.08}>
              <p className="mt-5">Avec acquisition automatique des données, notre CPTU mesure en continu :</p>
              <ul className="mt-5 space-y-3">
                {[["qc", "la résistance de pointe du cône"], ["fs", "le frottement latéral sur le manchon"], ["u", "la pression interstitielle"]].map(([k, v]) => (
                  <li key={k} className="flex items-baseline gap-4"><span className="w-10 font-display text-xl font-semibold text-primary">{k}</span><span>{v}</span></li>
                ))}
              </ul>
              <p className="mt-5">L'enregistrement numérique est immédiat et sécurisé, pour un profil de sol fin et exploitable sans ressaisie.</p>
              <p className="mt-8 text-sm text-muted-foreground">Survolez ou touchez chaque partie du cône :</p>
            </Reveal>
            <Reveal delay={0.12} className="surface-card mt-4 p-6"><CptuConeDiagram className="h-72" /></Reveal>
          </div>
          <Reveal delay={0.1} className="lg:pt-24"><CptuChart /></Reveal>
        </div>
      </section>

      <section className="container-site pb-8">
        <div className="grid gap-5 md:grid-cols-3">
          {equipmentPhotos.map((p, i) => (
            <Reveal key={p.alt} delay={i * 0.07}><Media src={p.imageSrc} alt={p.alt} isRealPhoto={p.isRealPhoto} position={p.position} className="aspect-[4/3] rounded-2xl" /></Reveal>
          ))}
        </div>
      </section>

      <section className="container-site section-y" aria-labelledby="cat-t">
        <SectionHeading eyebrow="Nos moyens" title="Du forage au traitement des données." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {equipments.map((e, i) => (
            <Reveal key={e.id} delay={(i % 3) * 0.07}>
              <article className="group surface-card relative h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <CornerTriangle />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary"><ServiceIcon name={e.icon} className="h-6 w-6" /></div>
                <h3 className="mt-6 text-lg font-semibold">{e.title}</h3>
                <p className="mt-2 text-[0.95rem]">{fr(e.description)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary" aria-labelledby="norm-t">
        <div className="container-site section-y grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="Normes et méthode" title="Des méthodes normalisées, des résultats vérifiables." intro="Nos essais suivent des modes opératoires de référence. Chaque mesure est identifiée, datée et rattachée à son échantillon ou à son point d'essai." />
          <div className="grid gap-4 sm:grid-cols-3">
            {[{ i: FileCheck2, t: "Modes opératoires", d: "Essais conduits selon les normes de référence applicables." }, { i: Database, t: "Traçabilité", d: "Données brutes conservées et rattachées à chaque essai." }, { i: ShieldCheck, t: "Vérification", d: "Relecture technique des résultats avant diffusion." }].map((x, k) => (
              <Reveal key={x.t} delay={k * 0.07} className="surface-card p-6">
                <x.i className="h-6 w-6 text-primary" strokeWidth={1.6} aria-hidden />
                <h3 className="mt-4 text-base font-semibold">{x.t}</h3>
                <p className="mt-2 text-sm">{x.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
