import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ScrollTrigger, scrollToTop, useSmoothScroll } from "@/lib/motion";
import { ContentProvider } from "@/lib/content";

export function SiteLayout() {
  useSmoothScroll();
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
    // Pages differ in height; let pinned sections re-measure after paint.
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <ContentProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] btn-primary">
        Skip to content
      </a>
      <Nav />
      <main id="main" className="overflow-x-clip">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </ContentProvider>
  );
}

/** Sets the browser tab title for a page. */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} · CaseFlow` : "CaseFlow — The practice app for Indian advocates";
  }, [title]);
}
