// Données centrales de l'entreprise. Toutes les valeurs sont à faire valider par LGTP.
export type Accreditation = { label: string; enabled: boolean; detail?: string };
export type KeyFigure = { value: number; suffix?: string; label: string };

export const site = {
  shortName: "LGTP",
  name: "Laboratoire de Géotechnique et Travaux Publics", // À VÉRIFIER
  legalName: "LGTP — Laboratoire de Géotechnique et Travaux Publics SARL", // À VÉRIFIER
  legalForm: "SARL", // À VÉRIFIER
  tagline: "Géotechnique, Essais et Expertises",
  description:
    "Laboratoire de géotechnique à Tanger : études géotechniques, reconnaissance des sols, essais en place et en laboratoire, contrôle qualité, instrumentation et expertise pour le bâtiment, les ports, les routes et les infrastructures.",
  address: {
    street: "Zone Industrielle Gzenaya, Lot n° 416", // À VÉRIFIER
    city: "Tanger", // À VÉRIFIER
    country: "Maroc",
    full: "Zone Industrielle Gzenaya, Lot n° 416, Tanger", // À VÉRIFIER
  },
  phone: "+212 6 61 05 80 46", // À VÉRIFIER
  phoneHref: "tel:+212661058046", // À VÉRIFIER
  email: "lgtpcontact@gmail.com", // À VÉRIFIER
  whatsapp: "212661058046", // À VÉRIFIER — même numéro que le téléphone
  whatsappMessage: "Bonjour LGTP, je souhaite un renseignement / un devis pour un projet.",
  hours: [
    { days: "Lundi – Vendredi", time: "8 h 30 – 18 h 00" }, // CONTENU EXEMPLE À REMPLACER
    { days: "Samedi", time: "9 h 00 – 13 h 00" }, // CONTENU EXEMPLE À REMPLACER
  ],
  social: [] as { label: string; href: string }[], // À VÉRIFIER — vide par défaut
  foundingYear: "", // À VÉRIFIER — non affiché si vide
  capital: "", // À VÉRIFIER — non affiché si vide
  rc: "", // À VÉRIFIER
  ice: "", // À VÉRIFIER
  host: "Lovable (hébergement web)", // À VÉRIFIER
  accreditations: [] as Accreditation[], // À VÉRIFIER — aucune affichée par défaut
  // CONTENU EXEMPLE À REMPLACER — chiffres illustratifs à confirmer par LGTP
  keyFigures: [
    { value: 15, suffix: "+", label: "Années d'expérience" },
    { value: 1200, suffix: "+", label: "Missions réalisées" },
    { value: 25, label: "Ingénieurs et techniciens" },
    { value: 8000, suffix: "+", label: "Essais par an" },
  ] as KeyFigure[],
  credit: { label: "Site réalisé par IZEMX", href: "https://izemx.com" }, // À VÉRIFIER
};

export const whatsappLink = (text: string = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const mailtoLink = (subject: string, body: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const mapsLink = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address.full}, ${site.address.country}`)}`;
