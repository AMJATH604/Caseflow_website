import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitLead, type LeadKind } from "@/lib/leads";

const ROLES = ["Advocate", "Firm / chambers", "Bar association", "Law student", "Other"];

const SUBMIT_LABEL: Record<LeadKind, string> = {
  contact: "Send message",
  demo: "Request a demo",
  pricing: "Send enquiry",
  bar: "Talk to us",
  download: "Get early access",
};

export function LeadForm({ kind, plan }: { kind: LeadKind; plan?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const isBar = kind === "bar";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    // Honeypot: people never see this field; simple bots fill it in.
    if (String(form.get("website") ?? "") !== "") {
      setState("sent");
      return;
    }
    const email = String(form.get("email") ?? "").trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Enter an email address like name@example.com.");
      return;
    }
    setError(null);
    setState("sending");
    const result = await submitLead({
      kind,
      plan,
      name: String(form.get("name") ?? ""),
      email,
      phone: String(form.get("phone") ?? ""),
      organisation: String(form.get("organisation") ?? ""),
      city: String(form.get("city") ?? ""),
      role: isBar ? "Bar association" : String(form.get("role") ?? ""),
      message: String(form.get("message") ?? ""),
    });
    if (result.ok) setState("sent");
    else {
      setError(result.message);
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-3xl surface p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-10 w-10 text-jade" />
        <h3 className="mt-4 text-xl font-semibold">Thank you — we have your details.</h3>
        <p className="mx-auto mt-2 max-w-sm text-fg-2">
          {kind === "download"
            ? "We'll email you the moment CaseFlow is ready to install."
            : "Someone from CaseFlow will get back to you within one working day."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl surface p-6 md:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="lead-name">
            Full name
          </label>
          <input id="lead-name" name="name" required maxLength={120} autoComplete="name" className="field" placeholder="Adv. R. Priya" />
        </div>
        <div>
          <label className="label" htmlFor="lead-email">
            Email
          </label>
          <input id="lead-email" name="email" type="email" required maxLength={200} autoComplete="email" className="field" placeholder="you@example.com" />
        </div>
        <div>
          <label className="label" htmlFor="lead-phone">
            Mobile <span className="text-fg-3">(optional)</span>
          </label>
          <input id="lead-phone" name="phone" type="tel" maxLength={30} autoComplete="tel" className="field" placeholder="+91" />
        </div>
        <div>
          <label className="label" htmlFor="lead-city">
            City or district <span className="text-fg-3">(optional)</span>
          </label>
          <input id="lead-city" name="city" maxLength={80} autoComplete="address-level2" className="field" placeholder="Tirunelveli" />
        </div>
        {isBar ? (
          <div className="sm:col-span-2">
            <label className="label" htmlFor="lead-org">
              Association
            </label>
            <input id="lead-org" name="organisation" required maxLength={160} className="field" placeholder="District Court Bar Association" />
          </div>
        ) : (
          <>
            <div>
              <label className="label" htmlFor="lead-role">
                You are
              </label>
              <select id="lead-role" name="role" className="field appearance-none" defaultValue="Advocate">
                {ROLES.map((r) => (
                  <option key={r} value={r} className="bg-ink-2">
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="lead-org">
                Firm or chambers <span className="text-fg-3">(optional)</span>
              </label>
              <input id="lead-org" name="organisation" maxLength={160} className="field" />
            </div>
          </>
        )}
        <div className="sm:col-span-2">
          <label className="label" htmlFor="lead-message">
            {kind === "download" ? "Anything we should know?" : "How can we help?"}{" "}
            <span className="text-fg-3">(optional)</span>
          </label>
          <textarea id="lead-message" name="message" rows={4} maxLength={4000} className="field resize-y" />
        </div>
        <div className="hidden" aria-hidden>
          <label htmlFor="lead-website">Website</label>
          <input id="lead-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      {plan && (
        <p className="mt-5 text-sm text-fg-2">
          Plan: <span className="font-medium text-fg">{plan}</span>
        </p>
      )}
      {error && (
        <p className="mt-5 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-fg" role="alert">
          {error}
        </p>
      )}
      <button type="submit" disabled={state === "sending"} className="btn-primary mt-6 h-12 w-full disabled:opacity-60 sm:w-auto sm:px-8">
        {state === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
        {SUBMIT_LABEL[kind]}
      </button>
      <p className="mt-4 text-xs text-fg-3">We use these details only to reply to you.</p>
    </form>
  );
}
