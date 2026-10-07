// Règles typographiques françaises : espace insécable avant : ; ? ! et à l'intérieur des guillemets.
export const fr = (s: string) =>
  s
    .replace(/ ([:;?!])/g, "\u00a0$1")
    .replace(/« /g, "«\u00a0")
    .replace(/ »/g, "\u00a0»");
