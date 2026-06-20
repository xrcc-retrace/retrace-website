import { MonoLabel } from "../primitives";

const transcript = [
  { from: "ai", text: "Rivet nut tool. Sets threaded inserts into sheet metal with no rear access. Three parts: body, mandrel, nose piece." },
  { from: "tech", text: "Do I pick the mandrel first?" },
  { from: "ai", text: "Yes. Match it to your rivet nut spec, then torque the nose piece to 15 Nm before attaching." },
  { from: "tool", text: "advance_step({ from: 1, to: 2, method: 'visual' })" },
];

// Visual-only pane for the Coach step — learner POV + live activity feed.
export function CoachVisual() {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-[14px] border border-stroke bg-canvas/60 p-3 lg:grid-cols-[1fr_auto]">
      {/* Learner POV */}
      <div className="relative rounded-[8px] border border-stroke bg-canvas">
        <div className="aspect-video w-full lg:aspect-auto lg:h-full">
          <video
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
            className="h-full w-full object-cover opacity-95"
            aria-hidden
          >
            <source src="/video/Learner43ratio.webm" type="video/webm" />
          </video>
        </div>
        {/* HUD overlays */}
        <div className="absolute inset-3 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="inline-flex items-center gap-1.5 rounded-[4px] bg-canvas/70 px-2 py-1 backdrop-blur">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                aria-hidden
              />
              <MonoLabel className="text-ink">LIVE · STEP 02 / 06</MonoLabel>
            </div>
            <div className="rounded-[4px] bg-canvas/70 px-2 py-1 backdrop-blur">
              <MonoLabel className="text-ink">~0.5 FPS · LOW</MonoLabel>
            </div>
          </div>
          <div className="self-end rounded-[4px] border border-accent/40 bg-canvas/80 px-2.5 py-1.5 backdrop-blur">
            <MonoLabel className="text-accent">PiP · reference clip</MonoLabel>
          </div>
        </div>
      </div>
      {/* Activity feed */}
      <div className="flex flex-col gap-2.5 rounded-[8px] border border-stroke bg-canvas p-5 lg:w-64">
        <MonoLabel>Activity</MonoLabel>
        {transcript.map((b, i) => (
          <div
            key={i}
            className={`rounded-[5px] border px-3 py-2 text-[13px] leading-snug ${
              b.from === "ai"
                ? "border-accent/30 bg-accent/[0.06] text-ink"
                : b.from === "tool"
                  ? "border-stroke bg-surface font-mono text-[11.5px] text-accent"
                  : "border-stroke bg-surface text-muted"
            }`}
          >
            {b.text}
          </div>
        ))}
      </div>
    </div>
  );
}
