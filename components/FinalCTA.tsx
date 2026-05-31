import { Cta } from "./primitives";

const TESTFLIGHT_URL = "https://testflight.apple.com/join/3wSB8VEu";
const EMAILS = ["jacogoby@gmail.com", "ykarthurlee@gmail.com"];

export function FinalCTA() {
  return (
    <section id="final-cta" className="border-t border-stroke">
      <div className="shell py-16 lg:py-20">
        <div className="rounded-xl border border-stroke bg-surface/30 px-8 py-12 lg:px-14 lg:py-16">
          <blockquote className="text-balance text-2xl font-medium leading-[1.18] tracking-[-0.012em] text-ink lg:text-[36px]">
            AI copilot for technicians today.
            <br />
            <span className="text-muted">Training humanoids tomorrow.</span>
          </blockquote>
          <p className="mt-6 text-[15px] leading-[1.6] text-muted">
            Try Retrace on TestFlight. Or talk to us about industrial pilots.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <Cta href={TESTFLIGHT_URL} external variant="primary">
              Install on TestFlight
              <span aria-hidden>→</span>
            </Cta>
            <div className="flex flex-col gap-1">
              {EMAILS.map((e) => (
                <a
                  key={e}
                  href={`mailto:${e}`}
                  className="font-mono text-[12.5px] tracking-tight text-muted transition-colors hover:text-ink"
                >
                  {e}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
