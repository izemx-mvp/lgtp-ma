import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** Hero illustration: soil profile with a CPTU cone descending. */
export function SoilProfileHero({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const layers = [
    { y: 120, h: 50, c: "fill-soil-1", label: "Remblai" },
    { y: 170, h: 70, c: "fill-soil-2", label: "Argile limoneuse" },
    { y: 240, h: 60, c: "fill-soil-3", label: "Sable fin" },
    { y: 300, h: 80, c: "fill-soil-4", label: "Marne" },
    { y: 380, h: 80, c: "fill-soil-5", label: "Substratum" },
  ];
  return (
    <svg viewBox="0 0 360 470" className={className} role="img" aria-label="Coupe de sol schématique traversée par un cône de pénétration CPTU">
      <defs>
        <pattern id="tri-tex" width="16" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 14 L8 0 L16 14" fill="none" className="stroke-navy-foreground" strokeOpacity="0.12" />
        </pattern>
        <clipPath id="profile-clip"><rect x="40" y="120" width="230" height="340" rx="14" /></clipPath>
      </defs>
      <g clipPath="url(#profile-clip)">
        {layers.map((l, i) => (
          <motion.g key={l.label} initial={{ opacity: 0, x: reduce ? 0 : -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}>
            <rect x="40" y={l.y} width="230" height={l.h} className={l.c} />
            <rect x="40" y={l.y} width="230" height={l.h} fill="url(#tri-tex)" />
          </motion.g>
        ))}
      </g>
      {layers.map((l, i) => (
        <motion.g key={l.label + "t"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.12 }}>
          <line x1="272" x2="290" y1={l.y + l.h / 2} y2={l.y + l.h / 2} className="stroke-navy-muted" strokeWidth="1" />
          <text x="294" y={l.y + l.h / 2 + 4} className="fill-navy-muted font-sans" fontSize="10">{l.label}</text>
        </motion.g>
      ))}
      {/* ground surface */}
      <path d="M20 120 H300" className="stroke-amber" strokeWidth="2" />
      {/* rig */}
      <rect x="140" y="40" width="30" height="70" rx="3" className="fill-primary" />
      <rect x="128" y="104" width="54" height="10" rx="2" className="fill-navy-foreground" opacity="0.8" />
      <path d="M155 20 L170 40 H140 Z" className="fill-amber" />
      {/* rods + cone */}
      <motion.g initial={{ y: reduce ? 210 : 0 }} animate={{ y: 210 }} transition={{ duration: reduce ? 0 : 2.6, delay: 0.6, ease: [0.45, 0, 0.2, 1] }}>
        <rect x="152" y="110" width="6" height="110" className="fill-navy-foreground" />
        <rect x="150" y="214" width="10" height="14" className="fill-navy-foreground" />
        <rect x="150" y="228" width="10" height="4" className="fill-amber" />
        <path d="M150 232 L160 232 L155 246 Z" className="fill-navy-foreground" />
      </motion.g>
      {/* qc curve */}
      <motion.path
        d="M70 120 C80 150, 64 170, 92 200 S 70 250, 110 270 S 96 330, 130 360 S 120 420, 150 450"
        fill="none"
        className="stroke-amber"
        strokeWidth="2"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 2.6, delay: 0.6, ease: [0.45, 0, 0.2, 1] }}
      />
      <text x="40" y="104" className="fill-navy-muted font-display" fontSize="10" letterSpacing="2">qc · fs · u</text>
    </svg>
  );
}

const coneParts = [
  { id: "pointe", label: "Pointe conique", text: "Mesure la résistance à la pénétration qc.", y: 250 },
  { id: "filtre", label: "Filtre de pression interstitielle", text: "Mesure la pression de l'eau u pendant l'enfoncement.", y: 196 },
  { id: "manchon", label: "Manchon de frottement", text: "Mesure le frottement latéral fs.", y: 130 },
];

/** Interactive CPTU cone diagram. */
export function CptuConeDiagram({ className, interactive = true }: { className?: string; interactive?: boolean }) {
  const [active, setActive] = useState<string | null>(interactive ? "pointe" : null);
  const current = coneParts.find((p) => p.id === active);
  return (
    <div className={cn("relative", className)}>
      <svg viewBox="0 0 220 300" className="mx-auto h-full w-full max-w-xs" role="img" aria-label="Schéma d'un cône CPTU : manchon, filtre et pointe">
        <rect x="90" y="0" width="40" height="90" className="fill-navy-muted" opacity="0.5" />
        <g
          tabIndex={interactive ? 0 : -1}
          role={interactive ? "button" : undefined}
          aria-label="Manchon de frottement"
          onMouseEnter={() => interactive && setActive("manchon")}
          onFocus={() => interactive && setActive("manchon")}
          onClick={() => interactive && setActive("manchon")}
          className="cursor-pointer outline-none"
        >
          <rect x="86" y="90" width="48" height="96" rx="2" className={cn("transition-colors", active === "manchon" ? "fill-primary" : "fill-navy-muted")} />
          {[0, 1, 2, 3, 4].map((i) => <line key={i} x1="86" x2="134" y1={104 + i * 18} y2={104 + i * 18} className="stroke-navy" strokeOpacity="0.2" />)}
        </g>
        <g tabIndex={interactive ? 0 : -1} role={interactive ? "button" : undefined} aria-label="Filtre de pression interstitielle"
          onMouseEnter={() => interactive && setActive("filtre")} onFocus={() => interactive && setActive("filtre")} onClick={() => interactive && setActive("filtre")}
          className="cursor-pointer outline-none">
          <rect x="86" y="186" width="48" height="16" className={cn("transition-colors", active === "filtre" ? "fill-amber" : "fill-amber/60")} />
        </g>
        <g tabIndex={interactive ? 0 : -1} role={interactive ? "button" : undefined} aria-label="Pointe conique"
          onMouseEnter={() => interactive && setActive("pointe")} onFocus={() => interactive && setActive("pointe")} onClick={() => interactive && setActive("pointe")}
          className="cursor-pointer outline-none">
          <path d="M86 202 L134 202 L110 290 Z" className={cn("transition-colors", active === "pointe" ? "fill-primary" : "fill-navy-muted")} />
        </g>
        {interactive && coneParts.map((p) => (
          <g key={p.id} opacity={active === p.id ? 1 : 0.35} className="transition-opacity">
            <line x1="140" x2="176" y1={p.y} y2={p.y} className="stroke-amber" strokeWidth="1.5" />
            <circle cx="180" cy={p.y} r="4" className="fill-amber" />
          </g>
        ))}
      </svg>
      {interactive && current && (
        <div role="status" className="surface-card mt-4 p-4 text-sm">
          <p className="font-display font-semibold text-heading">{current.label}</p>
          <p className="mt-1">{current.text}</p>
        </div>
      )}
    </div>
  );
}

