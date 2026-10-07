export type FaqItem = { id: string; question: string; answer: string; keywords: string[] };

// CONTENU EXEMPLE À REMPLACER OU VALIDER PAR L'ÉQUIPE LGTP
export const faq: FaqItem[] = [
  {
    id: "quand-etude",
    question: "Quand faut-il une étude géotechnique ?",
    answer:
      "Idéalement dès l'acquisition du terrain ou les premières esquisses, puis à chaque étape clé du projet. Une étude réalisée tôt permet d'adapter la conception au sol réel et de limiter les aléas en cours de travaux.",
    keywords: ["quand", "besoin", "necessaire", "obligatoire", "etude"],
  },
  {
    id: "missions-g1-g5",
    question: "Que signifient les missions G1 à G5 ?",
    answer:
      "La norme NF P 94-500 enchaîne les missions selon l'avancement du projet : G1 (étude préalable), G2 (conception), G3 (étude et suivi d'exécution, côté entreprise), G4 (supervision d'exécution, côté maître d'ouvrage) et G5 (diagnostic d'un ouvrage ou d'un désordre).",
    keywords: ["g1", "g2", "g3", "g4", "g5", "mission", "norme", "nf p 94-500"],
  },
  {
    id: "duree",
    question: "Combien de temps prend une étude ?",
    answer:
      "La durée dépend de l'ampleur du projet, des reconnaissances nécessaires et de l'accès au site. Un planning précis vous est proposé avec chaque offre, après examen de votre demande.",
    keywords: ["temps", "duree", "delai", "combien de temps"],
  },
  {
    id: "contenu-rapport",
    question: "Que contient un rapport géotechnique ?",
    answer:
      "Il présente le contexte, les investigations réalisées, les résultats d'essais, le modèle géotechnique du site, puis les recommandations : type de fondation, niveau d'assise, dispositions constructives, risques identifiés et points à vérifier en phase travaux.",
    keywords: ["rapport", "contenu", "contient", "lire"],
  },
  {
    id: "zone",
    question: "Intervenez-vous en dehors de Tanger ?",
    answer:
      "Oui. Basés à Tanger, nous intervenons principalement dans le nord du Maroc et pouvons nous déplacer sur l'ensemble du territoire selon la nature du projet.",
    keywords: ["ou", "zone", "region", "hors", "deplacer", "intervenez", "tanger", "maroc"],
  },
  {
    id: "devis",
    question: "Comment obtenir un devis ?",
    answer:
      "Décrivez votre projet via le formulaire de contact, sur WhatsApp ou avec l'assistant du site : type d'ouvrage, localisation et besoins. Nous revenons vers vous pour préciser la demande et établir une offre adaptée.",
    keywords: ["devis", "prix", "tarif", "cout", "offre", "combien"],
  },
];
