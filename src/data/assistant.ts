import { services } from "./services";
import { faq } from "./faq";
import { projects } from "./projects";
import { posts } from "./posts";
import { regions } from "./regions";
import { site } from "@/config/site";

export type ChatCard = { kind: "service" | "project" | "post"; title: string; text: string; to: string; hash?: string };

export type Intent = {
  id: string;
  keywords: string[];
  answer: string;
  cards?: ChatCard[];
  action?: "devis";
};

export const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();

const serviceCard = (id: string): ChatCard => {
  const s = services.find((x) => x.id === id)!;
  return { kind: "service", title: s.title, text: s.short, to: "/expertises", hash: s.id };
};
const postCard = (slug: string): ChatCard => {
  const p = posts.find((x) => x.slug === slug)!;
  return { kind: "post", title: p.title, text: p.excerpt, to: `/blog/${p.slug}` };
};

// CONTENU EXEMPLE À REMPLACER OU VALIDER PAR L'ÉQUIPE LGTP
export const intents: Intent[] = [
  {
    id: "services",
    keywords: ["service", "services", "proposez", "faites", "activite", "prestation", "expertises", "offre"],
    answer: `Nous intervenons sur six domaines : ${services.map((s) => s.title.toLowerCase()).join(", ")}. Voici un aperçu :`,
    cards: services.slice(0, 3).map((s) => serviceCard(s.id)),
  },
  {
    id: "devis",
    keywords: ["devis", "prix", "tarif", "cout", "offre de prix", "chiffrage", "combien coute"],
    answer: "Nous établissons chaque offre au cas par cas, après examen du projet : nous ne communiquons donc pas de tarif en ligne. Je peux préparer votre demande de devis en quelques questions.",
    action: "devis",
  },
  {
    id: "g3",
    keywords: ["g3", "mission g3", "suivi d execution", "execution"],
    answer: "La mission G3 (norme NF P 94-500) est l'étude et le suivi géotechniques d'exécution. Confiée à l'entreprise, elle précise le dimensionnement d'exécution des ouvrages géotechniques et suit leur réalisation. Elle se mène en parallèle de la G4, supervision pour le compte du maître d'ouvrage.",
    cards: [postCard("missions-g1-g5-nf-p-94-500-expliquees")],
  },
  {
    id: "missions",
    keywords: ["g1", "g2", "g4", "g5", "missions", "nf p 94-500", "norme"],
    answer: faq.find((f) => f.id === "missions-g1-g5")!.answer,
    cards: [postCard("missions-g1-g5-nf-p-94-500-expliquees"), serviceCard("etudes-geotechniques")],
  },
  {
    id: "zone",
    keywords: ["ou", "zone", "region", "intervenez", "deplacez", "ville", "maroc", "nord", "tetouan", "larache", "kenitra"],
    answer: `Nous sommes basés à ${site.address.city} et intervenons principalement dans le nord du Maroc (${regions.map((r) => r.name).join(", ")}), ainsi que sur le reste du territoire selon les projets.`,
  },
  {
    id: "cptu",
    keywords: ["cptu", "penetrometre", "piezocone", "qc", "fs", "cone", "penetration"],
    answer: "Notre pénétromètre statique CPTU mesure en continu la résistance de pointe qc, le frottement latéral fs et la pression interstitielle u, avec un enregistrement numérique immédiat et sécurisé.",
    cards: [postCard("essai-cptu-principe-mesures-interet"), serviceCard("reconnaissance-essais-in-situ")],
  },
  {
    id: "etude",
    keywords: ["etude", "etude de sol", "etude geotechnique", "fondation", "fondations", "radier", "inclusions", "construire"],
    answer: faq.find((f) => f.id === "quand-etude")!.answer,
    cards: [serviceCard("etudes-geotechniques"), postCard("etude-geotechnique-quand-est-elle-necessaire")],
  },
  {
    id: "laboratoire",
    keywords: ["laboratoire", "proctor", "cbr", "atterberg", "granulometrie", "echantillon"],
    answer: "Notre laboratoire réalise les essais d'identification et les essais mécaniques des sols : granulométrie, limites d'Atterberg, Proctor, CBR, cisaillement, œdomètre…",
    cards: [serviceCard("essais-laboratoire")],
  },
  {
    id: "controle",
    keywords: ["controle", "compactage", "beton", "fond de fouille", "reception", "chaussee"],
    answer: "Nous contrôlons le béton, le compactage, les terrassements et couches de chaussée, et réceptionnons les fonds de fouille avant coulage.",
    cards: [serviceCard("controle-qualite"), postCard("controle-compactage-reception-fonds-de-fouille")],
  },
  {
    id: "instrumentation",
    keywords: ["inclinometre", "instrumentation", "auscultation", "talus", "glissement", "surveillance", "fouille"],
    answer: "Nous forons, équipons et relevons des inclinomètres pour suivre les talus, les fouilles et les ouvrages pendant les travaux.",
    cards: [serviceCard("instrumentation-auscultation"), { kind: "project", title: projects[1].title, text: projects[1].summary, to: `/realisations/${projects[1].slug}` }],
  },
  {
    id: "expertise",
    keywords: ["fissure", "fissures", "tassement", "desordre", "expertise", "sinistre", "diagnostic"],
    answer: "Pour des fissures, tassements ou instabilités, nous réalisons des expertises de désordres et des diagnostics (mission G5). Une visite permet en général de définir les investigations utiles.",
    cards: [serviceCard("expertise-accompagnement")],
  },
  {
    id: "delai",
    keywords: ["delai", "temps", "duree", "rapidement", "urgent", "combien de temps"],
    answer: faq.find((f) => f.id === "duree")!.answer,
  },
  {
    id: "references",
    keywords: ["realisation", "realisations", "reference", "references", "projet", "projets", "experience"],
    answer: "Voici quelques exemples de missions que nous menons :",
    cards: projects.map((p) => ({ kind: "project" as const, title: p.title, text: p.summary, to: `/realisations/${p.slug}` })),
  },
  {
    id: "contact",
    keywords: ["contact", "telephone", "appeler", "adresse", "email", "mail", "horaires", "joindre"],
    answer: `Vous pouvez nous joindre au ${site.phone}, par e-mail à ${site.email}, ou nous rendre visite : ${site.address.full}.`,
  },
  {
    id: "bonjour",
    keywords: ["bonjour", "salut", "bonsoir", "hello", "salam"],
    answer: "Bonjour ! Comment puis-je vous aider ? Vous pouvez me poser une question sur nos services ou préparer une demande de devis.",
  },
];

export const quickReplies = [
  { label: "Quels services proposez-vous ?", intent: "services" },
  { label: "Comment demander un devis ?", intent: "devis" },
  { label: "Qu'est-ce qu'une mission G3 ?", intent: "g3" },
  { label: "Où intervenez-vous ?", intent: "zone" },
];

export const fallbackAnswer =
  "Je n'ai pas de réponse précise à cette question. Un membre de l'équipe LGTP pourra vous renseigner : écrivez-nous sur WhatsApp ou via le formulaire de contact.";

export function matchIntent(input: string): Intent | null {
  const text = ` ${normalize(input)} `;
  const words = new Set(text.trim().split(" "));
  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords) {
      const k = normalize(kw);
      if (k.includes(" ")) {
        if (text.includes(` ${k} `)) score += 3;
      } else if (words.has(k)) {
        score += k.length <= 2 ? 1 : 2;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }
  return bestScore >= 2 ? best : null;
}

export const projectTypes = ["Bâtiment", "Route / voirie", "Port / maritime", "Talus / stabilité", "Lotissement", "Industrie", "Autre"];
