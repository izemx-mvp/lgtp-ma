import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { posts } from "@/data/posts";
import { PhotoHero } from "@/components/site/PhotoHero";
import { Media } from "@/components/site/Media";
import { PostCard } from "@/components/site/Cards";
import { CtaBand } from "@/components/site/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { pageHead } from "@/lib/seo";
import { fr } from "@/lib/fr";
import { formatDateFr, formatReadingTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    ...pageHead({
      title: "Blog géotechnique : études de sol, essais, normes et instrumentation",
      description:
        "Articles pour comprendre la géotechnique : études de sol, missions G1 à G5, essais CPTU, contrôle de compactage et instrumentation des ouvrages.",
      path: "/blog",
    }),
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

const ALL = "Tous";
const PAGE = 6;

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

function BlogIndex() {
  const reduce = useReducedMotion();
  const [category, setCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE);

  const categories = useMemo(() => [ALL, ...Array.from(new Set(posts.map((p) => p.category)))], []);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return posts.filter((p) => {
      const inCat = category === ALL || p.category === category;
      const inQuery = !q || normalize(`${p.title} ${p.excerpt}`).includes(q);
      return inCat && inQuery;
    });
  }, [category, query]);

  const showFeatured = category === ALL && query.trim() === "";
  const featured = showFeatured ? filtered[0] : undefined;
  const rest = featured ? filtered.slice(1) : filtered;
  const shown = rest.slice(0, visible);

  const reset = () => {
    setCategory(ALL);
    setQuery("");
    setVisible(PAGE);
  };

  return (
    <>
      <PhotoHero
        eyebrow="Blog"
        title="Comprendre le sol, sécuriser vos ouvrages."
        intro="Des articles clairs sur la géotechnique, les essais et le contrôle qualité, pour mieux préparer vos projets."
        crumbs={[{ label: "Blog" }]}
      />

      <section className="container-site pb-24 pt-12 md:pt-16" aria-label="Articles du blog">
        {/* Filtres */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filtrer par catégorie" className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => {
                  setCategory(c);
                  setVisible(PAGE);
                }}
                className={cn(
                  "rounded-full border px-4 py-2 font-display text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2",
                  category === c ? "border-navy bg-navy text-navy-foreground" : "bg-card hover:border-primary hover:text-heading",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="relative block w-full lg:w-80">
            <span className="sr-only">Rechercher un article</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/60" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE);
              }}
              placeholder="Rechercher un article…"
              className="h-12 w-full rounded-full border bg-card pl-11 pr-4 text-heading outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>

        <p className="sr-only" aria-live="polite">
          {filtered.length} article{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
        </p>

        {/* Article à la une */}
        {featured && (
          <Reveal className="mt-12">
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="surface-card group grid overflow-hidden transition-shadow hover:shadow-xl lg:grid-cols-[1.15fr_1fr]"
            >
              <div className="relative overflow-hidden">
                <Media
                  src={featured.imageSrc}
                  alt={featured.title}
                  isRealPhoto={featured.isRealPhoto}
                  className="aspect-[16/10] h-full transition-transform duration-700 group-hover:scale-[1.03] lg:aspect-auto"
                />
                <span className="absolute left-5 top-5 rounded-full bg-amber px-3 py-1 font-display text-xs font-semibold text-navy">
                  À la une
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="eyebrow text-primary">{featured.category}</p>
                <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-heading md:text-3xl">
                  {fr(featured.title)}
                </h2>
                <p className="mt-4 line-clamp-3">{fr(featured.excerpt)}</p>
                <p className="mt-6 text-sm text-primary/70">
                  {formatDateFr(featured.date)} · {formatReadingTime(featured.readingTime)}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold text-primary">
                  Lire l'article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Grille */}
        {shown.length > 0 ? (
          <motion.ul layout={!reduce} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false}>
              {shown.map((p) => (
                <motion.li
                  key={p.slug}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  {...(reduce ? {} : { exit: { opacity: 0, scale: 0.97 } })}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <PostCard p={p} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          !featured && (
            <div className="surface-card mt-12 flex flex-col items-center px-6 py-16 text-center">
              <svg viewBox="0 0 40 35" aria-hidden className="h-10 w-10 text-amber">
                <polygon points="0,0 40,0 20,35" fill="currentColor" />
              </svg>
              <p className="mt-5 font-display text-lg font-semibold text-heading">Aucun article ne correspond à votre recherche.</p>
              <p className="mt-2 text-sm">Essayez un autre mot-clé ou une autre catégorie.</p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-primary"
              >
                <X className="h-4 w-4" aria-hidden /> Réinitialiser les filtres
              </button>
            </div>
          )
        )}

        {rest.length > visible && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE)}
              className="rounded-full border px-6 py-3 font-display text-sm font-semibold text-heading transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              Charger plus d'articles
            </button>
          </div>
        )}
      </section>

      <CtaBand />
    </>
  );
}
