import etudes from "@/assets/generated/expertise-etudes.webp";
import cptu from "@/assets/generated/expertise-cptu-terrain.webp";
import labo from "@/assets/generated/expertise-laboratoire.webp";
import controle from "@/assets/generated/expertise-controle-compactage.webp";
import inclino from "@/assets/generated/expertise-inclinometre.webp";
import diag from "@/assets/generated/expertise-diagnostic.webp";

export type ServiceIcon = "layers" | "drill" | "flask" | "check" | "activity" | "search";

export type Service = {
  id: string;
  number: string;
  title: string;
  short: string;
  description: string;
  items: string[];
  forWhom: string;
  icon: ServiceIcon;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  isRealPhoto: boolean;
  keywords: string[];
};

// CONTENU EXEMPLE À REMPLACER — listes de prestations à valider par LGTP
export const services: Service[] = [
  {
    id: "etudes-geotechniques",
    number: "01",
    title: "Études géotechniques",
    short: "Missions G1 à G5 selon la norme NF P 94-500, du choix du site au diagnostic.",
    description:
      "Nous conduisons les missions géotechniques de la norme NF P 94-500 : de l'étude de site à la supervision d'exécution. Chaque rapport traduit les reconnaissances en recommandations concrètes de fondations et d'amélioration de sol, adaptées à votre ouvrage.",
    items: [
      "G1 — Étude géotechnique préalable (étude de site, principes généraux de construction)",
      "G2 — Étude géotechnique de conception (avant-projet, projet)",
      "G3 — Étude et suivi géotechniques d'exécution",
      "G4 — Supervision géotechnique d'exécution",
      "G5 — Diagnostic géotechnique",
      "Recommandations : radier, fondations superficielles ou profondes, inclusions rigides, amélioration de sol",
    ],
    forWhom: "Promoteurs, maîtres d'ouvrage, architectes, bureaux d'études.",
    icon: "layers",
    imageSrc: etudes,
    imageAlt: "Coupes de sondage et caisses de carottes de sol sur une table d'étude",
    imagePosition: "center",
    isRealPhoto: false,
    keywords: ["etude", "g1", "g2", "g3", "g4", "g5", "mission", "fondation", "radier", "nf p 94-500"],
  },
  {
    id: "reconnaissance-essais-in-situ",
    number: "02",
    title: "Reconnaissance et essais in situ",
    short: "Sondages, puits de reconnaissance et essais en place, dont le CPTU à acquisition automatique.",
    description:
      "Nous caractérisons le terrain directement sur site : sondages carottés et destructifs, puits à la pelle mécanique, et essais en place. Notre pénétromètre statique CPTU enregistre en continu qc, fs et u pour un profil de sol fin et traçable.",
    items: [
      "Sondages carottés et destructifs",
      "Puits et tranchées de reconnaissance",
      "Pénétromètre statique CPTU avec acquisition automatique",
      "Essais pressiométriques",
      "Pénétromètre dynamique",
      "Prélèvement d'échantillons intacts et remaniés",
    ],
    forWhom: "Bureaux d'études, entreprises de travaux, maîtres d'ouvrage publics et privés.",
    icon: "drill",
    imageSrc: cptu,
    imageAlt: "Atelier de pénétration statique sur un terrain dégagé, montagnes en arrière-plan",
    imagePosition: "40% center",
    isRealPhoto: false,
    keywords: ["sondage", "forage", "cptu", "penetrometre", "in situ", "puits", "pressiometre", "reconnaissance"],
  },
  {
    id: "essais-laboratoire",
    number: "03",
    title: "Essais de laboratoire",
    short: "Identification et essais mécaniques des sols : granulométrie, Atterberg, Proctor, CBR…",
    description:
      "Les échantillons prélevés sont analysés dans notre laboratoire selon des modes opératoires normalisés. Les résultats alimentent directement le dimensionnement et le contrôle des terrassements.",
    items: [
      "Analyse granulométrique",
      "Limites d'Atterberg",
      "Teneur en eau, densités",
      "Essai Proctor normal et modifié",
      "Indice portant CBR",
      "Essais de cisaillement et œdométriques",
    ],
    forWhom: "Bureaux d'études, entreprises de terrassement et de routes.",
    icon: "flask",
    imageSrc: labo,
    imageAlt: "Tamis, moule Proctor et échantillons de sol sur une paillasse de laboratoire",
    imagePosition: "center",
    isRealPhoto: false,
    keywords: ["laboratoire", "granulometrie", "atterberg", "proctor", "cbr", "essai", "oedometre", "cisaillement"],
  },
  {
    id: "controle-qualite",
    number: "04",
    title: "Contrôle qualité des matériaux et travaux",
    short: "Béton, compactage, fonds de fouille, terrassements et couches de chaussée.",
    description:
      "Nous vérifions, pendant les travaux, que les matériaux et leur mise en œuvre sont conformes aux exigences du projet. Nos contrôles sont documentés pour une traçabilité complète.",
    items: [
      "Contrôle du béton : prélèvements, éprouvettes, essais d'écrasement",
      "Contrôle de compactage (densité en place, essais de plaque)",
      "Réception des fonds de fouille",
      "Contrôle des terrassements et remblais",
      "Contrôle des couches de chaussée",
    ],
    forWhom: "Entreprises de travaux, maîtres d'ouvrage, bureaux de contrôle.",
    icon: "check",
    imageSrc: controle,
    imageAlt: "Compacteur sur une plateforme routière en terrassement, collines en arrière-plan",
    imagePosition: "center",
    isRealPhoto: false,
    keywords: ["controle", "beton", "compactage", "fond de fouille", "chaussee", "terrassement", "qualite", "reception"],
  },
  {
    id: "instrumentation-auscultation",
    number: "05",
    title: "Instrumentation et auscultation",
    short: "Inclinomètres et suivi des talus, fouilles et ouvrages pendant les travaux.",
    description:
      "Nous installons et relevons les dispositifs de mesure qui permettent de suivre le comportement des talus, des fouilles et des ouvrages, et d'anticiper toute évolution défavorable.",
    items: [
      "Forage et pose de tubes inclinométriques",
      "Mesures inclinométriques périodiques",
      "Suivi de talus et de soutènements",
      "Suivi des fouilles et des ouvrages avoisinants",
      "Rapports d'auscultation et seuils d'alerte",
    ],
    forWhom: "Maîtres d'ouvrage, entreprises, gestionnaires d'infrastructures portuaires et routières.",
    icon: "activity",
    imageSrc: inclino,
    imageAlt: "Tube inclinométrique et sonde de mesure sur un talus renforcé",
    imagePosition: "30% center",
    isRealPhoto: false,
    keywords: ["instrumentation", "inclinometre", "auscultation", "talus", "suivi", "monitoring", "glissement"],
  },
  {
    id: "expertise-accompagnement",
    number: "06",
    title: "Expertise et accompagnement technique",
    short: "Expertise de désordres, avis techniques et assistance sur chantier.",
    description:
      "Fissures, tassements, instabilités : nous analysons l'origine des désordres et proposons des solutions. Nous accompagnons aussi les équipes de projet par des avis techniques et des interventions sur site.",
    items: [
      "Expertise de désordres (fissures, tassements, instabilités)",
      "Avis technique et seconde opinion",
      "Assistance technique aux entreprises et bureaux d'études",
      "Intervention sur chantier",
    ],
    forWhom: "Maîtres d'ouvrage, syndics, entreprises, bureaux d'études, assureurs.",
    icon: "search",
    imageSrc: diag,
    imageAlt: "Mesure d'une fissure sur un soubassement en béton à l'aide d'un fissuromètre",
    imagePosition: "center",
    isRealPhoto: false,
    keywords: ["expertise", "desordre", "fissure", "tassement", "avis", "assistance", "diagnostic"],
  },
];

export const serviceById = (id: string) => services.find((s) => s.id === id);
