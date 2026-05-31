"use client";

import { Cta } from "./primitives";
import PixelCard from "./PixelCard";

const TESTFLIGHT_URL = "https://testflight.apple.com/join/3wSB8VEu";
const EMAILS = ["jacogoby@gmail.com", "ykarthurlee@gmail.com"];

export function FinalCTA() {
  return (
    <section id="final-cta" className="border-t-0">
      <div className="shell pt-0 pb-16 lg:pb-20">
        <PixelCard
          colors="#FFC21C,#e6a800,#b37d00"
          gap={8}
          speed={25}
          className="w-full rounded-xl border border-stroke"
        >
          <div className="relative z-10 flex flex-col items-start md:items-center px-6 py-10 text-left md:text-center lg:px-14 lg:py-16">
            <blockquote className="text-balance text-3xl font-medium leading-[1.18] tracking-[-0.012em] text-ink lg:text-5xl">
              AI copilot for technicians today.
              <br />
              <span>Training humanoids tomorrow.</span>
            </blockquote>

            <p className="mt-2 font-medium md:mt-6 text-[15px] leading-[1.6]">
              Try Retrace on TestFlight. Or talk to us about industrial pilots.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3">
              <Cta href={TESTFLIGHT_URL} external variant="primary">
                Install on TestFlight <span aria-hidden>→</span>
              </Cta>

              <div className="flex flex-col items-start md:items-center gap-1">
                {EMAILS.map((e) => (
                  <a
                    key={e}
                    href={`mailto:${e}`}
                    className="font-mono text-[12.5px] tracking-tight transition-colors hover:text-muted"
                  >
                    {e}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </PixelCard>
      </div>
    </section>
  );
}
