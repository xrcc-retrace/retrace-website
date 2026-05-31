import { MonoLabel } from "../primitives";

const transcript = [
  { from: "ai", text: "Loosen the housing bolts in diagonal pairs, two passes." },
  { from: "tech", text: "Like this?" },
  { from: "ai", text: "Yes. Once they're each backed out one full turn, you're good to advance." },
  { from: "tool", text: "advance_step({ from: 2, to: 3, method: 'visual' })" },
];

// Visual-only pane for the Coach step — learner POV + live activity feed.
export function CoachVisual() {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-[14px] border border-stroke bg-canvas/60 p-3 lg:grid-cols-[1.4fr_1fr]">
      {/* Learner POV */}
      <div className="relative overflow-hidden rounded-[8px] border border-stroke bg-canvas">
        <div className="aspect-[10/11] w-full">
          <video
            muted
            playsInline
            loop
            autoPlay
            poster="/video/expert-demo-poster.jpg"
            preload="metadata"
            className="h-full w-full object-cover opacity-95"
            aria-hidden
          >
            <source src="/video/expert-demo.webm" type="video/webm" />
            <source src="/video/expert-demo.mp4" type="video/mp4" />
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
      <div className="flex flex-col gap-2.5 rounded-[8px] border border-stroke bg-canvas p-5">
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
