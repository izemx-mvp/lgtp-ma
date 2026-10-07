import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

// État en mémoire uniquement (aucun stockage navigateur).
let dismissedInSession = false;

export function CookieNotice() {
  const [open, setOpen] = useState(!dismissedInSession);
  if (!open) return null;
  const close = () => { dismissedInSession = true; setOpen(false); };
  return (
    <div role="region" aria-label="Information sur les cookies" className="surface-card fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 max-w-[min(22rem,calc(100vw-6.5rem))] p-4 text-sm">
      <div className="flex gap-3">
        <p>
          Ce site n'utilise aucun cookie publicitaire ni de suivi.{" "}
          <Link to="/politique-de-confidentialite" className="text-primary underline underline-offset-2">En savoir plus</Link>
        </p>
        <button onClick={close} aria-label="Fermer l'information sur les cookies" className="shrink-0 self-start rounded-full p-1 hover:bg-muted"><X className="h-4 w-4" /></button>
      </div>
      <button onClick={close} className="mt-3 font-display text-sm font-semibold text-primary">J'ai compris</button>
    </div>
  );
}
