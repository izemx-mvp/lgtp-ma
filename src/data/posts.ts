import c1 from "@/assets/generated/blog-etude-geotechnique.webp";
import c2 from "@/assets/generated/blog-missions-g1-g5.webp";
import c3 from "@/assets/generated/blog-essai-cptu.webp";
import c4 from "@/assets/generated/blog-instrumentation-fouilles.webp";
import c5 from "@/assets/generated/blog-rapport-geotechnique.webp";
import c6 from "@/assets/generated/blog-compactage-fond-fouille.webp";

export type PostCategory = "Géotechnique" | "Essais et contrôle" | "Instrumentation" | "Normes et réglementation";
export const postCategories: PostCategory[] = ["Géotechnique", "Essais et contrôle", "Instrumentation", "Normes et réglementation"];

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "takeaways"; items: string[] }
  | { type: "link"; text: string; to: string; hash?: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  date: string; // ISO
  readingTime: number;
  imageSrc: string;
  imageAlt: string;
  isRealPhoto: boolean;
  tags: string[];
  seo: { title: string; description: string };
  content: Block[];
};

// CONTENU EXEMPLE À REMPLACER OU VALIDER PAR L'ÉQUIPE LGTP — tous les articles ci-dessous
export const posts: Post[] = [
  {
    slug: "etude-geotechnique-quand-est-elle-necessaire",
    title: "Qu'est-ce qu'une étude géotechnique et quand est-elle nécessaire ?",
    excerpt: "Comprendre le rôle de l'étude de sol, ce qu'elle apporte au projet et le bon moment pour la lancer.",
    category: "Géotechnique",
    date: "2026-09-15",
    readingTime: 6,
    imageSrc: c1,
    imageAlt: "Puits de reconnaissance montrant plusieurs couches de sol et une mire graduée",
    isRealPhoto: false,
    tags: ["étude de sol", "fondations", "NF P 94-500"],
    seo: { title: "Étude géotechnique : définition et moment opportun — LGTP", description: "À quoi sert une étude géotechnique, ce qu'elle contient et à quel moment la lancer dans un projet de construction." },
    content: [
      { type: "p", text: "Le sol est le premier matériau de tout ouvrage. Pourtant, il est le seul que l'on ne choisit pas : il faut le connaître pour concevoir des fondations adaptées. C'est précisément l'objet de l'étude géotechnique." },
      { type: "h2", id: "definition", text: "Une définition simple" },
      { type: "p", text: "Une étude géotechnique consiste à reconnaître la nature et le comportement des terrains au droit d'un projet, puis à en tirer des recommandations de conception. Elle combine des investigations sur site (sondages, essais en place), des essais en laboratoire et une analyse par un ingénieur géotechnicien." },
      { type: "h2", id: "objectifs", text: "Ce qu'elle permet de déterminer" },
      { type: "list", items: ["La succession des couches de sol et leurs caractéristiques", "La présence et le niveau de l'eau souterraine", "Le type de fondation adapté et son niveau d'assise", "Les tassements prévisibles et les risques particuliers (gonflement, liquéfaction, instabilité)"] },
      { type: "h2", id: "quand", text: "À quel moment la lancer ?" },
      { type: "p", text: "Le plus tôt possible. Une étude préalable, dès le choix du terrain, aide à identifier les contraintes majeures. L'étude de conception accompagne ensuite les études de structure. Enfin, le suivi en phase travaux vérifie que le sol rencontré correspond aux hypothèses." },
      { type: "callout", title: "Bon à savoir", text: "Découvrir une difficulté de sol en cours de chantier coûte presque toujours plus cher que de l'anticiper en phase d'étude." },
      { type: "link", text: "Découvrir nos études géotechniques", to: "/expertises", hash: "etudes-geotechniques" },
      { type: "takeaways", items: ["L'étude géotechnique relie la connaissance du sol à la conception des fondations.", "Elle associe investigations, essais et analyse d'ingénieur.", "Elle doit intervenir dès les premières étapes du projet, puis l'accompagner jusqu'aux travaux."] },
    ],
  },
  {
    slug: "missions-g1-g5-nf-p-94-500-expliquees",
    title: "Les missions G1 à G5 (NF P 94-500) expliquées simplement",
    excerpt: "Une lecture claire de l'enchaînement des missions géotechniques, de l'étude préalable au diagnostic.",
    category: "Normes et réglementation",
    date: "2026-08-28",
    readingTime: 7,
    imageSrc: c2,
    imageAlt: "Vue aérienne d'un chantier en phase de fondations avec coffrages et appareil de topographie",
    isRealPhoto: false,
    tags: ["NF P 94-500", "missions géotechniques"],
    seo: { title: "Missions G1 à G5 de la norme NF P 94-500 — LGTP", description: "Les missions géotechniques G1, G2, G3, G4 et G5 de la norme NF P 94-500 expliquées simplement." },
    content: [
      { type: "p", text: "La norme française NF P 94-500, largement utilisée comme référence, organise les missions d'ingénierie géotechnique selon l'avancement du projet. Chaque mission répond à une question différente." },
      { type: "h2", id: "g1", text: "G1 — Étude géotechnique préalable" },
      { type: "p", text: "Elle comprend une phase « étude de site » (premier modèle géologique, risques principaux) et une phase « principes généraux de construction ». Elle intervient en amont, souvent avant l'acquisition ou l'esquisse." },
      { type: "h2", id: "g2", text: "G2 — Étude géotechnique de conception" },
      { type: "p", text: "Réalisée en phases avant-projet puis projet, elle précise les hypothèses géotechniques et les principes de fondations, de terrassements et de soutènements, en lien avec le maître d'œuvre." },
      { type: "h2", id: "g3-g4", text: "G3 et G4 — Les missions d'exécution" },
      { type: "list", items: ["G3, étude et suivi géotechniques d'exécution : confiée à l'entreprise, elle détaille le dimensionnement d'exécution et suit les travaux.", "G4, supervision géotechnique d'exécution : pour le compte du maître d'ouvrage, elle vérifie la cohérence de la G3 avec le sol réellement rencontré."] },
      { type: "callout", title: "Complémentarité", text: "G3 et G4 sont menées en parallèle par des intervenants distincts : l'une conçoit et suit, l'autre supervise." },
      { type: "h2", id: "g5", text: "G5 — Diagnostic géotechnique" },
      { type: "p", text: "Ponctuelle, elle étudie un ou plusieurs éléments géotechniques spécifiques : un ouvrage existant, un désordre, une modification de projet." },
      { type: "link", text: "Voir comment nous réalisons ces missions", to: "/expertises", hash: "etudes-geotechniques" },
      { type: "takeaways", items: ["G1 et G2 concernent la phase d'étude, G3 et G4 la phase d'exécution.", "G3 est côté entreprise, G4 côté maître d'ouvrage.", "G5 est un diagnostic ciblé, à tout moment de la vie d'un ouvrage."] },
    ],
  },
  {
    slug: "essai-cptu-principe-mesures-interet",
    title: "L'essai CPTU : principe, mesures (qc, fs, u) et intérêt",
    excerpt: "Comment fonctionne le pénétromètre statique piézocône et pourquoi ses mesures continues sont précieuses.",
    category: "Essais et contrôle",
    date: "2026-07-30",
    readingTime: 6,
    imageSrc: c3,
    imageAlt: "Tige de pénétromètre enfoncée verticalement dans le sol par un atelier hydraulique",
    isRealPhoto: false,
    tags: ["CPTU", "essais en place", "pénétromètre"],
    seo: { title: "Essai CPTU : principe et mesures qc, fs, u — LGTP", description: "Principe de l'essai au piézocône CPTU, signification des mesures qc, fs et u, et intérêt pour la reconnaissance des sols." },
    content: [
      { type: "p", text: "Le CPTU (Cone Penetration Test with pore pressure measurement) consiste à enfoncer dans le sol, à vitesse constante, une pointe conique instrumentée montée au bout d'un train de tiges." },
      { type: "h2", id: "mesures", text: "Trois mesures continues" },
      { type: "list", items: ["qc — la résistance à la pénétration du cône : elle reflète la compacité ou la consistance du sol.", "fs — le frottement latéral mesuré sur un manchon situé derrière la pointe.", "u — la pression interstitielle mesurée par un filtre, qui renseigne sur la présence d'eau et la perméabilité."] },
      { type: "h2", id: "acquisition", text: "L'intérêt de l'acquisition automatique" },
      { type: "p", text: "Les mesures sont enregistrées numériquement, typiquement tous les quelques centimètres. On obtient ainsi un profil quasi continu du sous-sol, sans lacune entre deux prélèvements, et des données traçables." },
      { type: "callout", title: "Interprétation", text: "Le rapport entre frottement et résistance de pointe, combiné à la pression interstitielle, permet de proposer une classification des sols traversés, à caler sur des sondages." },
      { type: "h2", id: "limites", text: "Ses limites" },
      { type: "p", text: "Le CPTU ne permet pas de traverser des terrains très durs ou des blocs, et ne fournit pas d'échantillon : il se combine donc utilement avec des sondages carottés et des essais de laboratoire." },
      { type: "link", text: "Découvrir notre pénétromètre CPTU", to: "/equipements" },
      { type: "takeaways", items: ["qc, fs et u sont mesurés en continu sur toute la profondeur.", "L'acquisition automatique garantit finesse et traçabilité.", "Le CPTU complète, sans les remplacer, les sondages et essais de laboratoire."] },
    ],
  },
  {
    slug: "instrumentation-surveiller-talus-fouilles-inclinometres",
    title: "Instrumentation : pourquoi surveiller talus et fouilles (inclinomètres)",
    excerpt: "Mesurer les déplacements du sol pour sécuriser un chantier et les ouvrages voisins.",
    category: "Instrumentation",
    date: "2026-07-02",
    readingTime: 5,
    imageSrc: c4,
    imageAlt: "Fouille profonde avec paroi de soutènement et têtes de tubes de mesure en crête de talus",
    isRealPhoto: false,
    tags: ["inclinomètre", "auscultation", "talus"],
    seo: { title: "Inclinomètres : surveiller talus et fouilles — LGTP", description: "Pourquoi et comment instrumenter un talus ou une fouille avec des inclinomètres pour suivre les déplacements du sol." },
    content: [
      { type: "p", text: "Un talus ou une fouille profonde peut se déformer lentement avant toute rupture visible. L'instrumentation permet de détecter ces mouvements tôt et de réagir à temps." },
      { type: "h2", id: "principe", text: "Le principe de l'inclinomètre" },
      { type: "p", text: "Un tube rainuré est scellé dans un forage qui traverse la zone susceptible de bouger et s'ancre dans un terrain stable. Une sonde descendue dans le tube mesure son inclinaison à intervalles réguliers. En comparant les campagnes successives, on reconstitue le profil des déplacements en profondeur." },
      { type: "h2", id: "quand", text: "Dans quels cas ?" },
      { type: "list", items: ["Talus routiers, portuaires ou naturels présentant des signes d'instabilité", "Fouilles profondes en milieu urbain, à proximité de bâtiments", "Travaux de confortement, pour vérifier leur efficacité", "Ouvrages de soutènement pendant leur mise en charge"] },
      { type: "callout", title: "La mesure de référence", text: "Une première mesure, réalisée avant les travaux, sert de point zéro : toutes les suivantes s'y comparent." },
      { type: "link", text: "Notre offre d'instrumentation et d'auscultation", to: "/expertises", hash: "instrumentation-auscultation" },
      { type: "takeaways", items: ["L'inclinomètre localise en profondeur la zone qui se déplace.", "La régularité des mesures compte autant que leur précision.", "Des seuils d'alerte définis à l'avance permettent de décider rapidement."] },
    ],
  },
  {
    slug: "lire-un-rapport-geotechnique-points-cles",
    title: "Lire un rapport géotechnique : les points clés",
    excerpt: "Où trouver l'essentiel dans un rapport de sol et quelles questions se poser à sa lecture.",
    category: "Géotechnique",
    date: "2026-06-10",
    readingTime: 6,
    imageSrc: c5,
    imageAlt: "Rapport technique ouvert avec graphiques et coupes de sondage, à côté d'un échantillon de sol",
    isRealPhoto: false,
    tags: ["rapport géotechnique", "fondations"],
    seo: { title: "Lire un rapport géotechnique : les points clés — LGTP", description: "Les sections essentielles d'un rapport géotechnique et les questions à se poser pour bien l'exploiter." },
    content: [
      { type: "p", text: "Un rapport géotechnique est un document dense. Savoir où regarder permet d'en tirer rapidement les informations utiles au projet." },
      { type: "h2", id: "structure", text: "La structure type" },
      { type: "list", items: ["Le contexte et la mission : quel projet, quelle phase, quelles hypothèses de charges", "Les investigations : nombre, type et implantation des sondages et essais", "Les résultats : coupes de sondage, profils d'essais, résultats de laboratoire", "Le modèle géotechnique : couches retenues et paramètres de calcul", "Les recommandations : fondations, terrassements, eau, dispositions constructives"] },
      { type: "h2", id: "questions", text: "Les bonnes questions à se poser" },
      { type: "list", items: ["Le projet décrit correspond-il bien au projet actuel ?", "Les investigations couvrent-elles toute l'emprise de l'ouvrage ?", "Quel niveau d'eau a été mesuré, et à quelle période ?", "Quelles incertitudes subsistent et que faut-il vérifier en phase travaux ?"] },
      { type: "callout", title: "Attention aux changements", text: "Si le projet évolue (implantation, sous-sol, charges), les conclusions du rapport doivent être revues par le géotechnicien." },
      { type: "link", text: "Nos études géotechniques", to: "/expertises", hash: "etudes-geotechniques" },
      { type: "takeaways", items: ["Les recommandations ne valent que pour le projet décrit.", "Le modèle géotechnique est le cœur du rapport.", "Les réserves et points à vérifier sont aussi importants que les conclusions."] },
    ],
  },
  {
    slug: "controle-compactage-reception-fonds-de-fouille",
    title: "Contrôle de compactage et réception des fonds de fouille : pourquoi c'est déterminant",
    excerpt: "Deux contrôles simples, réalisés au bon moment, qui conditionnent le bon comportement des fondations et chaussées.",
    category: "Essais et contrôle",
    date: "2026-05-20",
    readingTime: 5,
    imageSrc: c6,
    imageAlt: "Appareil de mesure de densité posé sur un fond de fouille compacté",
    isRealPhoto: false,
    tags: ["compactage", "fond de fouille", "contrôle"],
    seo: { title: "Contrôle de compactage et fonds de fouille — LGTP", description: "Pourquoi contrôler le compactage des remblais et réceptionner les fonds de fouille avant de couler les fondations." },
    content: [
      { type: "p", text: "Une fondation bien dimensionnée peut mal se comporter si elle repose sur un sol différent de celui prévu, ou sur un remblai insuffisamment compacté. Deux contrôles permettent de l'éviter." },
      { type: "h2", id: "fond-de-fouille", text: "La réception des fonds de fouille" },
      { type: "p", text: "Avant le coulage, le géotechnicien vérifie que le terrain d'assise correspond aux hypothèses de l'étude : nature, homogénéité, absence de zones remaniées ou détrempées, niveau atteint." },
      { type: "h2", id: "compactage", text: "Le contrôle de compactage" },
      { type: "p", text: "Pour les remblais et couches de forme, on compare la densité obtenue sur site à une référence de laboratoire, généralement l'essai Proctor, et on peut mesurer la portance par des essais de plaque." },
      { type: "list", items: ["Essai Proctor en laboratoire : densité sèche maximale et teneur en eau optimale", "Mesures de densité en place sur chaque couche", "Essais de plaque pour vérifier la portance"] },
      { type: "callout", title: "Le bon moment", text: "Ces contrôles se font au fil de l'eau : une couche non conforme se reprend facilement tant qu'elle n'est pas recouverte." },
      { type: "link", text: "Notre offre de contrôle qualité", to: "/expertises", hash: "controle-qualite" },
      { type: "takeaways", items: ["La réception de fond de fouille confirme le sol d'assise réel.", "Le compactage se juge par rapport à une référence de laboratoire.", "Contrôler couche par couche évite des reprises coûteuses."] },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
