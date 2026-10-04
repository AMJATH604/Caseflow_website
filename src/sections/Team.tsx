import { useRef } from "react";
import { Check, Minus } from "lucide-react";
import { Phone, shot } from "@/components/Phone";
import { useReveal } from "@/lib/motion";

// Matches the roles enforced in the CaseFlow database (firm_members.role and
// the "clerks cannot see fees" policies).
const ROWS: { label: string; advocate: boolean; junior: boolean; clerk: boolean }[] = [
  { label: "Cases, hearings and clients", advocate: true, junior: true, clerk: true },
  { label: "Adjourn and update the diary", advocate: true, junior: true, clerk: true },
  { label: "eCourts import and documents", advocate: true, junior: true, clerk: true },
  { label: "Fees and payments", advocate: true, junior: true, clerk: false },
  { label: "Delete a case", advocate: true, junior: false, clerk: false },
  { label: "Manage the team", advocate: true, junior: false, clerk: false },
];

export function Team() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} className="py-24 md:py-32">
      <div className="container grid items-center gap-16 lg:grid-cols-[1fr_1.15fr]">
        <div className="relative order-last mx-auto flex items-end gap-4 lg:order-first" data-reveal>
          <div className="w-[190px] translate-y-10 sm:w-[220px]">
            <Phone src={shot("recruit")} alt="Recruit Associate: invite a junior or clerk by email" />
          </div>
          <div className="w-[190px] sm:w-[220px]">
            <Phone src={shot("chambers")} alt="Digital Chambers: the team conversation" />
          </div>
        </div>

        <div>
          <div data-reveal>
            <p className="eyebrow">Juniors and clerks</p>
            <h2 className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
              The whole chamber, <span className="accent-serif text-fg-2">each in their place.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-2">
              Invite your juniors and clerks by email. They work on the firm's cases from their own phones, talk in
              Digital Chambers, and see only what their role allows. A clerk's fee restriction is enforced by the
              database itself, not just hidden on the screen.
            </p>
          </div>

          <div data-reveal className="mt-10 overflow-x-auto rounded-2xl border hairline">
            <table className="w-full min-w-[440px] text-sm">
              <thead>
                <tr className="border-b hairline text-left">
                  <th className="px-4 py-3 font-medium text-fg-2">Who can</th>
                  {["Advocate", "Junior", "Clerk"].map((r) => (
                    <th key={r} className="px-4 py-3 text-center font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-fg-2">
                      {r}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.label} className="border-b hairline last:border-0">
                    <td className="px-4 py-3 text-fg">{row.label}</td>
                    {[row.advocate, row.junior, row.clerk].map((ok, i) => (
                      <td key={i} className="px-4 py-3 text-center">
                        {ok ? (
                          <Check className="mx-auto h-4 w-4 text-jade" aria-label="Yes" />
                        ) : (
                          <Minus className="mx-auto h-4 w-4 text-fg-3" aria-label="No" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
