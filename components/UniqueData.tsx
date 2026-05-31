import { MonoLabel } from "./primitives";

const differentiators = [
  {
    title: "First-person POV.",
    body: "Same camera the humanoids will use. Ego4D had to convince 855 strangers to wear cameras around. Retrace's data comes from technicians whose existing capture habit is on-glasses or in-phone.",
  },
  {
    title: "Synchronized speech.",
    body: "Narrated demos with timestamped transcripts. Most egocentric corpora are silent video. Narration grounds intent and procedure.",
  },
  {
    title: "Tool-call ground-truth.",
    body: "Explicit advance_step segmentation on completion criteria. Explicit task boundaries are rare in public datasets and gold for downstream RL.",
  },
  {
    title: "Paired attempts.",
    body: "Expert demo + every learner attempt of the same task. Positive and negative samples paired by procedure. The kind of contrastive data RT-2 and π0 wish they had.",
  },
  {
    title: "Industrial verticals.",
    body: "Field service, OEM equipment, skilled trades. Exactly where Ego4D leans thin. The work humanoids will eventually be sold into.",
  },
];

export function UniqueData() {
  return (
    <section id="unique-data" className="border-t border-stroke">
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
    </section>
  );
}
