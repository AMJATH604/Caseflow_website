import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Phone, shot } from "@/components/Phone";
import { ScrollTrigger, gsap, useGsap } from "@/lib/motion";

/*
 * The signature section: one advocate's working day. On wide screens the
 * phone stays pinned while the day scrolls past it and its screen changes
 * with each hour. On phones each hour carries its own screenshot.
 */
const DAY = [
  {
    time: "08:30",
    title: "The morning brief",
    body: "Open the app to today's hearings, the dates coming up, your active cases and clients — before you leave for court.",
    shot: "home",
    alt: "CaseFlow home with active cases, today's and upcoming hearings",
  },
  {
    time: "09:15",
    title: "The court diary",
    body: "A month at a glance with every hearing marked in red. Tap a date and the day's board opens.",
    shot: "diary",
    alt: "Court Diary month view with hearing markers",
  },
  {
    time: "10:40",
    title: "In the courtroom",
    body: "The whole dossier on one screen: parties, case number, CNR, court, stage and the next date of hearing.",
    shot: "dossier-details",
    alt: "Case dossier with case details and case status",
  },
  {
    time: "11:20",
    title: "Adjourned",
    body: "Record the next date in seconds. The diary moves, and reminders reach you and your team before it comes round.",
    shot: "schedule",
    alt: "Court Schedule calendar",
  },
  {
    time: "14:00",
    title: "Back in chambers",
    body: "Court fee, limitation, condonation of delay, interest — worked out the same way every time, not on the back of a file.",
    shot: "court-fee",
    alt: "Court fee calculator showing the 2017 amendment and the 1955 Act side by side",
  },
  {
    time: "16:30",
    title: "Research",
    body: "Ask CaseFlow AI about Indian law, or send it a photo of an order or an FIR and ask what it says.",
    shot: "ai",
    alt: "CaseFlow AI legal assistant",
  },
  {
    time: "19:00",
    title: "Accounts",
    body: "Agreed fee, received, expenses and what is yet to come — for every client, in one ledger.",
    shot: "ledger",
    alt: "Financial Ledger with per-client fee tracking",
  },
  {
    time: "21:00",
    title: "Tomorrow's board",
    body: "Your juniors and clerks are in Digital Chambers. Tomorrow's matters are already sorted.",
    shot: "chambers",
    alt: "Digital Chambers team chat",
  },
];

export function DayInCourt() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Which hour is in view. Not an animation, so it runs for everyone,
  // including visitors who prefer reduced motion.
  useEffect(() => {
    const els = root.current?.querySelectorAll<HTMLElement>("[data-step]") ?? [];
    const triggers = Array.from(els).map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => self.isActive && setActive(i),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  useGsap(root, () => {
    gsap.fromTo(
      "[data-day-progress]",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: "[data-day-list]", start: "top 55%", end: "bottom 55%", scrub: true },
      },
    );
  });

  return (
    <section id="day" ref={root} className="relative pt-12 pb-24 md:pt-16 md:pb-32">
      <div className="container">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow text-gold">A day with CaseFlow</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,5.4vw,4rem)]">
            From the morning brief <span className="accent-serif text-fg-2">to tomorrow's board.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_minmax(0,380px)] md:gap-16 lg:grid-cols-[1fr_420px]">
          {/* the hours */}
          <ol data-day-list className="relative">
            <div className="absolute left-[4.26rem] top-2 bottom-2 hidden w-px bg-fg/10 md:block" aria-hidden>
              <div data-day-progress className="h-full w-full origin-top bg-gradient-to-b from-gold via-royal to-violet" />
            </div>
            {DAY.map((d, i) => (
              <li
                key={d.time}
                data-step
                className={clsx(
                  "relative grid grid-cols-[4.5rem_1fr] gap-4 py-8 transition-opacity duration-500 md:min-h-[62vh] md:items-center md:py-0",
                  i === active ? "md:opacity-100" : "md:opacity-35",
                )}
              >
                <time className="pt-1 font-mono text-sm tabular-nums text-gold md:pt-0">{d.time}</time>
                <div className="relative">
                  <span
                    aria-hidden
                    className={clsx(
                      "absolute -left-[1.55rem] top-2 hidden h-2.5 w-2.5 rounded-full ring-4 ring-ink transition-colors md:block",
                      i <= active ? "bg-gold" : "bg-fg/20",
                    )}
                  />
                  <h3 className="text-2xl font-semibold tracking-tight md:text-[2rem]">{d.title}</h3>
                  <p className="mt-3 max-w-md text-[17px] leading-relaxed text-fg-2">{d.body}</p>
                  {/* phones: each hour shows its own screen */}
                  <div className="mt-8 w-[220px] md:hidden">
                    <Phone src={shot(d.shot)} alt={d.alt} />
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* the pinned phone (wide screens) */}
          <div className="hidden md:block">
            <div className="sticky top-0 flex h-screen items-center justify-center pt-10">
              <div className="relative mx-auto" style={{ width: "min(340px, calc((100vh - 190px) * 0.481))" }}>
                <div className="pointer-events-none absolute -inset-16 -z-10 rounded-full bg-royal/25 blur-3xl" />
                <Phone alt="">
                  {DAY.map((d, i) => (
                    <img
                      key={d.shot}
                      src={shot(d.shot)}
                      alt={i === active ? d.alt : ""}
                      aria-hidden={i !== active}
                      loading={i < 2 ? "eager" : "lazy"}
                      className={clsx(
                        "absolute inset-0 h-full w-full object-cover object-top transition-[opacity,transform] duration-700 ease-out",
                        i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]",
                      )}
                    />
                  ))}
                </Phone>
                <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.18em] text-fg-3">
                  <span className="text-gold">{DAY[active].time}</span> · {DAY[active].title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
