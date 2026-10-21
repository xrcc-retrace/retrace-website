// Real values only. Each one is a constant or config in the repos:
// oraclePollIntervalSeconds = 4 (CoachingSessionViewModel.swift),
// videoMinInterval 1.0 s (IPhoneCoachingCameraSource.swift),
// ContextWindowCompressionConfig (services/ephemeral_token.py),
// _ORACLE_CONFIDENCE_FLOOR = 0.6 (routers/learner.py),
// VOICE_OPTIONS (routers/learner.py), three Live modes (learner,
// troubleshoot, expert interviewer).
const NUMBERS = [
  { value: "~4 s", label: "verify cadence, Active mode" },
  { value: "~1 fps", label: "JPEG frames to Gemini Live" },
  { value: "100k → 40k", label: "context compression, tokens" },
  { value: "0.6", label: "oracle confidence floor" },
  { value: "8", label: "Gemini Live voices" },
  { value: "3", label: "Live session modes" },
];

export function Numbers() {
  return (
    <section aria-label="Key figures" className="border-t border-stroke">
      <div className="shell py-10 lg:py-14">
        {/* 1px gaps over the stroke color draw hairlines at every breakpoint. */}
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[8px] border border-stroke bg-stroke sm:grid-cols-3 lg:grid-cols-6">
          {NUMBERS.map((n) => (
            <div key={n.label} className="flex flex-col-reverse bg-canvas px-5 py-7 lg:py-8">
              <dt className="mt-2.5 text-[12.5px] leading-[1.4] text-muted">
                {n.label}
              </dt>
              <dd className="text-[26px] font-medium leading-none tracking-[-0.03em] text-ink tabular-nums sm:text-[30px]">
                {n.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
