import { site } from "@/config/site";

export const OG_IMAGE = "/og-lgtp.jpg";

export function pageHead(opts: { title: string; description: string; path: string; type?: string }) {
  const title = opts.title.includes("LGTP") ? opts.title : `${opts.title} — LGTP`;
  return {
    meta: [
      { title },
      { name: "description", content: opts.description },
      { property: "og:title", content: title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: opts.type ?? "website" },
      { property: "og:url", content: opts.path },
      { property: "og:locale", content: "fr_MA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: opts.description },
    ],
    links: [{ rel: "canonical", href: opts.path }],
  };
}

export function localBusinessJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: site.legalName,
    alternateName: site.shortName,
    description: site.description,
    slogan: site.tagline,
    image: OG_IMAGE,
    logo: "/lgtp-logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: "MA",
    },
    areaServed: "Maroc",
  };
  if (site.phone) data["telephone"] = site.phone;
  if (site.email) data["email"] = site.email;
  if (site.foundingYear) data["foundingDate"] = site.foundingYear;
  if (site.social.length) data["sameAs"] = site.social.map((s) => s.href);
  return { type: "application/ld+json", children: JSON.stringify(data) };
}
