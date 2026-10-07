import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { CornerTriangle } from "@/components/motif/Motif";
import { Media } from "./Media";
import { ServiceIcon } from "./ServiceIcon";
import type { Service } from "@/data/services";
import type { Project } from "@/data/projects";
import { formatDate, type Post } from "@/data/posts";
import { fr } from "@/lib/fr";
import { cn } from "@/lib/utils";

const lift = "group relative block surface-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift";

export function ServiceCard({ s }: { s: Service }) {
  return (
    <Link to="/expertises" hash={s.id} className={cn(lift, "h-full p-7")}>
      <CornerTriangle />
      <span className="tabular font-display text-sm font-semibold text-primary/50">{s.number}</span>
      <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
        <ServiceIcon name={s.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
      <p className="mt-3 text-[0.95rem]">{fr(s.short)}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-primary">
        En savoir plus <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link to="/realisations/$slug" params={{ slug: p.slug }} className={cn(lift, "h-full overflow-hidden")}>
      <Media src={p.imageSrc} alt={p.imageAlt} isRealPhoto={p.isRealPhoto} position={p.imagePosition} className="aspect-[4/3]" imgClassName="transition-transform duration-700 group-hover:scale-[1.03]" />
      <div className="p-6">
        <p className="eyebrow text-primary">{p.type}</p>
        <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
        <p className="mt-3 line-clamp-3 text-[0.95rem]">{fr(p.summary)}</p>
        <p className="mt-5 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" aria-hidden />{p.location}</span>
          <span className="tabular">{p.year}</span>
        </p>
      </div>
    </Link>
  );
}

export function PostCard({ p, featured = false }: { p: Post; featured?: boolean }) {
  return (
    <Link to="/blog/$slug" params={{ slug: p.slug }} className={cn(lift, "h-full overflow-hidden", featured && "md:grid md:grid-cols-2")}>
      <Media src={p.imageSrc} alt={p.imageAlt} isRealPhoto={p.isRealPhoto} className={featured ? "aspect-[16/10] md:aspect-auto md:h-full" : "aspect-[16/9]"} width={1280} height={720} imgClassName="transition-transform duration-700 group-hover:scale-[1.03]" />
      <div className={cn("p-6", featured && "md:flex md:flex-col md:justify-center md:p-10")}>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded-full bg-secondary px-2.5 py-1 font-semibold text-secondary-foreground">{p.category}</span>
          <time dateTime={p.date}>{formatDate(p.date)}</time>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden />{p.readingTime} min</span>
        </div>
        <h3 className={cn("mt-4 font-semibold", featured ? "text-2xl md:text-3xl" : "text-lg")}>{fr(p.title)}</h3>
        <p className="mt-3 line-clamp-3 text-[0.95rem]">{fr(p.excerpt)}</p>
      </div>
    </Link>
  );
}
