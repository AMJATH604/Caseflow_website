import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { Card, PageTitle, SetupNotice } from "../ui";
import { useLeads } from "../leadsData";
import { KIND_LABEL, LEAD_KINDS, LEAD_STATUSES } from "@/lib/leads";
import { StatusPill } from "./Leads";

export default function Overview() {
  const { leads, loading, missing } = useLeads();

  const now = Date.now();
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(now - (13 - i) * 86400000);
    const key = d.toISOString().slice(0, 10);
    return { key, label: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }), n: 0 };
  });
  for (const l of leads) {
    const day = days.find((d) => d.key === l.created_at.slice(0, 10));
    if (day) day.n++;
  }
  const max = Math.max(1, ...days.map((d) => d.n));
  const last7 = days.slice(7).reduce((a, d) => a + d.n, 0);
  const prev7 = days.slice(0, 7).reduce((a, d) => a + d.n, 0);
  const byStatus = Object.fromEntries(LEAD_STATUSES.map((s) => [s, leads.filter((l) => l.status === s).length]));
  const byKind = LEAD_KINDS.map((k) => ({ k, n: leads.filter((l) => l.kind === k).length })).sort((a, b) => b.n - a.n);

  return (
    <>
      <PageTitle title="Overview" sub="Enquiries from the website, and what needs a reply." />
      {missing && <div className="mb-6"><SetupNotice /></div>}
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin text-fg-3" />
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Waiting for a reply" value={byStatus.new} tone="text-royal" />
            <Stat label="Contacted" value={byStatus.contacted} />
            <Stat label="Converted" value={byStatus.converted} tone="text-jade" />
            <Stat label="Last 7 days" value={last7} note={prev7 === 0 ? "" : `${last7 >= prev7 ? "+" : ""}${last7 - prev7} on the week before`} />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <Card className="p-6">
              <h2 className="text-sm font-medium text-fg-2">Enquiries per day · last 14 days</h2>
              <div className="mt-6 flex h-40 items-end gap-1.5" role="img" aria-label={`Enquiries per day: ${days.map((d) => `${d.label} ${d.n}`).join(", ")}`}>
                {days.map((d, i) => (
                  <div key={d.key} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-[11px] tabular-nums text-fg-3">{d.n || ""}</span>
                    <div
                      className={i === days.length - 1 ? "w-full rounded-t-md bg-royal" : "w-full rounded-t-md bg-royal/30"}
                      style={{ height: `${(d.n / max) * 100}%`, minHeight: d.n ? 4 : 1 }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-fg-3">
                <span>{days[0].label}</span>
                <span>{days[days.length - 1].label}</span>
              </div>
            </Card>
            <Card className="p-6">
              <h2 className="text-sm font-medium text-fg-2">By type</h2>
              <ul className="mt-4 space-y-3">
                {byKind.map(({ k, n }) => (
                  <li key={k} className="text-sm">
                    <div className="flex justify-between">
                      <span>{KIND_LABEL[k]}</span>
                      <span className="tabular-nums text-fg-2">{n}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-fg/[0.06]">
                      <div className="h-full rounded-full bg-violet" style={{ width: `${leads.length ? (n / leads.length) * 100 : 0}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card>
            <div className="flex items-center justify-between border-b hairline px-6 py-4">
              <h2 className="font-medium">Newest enquiries</h2>
              <Link to="/admin/leads" className="inline-flex items-center gap-1 text-sm text-royal hover:underline">
                All enquiries <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {leads.length === 0 ? (
              <p className="px-6 py-10 text-center text-sm text-fg-2">No enquiries yet. They appear here the moment someone sends the website form.</p>
            ) : (
              <ul className="divide-y divide-[rgb(var(--line)/var(--line-a))]">
                {leads.slice(0, 6).map((l) => (
                  <li key={l.id}>
                    <Link to={`/admin/leads?open=${l.id}`} className="flex items-center gap-4 px-6 py-3.5 hover:bg-fg/[0.02]">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{l.name}</p>
                        <p className="truncate text-xs text-fg-3">
                          {KIND_LABEL[l.kind]} · {l.email}
                        </p>
                      </div>
                      <span className="hidden text-xs text-fg-3 sm:block">{new Date(l.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
                      <StatusPill status={l.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      )}
    </>
  );
}

function Stat({ label, value, tone, note }: { label: string; value: number; tone?: string; note?: string }) {
  return (
    <Card className="p-5">
      <p className="text-sm text-fg-2">{label}</p>
      <p className={`mt-2 text-3xl font-semibold tabular-nums ${tone ?? ""}`}>{value}</p>
      {note && <p className="mt-1 text-xs text-fg-3">{note}</p>}
    </Card>
  );
}
