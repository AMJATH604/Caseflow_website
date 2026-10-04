import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Phone, shot } from "@/components/Phone";
import { formatRupees, useContent } from "@/lib/content";
import { useReveal } from "@/lib/motion";

export function BarTeaser() {
  const root = useRef<HTMLElement>(null);
  const { pricing } = useContent();
  const bar = pricing.find((p) => p.id === "bar");
  useReveal(root);

  return (
    <section ref={root} className="py-12 md:py-16">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] border hairline bg-gradient-to-br from-violet/25 via-ink-2 to-ink-2 p-8 md:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#d946ef]/20 blur-3xl" />
          <div className="relative grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
            <div data-reveal>
              <p className="eyebrow text-gold">For bar associations</p>
              <h2 className="display mt-4 text-[clamp(2rem,4.4vw,3.2rem)]">
                Your association office, <span className="accent-serif text-fg-2">on every member's phone.</span>
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-fg-2">
                Digital membership cards, annual-fee status, notices and events that reach every member, and elections —
                in the app your members already use for their cases.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/bar-associations" className="btn-primary">
                  For associations <ArrowRight className="h-4 w-4" />
                </Link>
                {bar && (
                  <span className="text-sm text-fg-2">
                    <span className="font-semibold text-fg">{formatRupees(bar.price)}</span> {bar.period} for the association
                  </span>
                )}
              </div>
            </div>
            <div className="mx-auto w-[230px] md:w-[260px]" data-reveal>
              <Phone src={shot("bar-association")} alt="My Bar: membership card, fee status, notices, elections and events" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