/** Illustrative CPTU chart: qc / fs / u vs depth, draws on scroll. */
export function CptuChart({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const gen = (f: (d: number) => number) =>
    Array.from({ length: 61 }, (_, i) => `${i === 0 ? "M" : "L"}${f(i).toFixed(1)} ${(20 + i * 4.5).toFixed(1)}`).join(" ");
  const qc = gen((i) => 40 + 30 * Math.sin(i / 6) + i * 1.4 + (i > 40 ? 30 : 0) + Math.sin(i * 1.7) * 6);
  const fs = gen((i) => 200 + 18 * Math.sin(i / 5 + 1) + i * 0.4 + Math.cos(i * 2.1) * 4);
  const u = gen((i) => 300 + (i < 25 ? i * 1.2 : 30 - (i - 25) * 0.2) + Math.sin(i * 1.3) * 5);
  const curves = [
    { d: qc, cls: "stroke-primary", label: "qc (MPa)", x: 40 },
    { d: fs, cls: "stroke-amber", label: "fs (kPa)", x: 200 },
    { d: u, cls: "stroke-chart-3", label: "u (kPa)", x: 300 },
  ];
  return (
    <figure className={cn("surface-card p-5", className)}>
      <svg viewBox="0 0 400 310" className="w-full" role="img" aria-label="Exemple illustratif de profil CPTU : résistance de pointe, frottement et pression interstitielle en fonction de la profondeur">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <g key={i}>
            <line x1="30" x2="390" y1={20 + i * 45} y2={20 + i * 45} className="stroke-border" />
            <text x="4" y={24 + i * 45} fontSize="9" className="fill-muted-foreground tabular">{i * 5} m</text>
          </g>
        ))}
        {curves.map((c, i) => (
          <motion.path key={c.label} d={c.d} fill="none" className={c.cls} strokeWidth="1.8"
            initial={{ pathLength: reduce ? 1 : 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduce ? 0 : 1.6, delay: i * 0.15, ease: "easeOut" }} />
        ))}
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
        <span className="flex items-center gap-2"><i className="h-0.5 w-4 bg-primary" />qc — résistance de pointe</span>
        <span className="flex items-center gap-2"><i className="h-0.5 w-4 bg-amber" />fs — frottement latéral</span>
        <span className="flex items-center gap-2"><i className="h-0.5 w-4 bg-chart-3" />u — pression interstitielle</span>
        <span className="ml-auto rounded-full bg-muted px-2.5 py-1 font-medium text-muted-foreground">Exemple illustratif</span>
      </figcaption>
    </figure>
  );
}

/** Stylised geometric map of northern Morocco. */
export function NorthMap({ regions, className }: { regions: { id: string; name: string; x: number; y: number; primary?: boolean }[]; className?: string }) {
  return (
    <svg viewBox="0 0 400 280" className={className} role="img" aria-label={`Carte schématique du nord du Maroc : ${regions.map((r) => r.name).join(", ")}`}>
      <defs>
        <pattern id="sea" width="20" height="18" patternUnits="userSpaceOnUse">
          <path d="M0 18 L10 0 L20 18" fill="none" className="stroke-primary" strokeOpacity="0.12" />
        </pattern>
      </defs>
      <rect width="400" height="280" fill="url(#sea)" />
      <path d="M118 18 L150 26 L172 46 L210 60 L260 82 L320 90 L380 100 L400 112 L400 280 L20 280 L40 230 L58 180 L78 130 L96 80 L108 40 Z" className="fill-secondary stroke-primary" strokeOpacity="0.3" />
      <text x="40" y="70" fontSize="10" className="fill-primary/60 font-display" letterSpacing="2">ATLANTIQUE</text>
      <text x="240" y="40" fontSize="10" className="fill-primary/60 font-display" letterSpacing="2">MÉDITERRANÉE</text>
      {regions.map((r) => (
        <g key={r.id}>
          {r.primary && <circle cx={r.x} cy={r.y} r="18" className="fill-amber/25" />}
          <path d={`M${r.x} ${r.y - 7} L${r.x + 7} ${r.y + 5} L${r.x - 7} ${r.y + 5} Z`} className={r.primary ? "fill-amber" : "fill-primary"} />
          <text x={r.x + 10} y={r.y + 4} fontSize="11" className={cn("font-display", r.primary ? "fill-heading font-semibold" : "fill-foreground")}>{r.name}</text>
        </g>
      ))}
    </svg>
  );
}
