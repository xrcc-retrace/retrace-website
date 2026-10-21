// "After the hackathon" band. Every fact here is supplied by the PM; the
// copy below is placeholder and is marked as such in the rendered UI.
// TODO(pm): replace every `[PM: fill in]` string before merge.

const FACTS: { label: string; text: string }[] = [
  {
    label: "Summer version",
    // TODO(pm): what the summer product version added (one or two sentences)
    text: "[PM: fill in] What the summer 2026 version added on top of the hackathon build.",
  },
  {
    label: "Pilots",
    // TODO(pm): anonymised pilot count + segment (HVAC / electrical contractors)
    text: "[PM: fill in] Pilots with N HVAC and electrical contractors.",
  },
  {
    label: "Outcome",
    // TODO(pm): one outcome line, dated and sourced
    text: "[PM: fill in] One outcome line from the pilots.",
  },
];

export function AfterHackathon() {
  return (
    <section id="after" className="border-t border-stroke bg-surface/30">
      <div className="shell py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <time
              dateTime="2026-06"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted"
            >
              Summer 2026
            </time>
            <h2 className="mt-3 text-balance text-[28px] font-medium leading-[1.1] tracking-[-0.025em] text-ink sm:text-[36px]">
              After the hackathon
            </h2>
          </div>
          <dl className="divide-y divide-stroke border-y border-stroke">
            {FACTS.map((f) => (
              <div key={f.label} className="grid gap-2 py-5 sm:grid-cols-[140px_1fr] sm:gap-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:pt-1">
                  {f.label}
                </dt>
                <dd className="text-[16px] leading-[1.6] text-ink">{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
