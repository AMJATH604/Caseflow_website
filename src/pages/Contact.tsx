import { useSearchParams } from "react-router-dom";
import { Mail, MessageCircle, Phone as PhoneIcon, MapPin } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { LeadForm } from "@/components/LeadForm";
import { usePageTitle } from "@/components/SiteLayout";
import { LEAD_KINDS, type LeadKind } from "@/lib/leads";
import { useContent } from "@/lib/content";

const COPY: Record<LeadKind, { title: string; accent: string; intro: string }> = {
  contact: { title: "Talk to", accent: "the CaseFlow team.", intro: "Questions, feedback or a feature your practice needs — we read every message." },
  demo: { title: "See CaseFlow", accent: "on your own cases.", intro: "A short walkthrough on a call: the diary, a dossier, eCourts import and the tools you use most." },
  pricing: { title: "Choose a plan", accent: "that fits your chamber.", intro: "Tell us about your practice and we'll set you up on the right plan." },
  bar: { title: "Bring your association", accent: "into CaseFlow.", intro: "Tell us about your association and we'll set it up with you." },
  download: { title: "Get CaseFlow", accent: "first.", intro: "Leave your details and we'll send you the app the moment it's ready to install." },
};

export default function Contact() {
  usePageTitle("Contact");
  const [params] = useSearchParams();
  const raw = params.get("kind") ?? "contact";
  const kind: LeadKind = (LEAD_KINDS as readonly string[]).includes(raw) ? (raw as LeadKind) : "contact";
  const plan = params.get("plan") ?? undefined;
  const { settings } = useContent();
  const copy = COPY[kind];

  const channels = [
    settings.supportEmail && { icon: Mail, label: settings.supportEmail, href: `mailto:${settings.supportEmail}` },
    settings.supportPhone && { icon: PhoneIcon, label: settings.supportPhone, href: `tel:${settings.supportPhone.replace(/\s/g, "")}` },
    settings.whatsapp && { icon: MessageCircle, label: "WhatsApp us", href: `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}` },
    settings.address && { icon: MapPin, label: settings.address, href: "" },
  ].filter(Boolean) as { icon: typeof Mail; label: string; href: string }[];

  return (
    <>
      <PageHeader eyebrow={kind === "download" ? "Early access" : "Contact"} title={copy.title} accent={copy.accent} intro={copy.intro} />
      <section className="container grid gap-12 pb-28 lg:grid-cols-[1.5fr_1fr]">
        <LeadForm key={kind} kind={kind} plan={plan} />
        <aside className="space-y-6">
          {channels.length > 0 && (
            <div className="rounded-3xl surface p-6">
              <h2 className="eyebrow">Reach us directly</h2>
              <ul className="mt-4 space-y-3">
                {channels.map((c) => (
                  <li key={c.label} className="flex items-start gap-3 text-sm">
                    <c.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {c.href ? (
                      <a href={c.href} className="text-fg hover:underline" target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                        {c.label}
                      </a>
                    ) : (
                      <span className="text-fg-2">{c.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-3xl surface p-6">
            <h2 className="eyebrow">What happens next</h2>
            <ol className="mt-4 space-y-4 text-sm text-fg-2">
              <li>
                <span className="font-mono text-gold">1</span> — We read your message the same working day.
              </li>
              <li>
                <span className="font-mono text-gold">2</span> — We reply by email, or call if you left a number.
              </li>
              <li>
                <span className="font-mono text-gold">3</span> — We help you set up CaseFlow on your phone.
              </li>
            </ol>
          </div>
        </aside>
      </section>
    </>
  );
}
