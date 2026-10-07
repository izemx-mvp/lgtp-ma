// CONTENU EXEMPLE À REMPLACER — zones d'intervention à valider par LGTP
export type Region = { id: string; name: string; x: number; y: number; primary?: boolean };

export const regions: Region[] = [
  { id: "tanger", name: "Tanger", x: 128, y: 40, primary: true },
  { id: "tetouan", name: "Tétouan", x: 178, y: 72 },
  { id: "larache", name: "Larache", x: 96, y: 112 },
  { id: "chefchaouen", name: "Chefchaouen", x: 196, y: 120 },
  { id: "kenitra", name: "Kénitra", x: 70, y: 210 },
  { id: "al-hoceima", name: "Al Hoceïma", x: 300, y: 104 },
];

export const sectors = [
  "Bâtiment et immobilier",
  "Ports et ouvrages maritimes",
  "Routes et voiries",
  "Talus et stabilité de pentes",
  "Industrie",
  "Aménagement et lotissements",
];
