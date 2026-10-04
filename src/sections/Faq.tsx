import { useRef, useState } from "react";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useContent } from "@/lib/content";
import { useReveal } from "@/lib/motion";

export function Faq() {
  const root = useRef<HTMLElement>(null);
  const { faqs } = useContent();
  const [open, setOpen] = useState<number | null>(0);
  useReveal(root, [faqs]);

  if (faqs.length === 0) return null;

  return (
    <section ref={root} className="py-24 md:py-32">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div data-reveal>
          <p className="eyebrow">Questions</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,5vw,3.4rem)]">
            Asked in <span className="accent-serif text-fg-2">the bar room.</span>
          </h2>
        </div>
        <div data-reveal className="divide-y divide-[rgb(var(--line)/var(--line-a))] border-y hairline">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-medium"
                  >
                    {f.q}
                    <Plus className={clsx("h-5 w-5 shrink-0 text-fg-2 transition-transform duration-300", isOpen && "rotate-45")} />
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={clsx(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-prose pb-6 leading-relaxed text-fg-2">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
