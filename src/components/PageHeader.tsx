import { useRef, type ReactNode } from "react";
import { gsap, useGsap } from "@/lib/motion";

export function PageHeader({ eyebrow, title, accent, intro, children }: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  children?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  useGsap(root, () => {
    gsap.from("[data-ph]", { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" });
  });

  return (
    <section ref={root} className="relative pt-36 pb-12 md:pt-44 md:pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 dot-grid [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_65%)]" />
        <div className="absolute left-1/2 top-[-22rem] h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-royal/30 blur-3xl" />
      </div>
      <div className="container">
        <p data-ph className="eyebrow text-gold">
          {eyebrow}
        </p>
        <h1 data-ph className="display mt-5 max-w-4xl text-[clamp(2.6rem,6.6vw,5rem)]">
          <span className="text-gradient">{title}</span>
          {accent && (
            <>
              {" "}
              <span className="accent-serif text-aurora">{accent}</span>
            </>
          )}
        </h1>
        {intro && (
          <p data-ph className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">
            {intro}
          </p>
        )}
        {children && <div data-ph>{children}</div>}
      </div>
    </section>
  );
}
