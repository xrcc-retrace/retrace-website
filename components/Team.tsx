import { Id, SectionHeader } from "./primitives";
import { TEAM } from "@/lib/links";

const BIOS: Record<(typeof TEAM)[number]["name"], React.ReactNode> = {
  "Hyunseok Hwang": (
    <>
      FastAPI server and all Gemini orchestration: structured extraction on
      2.5 Pro, the Flash verification oracle, ephemeral-token minting for
      Live, the troubleshoot mode with grounded web research, and the expert
      interviewer&apos;s planner and policy.
    </>
  ),
  "Arthur Lee": (
    <>
      Product design and the SwiftUI app end to end: the direct Gemini Live
      client (<Id>GeminiLiveService</Id>), both capture transports on the
      Meta DAT SDK and iPhone, the Ray-Ban HUD design system, onboarding, and
      the demo film.
    </>
  ),
};

export function Team() {
  return (
    <section id="team" className="border-t border-stroke bg-surface/20">
      <div className="shell py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeader
            title="Two people, the whole stack."
            lede={
              <>
                Started at a hackathon in Berlin, then kept going. One
                owns the server and the models; one owns the phone, the
                glasses and the design.
              </>
            }
          />
          <ul className="divide-y divide-stroke border-y border-stroke">
            {TEAM.map((m) => (
              <li key={m.name} className="grid gap-4 py-7 sm:grid-cols-[1fr_auto] sm:gap-8">
                <div className="min-w-0">
                  <h3 className="text-[20px] font-medium tracking-[-0.015em] text-ink">
                    {m.name}
                  </h3>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    {m.role}
                  </div>
                  <p className="mt-3 max-w-[40rem] text-[15px] leading-[1.6] text-muted">
                    {BIOS[m.name]}
                  </p>
                </div>
                <div className="flex gap-5 text-[14px] sm:flex-col sm:gap-2 sm:pt-1 sm:text-right">
                  <a
                    href={m.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink underline decoration-stroke-hi underline-offset-4 hover:decoration-ink"
                  >
                    GitHub
                  </a>
                  {/* TODO(pm): LinkedIn URL — set in lib/links.ts; renders as pending until then */}
                  {m.linkedin ? (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted underline decoration-stroke underline-offset-4 hover:text-ink"
                    >
                      LinkedIn
                    </a>
                  ) : (
                    <span className="text-muted/50" aria-label="LinkedIn link pending">
                      LinkedIn · soon
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
