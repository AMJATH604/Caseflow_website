import { useRef } from "react";
import { MapPin, Camera, PenLine, Receipt, FileDown } from "lucide-react";
import { Phone, shot } from "@/components/Phone";
import { gsap, useGsap, useReveal } from "@/lib/motion";

const STEPS = [
  { icon: MapPin, title: "Check in at the site", body: "The time and GPS point are recorded with every visit." },
  { icon: Camera, title: "Capture evidence", body: "Numbered photos, notes and witnesses, under the commission." },
  { icon: PenLine, title: "Sketch the site", body: "Draw the plan on the phone, at the spot." },
  { icon: Receipt, title: "Log expenses", body: "Travel and costs, totalled for your bill." },
  { icon: FileDown, title: "Write the report", body: "Download every photo, ready to print and annex." },
];

export function Commissioner() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  // The three screens fan out as the section crosses the viewport.
  useGsap(root, () => {
    const st = { trigger: "[data-fan]", start: "top 85%", end: "center 45%", scrub: 1 };
    gsap.fromTo("[data-fan-l]", { x: 90, rotate: 0 }, { x: 0, rotate: -9, ease: "none", scrollTrigger: st });
    gsap.fromTo("[data-fan-r]", { x: -90, rotate: 0 }, { x: 0, rotate: 9, ease: "none", scrollTrigger: st });
  });

  return (
    <section ref={root} className="relative overflow-hidden py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <p className="eyebrow text-gold">Advocate Commissioner</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,5vw,3.8rem)]">
            A field kit, <span className="accent-serif text-fg-2">from warrant to report.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-fg-2">
            Appointed as a commissioner? Every commission, its deadline and its site visits live in one place — with the
            evidence the court will ask for.
          </p>
        </div>

        <div data-fan className="relative mx-auto mt-16 flex h-[520px] max-w-3xl items-start justify-center sm:h-[600px]">
          <div className="absolute left-1/2 top-10 w-[200px] -translate-x-[105%] sm:w-[230px]">
            <div data-fan-l className="origin-bottom-right [transform:rotate(-9deg)]">
              <Phone src={shot("commission-visits")} alt="Site visits with check-in times and GPS points" />
            </div>
          </div>
          <div className="absolute left-1/2 top-10 w-[200px] translate-x-[5%] sm:w-[230px]">
            <div data-fan-r className="origin-bottom-left [transform:rotate(9deg)]">
              <Phone src={shot("commission-sketch")} alt="A site sketch drawn in the app" />
            </div>
          </div>
          <div className="relative z-10 w-[220px] sm:w-[250px]">
            <Phone src={shot("commission-info")} alt="Commission details with warrant date, deadline and timeline" />
          </div>
        </div>

        <ol data-reveal="stagger" className="mx-auto mt-6 grid max-w-5xl gap-px overflow-hidden rounded-3xl border hairline bg-fg/10 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={s.title} className="bg-ink p-6 sm:last:col-span-2 lg:last:col-span-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tabular-nums text-fg-3">{i + 1}</span>
                <s.icon className="h-4 w-4 text-gold" />
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
