import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { GetAppButton, Logo } from "./Brand";
import { useContent } from "@/lib/content";

const LINKS = [
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/bar-associations", label: "Bar Associations" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { announcement } = useContent();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const showBar = announcement.active && announcement.text.trim() !== "";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {showBar && (
        <div className="bg-royal text-white text-[13px]">
          <div className="container flex h-9 items-center justify-center gap-2 text-center">
            <span className="truncate">{announcement.text}</span>
            {announcement.linkUrl && (
              <a href={announcement.linkUrl} className="shrink-0 font-medium underline underline-offset-4">
                {announcement.linkLabel || "Learn more"}
              </a>
            )}
          </div>
        </div>
      )}
      <div
        className={clsx(
          "transition-[background-color,border-color,backdrop-filter] duration-300 border-b",
          scrolled || open ? "bg-ink/70 backdrop-blur-xl hairline" : "border-transparent",
        )}
      >
        <nav className="container flex h-16 items-center justify-between" aria-label="Main">
          <Link to="/" aria-label="CaseFlow home">
            <Logo />
          </Link>
          <ul className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    clsx(
                      "rounded-full px-3.5 py-2 text-sm transition-colors",
                      isActive ? "text-fg bg-fg/[0.06]" : "text-fg-2 hover:text-fg",
                    )
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="hidden md:block">
            <GetAppButton className="btn-primary h-9 px-4" />
          </div>
          <button
            type="button"
            className="md:hidden -mr-2 p-2 text-fg"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
        {open && (
          <div className="md:hidden container pb-6">
            <ul className="flex flex-col border-t hairline pt-2">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className="block py-3 text-lg text-fg">
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <GetAppButton className="btn-primary mt-4 w-full" />
          </div>
        )}
      </div>
    </header>
  );
}
