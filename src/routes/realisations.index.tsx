import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Info, Plus } from "lucide-react";
import heroPhoto from "@/assets/generated/expertises-hero.png";
import { projectCategories, projects, type ProjectCategory } from "@/data/projects";
import { PhotoHero } from "@/components/site/PhotoHero";
import { ProjectCard } from "@/components/site/Cards";
import { CtaBand } from "@/components/site/CtaBand";
import { Button, BtnArrow } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/realisations/")({
  head: () => ({
    ...pageHead({
      title: "Réalisations : missions géotechniques et instrumentation",
      description:
        "Exemples de missions LGTP : suivi géotechnique G3 d'une tour R+18, instrumentation de talus portuaire, campagnes CPTU.",
      path: "/realisations",
    }),
    links: [{ rel: "canonical", href: "/realisations" }],
  }),
  component: Realisations,
});

type Filter = ProjectCategory | "tous";

const countFor = (id: Filter) => (id === "tous" ? projects.length : projects.filter((p) => p.categories.includes(id)).length);

function Realisations() {
  const reduce = useReducedMotion();
  const [cat, setCat] = useState<Filter>("tous");
  const list = cat === "tous" ? projects : projects.filter((p) => p.categories.includes(cat));

  return (
    <>
      <PhotoHero
        eyebrow="Réalisations"
        title="Des missions menées sur le terrain."
        intro="Quelques exemples représentatifs de nos interventions, du bâtiment aux ouvrages portuaires."
        image={heroPhoto}
        imagePosition="75% center"
        crumbs={[{ label: "Réalisations" }]}
      >
        <Button asChild variant="devis" size="lg">
          <Link to="/contact">
            Parler de votre projet <BtnArrow />
          </Link>
        </Button>
      </PhotoHero>

      <section className="container-site pb-24 pt-12 md:pt-16" aria-label="Liste des réalisations">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filtrer par type de projet" className="flex flex-wrap gap-2">
            {projectCategories.map((c) => {
              const n = countFor(c.id);
              const on = cat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCat(c.id)}
                  aria-pressed={on}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 font-display text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2",
                    on ? "border-navy bg-navy text-navy-foreground" : "bg-card text-heading hover:border-primary",
                  )}
                >
                  {c.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[0.7rem] tabular",
                      on ? "bg-amber text-navy" : "bg-secondary text-primary",
                    )}
                  >
                    {n}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-sm text-primary/70" aria-live="polite">
            {list.length} réalisation{list.length > 1 ? "s" : ""}
          </p>
        </div>

        <motion.ul layout={!reduce} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((p, i) => (
              <motion.li
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                {...(reduce ? {} : { exit: { opacity: 0, scale: 0.96 } })}
                transition={{ duration: 0.3, delay: reduce ? 0 : i * 0.04 }}
                className="h-full"
              >
                <ProjectCard p={p} />
              </motion.li>
            ))}
            {list.length === 0 && (
              <motion.li
                key="empty"
                layout={!reduce}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className="surface-card col-span-full flex flex-col items-center p-12 text-center"
              >
                <svg viewBox="0 0 40 35" aria-hidden className="h-9 w-9 text-amber">
                  <polygon points="0,0 40,0 20,35" fill="currentColor" />
                </svg>
                <p className="mt-4 font-display font-semibold text-heading">
                  Aucune réalisation publiée dans cette catégorie pour le moment.
                </p>
                <button
                  type="button"
                  onClick={() => setCat("tous")}
                  className="mt-4 font-display text-sm font-semibold text-primary"
                >
                  Voir toutes les réalisations
                </button>
              </motion.li>
            )}
            <motion.li key="cta" layout={!reduce} className="h-full">
              <Link
                to="/contact"
                className="group relative flex h-full min-h-72 flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-primary/30 p-8 text-center transition-colors duration-300 hover:border-navy hover:bg-navy"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber text-amber-foreground transition-transform duration-300 group-hover:rotate-90">
                  <Plus className="h-6 w-6" aria-hidden />
                </span>
                <h2 className="mt-5 text-xl font-semibold transition-colors group-hover:text-navy-foreground">Votre projet ici ?</h2>
                <p className="mt-2 text-sm transition-colors group-hover:text-navy-muted">
                  Parlez-nous de votre ouvrage et de votre terrain.
                </p>
              </Link>
            </motion.li>
          </AnimatePresence>
        </motion.ul>

        <p className="mt-10 flex items-start gap-2 text-xs text-primary/70">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          Les visuels marqués « Illustration » sont des images d'illustration et non des photos des chantiers concernés.
        </p>
      </section>

      <CtaBand />
    </>
  );
}