import { MonoLabel } from "../primitives";
import { DEMO_PROCEDURE } from "@/lib/procedure";

export function CapturePanel() {
  return (
    <div className="border-t border-stroke">
      <div className="shell grid items-center gap-12 py-24 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:py-32">
        {/* Label column (left) */}
        <div className="flex flex-col">
          <div className="font-mono text-[11px] tracking-[0.2em] text-muted">
            01 / CAPTURE
          </div>
          <h3 className="mt-6 text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-4xl lg:text-[44px]">
            One expert.
            <br />
            <span className="text-muted">One narrated demo.</span>
          </h3>
          <p className="mt-7 max-w-md text-pretty text-[16px] leading-[1.6] text-muted lg:text-[17px]">
            Wear the glasses or hold up the iPhone. Talk through the task once.
            Gemini 2.5 Pro structures it into ordered steps with per-step
            completion criteria. ffmpeg clips each step automatically.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <span
              className="inline-block h-px w-6 bg-accent"
              aria-hidden
            />
            <MonoLabel className="text-accent">
              Gemini 2.5 Pro · structured output
            </MonoLabel>
          </div>
        </div>

        {/* Demo column (right) — recording + SOP, larger than hero */}
        <div className="relative">
          <div className="grid grid-cols-[1.05fr_1fr] gap-3 rounded-[14px] border border-stroke bg-surface/40 p-3">
            <div className="relative overflow-hidden rounded-[8px] border border-stroke bg-canvas">
              <div className="aspect-[10/13] w-full">
                <video
                  muted
                  playsInline
                  loop
                  autoPlay
                  poster="/video/expert-demo-poster.jpg"
                  preload="metadata"
                  className="h-full w-full object-cover opacity-95"
                  aria-hidden
                >
                  <source src="/video/expert-demo.webm" type="video/webm" />
                  <source src="/video/expert-demo.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-[4px] bg-canvas/80 px-2 py-1 backdrop-blur">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--destructive)]"
                  aria-hidden
                />
                <MonoLabel className="text-ink">REC · 00:07</MonoLabel>
              </div>
            </div>
            <div className="flex flex-col rounded-[8px] border border-stroke bg-canvas p-5">
              <MonoLabel>Extracted SOP</MonoLabel>
              <div className="mt-1 mb-4 text-[14.5px] font-semibold leading-snug text-ink">
                {DEMO_PROCEDURE.title}
              </div>
              <ol className="flex flex-1 flex-col">
                {DEMO_PROCEDURE.steps.slice(0, 5).map((s) => (
                  <li
                    key={s.index}
                    className="grid grid-cols-[28px_1fr] items-start gap-3 border-t border-stroke py-2.5 first:border-t-0"
                  >
                    <span className="font-mono text-[10px] tracking-[0.14em] text-muted/60">
                      {String(s.index).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] leading-snug text-ink/85">
                      {s.title}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-3 border-t border-stroke pt-3">
                <MonoLabel className="text-accent">
                  ✓ completion criteria
                </MonoLabel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
