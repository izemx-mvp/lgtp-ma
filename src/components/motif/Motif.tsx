import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/** Sawtooth triangle edge used between sections. `fill` is a text-* class color via currentColor. */
export function Sawtooth({ className, flip = false }: { className?: string; flip?: boolean }) {
  const count = 40;
  const w = 1200 / count;
  let d = `M0 24`;
  for (let i = 0; i < count; i++) d += ` L${i * w + w / 2} 0 L${(i + 1) * w} 24`;
  d += " Z";
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      className={cn("block h-4 w-full md:h-6", flip && "rotate-180", className)}
    >
      <path d={d} fill="currentColor" />
    </svg>
  );
}

/** Decorative corner triangle for cards. Rotates on parent group hover. */
export function CornerTriangle({ className, amber = false }: { className?: string; amber?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 40"
      className={cn(
        "pointer-events-none absolute right-4 top-4 h-7 w-7 transition-transform duration-500 ease-out group-hover:rotate-[24deg]",
        className,
      )}
    >
      <path d="M20 4 L36 32 L4 32 Z" className={amber ? "fill-amber" : "fill-primary/15"} />
      <path d="M20 26 L27 14 L13 14 Z" className="fill-amber" opacity={amber ? 0 : 1} />
    </svg>
  );
}

/** Small mark derived from the logo (used in nav marker, loaders). */
export function TriMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 60 52" className={className}>
      <path d="M30 0 L45 24 L15 24 Z" className="fill-primary" />
      <path d="M16 27 L44 27 L30 50 Z" className="fill-amber" />
      <path d="M14 27 L28 50 L0 50 Z" className="fill-primary" />
      <path d="M46 27 L60 50 L32 50 Z" className="fill-primary" />
    </svg>
  );
}

type Tri = { x: number; y: number; up: boolean; amber: boolean; o: number };

function buildField(cols: number, rows: number): Tri[] {
  const out: Tri[] = [];
  let seed = 7;
  const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const up = (r + c) % 2 === 0;
      const v = rand();
      if (v < 0.42) continue;
      out.push({ x: c * 30, y: r * 52, up, amber: !up && v > 0.975, o: 0.05 + v * 0.14 });
    }
  }
  return out;
}

const FIELD = buildField(44, 14);

/** Hero tessellation: assembles on load, then drifts with scroll. */
export function TriangleField({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 120]);
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 1320 728"
      preserveAspectRatio="xMidYMid slice"
      className={cn("absolute inset-0 h-full w-full", className)}
      style={{ y }}
    >
      {FIELD.map((t, i) => {
        const d = t.up
          ? `M${t.x} ${t.y + 52} L${t.x + 30} ${t.y} L${t.x + 60} ${t.y + 52} Z`
          : `M${t.x} ${t.y} L${t.x + 60} ${t.y} L${t.x + 30} ${t.y + 52} Z`;
        return (
          <motion.path
            key={i}
            d={d}
            className={t.amber ? "fill-amber" : "fill-primary"}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4, y: 18 }}
            animate={{ opacity: t.amber ? 0.55 : t.o, scale: 1, y: 0 }}
            transition={{ duration: reduce ? 0.3 : 0.7, delay: reduce ? 0 : (i % 60) * 0.008 + Math.floor(i / 60) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${t.x + 30}px ${t.y + 26}px` }}
          />
        );
      })}
    </motion.svg>
  );
}
