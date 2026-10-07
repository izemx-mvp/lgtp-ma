import tour from "@/assets/generated/projet-tour-r18-tanger.webp";
import port from "@/assets/generated/projet-port-talus.webp";
import cptu from "@/assets/generated/projet-campagne-cptu.webp";

export type ProjectCategory = "batiment" | "port" | "routes" | "talus" | "instrumentation";

export const projectCategories: { id: ProjectCategory | "tous"; label: string }[] = [
  { id: "tous", label: "Tous" },
  { id: "batiment", label: "Bâtiment" },
  { id: "port", label: "Port et maritime" },
  { id: "routes", label: "Routes" },
  { id: "talus", label: "Talus et stabilité" },
  { id: "instrumentation", label: "Instrumentation" },
];

export type Project = {
  slug: string;
  title: string;
  type: string;
  categories: ProjectCategory[];
  location: string;
  year: string;
  services: string[]; // ids de services
  summary: string;
  context: string;
  mission: string;
  methods: string[];
  outcome: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  isRealPhoto: boolean;
};

// CONTENU EXEMPLE À REMPLACER — projets à vérifier et remplacer par LGTP (aucun client nommé)
export const projects: Project[] = [
  {
    slug: "tour-residentielle-r18-tanger",
    title: "Tour résidentielle R+18",
    type: "Mission géotechnique G3",
    categories: ["batiment"],
    location: "Tanger",
    year: "2024",
    services: ["etudes-geotechniques", "controle-qualite"],
    summary: "Étude et suivi géotechniques d'exécution pour un immeuble de grande hauteur fondé sur radier avec amélioration de sol par inclusions rigides.",
    context: "Construction d'une tour résidentielle de dix-huit étages en zone urbaine, sur des terrains compressibles en surface nécessitant une solution de fondation maîtrisée en tassements.",
    mission: "Mission G3 : étude d'exécution du système de fondation, validation des hypothèses de calcul et suivi géotechnique pendant les travaux de fondation.",
    methods: ["Analyse des reconnaissances et essais complémentaires", "Vérification du dimensionnement radier + inclusions rigides", "Réception des fonds de fouille", "Suivi de la mise en œuvre des inclusions"],
    outcome: "Solution de fondation validée et travaux suivis jusqu'à la réception, avec un dossier de suivi documenté remis au maître d'ouvrage.",
    imageSrc: tour,
    imageAlt: "Fouille profonde en milieu urbain avec ferraillage de radier et inclusions, ville et mer en arrière-plan",
    imagePosition: "center",
    isRealPhoto: false,
  },
  {
    slug: "inclinometres-talus-port-tanger",
    title: "Confortement de talus portuaire",
    type: "Forage et instrumentation inclinométrique",
    categories: ["port", "talus", "instrumentation"],
    location: "Région de Tanger",
    year: "2023",
    services: ["reconnaissance-essais-in-situ", "instrumentation-auscultation"],
    summary: "Forages et pose d'inclinomètres pour accompagner les travaux de confortement d'un talus en zone portuaire.",
    context: "Talus en bordure d'infrastructure portuaire faisant l'objet de travaux de renforcement, nécessitant un suivi des déplacements avant, pendant et après travaux.",
    mission: "Réalisation des forages, équipement en tubes inclinométriques, mesures de référence puis relevés périodiques.",
    methods: ["Forages destructifs et carottés", "Pose et scellement de tubes inclinométriques", "Mesures de référence et campagnes périodiques", "Rapports d'auscultation"],
    outcome: "Dispositif opérationnel fournissant au maître d'ouvrage un suivi régulier et comparable des déplacements du talus.",
    imageSrc: port,
    imageAlt: "Foreuse sur un talus renforcé dominant un quai portuaire et la mer",
    imagePosition: "20% center",
    isRealPhoto: false,
  },
  {
    slug: "campagne-cptu-lotissement",
    title: "Campagne de pénétration statique",
    type: "Reconnaissance CPTU",
    categories: ["batiment"],
    location: "Nord du Maroc",
    year: "2024",
    services: ["reconnaissance-essais-in-situ", "etudes-geotechniques"],
    summary: "Campagne d'essais CPTU sur un terrain d'aménagement pour caractériser finement la succession des couches de sol.",
    context: "Terrain destiné à un projet d'aménagement, pour lequel une image continue du sous-sol était nécessaire avant la conception des fondations.",
    mission: "Implantation et réalisation de sondages CPTU, traitement des mesures et interprétation stratigraphique.",
    methods: ["Essais CPTU avec acquisition automatique (qc, fs, u)", "Corrélation avec sondages de calage", "Interprétation des profils et classification des sols"],
    outcome: "Modèle géotechnique du site remis au bureau d'études pour la phase de conception.",
    imageSrc: cptu,
    imageAlt: "Ateliers de pénétration sur un terrain jalonné au lever du jour",
    imagePosition: "35% center",
    isRealPhoto: false,
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
