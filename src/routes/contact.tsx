import { useId, useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, MessageCircle, Navigation, Phone, RotateCcw } from "lucide-react";
import { z } from "zod";
import { services } from "@/data/services";
import { site, whatsappLink, mailtoLink } from "@/config/site";
import { PhotoHero } from "@/components/site/PhotoHero";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { pageHead, localBusinessJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ service: z.string().optional() }),
  head: () => ({
    ...pageHead({
      title: "Contact et demande de devis — LGTP Tanger",
      description: "Contactez LGTP à Tanger pour vos études géotechniques, essais, contrôle qualité et expertises. Réponse rapide par WhatsApp ou e-mail.",
      path: "/contact",
    }),
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [localBusinessJsonLd()],
  }),
  component: Contact,
});

/* ------------------------------------------------------------------ */
/* Formulaire                                                          */
/* ------------------------------------------------------------------ */

const projectTypes = ["Bâtiment", "Route / voirie", "Port / maritime", "Talus / stabilité", "Lotissement", "Industrie", "Autre"];

const schema = z.object({
  nom: z.string().trim().min(2, "Indiquez votre nom complet."),
  societe: z.string().trim(),
  telephone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s.-]{8,}$/, "Indiquez un numéro de téléphone valide."),
  email: z.string().trim().email("Indiquez une adresse e-mail valide."),
  typeProjet: z.string().min(1, "Choisissez un type de projet."),
  services: z.array(z.string()),
  localisation: z.string().trim().min(2, "Indiquez la localisation du projet."),
  message: z.string().trim().min(10, "Décrivez votre projet en quelques mots (10 caractères minimum)."),
  consent: z.boolean().refine((v) => v, "Merci d'accepter d'être recontacté."),
});

type FormData = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormData, string>>;

const empty: FormData = {
  nom: "",
  societe: "",
  telephone: "",
  email: "",
  typeProjet: "",
  services: [],
  localisation: "",
  message: "",
  consent: false,
};

