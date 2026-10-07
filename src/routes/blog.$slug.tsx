import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Clock, Copy, Info, Linkedin, MessageCircle } from "lucide-react";
import { postBySlug, posts } from "@/data/posts";
import { PhotoHero } from "@/components/site/PhotoHero";
import { PostCard } from "@/components/site/Cards";
import { CtaBand } from "@/components/site/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { Button, BtnArrow } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";
import { fr } from "@/lib/fr";
import { formatDateFr, formatReadingTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? {
          ...pageHead({
            title: loaderData.post.seo.title,
            description: loaderData.post.seo.description,
            path: `/blog/${params.slug}`,
            type: "article",
          }),
          links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
          scripts: [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: loaderData.post.title,
                description: loaderData.post.excerpt,
                datePublished: loaderData.post.date,
                author: { "@type": "Organization", name: "Équipe LGTP" },
                publisher: { "@type": "Organization", name: "LGTP" },
                mainEntityOfPage: `/blog/${params.slug}`,
              }),
            },
          ],
        }
      : { meta: [{ title: "Article introuvable — LGTP" }] },
  component: Article,
});

type Post = (typeof posts)[number];
type Block = Post["content"][number];

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | undefined>(ids[0]);
  useEffect(() => {
    if (ids.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-20% 0px -70% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function Article() {
  const { post } = Route.useLoaderData();

  const headings = post.content.flatMap((b) => (b.type === "h2" ? [{ id: b.id, text: b.text }] : []));
  const [headingIds] = useState(() => headings.map((h) => h.id));
  const active = useActiveHeading(headingIds);

  const related = [...posts]
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);

  return (
    <>
      <PhotoHero
        eyebrow={post.category}
        title={fr(post.title)}
        intro={fr(post.excerpt)}
        image={post.imageSrc}
        crumbs={[{ label: "Blog", to: "/blog" }, { label: post.title }]}
        meta={
          <>
            <span>Par Équipe LGTP</span>
            <span aria-hidden className="text-amber">▲</span>
            <time dateTime={post.date}>{formatDateFr(post.date)}</time>
            <span aria-hidden className="text-amber">▲</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden />
              {formatReadingTime(post.readingTime)}
            </span>
          </>
        }
      />

      <div className="container-site grid gap-12 pb-24 pt-12 md:pt-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
        <div className="min-w-0">
          {/* Sommaire mobile */}
          {headings.length > 0 && (
            <details className="surface-card group mb-10 px-5 py-4 lg:hidden">
              <summary className="cursor-pointer list-none font-display text-sm font-semibold text-heading">
                <span className="flex items-center justify-between">
                  Sommaire
                  <span aria-hidden className="text-amber transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </span>
              </summary>
              <ol className="mt-4 space-y-2 text-sm">
                {headings.map((h, i) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="flex gap-3 hover:text-heading">
                      <span className="tabular text-primary/50">{String(i + 1).padStart(2, "0")}</span>
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          )}

          <article className="max-w-[70ch]">
            {post.content.map((b, i) => (
              <BlockView key={i} b={b} first={i === 0} />
            ))}

            <div className="mt-14 rounded-2xl border border-dashed border-primary/40 p-6 text-sm">
              <p className="flex gap-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span>
                  Cet article est fourni à titre informatif. Il ne remplace pas une étude géotechnique adaptée à votre
                  terrain et à votre projet.
                </span>
              </p>
            </div>
          </article>

          <ShareBar title={post.title} className="mt-10 lg:hidden" />

          <Reveal className="mt-14 overflow-hidden rounded-3xl bg-navy p-8 text-navy-foreground md:p-10">
            <p className="eyebrow text-amber">{fr("Un projet en cours ?")}</p>
            <p className="mt-3 max-w-xl font-display text-2xl font-semibold">
              Nos ingénieurs vous aident à définir la mission géotechnique adaptée.
            </p>
            <Button asChild variant="devis" className="mt-6">
              <Link to="/contact">
                Demander un devis <BtnArrow />
              </Link>
            </Button>
          </Reveal>

          <Link
            to="/blog"
            className="mt-10 inline-flex items-center gap-2 font-display text-sm font-semibold text-primary hover:text-heading"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Retour au blog
          </Link>
        </div>

        {/* Colonne latérale (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-8">
            {headings.length > 0 && (
              <nav aria-label="Sommaire de l'article">
                <p className="eyebrow mb-4 text-primary">Sommaire</p>
                <ol className="space-y-1 border-l">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        aria-current={active === h.id ? "true" : undefined}
                        className={cn(
                          "-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors",
                          active === h.id ? "border-amber font-semibold text-heading" : "border-transparent hover:text-heading",
                        )}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <ShareBar title={post.title} />
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="bg-secondary" aria-labelledby="related-t">
          <div className="container-site section-y">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-primary">À lire aussi</p>
                <h2 id="related-t" className="text-display-md mt-3 font-semibold">
                  Articles similaires
                </h2>
              </div>
              <Link to="/blog" className="link-underline shrink-0 font-display text-sm font-semibold text-primary">
                Tout le blog
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.07} className="h-full">
                  <PostCard p={p} />
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

/* ------------------------------------------------------------------ */
/* Rendu des blocs de contenu                                          */
/* ------------------------------------------------------------------ */

function BlockView({ b, first }: { b: Block; first: boolean }) {
  switch (b.type) {
    case "p":
      return (
        <p
          className={cn(
            "mt-5 text-[1.075rem] leading-[1.8]",
            first && "mt-0 text-xl leading-relaxed text-heading",
          )}
        >
          {fr(b.text)}
        </p>
      );
    case "h2":
      return (
        <h2 id={b.id} className="mt-14 scroll-mt-28 font-display text-2xl font-semibold leading-tight text-heading md:text-[1.75rem]">
          <span aria-hidden className="mr-3 inline-block h-3 w-3 -translate-y-0.5 rotate-180 align-middle text-amber">
            <svg viewBox="0 0 20 18" className="h-3 w-3">
              <polygon points="0,18 10,0 20,18" fill="currentColor" />
            </svg>
          </span>
          {b.text}
        </h2>
      );
    case "list":
      return (
        <ul className="mt-5 space-y-3">
          {b.items.map((x) => (
            <li key={x} className="flex gap-3 text-[1.05rem] leading-relaxed">
              <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-amber" />
              <span>{fr(x)}</span>
            </li>
          ))}
        </ul>
      );
    case "takeaways":
      return (
        <aside className="mt-10 rounded-2xl bg-navy p-7 text-navy-foreground" aria-label="À retenir">
          <p className="eyebrow text-amber">À retenir</p>
          <ul className="mt-4 space-y-3">
            {b.items.map((x) => (
              <li key={x} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber text-navy">
                  <Check className="h-3 w-3" aria-hidden />
                </span>
                <span className="text-navy-foreground/90">{fr(x)}</span>
              </li>
            ))}
          </ul>
        </aside>
      );
    case "callout":
      return (
        <div className="mt-8 rounded-2xl border-l-4 border-amber bg-secondary px-6 py-5">
          <p className="font-display font-semibold text-heading">{b.title}</p>
          <p className="mt-2 leading-relaxed">{fr(b.text)}</p>
        </div>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* Partage                                                             */
/* ------------------------------------------------------------------ */

function ShareBar({ title, className }: { title: string; className?: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* presse-papiers indisponible : on ignore */
    }
  };

  const btn =
    "flex h-10 w-10 items-center justify-center rounded-full border bg-card text-heading transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground";

  return (
    <div className={className}>
      <p className="eyebrow mb-3 text-primary">Partager</p>
      <div className="flex items-center gap-2">
        <button type="button" onClick={copy} className={btn} aria-label={copied ? "Lien copié" : "Copier le lien"}>
          {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
        </button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
          aria-label="Partager sur WhatsApp"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
          aria-label="Partager sur LinkedIn"
        >
          <Linkedin className="h-4 w-4" aria-hidden />
        </a>
        <span aria-live="polite" className="ml-1 text-xs text-primary">
          {copied ? "Lien copié" : ""}
        </span>
      </div>
    </div>
  );
}