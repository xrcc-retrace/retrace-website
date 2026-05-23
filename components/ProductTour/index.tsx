import { CapturePanel } from "./CaptureToSopPanel";
import { CoachPanel } from "./CoachingPanel";
import { TroubleshootPanel } from "./TroubleshootPanel";

export function ProductTour() {
  return (
    <section id="product" className="relative border-t border-stroke">
      {/* Section opener — a single line, no eyebrow, no subhead, no card grid */}
      <div className="shell py-24 lg:py-40">
        <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[56px]">
          One recording.{" "}
          <span className="text-muted">Three modes. One architecture.</span>
        </h2>
      </div>

      {/* Three cinematic panels — alternating side, hairline separators */}
      <CapturePanel />
      <CoachPanel />
      <TroubleshootPanel />
    </section>
  );
}
