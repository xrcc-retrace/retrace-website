import { MonoLabel } from "./primitives";
import { SplineRobot } from "./SplineRobot";

const labs = [
  {
    name: "Figure",
    funding: "$675M Series B",
    valuation: "$2.6B (Feb '24)",
    note: "OpenAI partnership",
  },
  {
    name: "1X",
    funding: "$100M Series B",
    valuation: "NVIDIA-backed",
    note: "NEO Beta",
  },
  {
    name: "Tesla Optimus",
    funding: "Mass-production goal",
    valuation: "Public co.",
    note: "Trained on egocentric video",
  },
  {
    name: "Physical Intelligence",
    funding: "$400M",
    valuation: "$2.4B (Nov '24)",
    note: "π0 foundation model",
  },
  {
    name: "Skild AI",
    funding: "$300M",
    valuation: "$1.5B (Jul '24)",
    note: "General-purpose robot brain",
  },
];


export function HumanoidArc() {
  return (
    <section
      id="humanoid-arc"
      className="relative border-t border-stroke bg-[#0A0B0D]"
    >
      {/* Opener */}
      <div className="shell py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Left — copy */}
          <div>
            <h2 className="text-balance text-3xl font-light leading-[1.1] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[56px]">
              AI copilot for technicians today.
              <br />
              <span className="text-accent">
                Training corpus for humanoids tomorrow.
              </span>
            </h2>
            <p className="mt-9 text-pretty text-[17px] leading-[1.7] text-muted lg:text-[18px]">
              Frontier robotics labs do not have a funding problem; they have a
              data problem. To train humanoid robots to do actual industrial
              work, they need first-person video of real tradespeople explaining
              what they are doing. Today, that data is incredibly scarce because
              most internet video only shows simple household chores.
            </p>
            <p className="mt-5 text-pretty text-[17px] leading-[1.7] text-muted lg:text-[18px]">
              By helping human technicians complete their work today, Retrace
              naturally captures the specialized, step-by-step data that the
              world's most advanced robotics programs are waiting for.
            </p>
          </div>

          {/* Right — cursor-following 3D robot */}
          <div className="relative h-[380px] overflow-hidden rounded-lg bg-[#0A0B0D] sm:h-[440px] lg:h-[520px]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
            />
            <SplineRobot className="absolute inset-0 h-full w-full" />
          </div>
        </div>

        {/* Labs strip — full-width under the opener, matching content width */}
        <div className="mt-16 lg:mt-20">
          <MonoLabel className="text-muted/70">
            The data-starved labs
          </MonoLabel>
          <div className="mt-7 grid gap-px overflow-hidden border border-stroke bg-stroke sm:grid-cols-2 lg:grid-cols-5">
            {labs.map((l) => (
              <div
                key={l.name}
                className="flex flex-col gap-2 bg-canvas px-5 py-6 lg:px-6 lg:py-7"
              >
                <div className="text-[17px] font-semibold tracking-tight text-ink">
                  {l.name}
                </div>
                <div className="font-mono text-[12px] tracking-tight text-accent">
                  {l.funding}
                </div>
                <div className="font-mono text-[11px] tracking-tight text-muted">
                  {l.valuation}
                </div>
                <div className="mt-auto pt-3 text-[12.5px] leading-snug text-muted">
                  {l.note}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-7 max-w-2xl text-[13.5px] leading-relaxed text-muted">
            <span className="text-ink font-semibold">Over $1.4B</span> raised in 18
            months across 5 frontier humanoid programmes. All on the promise of robots that can do useful physical work.
            <span className="text-ink font-semibold">The bottleneck is the same: they are starved for useful data.</span> 
          </p>
        </div>
      </div>
    </section>
  );
}
