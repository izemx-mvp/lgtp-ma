import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { projectCategories, projects, type ProjectCategory } from "@/data/projects";
import { PageHero } from "@/components/site/PageHero";
import { ProjectCard } from "@/components/site/Cards";
import { CtaBand } from "@/components/site/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/realisations/")({
  head: () => pageHead({
    title: "Réalisations : missions géotechniques et instrumentation",
    description: "Exemples de missions LGTP : suivi géotechnique G3 d'une tour R+18, instrumentation de talus portuaire, campagnes CPTU.",
    path: "/realisations",
  }),
  component: Realisations,
});

function Realisations() {
  const [cat, setCat] = useState<ProjectCategory | "tous">("tous");
  const list = cat === "tous" ? projects : projects.filter((p) => p.categories.includes(cat));
  return (
    <>
      <PageHero eyebrow="Réalisations" title="Des missions menées sur le terrain." intro="Quelques exemples représentatifs de nos interventions, du bâtiment aux ouvrages portuaires." crumbs={[{ label: "Réalisations" }]} />
      <section className="container-site section-y pt-12">
        <div role="group" aria-label="Filtrer par type de projet" className="flex flex-wrap gap-2">
          {projectCategories.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} aria-pressed={cat === c.id}
              className={cn("rounded-full border px-4 py-2 font-display text-sm font-medium transition-colors", cat === c.id ? "border-primary bg-primary text-primary-foreground" : "bg-card text-heading hover:border-primary")}>
              {c.label}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => <Reveal key={p.slug} delay={i * 0.06}><ProjectCard p={p} /></Reveal>)}
          {list.length === 0 && (
            <p className="surface-card col-span-full p-10 text-center">Aucune réalisation publiée dans cette catégorie pour le moment.</p>
          )}
          <Reveal>
            <Link to="/contact" className="group flex h-full min-h-72 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 p-8 text-center transition-colors hover:border-amber hover:bg-card">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber text-amber-foreground transition-transform group-hover:rotate-90"><Plus className="h-6 w-6" aria-hidden /></span>
              <h2 className="mt-5 text-xl font-semibold">Votre projet ici ?</h2>
              <p className="mt-2 text-sm">Parlez-nous de votre ouvrage et de votre terrain.</p>
            </Link>
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
