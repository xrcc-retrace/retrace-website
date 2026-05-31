"use client";

import dynamic from "next/dynamic";
import { Cta } from "./primitives";
import { TESTFLIGHT_URL, MAILTO_URL } from "@/lib/links";

const Dither = dynamic(() => import("./Dither"), { ssr: false });

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient warm wash from top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[800px] bg-[radial-gradient(circle_at_50%_-10%,rgba(255,194,28,0.10),transparent_55%)]"
      />
      {/* Dither background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          enableMouseInteraction={true}
          disableAnimation={false}
          colorNum={11.5}
          waveAmplitude={0.18}
          waveFrequency={6.2}
          waveSpeed={0.05}
          pixelSize={2}
          mouseRadius={0.1}
        />
      </div>

      <div className="shell relative">
        <div className="flex min-h-[78vh] flex-col items-center justify-center pb-24 pt-28 text-center lg:pb-32 lg:pt-32">
          {/* Badge */}
          <span className="mt-5 inline-flex items-center rounded-[4px] border-2 border-accent/60 px-2 py-[3px] font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            XRCC 2026 Finalist
          </span>

          {/* Headline */}
          <h1 className="mt-2 md:mt-6 max-w-[14ch] text-balance text-[44px] font-normal leading-[0.98] tracking-[-0.035em] text-ink sm:text-[72px] lg:text-[112px]">
            AI copilot for field technicians
          </h1>

          {/* Subtitle */}
          <p className="mt-4 md:mt-8 max-w-[40rem] text-pretty text-xl font-light text-ink lg:text-[32px]">
            Record one expert demo. Infinite real-time coaching via smart glasses
            or mobile.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Cta href={TESTFLIGHT_URL} external variant="primary">
              Install on TestFlight
              <span aria-hidden>→</span>
            </Cta>
            <Cta
              href={MAILTO_URL}
              variant="glass"
            >
              Book a pilot
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
}
