import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { Phone, shot } from "@/components/Phone";
import { GetAppButton } from "@/components/Brand";
import { gsap, scrollToId, useGsap } from "@/lib/motion";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, () => {
    const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
    intro
      .from("[data-hero-line] > span", { yPercent: 110, duration: 1.1, stagger: 0.09 })
      .from("[data-hero-fade]", { y: 18, opacity: 0, duration: 0.9, stagger: 0.08 }, "-=0.7")
      .from("[data-phone='c']", { y: 160, opacity: 0, duration: 1.4 }, "-=0.9")
      .from("[data-phone='l']", { x: 120, y: 120, rotate: 8, opacity: 0, duration: 1.4 }, "<0.1")
      .from("[data-phone='r']", { x: -120, y: 120, rotate: -8, opacity: 0, duration: 1.4 }, "<");

    // As the page scrolls, the fan opens and the stage sinks back.
    // fromTo with explicit starts: the intro is still moving these when the
    // scroll tweens are created, so they must not record mid-intro values.
    const st = { trigger: "[data-stage]", start: "top 75%", end: "bottom top", scrub: 1 };
    const rest = { x: 0, y: 0, rotate: 0, scale: 1 };
    const opts = { immediateRender: false, scrollTrigger: st };
    gsap.fromTo("[data-phone='l']", rest, { x: -70, rotate: -6, y: 40, ...opts });
    gsap.fromTo("[data-phone='r']", rest, { x: 70, rotate: 6, y: 40, ...opts });
    gsap.fromTo("[data-phone='c']", rest, { y: -60, scale: 1.04, ...opts });
    gsap.to("[data-aurora]", { yPercent: 30, opacity: 0.4, scrollTrigger: { ...st, start: "top top" } });
  });

  return (
    <section ref={root} className="relative pt-28 md:pt-32">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 dot-grid [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        <div
          data-aurora
          className="absolute left-1/2 top-[-18rem] h-[46rem] w-[78rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgb(var(--royal)/0.55), transparent), radial-gradient(closest-side at 70% 60%, rgb(var(--violet)/0.45), transparent), radial-gradient(closest-side at 25% 70%, rgb(var(--gold)/0.18), transparent)",
          }}
        />
      </div>

      <div className="container text-center">
        <p data-hero-fade className="mx-auto inline-flex items-center gap-2 rounded-full border hairline bg-ink-2/60 px-3.5 py-1.5 text-[13px] text-fg-2 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Built for Indian advocates
          <span className="text-fg-3">·</span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-fg-3">Android</span>
        </p>

        <h1 className="display mx-auto mt-6 max-w-5xl text-[clamp(2.75rem,8.4vw,6.6rem)]">
          <span data-hero-line className="block overflow-hidden pb-[0.06em]">
            <span className="block text-gradient">Every case. Every hearing.</span>
          </span>
          <span data-hero-line className="block overflow-hidden pb-[0.12em]">
            <span className="block accent-serif text-aurora">always in order.</span>
          </span>
        </h1>

        <p data-hero-fade className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-fg-2 md:text-lg">
          CaseFlow is the practice app for Indian advocates — your court diary, case files, clients and fees, 30 legal
          tools, eCourts import and an AI legal assistant, in one place.
        </p>

        <div data-hero-fade className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GetAppButton className="btn-primary h-12 px-6 text-[15px]" />
          <button type="button" onClick={() => scrollToId("day")} className="btn-ghost h-12 px-6 text-[15px]">
            See a day with CaseFlow <ArrowDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* the stage */}
      <div data-stage className="relative mx-auto mt-12 flex max-w-5xl justify-center px-4 md:mt-14">
        {/* Tailwind places and tilts each wrapper; GSAP only moves the inner div. */}
        <div className="relative flex w-full items-end justify-center">
          <div className="absolute bottom-6 left-1/2 hidden w-[230px] -translate-x-[118%] -rotate-[8deg] sm:block md:w-[260px]">
            <div data-phone="l">
              <Phone src={shot("diary")} alt="CaseFlow Court Diary with hearings marked on the month calendar" />
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 hidden w-[230px] translate-x-[18%] rotate-[8deg] sm:block md:w-[260px]">
            <div data-phone="r">
              <Phone src={shot("dossier-details")} alt="A CaseFlow case dossier showing court, CNR and next hearing" />
            </div>
          </div>
          <div data-phone="c" className="relative z-10 w-[260px] md:w-[300px]">
            <Phone
              src={shot("home")}
              alt="CaseFlow home: active cases, today's hearings, upcoming hearings and clients"
              priority
            />
          </div>
        </div>
        {/* floor glow */}
        <div className="pointer-events-none absolute -bottom-10 left-1/2 h-40 w-[70%] -translate-x-1/2 rounded-[100%] bg-royal/30 blur-3xl" />
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-fg/15 to-transparent" />
    </section>
  );
}
