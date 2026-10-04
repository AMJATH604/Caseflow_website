import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "./supabase";

/*
 * Everything an admin can change without a deploy. The site always renders
 * from DEFAULTS first; rows in public.website_content (one per key) replace a
 * key wholesale once they load. If the table is missing or the request
 * fails, the defaults simply stay.
 */

export type Plan = {
  id: string;
  name: string;
  price: number; // rupees; 0 = free
  period: string; // "/month"
  tagline: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
};

export type Faq = { q: string; a: string };

export type Testimonial = { quote: string; name: string; role: string; published: boolean };

export type Announcement = { active: boolean; text: string; linkLabel: string; linkUrl: string };

export type Settings = {
  playStoreUrl: string;
  appStoreUrl: string;
  webAppUrl: string;
  supportEmail: string;
  supportPhone: string;
  whatsapp: string;
  address: string;
  linkedin: string;
  instagram: string;
  x: string;
  youtube: string;
};

export type SiteContent = {
  pricing: Plan[];
  faqs: Faq[];
  testimonials: Testimonial[];
  announcement: Announcement;
  settings: Settings;
};

export type ContentKey = keyof SiteContent;

export const DEFAULTS: SiteContent = {
  pricing: [
    {
      id: "free",
      name: "Free",
      price: 0,
      period: "forever",
      tagline: "Bring your diary and cases into one place.",
      features: [
        "Court diary and hearing reminders",
        "Case files, parties and clients",
        "Daily tasks",
        "Legal calculators and stamp values",
        "Bare acts, templates and legal dictionary",
      ],
      cta: "Start free",
      highlighted: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: 199,
      period: "/month",
      tagline: "For the advocate who runs a full board.",
      features: [
        "Everything in Free",
        "CaseFlow AI legal assistant",
        "eCourts import, export and backup",
        "Fee ledger with receipts and expenses",
        "Certified copy and caveat trackers",
        "PDF and e-filing document tools",
      ],
      cta: "Choose Pro",
      highlighted: true,
      badge: "Recommended",
    },
    {
      id: "business",
      name: "Business",
      price: 499,
      period: "/month",
      tagline: "For chambers with juniors and clerks.",
      features: [
        "Everything in Pro",
        "Juniors and clerks with role-based access",
        "Digital Chambers team chat",
        "Case discussion and shared case files",
        "Advocate Commissioner field kit",
        "Priority support",
      ],
      cta: "Choose Business",
      highlighted: false,
    },
    {
      id: "bar",
      name: "Bar Association",
      price: 1999,
      period: "/month",
      tagline: "Run your association from the same app your members use.",
      features: [
        "Member directory and digital membership cards",
        "Annual fee status for every member",
        "Notices and events, pushed to every phone",
        "Elections",
        "Association admin console",
      ],
      cta: "Talk to us",
      highlighted: false,
    },
  ],
  faqs: [
    {
      q: "Who can see my case and client data?",
      a: "Only you and the people in your firm. Every record carries your firm's identity, and the database itself refuses to return it to anyone else (row-level security). Documents are stored privately and opened through links that expire.",
    },
    {
      q: "Does CaseFlow work with eCourts?",
      a: "Yes. Export your saved cases from the eCourts Services app and import the file into CaseFlow — parties, case numbers, courts and hearing dates come across. You can pay court fees through eCourts ePay from inside the app.",
    },
    {
      q: "Can my juniors and clerks use it?",
      a: "Yes. Invite them by email. Juniors and clerks work on the firm's cases, hearings and clients; clerks never see fees or payments, and only the advocate who owns the firm can delete cases or manage the team.",
    },
    {
      q: "Which courts does it support?",
      a: "Any Indian court — sub courts, district courts, family courts, tribunals and the High Courts. The court-fee and stamp-value tools follow Tamil Nadu law today; other states are on the way.",
    },
    {
      q: "What does CaseFlow AI do?",
      a: "Ask it questions about Indian law, or send a photo of an order, FIR or document and ask about it. Treat its answers as a fast starting point and verify them before relying on them in court.",
    },
    {
      q: "Is there an iPhone app?",
      a: "CaseFlow is on Android today. The iPhone app and a web version for your desk are on the way — leave your email and we'll tell you first.",
    },
    {
      q: "Can I try it before paying?",
      a: "Yes. The Free plan has no time limit. Move to Pro or Business when you need the AI assistant, eCourts import or your team.",
    },
  ],
  testimonials: [],
  announcement: { active: false, text: "", linkLabel: "", linkUrl: "" },
  settings: {
    playStoreUrl: "",
    appStoreUrl: "",
    webAppUrl: "",
    supportEmail: "",
    supportPhone: "",
    whatsapp: "",
    address: "",
    linkedin: "",
    instagram: "",
    x: "",
    youtube: "",
  },
};

const ContentContext = createContext<SiteContent>(DEFAULTS);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULTS);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("website_content")
      .select("key, value")
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        setContent((prev) => {
          const next = { ...prev } as Record<string, unknown>;
          for (const row of data as { key: string; value: unknown }[]) {
            if (row.key in DEFAULTS && row.value != null) {
              const base = DEFAULTS[row.key as ContentKey];
              // Objects are merged so a field added later keeps its default.
              next[row.key] = Array.isArray(base) ? row.value : { ...base, ...(row.value as object) };
              if (row.key === "announcement") {
                const a = next.announcement as Announcement;
                next.announcement = { ...a, linkUrl: safeUrl(a.linkUrl ?? "") };
              }
              if (row.key === "settings") {
                const st = next.settings as Settings;
                next.settings = {
                  ...st,
                  playStoreUrl: safeUrl(st.playStoreUrl ?? ""),
                  appStoreUrl: safeUrl(st.appStoreUrl ?? ""),
                  webAppUrl: safeUrl(st.webAppUrl ?? ""),
                  linkedin: safeUrl(st.linkedin ?? ""),
                  instagram: safeUrl(st.instagram ?? ""),
                  x: safeUrl(st.x ?? ""),
                  youtube: safeUrl(st.youtube ?? ""),
                };
              }
            }
          }
          return next as SiteContent;
        });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext);

export const formatRupees = (n: number) => "₹" + n.toLocaleString("en-IN");

/**
 * Admin-entered links are shown to every visitor, so only web, mail, phone
 * and on-site links pass; anything else (javascript:, data:) becomes "".
 */
export function safeUrl(url: string): string {
  const u = url.trim();
  if (u.startsWith("/") && !u.startsWith("//")) return u;
  return /^(https?:\/\/|mailto:|tel:)/i.test(u) ? u : "";
}

/** Where "Get the app" goes: the store when an admin has set it, else the early-access form. */
export function appLink(settings: Settings): { href: string; external: boolean } {
  const store = safeUrl(settings.playStoreUrl);
  if (store) return { href: store, external: true };
  return { href: "/contact?kind=download", external: false };
}
