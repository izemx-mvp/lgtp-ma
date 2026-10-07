import { useState } from "react";
import { MessageCircle, MessagesSquare } from "lucide-react";
import { whatsappLink } from "@/config/site";
import { Assistant } from "./Assistant";

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-end gap-3">
        <button
          onClick={() => setOpen(true)}
          aria-label="Ouvrir l'assistant LGTP"
          className="group flex h-14 items-center gap-2 rounded-full bg-primary pl-4 pr-5 font-display text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5"
        >
          <MessagesSquare className="h-5 w-5" aria-hidden />
          <span className="hidden sm:inline">Assistant</span>
        </button>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nous écrire sur WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle className="h-6 w-6" aria-hidden />
        </a>
      </div>
      <Assistant open={open} onOpenChange={setOpen} />
    </>
  );
}
