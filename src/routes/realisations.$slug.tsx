import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Briefcase, Calendar, Check, Flag, Layers, MapPin, Target, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import { projectBySlug, projects } from "@/data/projects";
import { serviceById } from "@/data/services";
import { PhotoHero } from "@/components/site/PhotoHero";
import { Media } from "@/components/site/Media";
import { ProjectCard } from "@/components/site/Cards";
import { CtaBand } from "@/components/site/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { Button, BtnArrow } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";
import { fr } from "@/lib/fr";

export const Route = createFileRoute("/realisations/$slug")({
  loader: ({ params }) => {
    const project = projectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? {
          ...pageHead({
            title: `${loaderData.project.title} — ${loaderData.project.type}`,
            description: loaderData.project.summary,
            path: `/realisations/${params.slug}`,
            type: "article",
          }),
          links: [{ rel: "canonical", href: `/realisations/${params.slug}` }],
        }
      : { meta: [{ title: "Réalisation introuvable — LGTP" }] },
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const prev = idx > 0 ? projects[idx - 1] : undefined;
  const next = idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : undefined;
  const others = projects.filter((x) => x.slug !== p.slug).slice(0, 2);
  const linkedServices = p.services.flatMap((id) => {
    const s = serviceById(id);
    return s ? [s] : [];
  });

  return (
    <>
      <PhotoHero
        eyebrow={p.type}
        title={p.title}
        intro={p.summary}
        crumbs={[{ label: "Réalisations", to: "/realisations" }, { label: p.title }]}
        meta={
          <>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber" aria-hidden />
              {p.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-amber" aria-hidden />
              {p.year}
            </span>
          </>
        }
      />

      <article className="container-site pb-24">
        {/* Visuel principal, chevauchant le hero */}
        <Reveal className="relative z-10 -mt-10 md:-mt-16">
          <Media
            src={p.imageSrc}
            alt={p.imageAlt}
            isRealPhoto={p.isRealPhoto}
            position={p.imagePosition}
            eager
            className="aspect-[16/10] rounded-3xl shadow-2xl md:aspect-[21/9]"
          />
        </Reveal>

        {/* Fiche projet */}
        <Reveal delay={0.05}>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border lg:grid-cols-4">
            <Fact icon={<Layers className="h-4 w-4" aria-hidden />} label="Type" value={p.type} />
            <Fact icon={<MapPin className="h-4 w-4" aria-hidden />} label="Localisation" value={p.location} />
            <Fact icon={<Calendar className="h-4 w-4" aria-hidden />} label="Année" value={String(p.year)} />
            <Fact icon={<Briefcase className="h-4 w-4" aria-hidden />} label="Prestations" value={String(linkedServices.length)} />
          </dl>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <div className="max-w-[70ch]">
            <ol className="relative space-y-12 border-l pl-10">
              <Step n={1} icon={<Flag className="h-4 w-4" aria-hidden />} title="Contexte">
                <p className="text-[1.05rem] leading-relaxed">{fr(p.context)}</p>
              </Step>
              <Step n={2} icon={<Target className="h-4 w-4" aria-hidden />} title="Mission réalisée">
                <p className="text-[1.05rem] leading-relaxed">{fr(p.mission)}</p>
              </Step>
              <Step n={3} icon={<Wrench className="h-4 w-4" aria-hidden />} title="Méthodes mises en œuvre">
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {p.methods.map((m) => (
                    <li key={m} className="flex gap-3 rounded-xl border bg-card px-4 py-3 text-[0.95rem]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber/20 text-heading">
                        <Check className="h-3 w-3" aria-hidden />
                      </span>
                      {fr(m)}
                    </li>
                  ))}
                </ul>
              </Step>
              <Step n={4} icon={<Check className="h-4 w-4" aria-hidden />} title="Résultat">
                <div className="rounded-2xl bg-navy p-6 text-navy-foreground">
                  <p className="leading-relaxed text-navy-foreground/90">{fr(p.outcome)}</p>
                </div>
              </Step>
            </ol>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            {linkedServices.length > 0 && (
              <div className="surface-card p-6">
                <h2 className="eyebrow text-primary">Prestations</h2>
                <ul className="mt-4 divide-y">
                  {linkedServices.map((s) => (
                    <li key={s.id}>
                      <Link
                        to="/expertises"
                        hash={s.id}
                        className="group flex items-center justify-between gap-3 py-3 font-display text-sm font-semibold text-heading"
                      >
                        {s.title}
                        <ArrowRight className="h-4 w-4 shrink-0 text-amber transition-transform group-hover:translate-x-1" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-2xl bg-navy p-6 text-navy-foreground">
              <p className="font-display font-semibold">{fr("Un projet similaire ?")}</p>
              <p className="mt-1 text-sm text-navy-muted">Décrivez-nous votre terrain, nous vous proposons la mission adaptée.</p>
              <Button asChild variant="devis" className="mt-5 w-full">
                <Link to="/contact">
                  Demander un devis <BtnArrow />
                </Link>
              </Button>
            </div>
          </aside>
        </div>

        {/* Précédent / suivant */}
        {(prev || next) && (
          <nav aria-label="Navigation entre réalisations" className="mt-20 grid gap-4 border-t pt-10 sm:grid-cols-2">
            {prev ? (
              <Link
                to="/realisations/$slug"
                params={{ slug: prev.slug }}
                className="surface-card group flex items-center gap-4 p-5 transition-colors hover:border-primary"
              >
                <ArrowLeft className="h-5 w-5 shrink-0 text-amber transition-transform group-hover:-translate-x-1" aria-hidden />
                <span className="min-w-0">
                  <span className="eyebrow block text-primary/70">Précédente</span>
                  <span className="line-clamp-1 font-display font-semibold text-heading">{prev.title}</span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                to="/realisations/$slug"
                params={{ slug: next.slug }}
                className="surface-card group flex items-center justify-end gap-4 p-5 text-right transition-colors hover:border-primary"
              >
                <span className="min-w-0">
                  <span className="eyebrow block text-primary/70">Suivante</span>
                  <span className="line-clamp-1 font-display font-semibold text-heading">{next.title}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-amber transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            )}
          </nav>
        )}
      </article>

      {others.length > 0 && (
        <section className="bg-secondary" aria-labelledby="others-t">
          <div className="container-site section-y">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-primary">À voir aussi</p>
                <h2 id="others-t" className="text-display-md mt-3 font-semibold">
                  Autres réalisations
                </h2>
              </div>
              <Link to="/realisations" className="link-underline shrink-0 font-display text-sm font-semibold text-primary">
                Toutes les réalisations
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {others.map((o, i) => (
                <Reveal key={o.slug} delay={i * 0.07} className="h-full">
                  <ProjectCard p={o} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}

function Fact({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="bg-card p-5">
      <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-primary/70">
        <span className="text-amber">{icon}</span>
        {label}
      </dt>
      <dd className="mt-2 font-display font-semibold text-heading">{value}</dd>
    </div>
  );
}

function Step({ n, icon, title, children }: { n: number; icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <Reveal as="li" className="relative">
      <span className="absolute -left-[59px] top-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-amber bg-background text-heading">
        {icon}
      </span>
      <p className="eyebrow text-primary">Étape {n}</p>
      <h2 className="mt-1 font-display text-2xl font-semibold text-heading">{title}</h2>
      <div className="mt-4">{children}</div>
    </Reveal>
  );
}