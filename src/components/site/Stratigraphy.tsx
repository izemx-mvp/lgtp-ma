import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { fr } from "@/lib/fr";

const phases = [
  { title: "Reconnaissance", text: "Visite, enquête documentaire et programme d'investigations adapté au projet.", depth: "0 – 2 m", color: "bg-soil-1" },
  { title: "Essais en place", text: "Sondages, CPTU et essais in situ pour mesurer le terrain tel qu'il est.", depth: "2 – 6 m", color: "bg-soil-2" },
  { title: "Essais en laboratoire", text: "Identification et comportement mécanique des échantillons prélevés.", depth: "6 – 12 m", color: "bg-soil-3" },
  { title: "Étude et dimensionnement", text: "Modèle géotechnique et recommandations de fondations.", depth: "12 – 20 m", color: "bg-soil-4" },
  { title: "Suivi et contrôle d'exécution", text: "Réception des fonds de fouille, contrôle du compactage et des matériaux.", depth: "20 – 30 m", color: "bg-soil-5" },
  { title: "Auscultation", text: "Instrumentation et suivi du comportement de l'ouvrage dans le temps.", depth: "> 30 m", color: "bg-soil-6" },
];

function Layer({ i, progress, reduce }: { i: number; progress: MotionValue<number>; reduce: boolean | null }) {
  const start = i / phases.length;
  const end = start + 1 / phases.length;
  const scaleX = useTransform(progress, [start, end], [reduce ? 1 : 0, 1]);
  const opacity = useTransform(progress, [start, start + 0.6 / phases.length], [reduce ? 1 : 0.15, 1]);
  const p = phases[i];
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-stretch gap-6 md:gap-10">
      <div className="relative overflow-hidden rounded-md">
        <motion.div style={{ scaleX }} className={`${p.color} bg-motif absolute inset-0 origin-left`} />
        <div className="relative flex h-full min-h-16 items-center justify-between px-4 py-3">
          <span className="tabular font-display text-xs font-semibold text-navy-foreground/90">{String(i + 1).padStart(2, "0")}</span>
          <span className="tabular text-xs text-navy-foreground/80">{p.depth}</span>
        </div>
      </div>
      <motion.div style={{ opacity }} className="py-1">
        <h3 className="text-lg font-semibold text-navy-foreground">{fr(p.title)}</h3>
        <p className="mt-1 text-sm text-navy-muted">{fr(p.text)}</p>
      </motion.div>
    </div>
  );
}

export function Stratigraphy() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  return (
    <div ref={ref} className="space-y-2">
      <div className="mb-4 h-0.5 w-full bg-amber" aria-hidden />
      {phases.map((_, i) => <Layer key={i} i={i} progress={scrollYProgress} reduce={reduce} />)}
    </div>
  );
}

/** Thin vertical soil-column scroll progress (used on long pages). */
export function SoilProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  if (reduce) return null;
  return (
    <div aria-hidden className="fixed left-0 top-0 z-40 hidden h-screen w-1.5 bg-border/60 lg:block">
      <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-[linear-gradient(to_bottom,var(--soil-1),var(--soil-3),var(--soil-6))]" />
    </div>
  );
}
