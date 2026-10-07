import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, Check, MapPin } from "lucide-react";
import { projectBySlug, projects } from "@/data/projects";
import { serviceById } from "@/data/services";
import { PageHero } from "@/components/site/PageHero";
import { Media } from "@/components/site/Media";
import { ProjectCard } from "@/components/site/Cards";
import { CtaBand } from "@/components/site/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
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
      ? pageHead({ title: `${loaderData.project.title} — ${loaderData.project.type}`, description: loaderData.project.summary, path: `/realisations/${params.slug}`, type: "article" })
      : { meta: [{ title: "Réalisation introuvable — LGTP" }] },
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  const others = projects.filter((x) => x.slug !== p.slug).slice(0, 2);
  return (
    <>
      <PageHero eyebrow={p.type} title={p.title} crumbs={[{ label: "Réalisations", to: "/realisations" }, { label: p.title }]}>
        <p className="mt-6 flex flex-wrap gap-5 text-sm text-navy-muted">
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-amber" aria-hidden />{p.location}</span>
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-amber" aria-hidden />{p.year}</span>
        </p>
      </PageHero>
      <article className="container-site section-y pt-12">
        <Reveal><Media src={p.imageSrc} alt={p.imageAlt} isRealPhoto={p.isRealPhoto} position={p.imagePosition} eager className="aspect-[21/9] rounded-2xl" /></Reveal>
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="max-w-[70ch] space-y-10">
            <section><h2 className="text-2xl font-semibold">Contexte</h2><p className="mt-3">{fr(p.context)}</p></section>
            <section><h2 className="text-2xl font-semibold">Mission réalisée</h2><p className="mt-3">{fr(p.mission)}</p></section>
            <section>
              <h2 className="text-2xl font-semibold">Méthodes mises en œuvre</h2>
              <ul className="mt-4 space-y-2.5">{p.methods.map((m) => <li key={m} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{fr(m)}</li>)}</ul>
            </section>
            <section><h2 className="text-2xl font-semibold">Résultat</h2><p className="mt-3">{fr(p.outcome)}</p></section>
          </div>
          <aside className="surface-card h-fit p-6 lg:sticky lg:top-28">
            <h2 className="eyebrow text-primary">Prestations</h2>
            <ul className="mt-4 space-y-2">
              {p.services.map((id) => { const s = serviceById(id); return s ? <li key={id}><Link to="/expertises" hash={s.id} className="link-underline font-display text-sm font-semibold text-heading">{s.title}</Link></li> : null; })}
            </ul>
          </aside>
        </div>
      </article>
      <section className="container-site pb-24">
        <h2 className="text-2xl font-semibold">Autres réalisations</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">{others.map((o) => <ProjectCard key={o.slug} p={o} />)}</div>
      </section>
      <CtaBand />
    </>
  );
}
