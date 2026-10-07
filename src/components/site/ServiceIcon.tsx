import { Activity, Box, Database, Drill, FlaskConical, Gauge, Layers, SearchCheck, ShieldCheck } from "lucide-react";

const map = {
  layers: Layers,
  drill: Drill,
  flask: FlaskConical,
  check: ShieldCheck,
  activity: Activity,
  search: SearchCheck,
  gauge: Gauge,
  box: Box,
  database: Database,
} as const;

export function ServiceIcon({ name, className }: { name: keyof typeof map; className?: string }) {
  const Icon = map[name];
  return <Icon aria-hidden strokeWidth={1.6} className={className} />;
}
