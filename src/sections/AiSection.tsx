import { useEffect, useRef, useState } from "react";
import { Sparkles, Camera, ArrowUp } from "lucide-react";
import { Phone, shot } from "@/components/Phone";
import { ScrollTrigger, prefersReducedMotion, useReveal } from "@/lib/motion";

const QUESTION = "What is the time limit to file a Section 138 NI Act complaint?";
const ANSWER =
  "One month from the date the cause of action arises — that is, from the day the 15 days given in the demand notice run out without payment (Section 142(1)(b)). A later complaint can still be taken on file if you show sufficient cause for the delay.";

/** Types the answer out once the card scrolls into view. */
function useTypewriter(text: string, start: boolean) {
  const [n, setN] = useState(prefersReducedMotion() ? text.length : 0);
  useEffect(() => {
    if (!start || n >= text.length) return;
    const id = window.setTimeout(() => setN((v) => Math.min(text.length, v + 2)), 16);
    return () => window.clearTimeout(id);
  }, [start, n, text.length]);
  return text.slice(0, n);
}

export function AiSection() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  useReveal(root);

  useEffect(() => {
    if (!card.current) return;
    const st = ScrollTrigger.create({
      trigger: card.current,
      start: "top 70%",
      once: true,
      onEnter: () => window.setTimeout(() => setStarted(true), 700),
    });
    return () => st.kill();
  }, []);

  const typed = useTypewriter(ANSWER, started);
  const done = typed.length === ANSWER.length;

  return (
    <section ref={root} className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-[-10rem] top-1/2 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-violet/20 blur-3xl" />
      </div>
      <div className="container grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div data-reveal>
            <p className="eyebrow inline-flex items-center gap-2 text-sky">
              <Sparkles className="h-3.5 w-3.5" /> CaseFlow AI
            </p>
            <h2 className="display mt-4 text-[clamp(2.2rem,5vw,3.8rem)]">
              A research junior <span className="accent-serif text-aurora">who never sleeps.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-2">
              Ask about any provision, procedure or limitation. Photograph an order, an FIR or a notice and ask what it
              says. Your questions stay in your history, ready to share with your team.
            </p>
          </div>

          {/* the conversation */}
          <div ref={card} data-reveal className="mt-10 max-w-xl rounded-3xl surface p-5 glow-ring">
            <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-royal px-4 py-3 text-[15px] leading-relaxed text-white">
              {QUESTION}
            </div>
            <div className="mt-4 flex gap-3">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sky to-violet">
                <Sparkles className="h-4 w-4 text-white" />
              </span>
              <p className="min-h-[7.5rem] text-[15px] leading-relaxed text-fg" aria-live="polite">
                {typed}
                {!done && <span className="caret ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-sky" />}
              </p>
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-full border hairline bg-ink/60 py-1.5 pl-4 pr-1.5">
              <Camera className="h-4 w-4 text-fg-3" />
              <span className="flex-1 truncate text-sm text-fg-3">Ask about Indian law…</span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-royal">
                <ArrowUp className="h-4 w-4 text-white" />
              </span>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-xs leading-relaxed text-fg-3">
            AI answers are a fast starting point, not legal advice. Verify before you rely on them.
          </p>
        </div>

        <div className="relative mx-auto w-[270px] md:w-[310px]" data-reveal>
          <div className="pointer-events-none absolute -inset-20 -z-10 rounded-full bg-gradient-to-tr from-sky/25 via-violet/20 to-transparent blur-3xl" />
          <Phone src={shot("ai")} alt="The CaseFlow AI screen with suggested questions" />
        </div>
      </div>
    </section>
  );
}