function buildSummary(d: FormData): string {
  const svc = services
    .filter((s) => d.services.includes(s.id))
    .map((s) => s.title)
    .join(", ");
  return [
    "Bonjour LGTP, voici ma demande de devis :",
    "",
    `Nom : ${d.nom}`,
    d.societe ? `Société : ${d.societe}` : null,
    `Téléphone : ${d.telephone}`,
    `E-mail : ${d.email}`,
    `Type de projet : ${d.typeProjet}`,
    svc ? `Services souhaités : ${svc}` : null,
    `Localisation : ${d.localisation}`,
    "",
    "Description du projet :",
    d.message,
  ]
    .filter((l): l is string => l !== null)
    .join("\n");
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function Contact() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.full)}`;

  return (
    <>
      <PhotoHero
        eyebrow="Contact"
        title="Parlons de votre projet."
        intro="Décrivez votre terrain et votre ouvrage : nous revenons vers vous rapidement avec une proposition adaptée."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="container-site pb-24 pt-12 md:pt-16" aria-label="Coordonnées et formulaire">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Coordonnées */}
          <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow text-primary">Coordonnées</p>
              <h2 className="text-display-md mt-3 font-semibold">Une équipe joignable directement.</h2>
            </Reveal>

            <div className="grid gap-3 pt-4">
              <InfoCard icon={<Phone className="h-5 w-5" aria-hidden />} label="Téléphone" delay={0.05}>
                <a href={site.phoneHref} className="font-display text-lg font-semibold text-heading hover:text-primary">
                  {site.phone}
                </a>
              </InfoCard>
              <InfoCard icon={<MessageCircle className="h-5 w-5" aria-hidden />} label="WhatsApp" delay={0.1}>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-lg font-semibold text-heading hover:text-primary"
                >
                  Écrire sur WhatsApp
                </a>
              </InfoCard>
              <InfoCard icon={<Mail className="h-5 w-5" aria-hidden />} label="E-mail" delay={0.15}>
                <a href={`mailto:${site.email}`} className="break-all font-display text-lg font-semibold text-heading hover:text-primary">
                  {site.email}
                </a>
              </InfoCard>
              <InfoCard icon={<MapPin className="h-5 w-5" aria-hidden />} label="Adresse" delay={0.2}>
                <p className="font-display font-semibold text-heading">{site.address.full}</p>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  <Navigation className="h-3.5 w-3.5" aria-hidden /> Ouvrir dans Google Maps
                </a>
              </InfoCard>
            </div>

            <Reveal delay={0.25} className="rounded-2xl bg-navy p-6 text-navy-foreground">
              <p className="font-display font-semibold">Plans, photos ou rapports existants ?</p>
              <p className="mt-1 text-sm text-navy-muted">
                Envoyez-les directement par WhatsApp ou par e-mail après votre demande : ils nous aident à mieux cadrer la mission.
              </p>
            </Reveal>
          </div>

          {/* Formulaire */}
          <QuoteForm />
        </div>
      </section>
    </>
  );
}

function InfoCard({ icon, label, children, delay }: { icon: ReactNode; label: string; children: ReactNode; delay: number }) {
  return (
    <Reveal delay={delay} className="surface-card flex items-start gap-4 p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</span>
      <div className="min-w-0">
        <p className="eyebrow text-primary/70">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Formulaire de devis                                                 */
/* ------------------------------------------------------------------ */

function QuoteForm() {
  const { service } = Route.useSearch();
  const reduce = useReducedMotion();
  const uid = useId();
  const initialServices = service && services.some((s) => s.id === service) ? [service] : [];

  const [data, setData] = useState<FormData>({ ...empty, services: initialServices });
  const [errors, setErrors] = useState<Errors>({});
  const [honeypot, setHoneypot] = useState("");
  const [summary, setSummary] = useState<string | null>(null);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key])
      setErrors((e) => {
        const next = { ...e };
        delete next[key];
        return next;
      });
  };

  const toggleService = (id: string) =>
    set("services", data.services.includes(id) ? data.services.filter((s) => s !== id) : [...data.services, id]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) {
      setSummary("");
      return;
    }
    const res = schema.safeParse(data);
    if (!res.success) {
      const next: Errors = {};
      for (const issue of res.error.issues) {
        const k = issue.path[0] as keyof FormData | undefined;
        if (k && !next[k]) next[k] = issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    setSummary(buildSummary(res.data));
  };

  const id = (k: keyof FormData) => `${uid}-${k}`;
  const errId = (k: keyof FormData) => `${uid}-${k}-error`;
  const field = (k: keyof FormData) => ({
    id: id(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? errId(k) : undefined,
  });

  const inputCls = (k: keyof FormData) =>
    cn(
      "w-full rounded-xl border bg-background px-4 text-heading outline-none transition placeholder:text-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20",
      errors[k] && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
    );

  const Err = ({ k }: { k: keyof FormData }) =>
    errors[k] ? (
      <p id={errId(k)} className="mt-1.5 text-sm text-red-600">
        {errors[k]}
      </p>
    ) : null;

  return (
    <Reveal delay={0.1} className="surface-card relative overflow-hidden p-6 md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {summary === null ? (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            {...(reduce ? {} : { exit: { opacity: 0, y: -12 } })}
            transition={{ duration: 0.3 }}
            aria-labelledby={`${uid}-title`}
          >
            <p className="eyebrow text-primary">Demande de devis</p>
            <h2 id={`${uid}-title`} className="mt-2 font-display text-2xl font-semibold text-heading">
              Décrivez votre projet
            </h2>
            <p className="mt-2 text-sm">Les champs marqués d'un * sont obligatoires.</p>

            {/* Anti-spam : champ invisible pour les humains */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Site web
                <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </label>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor={id("nom")} required>
                  Nom complet
                </Label>
                <input {...field("nom")} autoComplete="name" value={data.nom} onChange={(e) => set("nom", e.target.value)} className={cn(inputCls("nom"), "h-12")} />
                <Err k="nom" />
              </div>
              <div>
                <Label htmlFor={id("societe")}>Société</Label>
                <input {...field("societe")} autoComplete="organization" value={data.societe} onChange={(e) => set("societe", e.target.value)} className={cn(inputCls("societe"), "h-12")} />
              </div>
              <div>
                <Label htmlFor={id("telephone")} required>
                  Téléphone
                </Label>
                <input {...field("telephone")} type="tel" autoComplete="tel" placeholder="+212 6 …" value={data.telephone} onChange={(e) => set("telephone", e.target.value)} className={cn(inputCls("telephone"), "h-12")} />
                <Err k="telephone" />
              </div>
              <div>
                <Label htmlFor={id("email")} required>
                  E-mail
                </Label>
                <input {...field("email")} type="email" autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} className={cn(inputCls("email"), "h-12")} />
                <Err k="email" />
              </div>
              <div>
                <Label htmlFor={id("typeProjet")} required>
                  Type de projet
                </Label>
                <select {...field("typeProjet")} value={data.typeProjet} onChange={(e) => set("typeProjet", e.target.value)} className={cn(inputCls("typeProjet"), "h-12")}>
                  <option value="">Sélectionnez…</option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <Err k="typeProjet" />
              </div>
              <div>
                <Label htmlFor={id("localisation")} required>
                  Localisation du projet
                </Label>
                <input {...field("localisation")} placeholder="Ville, quartier, zone…" value={data.localisation} onChange={(e) => set("localisation", e.target.value)} className={cn(inputCls("localisation"), "h-12")} />
                <Err k="localisation" />
              </div>
            </div>

            <fieldset className="mt-6">
              <legend className="mb-3 font-display text-sm font-semibold text-heading">Services souhaités</legend>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => {
                  const on = data.services.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleService(s.id)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2",
                        on ? "border-navy bg-navy text-navy-foreground" : "bg-background hover:border-primary hover:text-heading",
                      )}
                    >
                      {on && <span aria-hidden className="mr-1.5 text-amber">✓</span>}
                      {s.title}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-6">
              <Label htmlFor={id("message")} required>
                Votre projet
              </Label>
              <textarea
                {...field("message")}
                rows={5}
                placeholder="Nature de l'ouvrage, surface, niveaux, contraintes, délais souhaités…"
                value={data.message}
                onChange={(e) => set("message", e.target.value)}
                className={cn(inputCls("message"), "resize-y py-3")}
              />
              <Err k="message" />
            </div>

            <div className="mt-6">
              <label className="flex cursor-pointer items-start gap-3 text-sm">
                <input
                  {...field("consent")}
                  type="checkbox"
                  checked={data.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--primary)]"
                />
                <span>J'accepte que LGTP utilise ces informations pour me recontacter au sujet de ma demande. *</span>
              </label>
              <Err k="consent" />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-primary/70">Vous choisirez ensuite l'envoi par WhatsApp ou par e-mail.</p>
              <Button type="submit" variant="devis" size="lg">
                Préparer ma demande
              </Button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="done"
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="py-6 text-center"
            role="status"
          >
            <motion.span
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber text-navy"
              initial={reduce ? false : { scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            >
              <CheckCircle2 className="h-8 w-8" aria-hidden />
            </motion.span>
            <h2 className="mt-6 font-display text-2xl font-semibold text-heading">Votre demande est prête.</h2>
            <p className="mx-auto mt-3 max-w-md">
              Choisissez comment nous l'envoyer : le message est déjà rédigé, il ne vous reste qu'à valider l'envoi.
            </p>

            {summary && (
              <>
                <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button asChild variant="whatsapp" size="lg">
                    <a href={whatsappLink(summary)} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" aria-hidden /> Envoyer sur WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href={mailtoLink("Demande de devis — LGTP", summary)}>
                      <Mail className="h-4 w-4" aria-hidden /> Envoyer par e-mail
                    </a>
                  </Button>
                </div>
                <details className="mx-auto mt-8 max-w-lg text-left">
                  <summary className="cursor-pointer text-center text-sm font-semibold text-primary">Voir le récapitulatif</summary>
                  <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-secondary p-4 font-sans text-sm leading-relaxed">{summary}</pre>
                </details>
              </>
            )}

            <button
              type="button"
              onClick={() => {
                setSummary(null);
                setData({ ...empty, services: [] });
              }}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-heading"
            >
              <RotateCcw className="h-4 w-4" aria-hidden /> Nouvelle demande
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

function Label({ htmlFor, required, children }: { htmlFor: string; required?: boolean; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block font-display text-sm font-semibold text-heading">
      {children}
      {required && (
        <span className="ml-0.5 text-amber" aria-hidden>
          *
        </span>
      )}
    </label>
  );
}
