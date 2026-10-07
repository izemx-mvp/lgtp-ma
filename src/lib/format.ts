/** Date au format français long (« 12 mars 2026 »). Renvoie la valeur brute si elle n'est pas une date valide. */
export function formatDateFr(value: string | Date): string {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

/** Temps de lecture : accepte un nombre de minutes ou une chaîne déjà formatée. */
export function formatReadingTime(value: number | string): string {
  return typeof value === "number" ? `${value} min de lecture` : value;
}
