import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import logo from "@/assets/lgtp-logo.png";
import { site, whatsappLink } from "@/config/site";
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

/** Logo dans une pastille blanche (utilisé sur fond sombre : footer, menu mobile). */
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
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-white transition-shadow duration-300",
        scrolled ? "border-border shadow-[0_6px_24px_-12px_rgba(15,30,61,0.25)]" : "border-border/60",
      )}
    >
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        {/* Logo (sans pastille : le fond est déjà blanc) */}
        <Link to="/" aria-label="LGTP — retour à l'accueil" className="shrink-0">
          <img src={logo} alt="LGTP — Géotechnique, Essais et Expertises" width={1197} height={1012} className="h-11 w-auto" />
        </Link>

        {/* Navigation desktop */}
        <nav aria-label="Navigation principale" className="hidden h-full lg:block">
          <ul className="flex h-full items-center gap-1">
            {navItems.map((n) => {
              const active = isActive(n.to);
              return (
                <li key={n.to} className="relative flex h-full items-center">
                  <Link
                    to={n.to}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative flex h-full items-center px-3 font-display text-[0.92rem] font-medium transition-colors",
                      active ? "text-primary" : "text-heading/75 hover:text-primary",
                    )}
                  >
                    {n.label}
                    {/* Trait de survol */}
                    {!active && (
                      <span
                        aria-hidden
                        className="absolute inset-x-3 bottom-0 h-[3px] origin-left scale-x-0 rounded-t-full bg-primary/25 transition-transform duration-300 group-hover:scale-x-100"
                      />
                    )}
                    {/* Indicateur de page active */}
                    {active && (
                      <motion.span
                        {...(reduce ? {} : { layoutId: "nav-active" })}
                        aria-hidden
                        className="absolute inset-x-3 bottom-0 h-[3px] rounded-t-full bg-amber"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="group hidden items-center gap-2.5 xl:flex"
            aria-label={`Appeler le ${site.phone}`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Phone className="h-4 w-4" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block text-[0.68rem] uppercase tracking-[0.12em] text-heading/50">Appelez-nous</span>
              <span className="tabular font-display text-sm font-semibold text-heading">{site.phone}</span>
            </span>
          </a>
          <span aria-hidden className="hidden h-8 w-px bg-border xl:block" />
          <Button asChild variant="devis" size="sm" className="hidden sm:inline-flex">
            <Link to="/contact">
              Demander un devis <BtnArrow />
            </Link>
          </Button>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border text-heading transition-colors hover:border-primary hover:text-primary lg:hidden"
                aria-label="Ouvrir le menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </Dialog.Trigger>
            <AnimatePresence>
              {open && (
                <Dialog.Portal forceMount>
                  <Dialog.Content forceMount asChild aria-describedby={undefined}>
                    <motion.div
                      className="fixed inset-0 z-[60] flex flex-col bg-navy text-navy-foreground"
                      initial={reduce ? { opacity: 0 } : { opacity: 0, x: "100%" }}
                      animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, x: "100%" }}
                      transition={{ duration: reduce ? 0.15 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Dialog.Title className="sr-only">Menu</Dialog.Title>
                      <div className="bg-motif pointer-events-none absolute inset-0 opacity-50" aria-hidden />

                      <div className="container-site relative flex h-[72px] items-center justify-between">
                        <Logo />
                        <Dialog.Close
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-border transition-colors hover:bg-navy-foreground/10"
                          aria-label="Fermer le menu"
                        >
                          <X className="h-5 w-5" />
                        </Dialog.Close>
                      </div>

                      <nav aria-label="Navigation mobile" className="container-site relative mt-4 flex-1 overflow-y-auto">
                        <ul className="divide-y divide-navy-border/70">
                          {navItems.map((n, i) => {
                            const active = isActive(n.to);
                            return (
                              <motion.li
                                key={n.to}
                                initial={{ opacity: 0, x: reduce ? 0 : 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.12 + i * 0.05, duration: 0.35 }}
                              >
                                <Link to={n.to} aria-current={active ? "page" : undefined} className="group flex items-center gap-4 py-3.5">
                                  <span className="w-7 font-display text-xs font-semibold tabular text-amber/70">
                                    {String(i + 1).padStart(2, "0")}
                                  </span>
                                  <span
                                    className={cn(
                                      "flex-1 font-display text-2xl font-semibold sm:text-3xl",
                                      active ? "text-amber" : "text-navy-foreground",
                                    )}
                                  >
                                    {n.label}
                                  </span>
                                  <ArrowRight
                                    className="h-5 w-5 text-navy-muted transition-transform group-hover:translate-x-1 group-hover:text-amber"
                                    aria-hidden
                                  />
                                </Link>
                              </motion.li>
                            );
                          })}
                        </ul>
                      </nav>

                      <motion.div
                        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="container-site relative pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6"
                      >
                        <div className="grid grid-cols-2 gap-3">
                          <a
                            href={site.phoneHref}
                            className="flex items-center gap-3 rounded-2xl border border-navy-border px-4 py-3 text-sm transition-colors hover:border-amber"
                          >
                            <Phone className="h-4 w-4 text-amber" aria-hidden />
                            Appeler
                          </a>
                          <a
                            href={whatsappLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 rounded-2xl border border-navy-border px-4 py-3 text-sm transition-colors hover:border-amber"
                          >
                            <MessageCircle className="h-4 w-4 text-amber" aria-hidden />
                            WhatsApp
                          </a>
                        </div>
                        <Button asChild variant="devis" size="lg" className="mt-3 w-full">
                          <Link to="/contact">
                            Demander un devis <BtnArrow />
                          </Link>
                        </Button>
                        <p className="mt-4 text-center text-xs text-navy-muted">{site.address.full}</p>
                      </motion.div>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </div>

      {/* Progression de lecture */}
      <motion.span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 -bottom-px h-0.5 origin-left bg-amber transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0",
        )}
        style={{ scaleX: reduce ? scrollYProgress : progress }}
      />
    </header>
  );
}