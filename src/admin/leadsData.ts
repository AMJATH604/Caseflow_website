import { useCallback, useEffect, useState } from "react";
import { supabase, isMissingTable } from "@/lib/supabase";
import type { Lead } from "@/lib/leads";

/** All enquiries, newest first, kept live through Supabase Realtime. */
export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("website_leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (isMissingTable(error)) setMissing(true);
    else if (error) setError(error.message);
    else setLeads((data ?? []) as Lead[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
    const channel = supabase
      .channel("admin-website-leads")
      .on("postgres_changes", { event: "*", schema: "public", table: "website_leads" }, () => void load())
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [load]);

  return { leads, setLeads, loading, missing, error, reload: load };
}

/** Count of enquiries still marked "new", for the sidebar badge. */
export function useNewLeadCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const load = () =>
      supabase
        .from("website_leads")
        .select("id", { count: "exact", head: true })
        .eq("status", "new")
        .then(({ count }) => setCount(count ?? 0));
    void load();
    const channel = supabase
      .channel("admin-website-leads-badge")
      .on("postgres_changes", { event: "*", schema: "public", table: "website_leads" }, () => void load())
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);
  return count;
}

export async function updateLead(id: string, patch: Partial<Pick<Lead, "status" | "admin_notes">>) {
  return supabase.from("website_leads").update(patch).eq("id", id);
}

export async function deleteLead(id: string) {
  return supabase.from("website_leads").delete().eq("id", id);
}

export function leadsToCsv(leads: Lead[]): string {
  const cols: (keyof Lead)[] = ["created_at", "kind", "status", "name", "email", "phone", "role", "organisation", "city", "plan", "message", "admin_notes", "source_page"];
  const esc = (v: unknown) => {
    const s = v == null ? "" : String(v);
    // Neutralise spreadsheet formulas, then quote.
    const safe = /^[=+\-@]/.test(s) ? "'" + s : s;
    return `"${safe.replace(/"/g, '""')}"`;
  };
  return [cols.join(","), ...leads.map((l) => cols.map((c) => esc(l[c])).join(","))].join("\r\n");
}
