import { MonoLabel } from "../primitives";

const phases = [
  { label: "Identify", state: "done" as const, note: "3-phase chiller" },
  { label: "Diagnose", state: "done" as const, note: "Low refrigerant" },
  { label: "Fetch", state: "active" as const, note: "3 sources cited" },
  { label: "Coach", state: "pending" as const, note: "Handoff to learner" },
];

const chat = [
  { from: "tech", text: "Machine throws E-04. Compressor short-cycling." },
  { from: "ai", text: "Looks like a refrigerant-side issue. What's on the nameplate?" },
  { from: "tech", text: "Carrier 30RAP-080. About 8 years old." },
  { from: "ai", text: "Got it. Searching your library, then the web." },
];

const sources = [
  "carrier.com / service / 30RAP / E-04",
  "service.refrigeration / short-cycle-diagnosis",
  "fieldnotes.io / topics / low-charge-symptoms",
];

// Visual-only pane for the Troubleshoot step — chat + diagnostic phase tracker.
export function TroubleshootVisual() {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-[14px] border border-stroke bg-surface/40 p-3 lg:grid-cols-2">
      {/* Chat */}
      <div className="flex flex-col gap-2.5 rounded-[8px] border border-stroke bg-canvas p-5">
        <MonoLabel>Describe the broken machine</MonoLabel>
        {chat.map((c, i) => (
          <div
            key={i}
            className={`max-w-[92%] rounded-[5px] border px-3 py-2 text-[13px] leading-snug ${
              c.from === "ai"
                ? "self-start border-accent/30 bg-accent/[0.06] text-ink"
                : "self-end border-stroke bg-surface text-muted"
            }`}
          >
            {c.text}
          </div>
        ))}
      </div>

      {/* Phase bar + sources */}
      <div className="flex flex-col gap-5 rounded-[8px] border border-stroke bg-canvas p-5">
        <div>
          <MonoLabel>Diagnostic phase</MonoLabel>
          <ol className="mt-3 flex flex-col">
            {phases.map((p) => (
              <li
                key={p.label}
                className="grid grid-cols-[14px_1fr_auto] items-center gap-3 border-t border-stroke py-3 first:border-t-0"
              >
                <span
                  aria-hidden
                  className={`inline-block h-2 w-2 rounded-full ${
                    p.state === "done"
                      ? "bg-accent"
                      : p.state === "active"
                        ? "bg-accent shadow-[0_0_0_4px_rgba(255,194,28,0.15)]"
                        : "bg-stroke-hi"
                  }`}
                />
                <span
                  className={`text-[13.5px] font-medium ${
                    p.state === "pending" ? "text-muted" : "text-ink"
                  }`}
                >
                  {p.label}
                </span>
                <span className="font-mono text-[10px] tracking-[0.12em] text-muted/70">
                  {p.note}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="border-t border-stroke pt-4">
          <MonoLabel>Cited sources</MonoLabel>
          <ul className="mt-2 space-y-1">
            {sources.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2 font-mono text-[11px] leading-snug text-muted"
              >
                <span className="mt-0.5 text-accent">↗</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
