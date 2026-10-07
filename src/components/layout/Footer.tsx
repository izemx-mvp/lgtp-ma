import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/config/site";
import { services } from "@/data/services";
import { Sawtooth } from "@/components/motif/Motif";
import { Logo } from "./Header";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-auto bg-navy-deep text-navy-muted">
      <Sawtooth className="-mt-px text-background" flip />
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_0.8fr]">
        <div>
          <Logo />
          <p className="mt-6 font-display text-lg font-semibold text-navy-foreground">{site.tagline}</p>
          <p className="mt-3 max-w-sm text-sm">{site.description}</p>
        </div>
        <div>
          <h2 className="eyebrow text-amber">Expertises</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.id}><Link to="/expertises" hash={s.id} className="link-underline hover:text-navy-foreground">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow text-amber">Contact</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden />{site.address.full}</li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden /><a href={site.phoneHref} className="tabular link-underline hover:text-navy-foreground">{site.phone}</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden /><a href={`mailto:${site.email}`} className="link-underline hover:text-navy-foreground">{site.email}</a></li>
            <li className="flex gap-3"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden /><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-navy-foreground">WhatsApp</a></li>
            <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden /><span>{site.hours.map((h) => <span key={h.days} className="block">{h.days} : {h.time}</span>)}</span></li>
          </ul>
        </div>
        <div>
          <h2 className="eyebrow text-amber">Informations</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li><Link to="/mentions-legales" className="link-underline hover:text-navy-foreground">Mentions légales</Link></li>
            <li><Link to="/politique-de-confidentialite" className="link-underline hover:text-navy-foreground">Politique de confidentialité</Link></li>
            <li><Link to="/contact" className="link-underline hover:text-navy-foreground">Demander un devis</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-border">
        <div className="container-site flex flex-col gap-2 py-6 pb-24 text-xs sm:flex-row sm:items-center sm:justify-between md:pb-6">
          <p>© {year} {site.legalName}. Tous droits réservés.</p>
          <a href={site.credit.href} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100">{site.credit.label}</a>
        </div>
      </div>
    </footer>
  );
}
