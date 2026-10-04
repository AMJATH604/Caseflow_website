import { useRef } from "react";
import { BadgeCheck, Bell, CalendarDays, IndianRupee, Users, Vote } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Phone, shot } from "@/components/Phone";
import { LeadForm } from "@/components/LeadForm";
import { usePageTitle } from "@/components/SiteLayout";
import { formatRupees, useContent } from "@/lib/content";
import { useReveal } from "@/lib/motion";

const POINTS = [
  { icon: BadgeCheck, title: "Digital membership cards", body: "Enrolment number, membership type and validity — on every member's phone." },
  { icon: IndianRupee, title: "Annual fee status", body: "Who has paid for the year and who hasn't, at a glance." },
  { icon: Bell, title: "Notices that arrive", body: "Post a notice and it reaches every member as a notification, not a photo lost in a group chat." },
  { icon: CalendarDays, title: "Events", body: "Association meetings and programmes, with the details in one place." },
  { icon: Vote, title: "Elections", body: "Run the association's elections from inside the app." },
  { icon: Users, title: "Members", body: "Everyone who belongs to the association, in one list." },
];

export default function BarPage() {
  usePageTitle("Bar Associations");
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  const { pricing } = useContent();
  const bar = pricing.find((p) => p.id === "bar");

  return (
    <>
      <PageHeader
        eyebrow="Bar associations"
        title="The association office,"
        accent="in every member's pocket."
        intro="CaseFlow gives your bar association a home inside the app your members already open every morning for their cases."
      />
      <div ref={root}>
        <section className="container grid items-center gap-14 pb-20 md:grid-cols-[1fr_300px]">
          <div data-reveal="stagger" className="grid gap-4 sm:grid-cols-2">
            {POINTS.map((p) => (
              <div key={p.title} className="rounded-3xl surface p-6">
                <p.icon className="h-5 w-5 text-gold" />
                <h2 className="mt-4 font-semibold">{p.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto w-[240px] md:w-full" data-reveal>
            <Phone src={shot("bar-association")} alt="My Bar screen with membership card and quick actions" />
          </div>
        </section>

        <section className="container grid gap-12 pb-28 lg:grid-cols-[1fr_1.4fr]">
          <div data-reveal>
            <p className="eyebrow">For the association</p>
            {bar && (
              <p className="mt-4 flex items-baseline gap-2">
                <span className="display text-6xl tabular-nums">{formatRupees(bar.price)}</span>
                <span className="text-fg-3">{bar.period}</span>
              </p>
            )}
            <p className="mt-4 max-w-sm leading-relaxed text-fg-2">
              One subscription for the whole association, set up with you by the CaseFlow team.
            </p>
            {bar && (
              <ul className="mt-6 space-y-2 text-sm text-fg-2">
                {bar.features.map((f) => (
                  <li key={f}>— {f}</li>
                ))}
              </ul>
            )}
          </div>
          <div data-reveal>
            <LeadForm kind="bar" plan={bar?.name} />
          </div>
        </section>
      </div>
    </>
  );
}
