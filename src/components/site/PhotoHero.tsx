import type { ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { Sawtooth, TriangleField } from "@/components/motif/Motif";
import { Reveal } from "@/components/motion/Reveal";

type Crumb = { label: string; to?: LinkProps["to"] | undefined };

type Props = {
  title: string;
  eyebrow?: string | undefined;
  intro?: string | undefined;
  crumbs: Crumb[];
  /** Image importée (ex. depuis @/assets/generated). Sans image, le motif de triangles est affiché. */
  image?: string | undefined;
  imagePosition?: string | undefined;
  /** Ligne d'informations sous l'intro (catégorie, date…). */
  meta?: ReactNode | undefined;
  /** Boutons d'action. */
  children?: ReactNode | undefined;
  size?: "md" | "lg" | undefined;
};

/** Hero sombre réutilisable pour les pages intérieures, avec photo optionnelle et fil d'Ariane. */
export function PhotoHero({ title, eyebrow, intro, crumbs, image, imagePosition, meta, children, size = "md" }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
      {image ? (
        <>
          <img
            src={image}
            alt=""
            width={1920}
            height={900}
            fetchPriority="high"
            style={{ objectPosition: imagePosition ?? "70% center" }}
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-55"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--navy)_30%,rgba(15,30,61,0.6)_62%,rgba(15,30,61,0.15)_100%)]"
          />
        </>
      ) : (
        <TriangleField className="-z-10 opacity-50" />
      )}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-[linear-gradient(to_top,var(--navy),transparent)]" />

      <div className={size === "lg" ? "container-site pb-24 pt-36 md:pb-32 md:pt-44" : "container-site pb-20 pt-36 md:pb-24 md:pt-40"}>
        <Reveal>
          <nav aria-label="Fil d'Ariane">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-navy-muted">
              <li>
                <Link to="/" className="transition-colors hover:text-navy-foreground">
                  Accueil
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={`${c.label}-${i}`} className="flex items-center gap-2">
                  <span aria-hidden className="text-amber">
                    /
                  </span>
                  {c.to && i < crumbs.length - 1 ? (
                    <Link to={c.to} className="transition-colors hover:text-navy-foreground">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="line-clamp-1 max-w-[60vw] text-navy-foreground">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>

        {eyebrow && (
          <Reveal delay={0.06}>
            <p className="eyebrow mt-8 inline-flex items-center gap-3 text-amber">
              <span aria-hidden className="h-px w-8 bg-amber" />
              {eyebrow}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.12}>
          <h1
            className={`max-w-4xl font-display font-semibold leading-[1.08] tracking-tight text-navy-foreground ${
              eyebrow ? "mt-5" : "mt-8"
            } ${size === "lg" ? "text-4xl md:text-6xl" : "text-4xl md:text-5xl"}`}
          >
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.18}>
            <p className="mt-6 max-w-2xl text-lg text-navy-muted">{intro}</p>
          </Reveal>
        )}
        {meta && (
          <Reveal delay={0.22}>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-navy-muted">{meta}</div>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.26} className="mt-10 flex flex-col gap-3 sm:flex-row">
            {children}
          </Reveal>
        )}
      </div>
      <Sawtooth className="text-background" />
    </section>
  );
}
