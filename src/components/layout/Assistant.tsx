import { useEffect, useRef, useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail, MessageCircle, RotateCcw, Send, X } from "lucide-react";
import { fallbackAnswer, intents, matchIntent, projectTypes, quickReplies, type ChatCard } from "@/data/assistant";
import { mailtoLink, whatsappLink } from "@/config/site";
import { TriMark } from "@/components/motif/Motif";
import { Button } from "@/components/ui/button";
import { fr } from "@/lib/fr";
import { cn } from "@/lib/utils";

type Msg = {
  id: number;
  from: "bot" | "user";
  text: string;
  cards?: ChatCard[] | undefined;
  chips?: { label: string; value: string }[];
  summary?: string;
};

type Step = null | "type" | "lieu" | "description" | "nom" | "telephone";
const stepPrompts: Record<Exclude<Step, null>, string> = {
  type: "Très bien. Quel est le type de projet ?",
  lieu: "Où se situe le projet (ville, quartier) ?",
  description: "Décrivez brièvement le projet et votre besoin (ouvrage, surface, étude ou essais souhaités…).",
  nom: "Merci. Quel est votre nom (et votre société le cas échéant) ?",
  telephone: "Enfin, à quel numéro pouvons-nous vous rappeler ?",
};
const stepLabels: Record<Exclude<Step, null>, string> = {
  type: "Type de projet",
  lieu: "Localisation",
  description: "Description",
  nom: "Coordonnées",
  telephone: "Téléphone",
};
const order: Exclude<Step, null>[] = ["type", "lieu", "description", "nom", "telephone"];

let uid = 0;
const greet = (): Msg => ({
  id: uid++,
  from: "bot",
  text: "Bonjour, je suis l'assistant LGTP. Je réponds aux questions courantes sur nos services et je peux préparer votre demande de devis.",
  chips: quickReplies.map((q) => ({ label: q.label, value: `intent:${q.intent}` })),
});

