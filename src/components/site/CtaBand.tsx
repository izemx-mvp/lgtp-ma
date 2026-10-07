import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/config/site";
import { Button, BtnArrow } from "@/components/ui/button";
import { Sawtooth, TriMark } from "@/components/motif/Motif";
import { Reveal } from "@/components/motion/Reveal";
import { fr } from "@/lib/fr";

export function CtaBand({ title = "Un projet en cours ? Parlons de votre sol.", text = "Décrivez-nous votre ouvrage et votre terrain : nous revenons vers vous pour définir les investigations adaptées." }: { title?: string; text?: string }) {
  return (
    <section className="relative bg-navy text-navy-foreground" aria-labelledby="cta-title">
      <Sawtooth className="-mt-px text-background" flip />
      <div className="bg-motif absolute inset-0 opacity-40" aria-hidden />
      <div className="container-site relative grid items-center gap-10 py-20 md:grid-cols-[1fr_auto] md:py-24">
        <Reveal>
          <TriMark className="mb-6 h-10 w-auto" />
          <h2 id="cta-title" className="text-display-md max-w-2xl font-semibold text-navy-foreground">{fr(title)}</h2>
          <p className="mt-4 max-w-xl text-navy-muted">{fr(text)}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          <Button asChild variant="devis" size="lg"><Link to="/contact">Demander un devis <BtnArrow /></Link></Button>
          <Button asChild variant="whatsapp" size="lg"><a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><MessageCircle /> WhatsApp</a></Button>
          <Button asChild variant="outlineLight" size="lg"><a href={site.phoneHref}><Phone /> Appeler</a></Button>
        </Reveal>
      </div>
      <Sawtooth className="text-background" />
    </section>
  );
}
