import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import logo from "@/assets/lgtp-logo.png";
import { site } from "@/config/site";
import { Button, BtnArrow } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const navItems = [
  { to: "/", label: "Accueil" },
  { to: "/expertises", label: "Expertises" },
  { to: "/equipements", label: "Équipements" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/blog", label: "Blog" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-xl bg-card px-2.5 py-1.5 shadow-card", className)}>
      <img src={logo} alt="LGTP — Géotechnique, Essais et Expertises" width={1197} height={1012} className="h-9 w-auto md:h-10" />
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "glass-navy border-b border-navy-border py-2.5" : "py-5")}>
      <div className="container-site flex items-center justify-between gap-6">
        <Link to="/" aria-label="LGTP — retour à l'accueil" className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  aria-current={isActive(n.to) ? "page" : undefined}
                  className={cn("relative block px-3 py-2 font-display text-sm font-medium transition-colors", isActive(n.to) ? "text-navy-foreground" : "text-navy-muted hover:text-navy-foreground")}
                >
                  {n.label}
                  {isActive(n.to) && (
                    <motion.span layoutId="nav-marker" aria-hidden className="absolute -bottom-1 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[5px] border-t-[7px] border-x-transparent border-t-amber" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={site.phoneHref} className="hidden items-center gap-2 px-2 font-display text-sm font-medium text-navy-foreground xl:flex">
            <Phone className="h-4 w-4 text-amber" aria-hidden /> <span className="tabular">{site.phone}</span>
          </a>
          <Button asChild variant="devis" size="sm" className="hidden sm:inline-flex">
            <Link to="/contact">Demander un devis <BtnArrow /></Link>
          </Button>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-border text-navy-foreground lg:hidden" aria-label="Ouvrir le menu">
                <Menu className="h-5 w-5" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content className="fixed inset-0 z-[60] flex flex-col bg-navy text-navy-foreground" aria-describedby={undefined}>
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <div className="bg-motif pointer-events-none absolute inset-0 opacity-50" aria-hidden />
                <div className="container-site relative flex items-center justify-between py-5">
                  <Logo />
                  <Dialog.Close className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-border" aria-label="Fermer le menu">
                    <X className="h-5 w-5" />
                  </Dialog.Close>
                </div>
                <nav aria-label="Navigation mobile" className="container-site relative mt-6 flex-1 overflow-y-auto">
                  <ul className="space-y-1">
                    {navItems.map((n, i) => (
                      <motion.li key={n.to} initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.06 }}>
                        <Link to={n.to} className={cn("flex items-center gap-3 py-2.5 font-display text-3xl font-semibold", isActive(n.to) ? "text-amber" : "text-navy-foreground")}>
                          {n.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
                <div className="container-site relative flex flex-col gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
                  <Button asChild variant="devis" size="lg"><Link to="/contact">Demander un devis <BtnArrow /></Link></Button>
                  <Button asChild variant="outlineLight" size="lg"><a href={site.phoneHref}><Phone /> {site.phone}</a></Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
