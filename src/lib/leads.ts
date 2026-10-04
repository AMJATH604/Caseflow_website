import { supabase } from "./supabase";

export const LEAD_KINDS = ["contact", "demo", "pricing", "bar", "download"] as const;
export type LeadKind = (typeof LEAD_KINDS)[number];

export const LEAD_STATUSES = ["new", "contacted", "converted", "closed"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type Lead = {
  id: string;
  created_at: string;
  updated_at: string;
  kind: LeadKind;
  name: string;
  email: string;
  phone: string | null;
  organisation: string | null;
  city: string | null;
  role: string | null;
  plan: string | null;
  message: string | null;
  source_page: string | null;
  status: LeadStatus;
  admin_notes: string | null;
};

export const KIND_LABEL: Record<LeadKind, string> = {
  contact: "Contact",
  demo: "Demo request",
  pricing: "Plan enquiry",
  bar: "Bar association",
  download: "Early access",
};

export type NewLead = {
  kind: LeadKind;
  name: string;
  email: string;
  phone?: string;
  organisation?: string;
  city?: string;
  role?: string;
  plan?: string;
  message?: string;
};

const clean = (v: string | undefined, max: number) => {
  const t = (v ?? "").trim();
  return t === "" ? null : t.slice(0, max);
};

/**
 * Sends a website enquiry. Visitors may insert but never read leads, so this
 * must not ask for the row back (no .select()).
 */
export async function submitLead(lead: NewLead): Promise<{ ok: true } | { ok: false; message: string }> {
  const { error } = await supabase.from("website_leads").insert({
    kind: lead.kind,
    name: lead.name.trim().slice(0, 120),
    email: lead.email.trim().toLowerCase().slice(0, 200),
    phone: clean(lead.phone, 30),
    organisation: clean(lead.organisation, 160),
    city: clean(lead.city, 80),
    role: clean(lead.role, 60),
    plan: clean(lead.plan, 40),
    message: clean(lead.message, 4000),
    source_page: typeof window !== "undefined" ? window.location.pathname.slice(0, 200) : null,
  });
  if (!error) return { ok: true };
  if (/too many/i.test(error.message)) {
    return { ok: false, message: "We already have several messages from this email in the last hour. We'll be in touch soon." };
  }
  return { ok: false, message: "Your message didn't send. Check your connection and try again." };
}
