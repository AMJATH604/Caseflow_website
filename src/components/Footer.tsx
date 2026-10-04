import { Link } from "react-router-dom";
import { Logo } from "./Brand";
import { useContent } from "@/lib/content";

export function Footer() {
  const { settings } = useContent();
  const socials = [
    { label: "LinkedIn", href: settings.linkedin },
    { label: "Instagram", href: settings.instagram },
    { label: "X", href: settings.x },
    { label: "YouTube", href: settings.youtube },
  ].filter((s) => s.href);

  return (
    <footer className="border-t hairline">
      <div className="container grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-2">
            The practice app for Indian advocates. Made in Tamil Nadu.
          </p>
          {(settings.supportEmail || settings.supportPhone) && (
            <div className="mt-5 space-y-1 text-sm text-fg-2">
              {settings.supportEmail && (
                <a className="block hover:text-fg" href={`mailto:${settings.supportEmail}`}>
                  {settings.supportEmail}
                </a>
              )}
              {settings.supportPhone && (
                <a className="block hover:text-fg" href={`tel:${settings.supportPhone.replace(/\s/g, "")}`}>
                  {settings.supportPhone}
                </a>
              )}
            </div>
          )}
        </div>
        <FooterCol
          title="Product"
          links={[
            { to: "/features", label: "Features" },
            { to: "/pricing", label: "Pricing" },
            { to: "/bar-associations", label: "Bar Associations" },
            { to: "/contact?kind=download", label: "Get the app" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { to: "/contact", label: "Contact" },
            { to: "/contact?kind=demo", label: "Book a demo" },
            { to: "/privacy", label: "Privacy policy" },
          ]}
        />
        {socials.length > 0 ? (
          <div>
            <h3 className="eyebrow">Follow</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="text-fg-2 hover:text-fg">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className="container flex flex-col gap-2 border-t hairline py-6 text-xs text-fg-3 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} CaseFlow. All rights reserved.</span>
        <span>CaseFlow is a tool for advocates; it does not give legal advice.</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h3 className="eyebrow">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-fg-2 hover:text-fg">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
