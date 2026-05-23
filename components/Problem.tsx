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
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[44px]">
              Your senior technician walks out the door — and decades of
              judgment walks out with him.
            </h2>

            <div className="mt-10 space-y-7 text-pretty text-[17px] leading-[1.7] text-muted lg:text-[18px]">
              <p>
                Half of process knowledge is held in people's heads. Roughly{" "}
                <Datum value="42%" source="McKinsey" /> is tribal —
                undocumented, lost the day they leave. The 600-page service
                manual that's supposed to replace them is exhaustive and
                unreadable in the moment.
              </p>
              <p>
                Junior technicians inherit it anyway. About{" "}
                <Datum value="25%" source="Aberdeen" /> of failed dispatches
                trace directly to a training gap — and the average repeat truck
                roll costs <Datum value="$200–300" source="Industry avg" /> in
                fuel and time before you count the customer's downtime.
              </p>
              <p>
                Hiring more people would be the obvious answer, except the
                people aren't there. The US manufacturing workforce is{" "}
                <Datum value="44.8" source="BLS" /> years old on average — the
                oldest it has ever been —  and faces{" "}
                <Datum value="3.8M" source="Deloitte / MI" /> jobs by 2033 with
                roughly half unfilled. Germany alone is short{" "}
                <Datum value="5M" source="IW Köln" /> skilled workers by 2030.
              </p>
            </div>
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
                The only lever left is coaching the ones you have — faster.
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
