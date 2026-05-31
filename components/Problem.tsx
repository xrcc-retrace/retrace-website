import { MonoLabel } from "./primitives";

// Inline-cited datum component — lets stats live in prose without a card grid.
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

export function Problem() {
  return (
    <section id="problem" className="relative border-t border-stroke">
      <div className="shell py-24 lg:py-40">
        <div className="grid items-start gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          {/* Editorial column — prose with stats woven in */}
          <div className="max-w-[60ch]">
            <MonoLabel className="text-muted/70">The problem</MonoLabel>
            <h2 className="mt-4 text-balance text-3xl font-light leading-[1.1] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[56px]">
              Your senior technician walks out the door. Decades of judgment
              walk out with him.
            </h2>

            <div className="mt-10 space-y-7 text-pretty text-[17px] leading-[1.7] text-muted lg:text-[18px]">
              <p>
                Half of process knowledge is held in people's heads. Roughly{" "}
                <Datum value="42%" source="McKinsey" /> is tribal, undocumented,
                lost the day they leave. The 600-page service manual that's
                supposed to replace them is exhaustive and unreadable in the
                moment.
              </p>
              <p>Junior technicians inherit the gap anyway.</p>
            </div>

            <ul className="mt-8 flex flex-col">
              {[
                {
                  label: "The Gap",
                  body: (
                    <>
                      <span className="font-semibold text-ink">25%</span> of
                      failed dispatches trace directly to a training gap.
                    </>
                  ),
                },
                {
                  label: "The Cost",
                  body: (
                    <>
                      The average repeat truck roll costs{" "}
                      <span className="font-semibold text-ink">$300</span> in
                      fuel and time, before counting customer downtime.
                    </>
                  ),
                },
                {
                  label: "The Crunch",
                  body: (
                    <>
                      The US manufacturing workforce is{" "}
                      <span className="font-semibold text-ink">44.8</span> years
                      old on average, the oldest it has ever been. By 2033, we
                      face <span className="font-semibold text-ink">3.8M</span>{" "}
                      jobs with roughly half left unfilled.
                    </>
                  ),
                },
              ].map((item) => (
                <li
                  key={item.label}
                  className="grid grid-cols-[88px_1fr] items-baseline gap-5 border-t border-stroke py-5 first:border-t-0 lg:gap-7"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    {item.label}
                  </span>
                  <p className="text-pretty text-[16px] leading-[1.6] text-muted lg:text-[17px]">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Pull quote — single big breath, no boxed callout */}
          <aside className="relative lg:sticky lg:top-32">
            <div
              className="absolute -left-3 top-1 h-12 w-px bg-accent lg:-left-6"
              aria-hidden
            />
            <blockquote className="text-balance text-[26px] font-medium leading-[1.18] tracking-[-0.015em] text-ink lg:text-[32px]">
              Hiring more people won't fix this. The people you'd hire don't
              exist.
              <br />
              <span className="text-muted">
                The only lever left is coaching the ones you have, faster.
              </span>
            </blockquote>
            <div className="mt-8 inline-flex items-center gap-3">
              <span
                className="inline-block h-px w-8 bg-stroke-hi"
                aria-hidden
              />
              <MonoLabel>The Retrace thesis</MonoLabel>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
