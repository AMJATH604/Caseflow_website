import { useRef } from "react";
import { Phone, shot } from "@/components/Phone";
import { gsap, prefersReducedMotion, useGsap } from "@/lib/motion";

const TOOLS = [
  { name: "Court Fee", cite: "TN Court-Fees Act, 1955", line: "The old rate and the 2017 amendment, side by side.", shot: "court-fee" },
  { name: "Limitation", cite: "Limitation Act, 1963", line: "Choose the article, enter the date, get the last day.", shot: "limitation" },
  { name: "Delay", cite: "Section 5", line: "Days of delay to explain in a condonation petition.", shot: "delay" },
  { name: "Interest", cite: "Pre-suit · pendente lite · post-decree", line: "Simple or compound, at the rate that applies.", shot: "interest" },
  { name: "MACT Claims", cite: "Motor Vehicles Act", line: "Compensation from age, income and dependants.", shot: "mact" },
  { name: "Maintenance", cite: "Sec 144 BNSS", line: "Interim or final, from both incomes and the children.", shot: "maintenance" },
  { name: "Partition Share", cite: "Personal law", line: "Each heir's share under the law that governs.", shot: "partition" },
  { name: "Stamp Values", cite: "Tamil Nadu courts", line: "The stamp for each appeal, petition and document.", shot: "stamp-values" },
  { name: "Legal Dictionary", cite: "502 terms", line: "Latin maxims, legal English and criminal-law terms.", shot: "legal-dictionary" },
  { name: "PDF toolkit", cite: "Word · PDF · JPG", line: "Convert, merge, split, compress, watermark, rotate.", shot: "tools-hub-3" },
];

export function ToolsRail() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pinned = !prefersReducedMotion();

  // On wide screens the section pins and vertical scroll moves the rail
  // sideways. Elsewhere (and with reduced motion) the rail is a native
  // horizontal scroller.
  useGsap(root, () => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth + 48;
      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: "[data-rail-pin]",
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      gsap.to("[data-rail-bar]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: "[data-rail-pin]", start: "top top", end: () => "+=" + distance(), scrub: true },
      });
    });
  });

  return (
    <section ref={root} className="relative">
      <div data-rail-pin className="flex min-h-screen flex-col justify-center overflow-hidden py-24 md:py-0">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">30 tools</p>
              <h2 className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
                The arithmetic of practice, <span className="accent-serif text-fg-2">done right.</span>
              </h2>
            </div>
            <p className="max-w-sm text-fg-2">
              Each tool names the law it follows, and works the same way on every case.
            </p>
          </div>
        </div>

        <div className={pinned ? "mt-12 overflow-x-auto md:overflow-visible [scrollbar-width:none]" : "mt-12 overflow-x-auto"}>
          <div ref={track} className="flex w-max gap-5 px-5 md:pl-[max(1.25rem,calc((100vw-1200px)/2+1.25rem))]">
            {TOOLS.map((t, i) => (
              <article key={t.name} className="group w-[250px] shrink-0 md:w-[270px]">
                <div className="relative overflow-hidden rounded-[2.2rem] bg-ink-2 p-4 surface">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[11px] tabular-nums text-fg-3">{String(i + 1).padStart(2, "0")}</span>
                    <span className="max-w-[75%] truncate font-mono text-[10.5px] uppercase tracking-[0.12em] text-gold">{t.cite}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">{t.name}</h3>
                  <p className="mt-1.5 min-h-[2.75rem] text-sm leading-snug text-fg-2">{t.line}</p>
                  {/* a peek at the top of the screen, fading out */}
                  <div className="mt-4 h-[min(340px,38vh)] overflow-hidden [mask-image:linear-gradient(black_70%,transparent)]">
                    <div className="transition-transform duration-500 ease-out group-hover:-translate-y-2">
                      <Phone src={shot(t.shot)} alt={`CaseFlow ${t.name} tool`} className="!p-[6px] !rounded-[1.7rem]" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
            <div className="w-6 shrink-0" aria-hidden />
          </div>
        </div>

        <div className="container mt-10 hidden md:block">
          <div className="h-px w-full bg-fg/10">
            <div data-rail-bar className="h-px w-full origin-left scale-x-0 bg-gradient-to-r from-gold to-royal" />
          </div>
        </div>
      </div>
    </section>
  );
}
