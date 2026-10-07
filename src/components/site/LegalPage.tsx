import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { PhotoHero } from "@/components/site/PhotoHero";
import { CtaBand } from "@/components/site/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export type LegalSection = { id: string; title: string; body: ReactNode };

type Props = {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

/** Mise en page commune aux pages légales : hero, sommaire collant avec suivi de lecture, sections numérotées. */
export function LegalPage({ title, intro, updated, sections }: Props) {
  const [active, setActive] = useState<string | undefined>(sections[0]?.id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-25% 0px -65% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  return (
    <>
      <PhotoHero eyebrow="Informations légales" title={title} intro={intro} crumbs={[{ label: title }]} />

      <div className="container-site grid gap-12 pb-24 pt-12 md:pt-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <nav aria-label="Sommaire" className="sticky top-28">
            <p className="eyebrow mb-4 text-primary">Sommaire</p>
            <ol className="space-y-1 border-l">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? "true" : undefined}
                    className={cn(
                      "-ml-px flex gap-3 border-l-2 py-1.5 pl-4 text-sm transition-colors",
                      active === s.id ? "border-amber font-semibold text-heading" : "border-transparent hover:text-heading",
                    )}
                  >
                    <span className="tabular text-primary/50">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-xs text-primary/60">Dernière mise à jour : {updated}</p>
          </nav>
        </aside>

        <div className="max-w-[72ch] space-y-12">
          {sections.map((s, i) => (
            <Reveal key={s.id}>
              <section id={s.id} className="scroll-mt-28" aria-labelledby={`${s.id}-t`}>
                <p className="font-display text-sm font-semibold tabular text-amber">{String(i + 1).padStart(2, "0")}</p>
                <h2 id={`${s.id}-t`} className="mt-1 font-display text-2xl font-semibold text-heading">
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-relaxed [&_a]:font-semibold [&_a]:text-primary [&_a:hover]:underline">
                  {s.body}
                </div>
              </section>
            </Reveal>
          ))}
          <p className="text-xs text-primary/60 lg:hidden">Dernière mise à jour : {updated}</p>
        </div>
      </div>

      <CtaBand />
    </>
  );
}

/** Tableau clé / valeur pour les informations d'identification. N'affiche pas les lignes vides. */
export function InfoTable({ rows }: { rows: [string, ReactNode][] }) {
  const visible = rows.filter(([, v]) => v !== "" && v !== null && v !== undefined);
  return (
    <dl className="overflow-hidden rounded-2xl border">
      {visible.map(([k, v], i) => (
        <div key={k} className={cn("grid gap-1 px-5 py-4 sm:grid-cols-[200px_1fr] sm:gap-6", i % 2 === 0 ? "bg-card" : "bg-secondary/60")}>
          <dt className="font-display text-sm font-semibold text-heading">{k}</dt>
          <dd className="text-sm">{v}</dd>
        </div>
      ))}
    </dl>
  );
}