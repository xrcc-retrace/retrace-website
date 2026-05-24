import { Cta, MonoLabel } from "./primitives";

const TESTFLIGHT_URL = "https://testflight.apple.com/join/3wSB8VEu";
const EMAILS = ["jacogoby@gmail.com", "ykarthurlee@gmail.com"];

const members = [
  {
    name: "Hyunseok Hwang",
    role: "Backend · AI systems",
    bio: "FastAPI server, Gemini orchestration (2.5 Pro + 3.1 Live), structured-output extraction, ephemeral tokens, troubleshoot mode, web-grounded search.",
  },
  {
    name: "Arthur Lee",
    role: "Design · iOS · XR",
    bio: "Design across the entire Retrace including SwiftUI app, Ray-Ban HUD design system. Content and storytelling as well.",
  },
];

export function Team() {
  return (
    <section
      id="team"
      className="relative border-t border-stroke bg-surface/20"
    >
      <div className="shell py-24 lg:py-40">
        <div className="grid items-start gap-16 lg:grid-cols-[3fr_2fr] lg:gap-24">
          {/* Team column */}
          <div>
            <MonoLabel className="text-muted/70">Two builders</MonoLabel>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[44px]">
              Full-stack, end-to-end.
            </h2>
            <p className="mt-5 max-w-md text-pretty text-[16.5px] leading-[1.65] text-muted">
              Backend / AI + iOS / XR. One real shipped product in four weeks.
            </p>

            <ul className="mt-12 space-y-9">
              {members.map((m) => (
                <li
                  key={m.name}
                  className="grid grid-cols-[auto_1fr] gap-5 border-t border-stroke pt-7"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke-hi font-mono text-sm text-ink">
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[17px] font-semibold tracking-tight text-ink">
                      {m.name}
                    </div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      {m.role}
                    </div>
                    <p className="mt-3 text-[14.5px] leading-[1.6] text-muted">
                      {m.bio}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Close + CTA column */}
          <aside className="lg:sticky lg:top-32 lg:pt-1">
            <blockquote className="text-balance text-2xl font-medium leading-[1.18] tracking-[-0.012em] text-ink lg:text-[28px]">
              AI copilot for technicians today.
              <br />
              <span className="text-muted">
                Training humanoids tomorrow.
              </span>
            </blockquote>
            <p className="mt-6 text-[15px] leading-[1.6] text-muted">
              Try Retrace on TestFlight. Or talk to us about industrial pilots.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3">
              <Cta href={TESTFLIGHT_URL} external variant="primary">
                Install on TestFlight
                <span aria-hidden>→</span>
              </Cta>
              <div className="flex flex-col gap-1">
                {EMAILS.map((e) => (
                  <a
                    key={e}
                    href={`mailto:${e}`}
                    className="font-mono text-[12.5px] tracking-tight text-muted transition-colors hover:text-ink"
                  >
                    {e}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
