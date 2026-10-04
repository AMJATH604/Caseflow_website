import { useRef } from "react";
import { Link } from "react-router-dom";
import { GetAppButton } from "@/components/Brand";
import { gsap, useGsap } from "@/lib/motion";

export function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, () => {
    gsap.fromTo(
      "[data-portrait]",
      { scale: 1.15, opacity: 0.2 },
      { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: 1 } },
    );
    gsap.from("[data-quote-word]", {
      opacity: 0.12,
      stagger: 0.04,
      ease: "none",
      scrollTrigger: { trigger: "[data-quote]", start: "top 80%", end: "bottom 50%", scrub: 1 },
    });
  });

  const quote =
    "Constitution is not a mere lawyers' document, it is a vehicle of Life, and its spirit is always the spirit of Age.";

  return (
    <section ref={root} className="relative overflow-hidden py-24 md:py-36">
      <div className="container grid items-center gap-14 md:grid-cols-[minmax(0,360px)_1fr]">
        <div className="relative mx-auto w-full max-w-[320px] md:max-w-none">
          <div className="absolute -inset-6 -z-10 rounded-full bg-gold/15 blur-3xl" />
          <div className="overflow-hidden rounded-full border border-gold/40 p-2">
            <img
              data-portrait
              src="/brand/ambedkar.webp"
              alt="Dr. B. R. Ambedkar holding the Constitution of India"
              loading="lazy"
              className="aspect-square w-full rounded-full object-cover"
            />
          </div>
        </div>
        <div>
          <blockquote data-quote className="accent-serif text-[clamp(1.7rem,3.6vw,2.9rem)] leading-[1.18] text-fg">
            “
            {quote.split(" ").map((w, i) => (
              <span key={i} data-quote-word>
                {w}{" "}
              </span>
            ))}
            ”
          </blockquote>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-gold">— Dr. B. R. Ambedkar</p>
        </div>
      </div>

      <div className="container mt-28 text-center md:mt-36">
        <h2 className="display mx-auto max-w-4xl text-[clamp(2.6rem,7vw,5.4rem)]">
          <span className="text-gradient">Bring order to</span>{" "}
          <span className="accent-serif text-aurora">your practice.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-fg-2">Free to start. Ready before your next hearing.</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GetAppButton className="btn-primary h-12 px-6 text-[15px]" />
          <Link to="/contact?kind=demo" className="btn-ghost h-12 px-6 text-[15px]">
            Book a demo
          </Link>
        </div>
      </div>
    </section>
  );
}
