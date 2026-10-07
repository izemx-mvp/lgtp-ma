import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";

// État en mémoire uniquement (aucun stockage navigateur).
let dismissedInSession = false;

export function CookieNotice() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (dismissedInSession) return;
    const t = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  const close = () => {
    dismissedInSession = true;
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="region"
          aria-label="Information sur les cookies"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : 16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="surface-card fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 max-w-[min(23rem,calc(100vw-6.5rem))] overflow-hidden p-0 text-sm shadow-lift"
        >
          <span aria-hidden className="block h-1 w-full bg-[linear-gradient(90deg,var(--primary),var(--amber))]" />
          <div className="p-4">
            <div className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </span>
              <p className="flex-1 leading-snug">
                <span className="block font-display font-semibold text-heading">Respect de votre vie privée</span>
                Ce site n'utilise aucun cookie publicitaire ni de suivi.{" "}
                <Link to="/politique-de-confidentialite" className="text-primary underline underline-offset-2">
                  En savoir plus
                </Link>
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Fermer l'information sur les cookies"
                className="shrink-0 self-start rounded-full p-1 text-primary/60 transition-colors hover:bg-muted hover:text-heading"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <button
              type="button"
              onClick={close}
              className="mt-3 w-full rounded-full bg-navy py-2 font-display text-sm font-semibold text-navy-foreground transition-colors hover:bg-primary"
            >
              J'ai compris
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}