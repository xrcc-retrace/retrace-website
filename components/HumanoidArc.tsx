import { MonoLabel } from "./primitives";
import { SplineRobot } from "./SplineRobot";

// Inline-cited datum — same pattern as Problem.tsx, kept local to avoid
// importing across components.
function Datum({ value, source }: { value: string; source: string }) {
  return (
    <span className="whitespace-nowrap">
      <span className="font-semibold text-ink">{value}</span>
      <span className="ml-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted/70">
        {source}
      </span>
    </span>
  );
}

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
      className="relative border-t border-stroke bg-surface/15"
    >
      {/* Opener */}
      <div className="shell py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Left — copy */}
          <div>
            <MonoLabel className="text-muted/70">The longer arc</MonoLabel>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.06] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[56px]">
              AI copilot for technicians today.
              <br />
              <span className="text-accent">
                Training corpus for humanoids tomorrow.
              </span>
            </h2>
            <p className="mt-9 text-pretty text-[17px] leading-[1.7] text-muted lg:text-[18px]">
              Robotics labs aren't compute-starved. They're data-starved. The
              humanoid wave needs first-person video of humans doing useful
              work, paired with speech and task-completion ground truth. That's
              scarce. Most of what exists is consumer or household.
            </p>
            <p className="mt-5 text-pretty text-[17px] leading-[1.7] text-muted lg:text-[18px]">
              The public benchmarks tell the story.{" "}
              <Datum value="3,670 hrs" source="Ego4D · Meta '22" /> of egocentric
              video across 9 countries.{" "}
              <Datum value="1,422 hrs" source="Ego-Exo4D · Meta '23" /> of paired
              first-person + third-person footage.{" "}
              <Datum value="76K demos" source="DROID · Stanford '24" /> of robot
              manipulation across 86 tasks.{" "}
              <Datum value="1M+ episodes" source="Open X-Embodiment · DeepMind '23" />{" "}
              spanning 22 different embodiments. All landmark releases. None
              indexed by industrial procedure, none paired with expert
              narration, none capturing the long tail of skilled-trade tasks
              that pay the labs' bills.
            </p>
          </div>

          {/* Right — cursor-following 3D robot */}
          <div className="relative h-[380px] overflow-hidden rounded-lg bg-canvas sm:h-[440px] lg:h-[520px]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
            />
            <SplineRobot className="absolute inset-0 h-full w-full" />
          </div>
        </div>
      </div>

      {/* Labs strip */}
      <div className="border-t border-stroke">
        <div className="shell py-16 lg:py-20">
          <MonoLabel className="text-muted/70">
            The data-starved labs · cumulative funding
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
            Combined Series-B+ funding across the five frontier humanoid
            programs: <span className="text-ink">over $1.4B</span> raised in 18
            months on the promise of robots that can do useful physical work.
            The bottleneck is the same in every deck.
          </p>
        </div>
      </div>

      {/* Closing line */}
      <div className="border-t border-stroke">
        <div className="shell py-20 lg:py-28">
          <p className="max-w-3xl text-balance text-2xl font-medium leading-[1.18] tracking-[-0.015em] text-ink lg:text-[34px]">
            Same data, two markets.{" "}
            <span className="text-muted">
              AI copilot today. Training corpus tomorrow.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
