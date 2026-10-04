import { useRef } from "react";
import { useContent } from "@/lib/content";
import { useReveal } from "@/lib/motion";

/** Shown only once an admin publishes real testimonials. */
export function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const { testimonials } = useContent();
  const items = testimonials.filter((t) => t.published && t.quote.trim());
  useReveal(root, [items.length]);

  if (items.length === 0) return null;

  return (
    <section ref={root} className="py-24 md:py-32">
      <div className="container">
        <p className="eyebrow text-center" data-reveal>
          From the bar
        </p>
        <div data-reveal="stagger" className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <figure key={t.quote} className="flex flex-col rounded-3xl surface p-7">
              <blockquote className="accent-serif flex-1 text-xl leading-snug text-fg">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-medium text-fg">{t.name}</span>
                {t.role && <span className="block text-fg-3">{t.role}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