export function Assistant({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState<Msg[]>(() => [greet()]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<Step>(null);
  const [devis, setDevis] = useState<Record<string, string>>({});
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "end" });
  }, [messages, typing, reduce]);

  const bot = (m: Omit<Msg, "id" | "from">) => {
    const delay = reduce ? 0 : 400 + Math.random() * 300;
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: uid++, from: "bot", ...m }]);
    }, delay);
  };

  const startDevis = () => {
    setDevis({});
    setStep("type");
    bot({ text: stepPrompts.type, chips: projectTypes.map((t) => ({ label: t, value: `type:${t}` })) });
  };

  const advance = (current: Exclude<Step, null>, value: string) => {
    const next = { ...devis, [current]: value };
    setDevis(next);
    const idx = order.indexOf(current);
    const nextStep = order[idx + 1];
    if (nextStep) {
      setStep(nextStep);
      bot({ text: stepPrompts[nextStep] });
    } else {
      setStep(null);
      const summary = [
        "Bonjour LGTP, voici ma demande de devis :",
        `• Type de projet : ${next["type"]}`,
        `• Localisation : ${next["lieu"]}`,
        `• Description : ${next["description"]}`,
        `• Nom : ${next["nom"]}`,
        `• Téléphone : ${next["telephone"]}`,
      ].join("\n");
      bot({
        text: "Merci, voici le récapitulatif. Envoyez-le-nous par WhatsApp ou par e-mail : rien n'est transmis par le site lui-même.",
        summary,
      });
    }
  };

  const answerIntent = (id: string) => {
    const intent = intents.find((i) => i.id === id);
    if (!intent) return;
    if (intent.action === "devis") {
      bot({
        text: intent.answer,
        chips: [
          { label: "Préparer ma demande", value: "devis:start" },
          { label: "Aller au formulaire", value: "nav:contact" },
        ],
      });
      return;
    }
    bot({ text: intent.answer, cards: intent.cards, chips: [{ label: "Demander un devis", value: "devis:start" }] });
  };

  const handleUser = (text: string, value?: string) => {
    setMessages((prev) => [...prev, { id: uid++, from: "user", text }]);
    if (value?.startsWith("intent:")) return answerIntent(value.slice(7));
    if (value === "devis:start") return startDevis();
    if (value?.startsWith("type:")) return advance("type", value.slice(5));
    if (step) return advance(step, text);
    const intent = matchIntent(text);
    if (intent) return answerIntent(intent.id);
    bot({ text: fallbackAnswer, chips: [{ label: "Demander un devis", value: "devis:start" }] });
  };

  const onChip = (c: { label: string; value: string }) => {
    if (c.value === "nav:contact") return onOpenChange(false);
    handleUser(c.label, c.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const t = input.trim();
    if (!t) return;
    setInput("");
    handleUser(t);
  };

  const restart = () => {
    setStep(null);
    setDevis({});
    setTyping(false);
    setInput("");
    setMessages([greet()]);
    inputRef.current?.focus();
  };

  const stepIndex = step ? order.indexOf(step) : -1;
  const lastId = messages[messages.length - 1]?.id;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount asChild>
              <motion.div
                className="fixed inset-0 z-[70] bg-navy/40 md:bg-navy/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content forceMount asChild aria-describedby="assistant-desc" onOpenAutoFocus={(e) => {
              e.preventDefault();
              inputRef.current?.focus();
            }}>
              <motion.div
                className="fixed inset-0 z-[71] flex flex-col overflow-hidden bg-background shadow-lift md:inset-auto md:bottom-6 md:right-6 md:h-[min(42rem,calc(100vh-3rem))] md:w-[410px] md:rounded-3xl md:border"
                style={{ transformOrigin: "bottom right" }}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 24 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* En-tête */}
                <div className="glass-navy relative px-5 pb-4 pt-4 text-navy-foreground">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-card">
                      <TriMark className="h-6 w-auto" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <Dialog.Title className="font-display text-base font-semibold text-navy-foreground">Assistant LGTP</Dialog.Title>
                      <p id="assistant-desc" className="truncate text-xs text-navy-muted">
                        Réponses sur nos services et demandes de devis
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={restart}
                      className="rounded-full p-2 transition-colors hover:bg-navy-border"
                      aria-label="Recommencer la conversation"
                      title="Recommencer"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden />
                    </button>
                    <Dialog.Close className="rounded-full p-2 transition-colors hover:bg-navy-border" aria-label="Fermer l'assistant">
                      <X className="h-5 w-5" />
                    </Dialog.Close>
                  </div>

                  {/* Progression de la demande de devis */}
                  <AnimatePresence initial={false}>
                    {step && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 flex items-center justify-between text-[0.7rem]">
                          <span className="font-semibold uppercase tracking-[0.12em] text-amber">Demande de devis</span>
                          <span className="text-navy-muted">
                            Étape {stepIndex + 1}/{order.length} · {stepLabels[step]}
                          </span>
                        </div>
                        <div className="mt-2 grid grid-cols-5 gap-1" aria-hidden>
                          {order.map((s, i) => (
                            <span
                              key={s}
                              className={cn(
                                "h-1 rounded-full transition-colors duration-300",
                                i <= stepIndex ? "bg-amber" : "bg-navy-border",
                              )}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Messages */}
                <div
                  className="flex-1 space-y-4 overflow-y-auto bg-[radial-gradient(circle_at_1px_1px,rgba(65,103,174,0.08)_1px,transparent_0)] [background-size:18px_18px] px-4 py-5"
                  aria-live="polite"
                >
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={cn("flex gap-2", m.from === "user" ? "justify-end" : "justify-start")}
                    >
                      {m.from === "bot" && (
                        <span aria-hidden className="mt-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border bg-card">
                          <TriMark className="h-3.5 w-auto" />
                        </span>
                      )}
                      <div className={cn("flex min-w-0 max-w-[85%] flex-col", m.from === "user" ? "items-end" : "items-start")}>
                        <div
                          className={cn(
                            "whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
                            m.from === "user"
                              ? "rounded-br-sm bg-primary text-primary-foreground"
                              : "rounded-bl-sm border bg-card text-heading",
                          )}
                        >
                          {fr(m.text)}
                        </div>

                        {m.summary && (
                          <div className="mt-2 w-full overflow-hidden rounded-2xl border bg-card text-xs shadow-sm">
                            <div className="flex items-center gap-2 bg-navy px-4 py-2 text-navy-foreground">
                              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-amber" />
                              <span className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.12em]">
                                Récapitulatif
                              </span>
                            </div>
                            <pre className="whitespace-pre-wrap px-4 py-3 font-sans leading-relaxed text-heading">{m.summary}</pre>
                            <div className="flex flex-wrap gap-2 border-t bg-secondary/60 px-4 py-3">
                              <Button asChild variant="whatsapp" size="sm">
                                <a href={whatsappLink(m.summary)} target="_blank" rel="noopener noreferrer">
                                  <MessageCircle /> WhatsApp
                                </a>
                              </Button>
                              <Button asChild variant="outline" size="sm">
                                <a href={mailtoLink("Demande de devis — site LGTP", m.summary)}>
                                  <Mail /> E-mail
                                </a>
                              </Button>
                            </div>
                          </div>
                        )}

                        {m.cards && (
                          <div className="mt-2 grid w-full gap-2">
                            {m.cards.map((c) => (
                              <Link
                                key={c.title}
                                to={c.to}
                                {...(c.hash ? { hash: c.hash } : {})}
                                onClick={() => onOpenChange(false)}
                                className="group relative overflow-hidden rounded-xl border bg-card p-3 pl-4 text-xs shadow-sm transition-colors hover:border-primary"
                              >
                                <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-amber transition-all group-hover:w-1.5" />
                                <p className="font-display text-sm font-semibold text-heading">{fr(c.title)}</p>
                                <p className="mt-1 line-clamp-2">{fr(c.text)}</p>
                                <span className="mt-2 inline-flex items-center gap-1 font-semibold text-primary">
                                  Voir la page
                                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}

                        {m.chips && m.id === lastId && !typing && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {m.chips.map((c, i) =>
                              c.value === "nav:contact" ? (
                                <Link
                                  key={c.value}
                                  to="/contact"
                                  onClick={() => onOpenChange(false)}
                                  className="rounded-full border border-primary/30 bg-card px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                >
                                  {c.label}
                                </Link>
                              ) : (
                                <motion.button
                                  key={c.value}
                                  type="button"
                                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: reduce ? 0 : 0.05 * i }}
                                  onClick={() => onChip(c)}
                                  className="rounded-full border border-primary/30 bg-card px-3 py-1.5 text-left text-xs font-medium text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                >
                                  {fr(c.label)}
                                </motion.button>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  <AnimatePresence>
                    {typing && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-end gap-2"
                        aria-label="L'assistant écrit"
                      >
                        <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border bg-card">
                          <TriMark className="h-3.5 w-auto" />
                        </span>
                        <span className="flex items-center gap-1 rounded-2xl rounded-bl-sm border bg-card px-4 py-3 shadow-sm">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="h-1.5 w-1.5 rounded-full bg-primary"
                              animate={reduce ? { opacity: [0.4, 1, 0.4] } : { y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                            />
                          ))}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={endRef} />
                </div>

                {/* Saisie */}
                <div className="border-t bg-card px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
                  <form onSubmit={onSubmit} className="flex items-center gap-2 rounded-full border bg-background p-1 pl-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                    <label htmlFor="assistant-input" className="sr-only">
                      Votre message
                    </label>
                    <input
                      ref={inputRef}
                      id="assistant-input"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={step ? `${stepLabels[step]}…` : "Posez votre question…"}
                      className="h-10 flex-1 bg-transparent text-sm text-heading outline-none"
                      autoComplete="off"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      aria-label="Envoyer"
                      disabled={!input.trim()}
                      className="h-10 w-10 shrink-0 rounded-full transition-opacity disabled:opacity-40"
                    >
                      <Send />
                    </Button>
                  </form>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <p className="text-[0.68rem] leading-snug text-muted-foreground">
                      Assistant automatisé. Les informations fournies ne remplacent pas une étude géotechnique.
                    </p>
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex shrink-0 items-center gap-1 text-xs font-semibold text-whatsapp hover:underline"
                    >
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}