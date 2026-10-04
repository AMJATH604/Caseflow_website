import { useRef } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { shot } from "@/components/Phone";
import { useReveal } from "@/lib/motion";

type Tile = {
  name: string;
  line: string;
  shot: string;
  detail: string;
  span: string;
  tone: string; // the glow behind the screenshot
  crop?: string; // object-position for the screenshot
};

const TILES: Tile[] = [
  {
    name: "eCourts, imported",
    line: "Export from the eCourts Services app, import into CaseFlow. Parties, numbers, courts and dates come with it.",
    shot: "import",
    detail: "mycases.txt",
    span: "md:col-span-4 md:row-span-2",
    tone: "from-royal/40",
  },
  {
    name: "Legal Repository",
    line: "Every dossier, searchable by title, CNR or client.",
    shot: "repository",
    detail: "Active · Pending · Closed",
    span: "md:col-span-2",
    tone: "from-violet/40",
  },
  {
    name: "Certified Copies",
    line: "Box drop → memo → ready → collected.",
    shot: "certified-copies",
    detail: "CC tracking",
    span: "md:col-span-2",
    tone: "from-sky/40",
  },
  {
    name: "Caveat Tracker",
    line: "Filing and expiry dates, so no ex-parte order surprises you.",
    shot: "caveat",
    detail: "Expiring soon",
    span: "md:col-span-2",
    tone: "from-warn/40",
  },
  {
    name: "Court Portals & ePay",
    line: "Certified copies, VC links, holidays and fee payment, for every state.",
    shot: "court-portals",
    detail: "36 states",
    span: "md:col-span-2",
    tone: "from-violet/40",
  },
  {
    name: "Legal Pulse",
    line: "Legal news from the Supreme Court and High Courts, as it happens.",
    shot: "legal-pulse",
    detail: "Live",
    span: "md:col-span-4",
    tone: "from-danger/40",
  },
  {
    name: "Court holidays",
    line: "Every court holiday of the year, month by month, before you list a matter.",
    shot: "holidays",
    detail: "Month by month",
    span: "md:col-span-4",
    tone: "from-jade/40",
  },
];

export function Bento() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className="py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Courts and registries</p>
            <h2 className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
              The paperwork around the case, <span className="accent-serif text-fg-2">handled.</span>
            </h2>
          </div>
          <Link to="/features" className="btn-ghost self-start md:self-auto">
            All features <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div data-reveal="stagger" className="mt-14 grid auto-rows-[300px] gap-4 md:grid-cols-8">
          {TILES.map((t) => (
            <article
              key={t.name}
              className={clsx(
                "group relative flex flex-col overflow-hidden rounded-3xl surface p-6 transition-colors duration-300 hover:border-fg/20",
                t.span,
              )}
            >
              <div className="relative z-10 max-w-[19rem]">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{t.detail}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{t.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{t.line}</p>
              </div>
              <div
                className={clsx(
                  "pointer-events-none absolute -bottom-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-t to-transparent blur-3xl",
                  t.tone,
                )}
              />
              <div
                className={clsx(
                  "relative mx-auto mt-6 w-[64%] max-w-[260px] translate-y-3 overflow-hidden rounded-t-[1.6rem] border-x border-t border-white/10 bg-white shadow-2xl transition-transform duration-500 ease-out group-hover:translate-y-0",
                  t.span.includes("row-span-2") && "md:mt-10 md:w-[70%] md:max-w-[340px]",
                )}
              >
                <img src={shot(t.shot)} alt="" loading="lazy" className="w-full" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
