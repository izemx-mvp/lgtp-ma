import carottes from "@/assets/generated/equipement-carottes-sondage.webp";
import cone from "@/assets/generated/equipement-cone-cptu.webp";
import beton from "@/assets/generated/equipement-compression-beton.webp";

export type Equipment = {
  id: string;
  title: string;
  description: string;
  icon: "drill" | "gauge" | "flask" | "box" | "activity" | "database";
  toConfirm: boolean; // drapeau interne, jamais affiché
};

// CONTENU EXEMPLE À REMPLACER — catégories à confirmer par LGTP
export const equipments: Equipment[] = [
  { id: "sondage", title: "Sondage et forage", description: "Ateliers de sondage carotté et destructif pour la reconnaissance des terrains et la pose d'équipements.", icon: "drill", toConfirm: true },
  { id: "essais-en-place", title: "Essais en place", description: "Pénétromètres statique et dynamique, matériel d'essais de plaque et de densité en place.", icon: "gauge", toConfirm: true },
  { id: "labo-sols", title: "Laboratoire sols", description: "Tamis, appareils de Casagrande, moules Proctor et CBR, bâtis œdométriques et de cisaillement.", icon: "flask", toConfirm: true },
  { id: "labo-materiaux", title: "Laboratoire matériaux et béton", description: "Presse d'écrasement, moules d'éprouvettes, cure et essais sur granulats.", icon: "box", toConfirm: true },
  { id: "instrumentation", title: "Instrumentation (inclinomètres)", description: "Tubes inclinométriques, sondes et enregistreurs pour le suivi des déplacements.", icon: "activity", toConfirm: true },
  { id: "donnees", title: "Acquisition et traitement des données", description: "Chaînes d'acquisition numériques et outils de traitement pour des résultats traçables.", icon: "database", toConfirm: true },
];

// CONTENU EXEMPLE À REMPLACER
export const equipmentPhotos = [
  { imageSrc: cone, alt: "Cône de pénétromètre CPTU et tiges posés sur une caisse de chantier", isRealPhoto: false, position: "center" },
  { imageSrc: carottes, alt: "Carottes de sondage rangées dans des caisses en bois sur site", isRealPhoto: false, position: "center" },
  { imageSrc: beton, alt: "Éprouvette de béton dans une presse d'écrasement au laboratoire", isRealPhoto: false, position: "center" },
];
