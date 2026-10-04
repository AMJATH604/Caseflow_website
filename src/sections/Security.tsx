import { useRef } from "react";
import { Building2, FileLock2, KeyRound, ShieldCheck } from "lucide-react";
import { useReveal } from "@/lib/motion";

// Each claim describes how CaseFlow is actually built; keep it that way.
const POINTS = [
  {
    icon: Building2,
    title: "Your firm's data stays in your firm",
    body: "Every case, client and hearing belongs to a firm. The database refuses to return it to anyone outside that firm — row-level security on every table.",
  },
  {
    icon: FileLock2,
    title: "Private files, short-lived links",
    body: "Case documents, chat attachments and receipts are stored privately and opened through links that expire.",
  },
  {
    icon: ShieldCheck,
    title: "Fees hidden from clerks, on the server",
    body: "A clerk cannot read fees or payment receipts even by asking the server directly. That limit lives in the database, not in the app's buttons.",
  },
  {
    icon: KeyRound,
    title: "No secret keys on your phone",
    body: "The AI and every third-party service are reached through CaseFlow's servers. Their keys never ship inside the app.",
  },
];

export function Security() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className="py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">Privilege, protected</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
            Client confidence <span className="accent-serif text-fg-2">is the job.</span>
          </h2>
        </div>
        <div data-reveal="stagger" className="mt-14 grid gap-4 sm:grid-cols-2">
          {POINTS.map((p) => (
            <div key={p.title} className="rounded-3xl surface p-7">
              <p.icon className="h-5 w-5 text-gold" />
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 max-w-md leading-relaxed text-fg-2">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
