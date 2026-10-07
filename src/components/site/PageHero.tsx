import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Sawtooth } from "@/components/motif/Motif";
import { Reveal } from "@/components/motion/Reveal";
import { fr } from "@/lib/fr";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs: { label: string; to?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      <div className="bg-motif absolute inset-0 opacity-60" aria-hidden />
      <div className="container-site relative pb-16 pt-36 md:pb-24 md:pt-44">
        <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-navy-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link to="/" className="link-underline hover:text-navy-foreground">Accueil</Link></li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                {c.to ? <Link to={c.to} className="link-underline hover:text-navy-foreground">{c.label}</Link> : <span aria-current="page" className="text-navy-foreground">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <Reveal>
          {eyebrow && <p className="eyebrow mb-4 text-amber">{eyebrow}</p>}
          <h1 className="text-display-lg max-w-4xl font-semibold text-navy-foreground">{fr(title)}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg text-navy-muted">{fr(intro)}</p>}
          {children}
        </Reveal>
      </div>
      <Sawtooth className="text-background" />
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro, className, light = false }: { eyebrow?: string; title: string; intro?: string; className?: string; light?: boolean }) {
  return (
    <Reveal className={className}>
      {eyebrow && <p className={light ? "eyebrow mb-3 text-amber" : "eyebrow mb-3 text-primary"}>{eyebrow}</p>}
      <h2 className={light ? "text-display-md max-w-3xl font-semibold text-navy-foreground" : "text-display-md max-w-3xl font-semibold"}>{fr(title)}</h2>
      {intro && <p className={light ? "mt-4 max-w-2xl text-navy-muted" : "mt-4 max-w-2xl"}>{fr(intro)}</p>}
    </Reveal>
  );
}
