import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { Download, Loader2, Mail, MessageCircle, Phone, Search, Trash2, X } from "lucide-react";
import { Card, PageTitle, SetupNotice, useToast } from "../ui";
import { deleteLead, leadsToCsv, updateLead, useLeads } from "../leadsData";
import { KIND_LABEL, LEAD_KINDS, LEAD_STATUSES, type Lead, type LeadStatus } from "@/lib/leads";

const STATUS_STYLE: Record<LeadStatus, string> = {
  new: "bg-royal/10 text-royal",
  contacted: "bg-warn/15 text-[rgb(146,94,8)]",
  converted: "bg-jade/15 text-jade",
  closed: "bg-fg/[0.06] text-fg-2",
};

export function StatusPill({ status }: { status: LeadStatus }) {
  return <span className={clsx("rounded-full px-2.5 py-1 text-xs font-medium capitalize", STATUS_STYLE[status])}>{status}</span>;
}

export default function Leads() {
  const { leads, setLeads, loading, missing, error } = useLeads();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<LeadStatus | "all">("all");
  const [kind, setKind] = useState<string>("all");
  const openId = params.get("open");
  const open = leads.find((l) => l.id === openId) ?? null;

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return leads.filter(
      (l) =>
        (status === "all" || l.status === status) &&
        (kind === "all" || l.kind === kind) &&
        (!needle ||
          [l.name, l.email, l.phone, l.organisation, l.city, l.message].some((v) => v?.toLowerCase().includes(needle))),
    );
  }, [leads, q, status, kind]);

  function exportCsv() {
    const blob = new Blob(["﻿" + leadsToCsv(filtered)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `caseflow-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const setOpen = (id: string | null) => {
    const next = new URLSearchParams(params);
    if (id) next.set("open", id);
    else next.delete("open");
    setParams(next, { replace: true });
  };

  return (
    <>
      <PageTitle
        title="Enquiries"
        sub="Everything sent through the website's forms. New ones appear here live."
        actions={
          <button type="button" className="btn-ghost h-10" onClick={exportCsv} disabled={filtered.length === 0}>
            <Download className="h-4 w-4" /> Export CSV
          </button>
        }
      />
      {missing && <div className="mb-6"><SetupNotice /></div>}
      {error && <p className="mb-6 text-sm text-danger">Couldn't load enquiries: {error}</p>}

      <div className="mb-4 flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-3" />
          <label htmlFor="lead-search" className="sr-only">
            Search enquiries
          </label>
          <input id="lead-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, phone, city…" className="field h-10 bg-ink-2 pl-10" />
        </div>
        <label htmlFor="lead-kind" className="sr-only">
          Type
        </label>
        <select id="lead-kind" value={kind} onChange={(e) => setKind(e.target.value)} className="field h-10 bg-ink-2 md:w-48">
          <option value="all">All types</option>
          {LEAD_KINDS.map((k) => (
            <option key={k} value={k}>
              {KIND_LABEL[k]}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4 flex flex-wrap gap-1.5" role="group" aria-label="Filter by status">
        {(["all", ...LEAD_STATUSES] as const).map((s) => {
          const n = s === "all" ? leads.length : leads.filter((l) => l.status === s).length;
          return (
            <button
              key={s}
              type="button"
              aria-pressed={status === s}
              onClick={() => setStatus(s)}
              className={clsx(
                "rounded-full border px-3 py-1.5 text-sm capitalize transition-colors",
                status === s ? "border-royal bg-royal text-white" : "hairline bg-ink-2 text-fg-2 hover:text-fg",
              )}
            >
              {s} <span className="tabular-nums opacity-70">{n}</span>
            </button>
          );
        })}
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="grid place-items-center py-16">
            <Loader2 className="h-5 w-5 animate-spin text-fg-3" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="px-6 py-16 text-center text-sm text-fg-2">{leads.length ? "No enquiries match these filters." : "No enquiries yet."}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="border-b hairline text-left text-xs text-fg-3">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">City</th>
                  <th className="px-5 py-3 font-medium">Received</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgb(var(--line)/var(--line-a))]">
                {filtered.map((l) => (
                  <tr key={l.id} onClick={() => setOpen(l.id)} className={clsx("cursor-pointer hover:bg-fg/[0.02]", l.id === openId && "bg-royal/[0.05]")}>
                    <td className="px-5 py-3.5">
                      <button type="button" className="text-left" onClick={() => setOpen(l.id)}>
                        <span className={clsx("block", l.status === "new" && "font-semibold")}>{l.name}</span>
                        <span className="block text-xs text-fg-3">{l.email}</span>
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-fg-2">
                      {KIND_LABEL[l.kind]}
                      {l.plan && <span className="block text-xs text-fg-3">{l.plan}</span>}
                    </td>
                    <td className="px-5 py-3.5 text-fg-2">{l.city ?? "—"}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-fg-2">
                      {new Date(l.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusPill status={l.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {open && (
        <LeadPanel
          key={open.id}
          lead={open}
          onClose={() => setOpen(null)}
          onChange={(next) => setLeads((all) => all.map((l) => (l.id === next.id ? next : l)))}
          onDeleted={() => {
            setLeads((all) => all.filter((l) => l.id !== open.id));
            setOpen(null);
          }}
        />
      )}
    </>
  );
}

function LeadPanel({ lead, onClose, onChange, onDeleted }: {
  lead: Lead;
  onClose: () => void;
  onChange: (l: Lead) => void;
  onDeleted: () => void;
}) {
  const toast = useToast();
  const [notes, setNotes] = useState(lead.admin_notes ?? "");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function save(patch: Partial<Pick<Lead, "status" | "admin_notes">>, message: string) {
    setBusy(true);
    const { error } = await updateLead(lead.id, patch);
    setBusy(false);
    if (error) return toast(`Couldn't save: ${error.message}`, "error");
    onChange({ ...lead, ...patch });
    toast(message);
  }

  async function remove() {
    if (!window.confirm(`Delete the enquiry from ${lead.name}? This can't be undone.`)) return;
    const { error } = await deleteLead(lead.id);
    if (error) return toast(`Couldn't delete: ${error.message}`, "error");
    toast("Enquiry deleted");
    onDeleted();
  }

  const wa = lead.phone?.replace(/\D/g, "");
  const rows: [string, string | null][] = [
    ["Email", lead.email],
    ["Mobile", lead.phone],
    ["Role", lead.role],
    ["Firm / association", lead.organisation],
    ["City", lead.city],
    ["Plan", lead.plan],
    ["Sent from", lead.source_page],
    ["Received", new Date(lead.created_at).toLocaleString("en-IN", { dateStyle: "full", timeStyle: "short" })],
  ];

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="lead-title">
      <div className="absolute inset-0 bg-black/25" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ink-2 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b hairline p-6">
          <div>
            <p className="text-xs text-fg-3">{KIND_LABEL[lead.kind]}</p>
            <h2 id="lead-title" className="mt-1 text-xl font-semibold">
              {lead.name}
            </h2>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded-lg p-1.5 text-fg-2 hover:bg-fg/[0.05]">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          <div className="flex flex-wrap gap-2">
            <a href={`mailto:${lead.email}`} className="btn-ghost h-9 px-3.5">
              <Mail className="h-4 w-4" /> Email
            </a>
            {lead.phone && (
              <a href={`tel:${lead.phone}`} className="btn-ghost h-9 px-3.5">
                <Phone className="h-4 w-4" /> Call
              </a>
            )}
            {wa && wa.length >= 10 && (
              <a href={`https://wa.me/${wa.length === 10 ? "91" + wa : wa}`} target="_blank" rel="noreferrer" className="btn-ghost h-9 px-3.5">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            )}
          </div>

          {lead.message && (
            <div>
              <h3 className="label">Message</h3>
              <p className="whitespace-pre-wrap rounded-xl bg-fg/[0.03] p-4 text-sm leading-relaxed">{lead.message}</p>
            </div>
          )}

          <dl className="grid grid-cols-[8.5rem_1fr] gap-x-4 gap-y-2.5 text-sm">
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-fg-3">{k}</dt>
                <dd className="break-words">{v || "—"}</dd>
              </div>
            ))}
          </dl>

          <div>
            <label htmlFor="lead-status" className="label">
              Status
            </label>
            <select
              id="lead-status"
              value={lead.status}
              disabled={busy}
              onChange={(e) => void save({ status: e.target.value as LeadStatus }, "Status updated")}
              className="field h-10 capitalize"
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="lead-notes" className="label">
              Team notes <span className="text-fg-3">(never shown to the visitor)</span>
            </label>
            <textarea id="lead-notes" rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} className="field" placeholder="Called on…, wants a demo for 3 juniors…" />
            <button
              type="button"
              className="btn-primary mt-3 h-9 disabled:opacity-50"
              disabled={busy || notes === (lead.admin_notes ?? "")}
              onClick={() => void save({ admin_notes: notes.trim() || null }, "Notes saved")}
            >
              Save notes
            </button>
          </div>
        </div>
        <div className="border-t hairline p-4">
          <button type="button" onClick={() => void remove()} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-danger hover:bg-danger/10">
            <Trash2 className="h-4 w-4" /> Delete enquiry
          </button>
        </div>
      </aside>
    </div>
  );
}
