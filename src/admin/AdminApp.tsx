import { useEffect, useState, type FormEvent } from "react";
import { NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import clsx from "clsx";
import {
  ExternalLink,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  Loader2,
  LogOut,
  Megaphone,
  Menu,
  MessageSquareQuote,
  Settings as SettingsIcon,
  Tags,
  X,
} from "lucide-react";
import { AdminAuthProvider, useAdminAuth } from "./auth";
import { ToastProvider } from "./ui";
import { useNewLeadCount } from "./leadsData";
import Overview from "./pages/Overview";
import Leads from "./pages/Leads";
import PricingEditor from "./pages/PricingEditor";
import FaqEditor from "./pages/FaqEditor";
import TestimonialsEditor from "./pages/TestimonialsEditor";
import AnnouncementEditor from "./pages/AnnouncementEditor";
import SettingsEditor from "./pages/SettingsEditor";

/** The website's admin panel, at /admin. Light theme, its own login. */
export default function AdminApp() {
  useEffect(() => {
    document.title = "Admin · CaseFlow website";
    document.documentElement.classList.add("theme-admin");
    document.body.classList.add("theme-admin");
    return () => {
      document.documentElement.classList.remove("theme-admin");
      document.body.classList.remove("theme-admin");
    };
  }, []);

  return (
    <AdminAuthProvider>
      <ToastProvider>
        <Gate />
      </ToastProvider>
    </AdminAuthProvider>
  );
}

function Gate() {
  const { session, isAdmin, loading } = useAdminAuth();
  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-fg-3" />
      </div>
    );
  }
  if (!session || !isAdmin) return <Login />;
  return <Shell />;
}

function Login() {
  const { signIn, session, isAdmin, signOut } = useAdminAuth();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError(await signIn(String(f.get("email")), String(f.get("password"))));
    setBusy(false);
  }

  return (
    <div className="grid min-h-screen place-items-center bg-ink px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5">
          <img src="/brand/mark.png" alt="" className="h-8" />
          <span className="text-lg font-semibold tracking-tight">CaseFlow</span>
          <span className="rounded-md bg-fg/[0.06] px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-fg-2">Website admin</span>
        </div>
        {session && !isAdmin ? (
          <div className="mt-8 rounded-2xl border hairline bg-ink-2 p-6">
            <p className="font-medium">This account isn't a CaseFlow administrator.</p>
            <p className="mt-1 text-sm text-fg-2">Sign in with an admin account to manage the website.</p>
            <button type="button" className="btn-ghost mt-5 h-10" onClick={() => void signOut()}>
              Sign out
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl border hairline bg-ink-2 p-6 shadow-sm">
            <div>
              <label className="label" htmlFor="admin-email">
                Email
              </label>
              <input id="admin-email" name="email" type="email" required autoComplete="username" className="field h-11" />
            </div>
            <div>
              <label className="label" htmlFor="admin-password">
                Password
              </label>
              <input id="admin-password" name="password" type="password" required autoComplete="current-password" className="field h-11" />
            </div>
            {error && (
              <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger" role="alert">
                {error}
              </p>
            )}
            <button type="submit" disabled={busy} className="btn-primary h-11 w-full disabled:opacity-60">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign in
            </button>
            <p className="text-center text-xs text-fg-3">Use your CaseFlow administrator account.</p>
          </form>
        )}
      </div>
    </div>
  );
}

const NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/leads", label: "Enquiries", icon: Inbox },
  { to: "/admin/pricing", label: "Pricing", icon: Tags },
  { to: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/admin/announcement", label: "Announcement bar", icon: Megaphone },
  { to: "/admin/settings", label: "Contact & links", icon: SettingsIcon },
];

function Shell() {
  const { session, signOut } = useAdminAuth();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const newCount = useNewLeadCount();
  useEffect(() => setOpen(false), [pathname]);

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <img src="/brand/mark.png" alt="" className="h-7" />
        <div className="leading-tight">
          <p className="font-semibold tracking-tight">CaseFlow</p>
          <p className="text-xs text-fg-3">Website admin</p>
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 px-3" aria-label="Admin">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive ? "bg-royal/10 font-medium text-royal" : "text-fg-2 hover:bg-fg/[0.04] hover:text-fg",
              )
            }
          >
            <n.icon className="h-4 w-4" />
            <span className="flex-1">{n.label}</span>
            {n.to === "/admin/leads" && newCount > 0 && (
              <span className="rounded-full bg-royal px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-white">{newCount}</span>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="space-y-1 border-t hairline p-3">
        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-fg-2 hover:bg-fg/[0.04] hover:text-fg">
          <ExternalLink className="h-4 w-4" /> View website
        </a>
        <button
          type="button"
          onClick={() => void signOut()}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-fg-2 hover:bg-fg/[0.04] hover:text-fg"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
        <p className="truncate px-3 pt-1 text-xs text-fg-3">{session?.user.email}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-ink text-fg">
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r hairline bg-ink-2 lg:block">{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-ink-2 shadow-xl">{sidebar}</aside>
        </div>
      )}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b hairline bg-ink-2/90 px-4 backdrop-blur lg:hidden">
        <button type="button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)} className="-ml-1 p-1.5">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <span className="font-semibold">Website admin</span>
      </header>
      <main className="px-4 py-8 sm:px-8 lg:ml-60 lg:py-10">
        <div className="mx-auto max-w-6xl">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="leads" element={<Leads />} />
            <Route path="pricing" element={<PricingEditor />} />
            <Route path="faqs" element={<FaqEditor />} />
            <Route path="testimonials" element={<TestimonialsEditor />} />
            <Route path="announcement" element={<AnnouncementEditor />} />
            <Route path="settings" element={<SettingsEditor />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
