import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { X } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Phone, shot } from "@/components/Phone";
import { usePageTitle } from "@/components/SiteLayout";
import { FEATURE_GROUPS, ALL_FEATURES, type Feature } from "@/data/features";
import { ScrollTrigger, scrollToId, useReveal } from "@/lib/motion";
import { FinalCta } from "@/sections/FinalCta";

export default function Features() {
  usePageTitle("Features");
  const root = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(FEATURE_GROUPS[0].id);
  const [open, setOpen] = useState<Feature | null>(null);
  useReveal(root);

  useEffect(() => {
    const triggers = FEATURE_GROUPS.map((g) =>
      ScrollTrigger.create({
        trigger: `#${g.id}`,
        start: "top 40%",
        end: "bottom 40%",
        onToggle: (self) => self.isActive && setCurrent(g.id),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Features"
        title="Everything an advocate's day asks for."
        intro={`${ALL_FEATURES.length} screens from the CaseFlow app — the diary and the dossier, eCourts, the legal tools, research, your team and the commissioner's field kit.`}
      />

      <div ref={root} className="container grid gap-12 pb-24 lg:grid-cols-[220px_1fr]">
        {/* section index */}
        <nav aria-label="Feature groups" className="hidden lg:block">
          <ul className="sticky top-28 space-y-1 border-l hairline">
            {FEATURE_GROUPS.map((g) => (
              <li key={g.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(g.id)}
                  className={clsx(
                    "-ml-px block border-l py-1.5 pl-4 text-left text-sm transition-colors",
                    current === g.id ? "border-gold text-fg" : "border-transparent text-fg-3 hover:text-fg-2",
                  )}
                >
                  {g.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-24">
          {FEATURE_GROUPS.map((g) => (
            <section key={g.id} id={g.id} className="scroll-mt-28">
              <div data-reveal>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{g.title}</h2>
                <p className="mt-3 max-w-xl text-fg-2">{g.intro}</p>
              </div>
              <div data-reveal="stagger" className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {g.items.map((f) => (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() => setOpen(f)}
                    className="group flex flex-col overflow-hidden rounded-3xl surface text-left transition-colors hover:border-fg/20"
                  >
                    <div className="p-6 pb-0">
                      {f.detail && (
                        <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-gold">{f.detail}</p>
                      )}
                      <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{f.name}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{f.line}</p>
                    </div>
                    <div className="mt-auto px-10 pt-6">
                      <div className="h-[190px] overflow-hidden rounded-t-[1.4rem] border-x border-t border-white/10 bg-white transition-transform duration-500 group-hover:-translate-y-1.5">
                        <img src={shot(f.shot)} alt="" loading="lazy" className="w-full" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {open && <FeatureDialog feature={open} onClose={() => setOpen(null)} />}
      <FinalCta />
    </>
  );
}

function FeatureDialog({ feature, onClose }: { feature: Feature; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="feature-dialog-title"
      className="fixed inset-0 z-[70] grid place-items-center bg-ink/80 p-4 backdrop-blur-md"
      onClick={onClose}
      data-lenis-prevent
    >
      <div
        className="relative grid max-h-[92vh] w-full max-w-3xl items-center gap-8 overflow-y-auto rounded-[2rem] surface bg-ink-2 p-6 md:grid-cols-[1fr_280px] md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full p-2 text-fg-2 hover:bg-fg/10 hover:text-fg">
          <X className="h-5 w-5" />
        </button>
        <div>
          {feature.detail && <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold">{feature.detail}</p>}
          <h2 id="feature-dialog-title" className="mt-2 text-3xl font-semibold tracking-tight">
            {feature.name}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-fg-2">{feature.line}</p>
        </div>
        <div className="mx-auto w-[220px] md:w-full">
          <Phone src={shot(feature.shot)} alt={`CaseFlow ${feature.name} screen`} priority />
        </div>
      </div>
    </div>
  );
}
