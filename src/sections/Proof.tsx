import { useRef } from "react";
import { gsap, useGsap } from "@/lib/motion";

// Real counts from the app's own screens.
const STATS = [
  { value: 30, suffix: "", label: "legal and document tools" },
  { value: 502, suffix: "", label: "terms in the legal dictionary" },
  { value: 600, suffix: "+", label: "district court portals, 36 states" },
  { value: 16, suffix: "", label: "statutes in the bare-acts library" },
];

const FORUMS = [
  "Sub Courts",
  "District Courts",
  "Family Courts",
  "Motor Accident Claims Tribunals",
  "Magistrate Courts",
  "Sessions Courts",
  "Consumer Commissions",
  "High Courts",
  "Supreme Court",
  "Bar Associations",
];

export function Proof() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, () => {
    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      const target = Number(el.dataset.count);
      const obj = { v: 0 };
      el.textContent = "0";
      gsap.to(obj, {
        v: target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = Math.round(obj.v).toLocaleString("en-IN");
        },
      });
    });
  });

  return (
    <section ref={root} className="pt-20 pb-12 md:pt-24 md:pb-16">
      <div className="container">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="border-l hairline pl-5">
              <dt className="sr-only">{s.label}</dt>
              <dd className="display text-[clamp(2.4rem,5vw,3.6rem)] tabular-nums">
                <span data-count={s.value}>{s.value.toLocaleString("en-IN")}</span>
                <span className="text-gold">{s.suffix}</span>
              </dd>
              <dd className="mt-1 text-sm text-fg-2">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative mt-16 overflow-hidden border-y hairline py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <p className="sr-only">For advocates practising before: {FORUMS.join(", ")}.</p>
        <div className="marquee flex w-max gap-10 pr-10" aria-hidden>
          {[...FORUMS, ...FORUMS].map((f, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap font-mono text-[13px] uppercase tracking-[0.14em] text-fg-3">
              {f}
              <span className="h-1 w-1 rounded-full bg-gold/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
