import type { ReactNode } from "react";
import { PageHeader } from "@/components/PageHeader";
import { usePageTitle } from "@/components/SiteLayout";
import { useContent } from "@/lib/content";

// Ported from CASEFLOW/docs/privacy-policy.html (effective 8 August 2026),
// with section 10 added for this website's enquiry form.

function H({ children }: { children: ReactNode }) {
  return <h2 className="mt-14 text-2xl font-semibold tracking-tight">{children}</h2>;
}
function L({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-fg-3">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

export default function Privacy() {
  usePageTitle("Privacy policy");
  const { settings } = useContent();
  const email = settings.supportEmail || "privacy@caseflow.app";

  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy policy" intro="Effective 8 August 2026 · Last updated 8 August 2026" />
      <article className="container pb-28 leading-relaxed text-fg-2 [&>*]:max-w-3xl [&_strong]:text-fg">
        <p>
          CaseFlow (“we”, “our”, “us”) is a legal practice management application designed for Indian advocates and
          citizens. This policy explains how we collect, use and protect your personal information when you use our
          mobile application, this website and related services.
        </p>
        <p className="mt-6 rounded-2xl border border-gold/30 bg-gold/[0.06] p-5">
          <strong>Summary:</strong> we collect only the data needed to provide legal practice management services. Your
          data is encrypted in transit, stored securely, and never sold to third parties.
        </p>

        <H>1. Information we collect</H>
        <p className="mt-4">
          <strong>Account information</strong>
        </p>
        <L
          items={[
            "Email address and password (for authentication)",
            "Full name, mobile number and bar registration number (for advocate profiles)",
            "State and district (for jurisdiction context)",
            "Profile photo (optional)",
          ]}
        />
        <p className="mt-6">
          <strong>Case and legal data</strong>
        </p>
        <L
          items={[
            "Case details (titles, court names, CNR numbers, hearing dates)",
            "Client information (names, contact details)",
            "Payment records (amounts and types — no card numbers are stored)",
            "Evidence photos and documents you upload",
            "Legal research questions you send to the AI assistant",
          ]}
        />
        <p className="mt-6">
          <strong>Device and usage data</strong>
        </p>
        <L
          items={[
            "Device type and operating system version (for crash reporting via Firebase Crashlytics)",
            "Push notification tokens (for hearing reminders and messages)",
            "GPS coordinates — only when you use the Commission Field Kit",
            "Basic usage analytics (screens visited, features used — via Firebase Analytics)",
          ]}
        />

        <H>2. How we use your information</H>
        <L
          items={[
            <><strong>Service delivery:</strong> managing cases, hearings, payments and client records</>,
            <><strong>Notifications:</strong> hearing reminders, chat messages and caveat expiry alerts</>,
            <><strong>AI assistant:</strong> processing your questions through Google Gemini (your questions are not used to train AI models)</>,
            <><strong>Firm collaboration:</strong> shared visibility within your firm</>,
            <><strong>Crash reporting:</strong> finding and fixing bugs via Firebase Crashlytics</>,
            <><strong>Security:</strong> audit logging for data integrity and detecting unauthorised access</>,
          ]}
        />

        <H>3. Storage and security</H>
        <L
          items={[
            <>All data is stored in <strong>Supabase</strong> (PostgreSQL) with row-level security enforced on every table</>,
            <>Data is always transmitted over <strong>HTTPS/TLS</strong></>,
            "API keys for third-party services (such as Gemini) are server-side secrets and never reach your device",
            <>Evidence photos carry a <strong>SHA-256 hash</strong> for integrity verification</>,
            <>Authentication uses <strong>Supabase Auth</strong> with the PKCE flow and signed tokens</>,
            "Case data cached on your phone for offline use is stored in encrypted form",
          ]}
        />

        <H>4. Data sharing</H>
        <p className="mt-4">
          <strong>We do not sell your personal data to anyone.</strong> We share data only:
        </p>
        <L
          items={[
            <><strong>With your firm:</strong> if you join a firm in CaseFlow, its members can see the firm's shared case data</>,
            <><strong>For AI processing:</strong> questions are sent to the Google Gemini API; Google's AI usage policies apply</>,
            <><strong>For notifications:</strong> Firebase Cloud Messaging delivers push notifications</>,
            <><strong>When the law requires it:</strong> we may disclose data if required by law or a court order</>,
          ]}
        />

        <H>5. Your rights</H>
        <L
          items={[
            <><strong>Access:</strong> view all your data within the app</>,
            <><strong>Export:</strong> export your case data as PDF or in a structured format</>,
            <><strong>Deletion:</strong> delete individual records; for complete account deletion, write to us</>,
            <><strong>Correction:</strong> update your profile and case information at any time</>,
            <><strong>Portability:</strong> export your data and take it with you</>,
          ]}
        />

        <H>6. Retention</H>
        <L
          items={[
            "Active case data is kept for as long as your account exists",
            "Deleted records are kept for 90 days for legal audit purposes, then permanently removed",
            "Audit logs are kept for one year",
            "Offline cache data is cleared when you sign out",
          ]}
        />

        <H>7. Children's privacy</H>
        <p className="mt-4">
          CaseFlow is for legal professionals and adult citizens. We do not knowingly collect personal information from
          anyone under 18. If you believe a child has given us personal data, contact us immediately.
        </p>

        <H>8. Third-party services</H>
        <L
          items={[
            <><a className="text-fg underline underline-offset-4" href="https://supabase.com/privacy" target="_blank" rel="noreferrer">Supabase</a> — database, authentication and file storage</>,
            <><a className="text-fg underline underline-offset-4" href="https://firebase.google.com/support/privacy" target="_blank" rel="noreferrer">Firebase</a> — push notifications, crash reporting and analytics</>,
            <><a className="text-fg underline underline-offset-4" href="https://ai.google.dev/terms" target="_blank" rel="noreferrer">Google Gemini</a> — AI legal research</>,
          ]}
        />

        <H>9. Changes to this policy</H>
        <p className="mt-4">
          We may update this policy from time to time and will tell you about significant changes in the app or by
          email. Continuing to use CaseFlow after a change means you accept the updated policy.
        </p>

        <H>10. This website</H>
        <p className="mt-4">
          When you write to us through a form on this website, we store the details you enter — your name, email, and
          optionally your mobile number, city, firm and message — so we can reply. Only the CaseFlow team can read them.
          Ask us and we will delete them.
        </p>

        <H>11. Contact us</H>
        <p className="mt-4">
          For questions about this policy or to exercise your rights, write to{" "}
          <a className="text-fg underline underline-offset-4" href={`mailto:${email}`}>
            {email}
          </a>
          .
        </p>
        <p className="mt-10 border-t hairline pt-6 text-sm text-fg-3">
          This policy is intended to comply with the Information Technology Act, 2000 and the IT (Reasonable Security
          Practices and Procedures) Rules, 2011.
        </p>
      </article>
    </>
  );
}
