import { MonoLabel } from "./primitives";

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

const differentiators = [
  {
    title: "First-person POV.",
    body: "Same camera the humanoids will use. Ego4D had to convince 855 strangers to wear cameras around — Retrace's data comes from technicians whose existing capture habit is on-glasses or in-phone.",
  },
  {
    title: "Synchronized speech.",
    body: "Narrated demos with timestamped transcripts. Most egocentric corpora are silent video — narration grounds intent and procedure.",
  },
  {
    title: "Tool-call ground-truth.",
    body: "Explicit advance_step segmentation on completion criteria — explicit task boundaries are rare in public datasets and gold for downstream RL.",
  },
  {
    title: "Paired attempts.",
    body: "Expert demo + every learner attempt of the same task. Positive and negative samples paired by procedure — the kind of contrastive data RT-2 and π0 wish they had.",
  },
  {
    title: "Industrial verticals.",
    body: "Field service, OEM equipment, skilled trades — exactly where Ego4D leans thin. The work humanoids will eventually be sold into.",
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
        <div className="max-w-4xl">
          <MonoLabel className="text-muted/70">The longer arc</MonoLabel>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.06] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[56px]">
            AI copilot for technicians today.
            <br />
            <span className="text-accent">
              Training corpus for humanoids tomorrow.
            </span>
          </h2>
          <p className="mt-9 max-w-3xl text-pretty text-[17px] leading-[1.7] text-muted lg:text-[18px]">
            Robotics labs aren't compute-starved — they're data-starved. The
            humanoid wave needs first-person video of humans doing useful
            work, paired with speech and task-completion ground truth. That's
            scarce. Most of what exists is consumer or household.
          </p>
          <p className="mt-5 max-w-3xl text-pretty text-[17px] leading-[1.7] text-muted lg:text-[18px]">
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

      {/* Differentiators */}
      <div className="border-t border-stroke">
        <div className="shell py-24 lg:py-32">
          <div className="grid items-start gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
            <div className="lg:sticky lg:top-32">
              <MonoLabel className="text-muted/70">
                What Retrace's data is, that nobody else's is
              </MonoLabel>
              <h3 className="mt-4 text-balance text-2xl font-semibold leading-[1.15] tracking-[-0.018em] text-ink lg:text-[32px]">
                Five attributes the public corpora don't have together.
              </h3>
            </div>

            <ol className="flex flex-col">
              {differentiators.map((d, i) => (
                <li
                  key={d.title}
                  className="grid grid-cols-[40px_1fr] items-start gap-5 border-t border-stroke py-7 first:border-t-0 lg:gap-7 lg:py-8"
                >
                  <span className="pt-1 font-mono text-[11px] tracking-[0.16em] text-muted/60">
                    0{i + 1}
                  </span>
                  <div>
                    <div className="text-[18px] font-semibold tracking-tight text-ink lg:text-[20px]">
                      {d.title}
                    </div>
                    <p className="mt-2 text-pretty text-[15px] leading-[1.65] text-muted lg:text-[16px]">
                      {d.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
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
