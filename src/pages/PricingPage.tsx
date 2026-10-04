import { useRef } from "react";
import { Check, Minus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { usePageTitle } from "@/components/SiteLayout";
import { PricingCards } from "@/sections/Pricing";
import { Faq } from "@/sections/Faq";
import { useContent } from "@/lib/content";
import { useReveal } from "@/lib/motion";

// Advocate plans only; the bar plan is a different product (see /bar-associations).
const MATRIX: { area: string; rows: { label: string; free: boolean; pro: boolean; business: boolean }[] }[] = [
  {
    area: "Practice",
    rows: [
      { label: "Court diary and hearing reminders", free: true, pro: true, business: true },
      { label: "Case dossiers, parties and clients", free: true, pro: true, business: true },
      { label: "Daily tasks", free: true, pro: true, business: true },
    ],
  },
  {
    area: "Tools and research",
    rows: [
      { label: "Legal calculators and stamp values", free: true, pro: true, business: true },
      { label: "Bare acts, templates and dictionaries", free: true, pro: true, business: true },
      { label: "CaseFlow AI legal assistant", free: false, pro: true, business: true },
      { label: "PDF and e-filing document tools", free: false, pro: true, business: true },
    ],
  },
  {
    area: "Courts",
    rows: [
      { label: "eCourts import, export and backup", free: false, pro: true, business: true },
      { label: "Certified copy and caveat trackers", free: false, pro: true, business: true },
      { label: "Fee ledger with receipts and expenses", free: false, pro: true, business: true },
    ],
  },
  {
    area: "Team",
    rows: [
      { label: "Juniors and clerks with roles", free: false, pro: false, business: true },
      { label: "Digital Chambers and case discussion", free: false, pro: false, business: true },
      { label: "Advocate Commissioner field kit", free: false, pro: false, business: true },
      { label: "Priority support", free: false, pro: false, business: true },
    ],
  },
];

export default function PricingPage() {
  usePageTitle("Pricing");
  const { pricing } = useContent();
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  const names = ["free", "pro", "business"].map((id) => pricing.find((p) => p.id === id)?.name ?? id);

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Start free."
        accent="Grow into it."
        intro="Prices are in Indian rupees, per month. Move between plans whenever your practice changes."
      />
      <div ref={root}>
        <div className="container pb-8">
          <PricingCards plans={pricing} />
        </div>

        <section className="container py-20">
          <h2 className="text-3xl font-semibold tracking-tight" data-reveal>
            Compare plans
          </h2>
          <div data-reveal className="mt-8 overflow-x-auto rounded-3xl border hairline">
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="border-b hairline">
                  <th className="px-5 py-4 text-left font-medium text-fg-2">Feature</th>
                  {names.map((n) => (
                    <th key={n} className="px-5 py-4 text-center font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-fg-2">
                      {n}
                    </th>
                  ))}
                </tr>
              </thead>
              {MATRIX.map((g) => (
                <tbody key={g.area}>
                  <tr>
                    <th colSpan={4} className="bg-fg/[0.03] px-5 py-2.5 text-left font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-gold">
                      {g.area}
                    </th>
                  </tr>
                  {g.rows.map((r) => (
                    <tr key={r.label} className="border-t hairline">
                      <td className="px-5 py-3.5">{r.label}</td>
                      {[r.free, r.pro, r.business].map((ok, i) => (
                        <td key={i} className="px-5 py-3.5 text-center">
                          {ok ? (
                            <Check className="mx-auto h-4 w-4 text-jade" aria-label="Included" />
                          ) : (
                            <Minus className="mx-auto h-4 w-4 text-fg-3" aria-label="Not included" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </section>
      </div>
      <Faq />
    </>
  );
}
