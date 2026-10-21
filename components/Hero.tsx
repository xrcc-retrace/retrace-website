import { HeroVideo } from "./HeroVideo";
import { Cta } from "./primitives";
import { TRAILER_URL } from "@/lib/links";

// Wire events in the order they happen in one coaching session. Names are the
// real Gemini Live message keys (GeminiLiveService.swift) and the real server
// endpoint (routers/learner.py). Oracle-path lines carry the accent.
const LOG: { t: string; key: string; detail: string; oracle?: boolean }[] = [
  { t: "00:00.0", key: "setupComplete", detail: "config baked into the ephemeral token" },
  { t: "00:00.4", key: "realtimeInput.audio", detail: "mic → Gemini Live, continuous" },
  { t: "00:01.0", key: "realtimeInput.video", detail: "image/jpeg · ~1 fps" },
  { t: "00:04.0", key: "POST /verify", detail: "mode=poll → pending", oracle: true },
  { t: "00:08.0", key: "POST /verify", detail: "mode=poll → advanced · method: visual", oracle: true },
  { t: "00:08.1", key: "realtimeInput.text", detail: "[ADVANCE] next step injected", oracle: true },
  { t: "00:08.6", key: "serverContent.modelTurn", detail: "“That's it. Next, thread the anvil nut…”" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(ellipse_at_18%_0%,rgba(255,194,28,0.09),transparent_55%)]"
      />
      <div className="shell relative grid items-center gap-12 pb-20 pt-28 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:pb-28 lg:pt-36">
        <div className="max-w-[34rem]">
          <h1 className="text-balance text-[38px] font-medium leading-[1.02] tracking-[-0.035em] text-ink sm:text-[52px] lg:text-[60px]">
            Record an expert once. Coach every learner forever.
          </h1>
          <p className="mt-6 max-w-[32rem] text-pretty text-[17px] leading-[1.6] text-muted lg:text-[18px]">
            Retrace turns one expert video into a step-by-step procedure, then
            coaches a learner through it by voice while a second model checks
            the camera for each step&apos;s end-state. The voice model never
            decides a step is done; the verifier does.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Cta href="#architecture">See how it works</Cta>
            <a
              href={TRAILER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-muted underline decoration-stroke-hi underline-offset-4 transition-colors hover:text-ink"
            >
              Watch the demo film
            </a>
          </div>
        </div>

        {/* The demo: learner's camera plus the wire log of the same session. */}
        <div className="min-w-0 overflow-hidden rounded-[12px] border border-stroke bg-surface/50">
          <div className="relative aspect-[4/3] w-full bg-canvas">
            <HeroVideo />
            <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-[4px] bg-canvas/80 px-2 py-1 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink">
                Coaching session · iPhone transport
              </span>
            </div>
          </div>
          <ol className="border-t border-stroke px-4 py-3 font-mono text-[11.5px] leading-[1.5] sm:text-[12px]">
            {LOG.map((l, i) => (
              <li
                key={i}
                className="log-line grid grid-cols-[56px_1fr] gap-x-3 py-[3px] sm:grid-cols-[60px_190px_1fr]"
                style={{ "--delay": `${300 + i * 220}ms` } as React.CSSProperties}
              >
                <span className="text-muted/60 tabular-nums">{l.t}</span>
                <span className={`truncate ${l.oracle ? "text-accent" : "text-ink"}`}>
                  {l.key}
                </span>
                <span className="col-span-2 truncate pl-[68px] text-muted sm:col-span-1 sm:pl-0">
                  {l.detail}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
