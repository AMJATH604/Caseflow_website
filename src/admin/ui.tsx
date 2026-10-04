import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import clsx from "clsx";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("rounded-2xl border hairline bg-ink-2 shadow-[0_1px_2px_rgba(14,17,45,0.04)]", className)}>{children}</div>;
}

export function PageTitle({ title, sub, actions }: { title: string; sub?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {sub && <p className="mt-1 text-sm text-fg-2">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Field({ label, hint, htmlFor, children }: { label: string; hint?: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-fg-3">{hint}</p>}
    </div>
  );
}

export function Toggle({ id, checked, onChange, label }: { id: string; checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label htmlFor={id} className="inline-flex cursor-pointer items-center gap-3 text-sm">
      <span className="relative">
        <input id={id} type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="block h-6 w-11 rounded-full bg-fg/15 transition-colors peer-checked:bg-royal peer-focus-visible:ring-2 peer-focus-visible:ring-sky" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
      </span>
      {label}
    </label>
  );
}

export function SaveBar({ dirty, saving, onSave, onReset, savedAt }: {
  dirty: boolean;
  saving: boolean;
  onSave: () => void;
  onReset: () => void;
  savedAt: string | null;
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 mt-8 border-t hairline bg-ink/90 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-fg-2">
          {dirty ? "You have unsaved changes." : savedAt ? `Live on the website · saved ${new Date(savedAt).toLocaleString("en-IN")}` : "Showing the website's built-in text. Save to take control of it here."}
        </p>
        <div className="flex gap-2">
          <button type="button" className="btn-ghost h-10" disabled={!dirty || saving} onClick={onReset}>
            Discard
          </button>
          <button type="button" className="btn-primary h-10 disabled:opacity-50" disabled={!dirty || saving} onClick={onSave}>
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Publish changes
          </button>
        </div>
      </div>
    </div>
  );
}

export function SetupNotice() {
  return (
    <Card className="border-warn/40 bg-warn/[0.07] p-5">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warn" />
        <div className="text-sm">
          <p className="font-medium">The website tables aren't in the database yet.</p>
          <p className="mt-1 text-fg-2">
            Apply the migration <code className="font-mono text-xs">20261006_website_tables.sql</code> from the CaseFlow
            repository. Until then the website shows its built-in content and enquiry forms can't be saved.
          </p>
        </div>
      </div>
    </Card>
  );
}

/* ---- toasts ---- */

type Toast = { id: number; text: string; tone: "ok" | "error" };
const ToastCtx = createContext<(text: string, tone?: Toast["tone"]) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((text: string, tone: Toast["tone"] = "ok") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text, tone }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[80] flex flex-col gap-2" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto flex items-center gap-2 rounded-xl border hairline bg-ink-2 px-4 py-3 text-sm shadow-lg">
            {t.tone === "ok" ? <CheckCircle2 className="h-4 w-4 text-jade" /> : <AlertTriangle className="h-4 w-4 text-danger" />}
            {t.text}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);
