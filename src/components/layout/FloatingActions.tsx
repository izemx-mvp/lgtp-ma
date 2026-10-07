import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, MessageCircle, MessagesSquare, X } from "lucide-react";
import { whatsappLink } from "@/config/site";
import { Assistant } from "./Assistant";

// Mémoire de session (aucun stockage navigateur) : l'invitation ne s'affiche qu'une fois par visite.
let teaserShownInSession = false;

export function FloatingActions() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    if (teaserShownInSession) return;
    const t = window.setTimeout(() => {
      teaserShownInSession = true;
      setTeaser(true);
    }, 8000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!teaser) return;
    const t = window.setTimeout(() => setTeaser(false), 12000);
    return () => window.clearTimeout(t);
  }, [teaser]);

  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 900);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const openAssistant = () => {
    setTeaser(false);
    setOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {teaser && !open && (
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduce ? 0 : 6 }}
              transition={{ duration: 0.3 }}
              className="surface-card relative mr-1 max-w-[16rem] p-4 pr-9 text-sm shadow-lift"
              role="status"
            >
              <button
                type="button"
                onClick={() => setTeaser(false)}
                aria-label="Fermer l'invitation"
                className="absolute right-2 top-2 rounded-full p-1 text-primary/60 hover:bg-secondary hover:text-heading"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
              <p className="font-display font-semibold text-heading">Une question sur votre projet ?</p>
              <button type="button" onClick={openAssistant} className="mt-1 text-left text-primary hover:underline">
                L'assistant vous répond et prépare votre devis.
              </button>
              <span aria-hidden className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 border-b border-r bg-card" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
              aria-label="Revenir en haut de la page"
              className="flex h-11 w-11 items-center justify-center rounded-full border bg-card text-heading shadow-lift transition-colors hover:border-primary hover:text-primary"
            >
              <ArrowUp className="h-5 w-5" aria-hidden />
            </motion.button>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={openAssistant}
          aria-label="Ouvrir l'assistant LGTP"
          className="group relative flex h-14 items-center gap-2 rounded-full bg-primary pl-4 pr-5 font-display text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5"
        >
          {teaser && !reduce && (
            <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-primary/40 [animation-duration:2s]" />
          )}
          <MessagesSquare className="relative h-5 w-5" aria-hidden />
          <span className="relative hidden sm:inline">Assistant</span>
        </button>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nous écrire sur WhatsApp"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle className="h-6 w-6" aria-hidden />
          <span
            aria-hidden
            className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-navy px-3 py-1.5 font-display text-xs font-semibold text-navy-foreground opacity-0 shadow-lift transition-opacity group-hover:opacity-100 md:block"
          >
            Écrire sur WhatsApp
          </span>
        </a>
      </div>
      <Assistant open={open} onOpenChange={setOpen} />
    </>
  );
}