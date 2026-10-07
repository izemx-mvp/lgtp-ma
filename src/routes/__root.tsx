import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { CookieNotice } from "@/components/layout/CookieNotice";
import { TriMark } from "@/components/motif/Motif";
import { Button, BtnArrow } from "@/components/ui/button";
import { site } from "@/config/site";

function NotFoundComponent() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-navy text-navy-foreground">
      <div className="bg-motif absolute inset-0 opacity-50" aria-hidden />
      <div className="container-site relative py-40 text-center">
        <TriMark className="mx-auto h-16 w-auto" />
        <p className="eyebrow mt-8 text-amber">Erreur 404</p>
        <h1 className="text-display-lg mt-4 font-semibold text-navy-foreground">Cette couche n'existe pas.</h1>
        <p className="mx-auto mt-4 max-w-md text-navy-muted">La page que vous cherchez a été déplacée ou n'a jamais été forée.</p>
        <Button asChild variant="devis" size="lg" className="mt-10">
          <Link to="/">Retour à l'accueil <BtnArrow /></Link>
        </Button>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Cette page n'a pas pu se charger</h1>
        <p className="mt-2 text-sm text-muted-foreground">Une erreur est survenue. Vous pouvez réessayer ou revenir à l'accueil.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button onClick={() => { router.invalidate(); reset(); }}>Réessayer</Button>
          <Button asChild variant="outline"><a href="/">Accueil</a></Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: `${site.shortName} — ${site.tagline}` },
      { name: "description", content: site.description },
      { name: "author", content: site.legalName },
      { name: "theme-color", content: "#0F1E3D" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.legalName },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@500;600;700&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion();
  return (
    <QueryClientProvider client={queryClient}>
      <a href="#contenu" className="sr-only z-[100] rounded-full bg-amber px-4 py-2 font-display font-semibold text-amber-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Aller au contenu
      </a>
      <div className="flex min-h-screen flex-col">
        <Header />
        <motion.main
          id="contenu"
          key={pathname}
          initial={{ opacity: 0, y: reduce ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex-1"
        >
          <Outlet />
        </motion.main>
        <Footer />
      </div>
      <FloatingActions />
      <CookieNotice />
    </QueryClientProvider>
  );
}
