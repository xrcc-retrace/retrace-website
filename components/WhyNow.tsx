import { MonoLabel } from "./primitives";

export function WhyNow() {
  return (
    <section
      id="why-now"
      className="relative border-t border-stroke"
    >
      <div className="shell py-24 lg:py-32">
        <div className="max-w-3xl">
          <MonoLabel className="text-muted/70">Why now</MonoLabel>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[44px]">
            Three unlocks landed in the same year.
          </h2>
          <p className="mt-7 text-pretty text-[17px] leading-[1.65] text-muted lg:text-[18px]">
            <span className="text-ink">Gemini 3.1 Flash Live</span> ships
            real-time video + audio + tools + context compression + session
            resumption. The model can finally watch and coach indefinitely.{" "}
            <span className="text-ink">Ray-Ban Meta</span> sold 7M units in
            2025, +210% YoY; the capture layer is already on technicians'
            faces. <span className="text-ink">Meta's DAT SDK 0.6</span>{" "}
            shipped. Third-party apps can finally stream from the glasses.
          </p>
          <p className="mt-5 text-pretty text-[17px] leading-[1.65] text-muted lg:text-[18px]">
            Hardware mature. Model mature. Distribution mature. Nobody had
            built the field-service coaching layer yet. Until now.
          </p>
        </div>
      </div>
    </section>
  );
}
