import { useRef } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Check } from "lucide-react";
import { appLink, formatRupees, useContent, type Plan } from "@/lib/content";
import { useReveal } from "@/lib/motion";

export function PricingCards({ plans }: { plans: Plan[] }) {
  const { settings } = useContent();
  const app = appLink(settings);
  const ctaClass = (p: Plan) => clsx("mt-6 w-full", p.highlighted ? "btn-primary" : "btn-ghost");
  return (
    <div
      data-reveal="stagger"
      className={clsx(
        "grid gap-4 sm:grid-cols-2",
        plans.length >= 4 ? "lg:grid-cols-4" : plans.length === 3 ? "lg:grid-cols-3" : "",
      )}
    >
      {plans.map((p) => (
        <article
          key={p.id}
          className={clsx(
            "relative flex flex-col rounded-3xl p-7",
            p.highlighted ? "bg-gradient-to-b from-royal/25 to-ink-2 border border-royal/50 glow-ring" : "surface",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">{p.name}</h3>
            {p.badge && (
              <span className="rounded-full bg-royal px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white">
                {p.badge}
              </span>
            )}
          </div>
          <p className="mt-2 min-h-[2.75rem] text-sm leading-snug text-fg-2">{p.tagline}</p>
          <p className="mt-6 flex items-baseline gap-1.5">
            <span className="display text-5xl tabular-nums">{p.price === 0 ? "₹0" : formatRupees(p.price)}</span>
            <span className="text-sm text-fg-3">{p.period}</span>
          </p>
          {p.price === 0 && app.external ? (
            <a href={app.href} target="_blank" rel="noreferrer" className={ctaClass(p)}>
              {p.cta}
            </a>
          ) : (
            <Link
              to={p.price === 0 ? app.href : `/contact?kind=${p.id === "bar" ? "bar" : "pricing"}&plan=${encodeURIComponent(p.name)}`}
              className={ctaClass(p)}
            >
              {p.cta}
            </Link>
          )}
          <ul className="mt-7 space-y-3 border-t hairline pt-6 text-sm">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-jade" />
                <span className="text-fg-2">{f}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function Pricing({ heading = true }: { heading?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const { pricing } = useContent();
  useReveal(root, [pricing]);

  return (
    <section ref={root} id="pricing" className="py-24 md:py-32">
      <div className="container">
        {heading && (
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <p className="eyebrow">Pricing</p>
            <h2 className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
              Priced for advocates, <span className="accent-serif text-fg-2">not corporations.</span>
            </h2>
            <p className="mt-5 text-lg text-fg-2">Start free. Prices in Indian rupees, per month.</p>
          </div>
        )}
        <div className={heading ? "mt-14" : ""}>
          <PricingCards plans={pricing} />
        </div>
      </div>
    </section>
  );
}
