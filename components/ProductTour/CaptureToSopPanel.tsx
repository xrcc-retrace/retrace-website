import { MonoLabel } from "../primitives";
import { DEMO_PROCEDURE } from "@/lib/procedure";

// Visual-only pane for the Capture step — recording + extracted SOP.
export function CaptureVisual() {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-[14px] border border-stroke bg-surface/40 p-3 lg:grid-cols-[1fr_auto]">
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
            <source src="/video/Expert43ratio.webm" type="video/webm" />
            <source src="/video/Expert43ratio.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-[4px] bg-canvas/80 px-2 py-1 backdrop-blur">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--destructive)]"
            aria-hidden
          />
          <MonoLabel className="text-ink">REC · 00:07</MonoLabel>
        </div>
      </div>
      <div className="flex flex-col rounded-[8px] border border-stroke bg-canvas p-5 lg:w-64">
        <MonoLabel>Extracted SOP</MonoLabel>
        <div className="mt-1 mb-4 text-[14.5px] font-semibold leading-snug text-ink">
          {DEMO_PROCEDURE.title}
        </div>
        <ol className="flex flex-1 flex-col">
          {DEMO_PROCEDURE.steps.slice(0, 5).map((s) => (
            <li
              key={s.index}
              className="grid grid-cols-[28px_1fr] items-start gap-3 border-t border-stroke py-2.5 first:border-t-0"
            >
              <span className="font-mono text-[10px] tracking-[0.14em] text-muted/60">
                {String(s.index).padStart(2, "0")}
              </span>
              <span className="text-[13px] leading-snug text-ink/85">
                {s.title}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
