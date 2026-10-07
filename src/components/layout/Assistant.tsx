import { useEffect, useRef, useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail, MessageCircle, Send, X } from "lucide-react";
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
  cards?: ChatCard[];
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

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "end" }); }, [messages, typing, reduce]);

  const bot = (m: Omit<Msg, "id" | "from">) => {
    const delay = reduce ? 0 : 400 + Math.random() * 300;
    setTyping(true);
    window.setTimeout(() => { setTyping(false); setMessages((prev) => [...prev, { id: uid++, from: "bot", ...m }]); }, delay);
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
        `• Type de projet : ${next.type}`,
        `• Localisation : ${next.lieu}`,
        `• Description : ${next.description}`,
        `• Nom : ${next.nom}`,
        `• Téléphone : ${next.telephone}`,
      ].join("\n");
      bot({ text: "Merci, voici le récapitulatif. Envoyez-le-nous par WhatsApp ou par e-mail : rien n'est transmis par le site lui-même.", summary });
    }
  };

  const answerIntent = (id: string) => {
    const intent = intents.find((i) => i.id === id);
    if (!intent) return;
    if (intent.action === "devis") {
      bot({ text: intent.answer, chips: [{ label: "Préparer ma demande", value: "devis:start" }, { label: "Aller au formulaire", value: "nav:contact" }] });
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

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-navy/30 md:bg-transparent" />
        <Dialog.Content
          className="fixed inset-0 z-[71] flex flex-col overflow-hidden bg-background shadow-lift md:inset-auto md:bottom-6 md:right-6 md:h-[min(42rem,calc(100vh-3rem))] md:w-[400px] md:rounded-2xl md:border"
          aria-describedby="assistant-desc"
        >
          <div className="glass-navy flex items-center gap-3 px-5 py-4 text-navy-foreground">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-card"><TriMark className="h-6 w-auto" /></span>
            <div className="min-w-0 flex-1">
              <Dialog.Title className="font-display text-base font-semibold text-navy-foreground">Assistant LGTP</Dialog.Title>
              <p id="assistant-desc" className="truncate text-xs text-navy-muted">Réponses sur nos services et demandes de devis</p>
            </div>
            <Dialog.Close className="rounded-full p-2 hover:bg-navy-border" aria-label="Fermer l'assistant"><X className="h-5 w-5" /></Dialog.Close>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex flex-col", m.from === "user" ? "items-end" : "items-start")}>
                <div className={cn("max-w-[88%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm", m.from === "user" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-card text-heading border")}>
                  {fr(m.text)}
                </div>
                {m.summary && (
                  <div className="mt-2 w-[88%] rounded-xl border bg-secondary p-4 text-xs">
                    <pre className="whitespace-pre-wrap font-sans text-secondary-foreground">{m.summary}</pre>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button asChild variant="whatsapp" size="sm"><a href={whatsappLink(m.summary)} target="_blank" rel="noopener noreferrer"><MessageCircle /> Envoyer sur WhatsApp</a></Button>
                      <Button asChild variant="outline" size="sm"><a href={mailtoLink("Demande de devis — site LGTP", m.summary)}><Mail /> Envoyer par e-mail</a></Button>
                    </div>
                  </div>
                )}
                {m.cards && (
                  <div className="mt-2 grid w-[88%] gap-2">
                    {m.cards.map((c) => (
                      <Link key={c.title} to={c.to} hash={c.hash} onClick={() => onOpenChange(false)} className="group rounded-xl border bg-card p-3 text-xs transition-colors hover:border-primary">
                        <p className="font-display text-sm font-semibold text-heading">{fr(c.title)}</p>
                        <p className="mt-1 line-clamp-2">{fr(c.text)}</p>
                        <span className="mt-2 inline-flex items-center gap-1 font-semibold text-primary">Voir la page <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></span>
                      </Link>
                    ))}
                  </div>
                )}
                {m.chips && m.id === messages[messages.length - 1]?.id && (
                  <div className="mt-2 flex max-w-[95%] flex-wrap gap-2">
                    {m.chips.map((c) =>
                      c.value === "nav:contact" ? (
                        <Link key={c.value} to="/contact" onClick={() => onOpenChange(false)} className="rounded-full border border-primary/30 bg-card px-3 py-1.5 text-xs font-medium text-primary hover:bg-secondary">{c.label}</Link>
                      ) : (
                        <button key={c.value} onClick={() => onChip(c)} className="rounded-full border border-primary/30 bg-card px-3 py-1.5 text-left text-xs font-medium text-primary hover:bg-secondary">{fr(c.label)}</button>
                      ),
                    )}
                  </div>
                )}
              </div>
            ))}
            <AnimatePresence>
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex w-16 items-center gap-1 rounded-2xl rounded-bl-sm border bg-card px-4 py-3" aria-label="L'assistant écrit">
                  {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" style={{ animationDelay: `${i * 150}ms` }} />)}
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={endRef} />
          </div>

          <div className="border-t bg-card px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <label htmlFor="assistant-input" className="sr-only">Votre message</label>
              <input
                id="assistant-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={step ? "Votre réponse…" : "Posez votre question…"}
                className="h-11 flex-1 rounded-full border border-input bg-background px-4 text-sm text-heading outline-none focus:border-primary"
                autoComplete="off"
              />
              <Button type="submit" size="icon" aria-label="Envoyer"><Send /></Button>
            </form>
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="text-[0.68rem] leading-snug text-muted-foreground">Assistant automatisé. Les informations fournies ne remplacent pas une étude géotechnique.</p>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center gap-1 text-xs font-semibold text-whatsapp"><MessageCircle className="h-3.5 w-3.5" aria-hidden />Parler sur WhatsApp</a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
