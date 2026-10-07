import { Link } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { site, whatsappLink } from "@/config/site";
import { services } from "@/data/services";
import { Sawtooth } from "@/components/motif/Motif";
import { Logo, navItems } from "./Header";

export function Footer() {
  const year = new Date().getFullYear();
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.full)}`;

  return (
    <footer className="relative mt-auto overflow-hidden bg-navy-deep text-navy-muted">
      <Sawtooth className="-mt-px text-background" flip />

      {/* Filigrane */}
      <p
        aria-hidden
        className="pointer-events-none absolute -bottom-8 right-0 select-none font-display text-[22vw] font-bold leading-none text-navy-foreground/[0.03] lg:text-[16rem]"
      >
        LGTP
      </p>

      <div className="container-site relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        {/* Marque */}
        <div>
          <Logo />
          <p className="mt-6 font-display text-lg font-semibold text-navy-foreground">{site.tagline}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed">{site.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-navy-border px-4 py-2 text-xs font-semibold text-navy-foreground transition-colors hover:border-amber hover:text-amber"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden /> WhatsApp
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-amber px-4 py-2 text-xs font-semibold text-navy transition-transform hover:-translate-y-0.5"
            >
              Demander un devis <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>

        {/* Expertises */}
        <div>
          <h2 className="eyebrow text-amber">Expertises</h2>
          <ul className="mt-5 space-y-1 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  to="/expertises"
                  hash={s.id}
                  className="group flex items-center gap-3 py-1 transition-colors hover:text-navy-foreground"
                >
                  <span className="w-5 font-display text-[0.7rem] tabular text-amber/60 transition-colors group-hover:text-amber">
                    {s.number}
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="eyebrow text-amber">Navigation</h2>
          <ul className="mt-5 space-y-1 text-sm">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="group inline-flex items-center gap-2 py-1 transition-colors hover:text-navy-foreground"
                >
                  <span aria-hidden className="h-1 w-1 rotate-45 bg-amber/50 transition-colors group-hover:bg-amber" />
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="eyebrow text-amber">Contact</h2>
          <ul className="mt-5 space-y-2 text-sm">
            <ContactItem icon={<MapPin className="h-4 w-4" aria-hidden />} href={mapsHref} external>
              {site.address.full}
            </ContactItem>
            <ContactItem icon={<Phone className="h-4 w-4" aria-hidden />} href={site.phoneHref}>
              <span className="tabular">{site.phone}</span>
            </ContactItem>
            <ContactItem icon={<Mail className="h-4 w-4" aria-hidden />} href={`mailto:${site.email}`}>
              <span className="break-all">{site.email}</span>
            </ContactItem>
            <li className="flex gap-3 px-3 py-2">
              <span className="mt-0.5 text-amber">
                <Clock className="h-4 w-4" aria-hidden />
              </span>
              <span>
                {site.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days} : <span className="text-navy-foreground">{h.time}</span>
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Barre inférieure */}
      <div className="relative border-t border-navy-border">
        <div className="container-site flex flex-col gap-4 py-6 pb-24 text-xs sm:flex-row sm:items-center sm:justify-between md:pb-6">
          <p>
            © {year} {site.legalName}. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/mentions-legales" className="transition-colors hover:text-navy-foreground">
              Mentions légales
            </Link>
            <Link to="/politique-de-confidentialite" className="transition-colors hover:text-navy-foreground">
              Confidentialité
            </Link>
            <a
              href={site.credit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 transition-opacity hover:opacity-100"
            >
              {site.credit.label}
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 rounded-full border border-navy-border px-3 py-1.5 font-semibold text-navy-foreground transition-colors hover:border-amber hover:text-amber"
            >
              Haut de page
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactItem({
  icon,
  href,
  external,
  children,
}: {
  icon: ReactNode;
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-navy-foreground/5 hover:text-navy-foreground"
      >
        <span className="mt-0.5 text-amber transition-transform group-hover:scale-110">{icon}</span>
        <span>{children}</span>
      </a>
    </li>
  );
}