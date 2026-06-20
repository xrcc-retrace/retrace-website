"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TOUR_STEPS } from "./tourSteps";

const EASE = [0.22, 1, 0.36, 1] as const;

function StepEyebrow({ num, kicker }: { num: string; kicker: string }) {
  return (
    <div className="font-mono text-[11px] tracking-[0.2em] text-muted">
      {num} / {kicker.toUpperCase()}
    </div>
  );
}

export function ProductTourClient() {
  // SSR / first paint renders the mobile stack — this is also the no-JS
  // fallback and avoids mounting both video sets at once. We upgrade to the
  // pinned desktop experience only after measuring the viewport on the client.
  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setIsDesktop(desktop.matches);
      setReducedMotion(reduced.matches);
    };
    sync();
    desktop.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  if (isDesktop) {
    return <TourDesktop reducedMotion={reducedMotion} />;
  }
  return <TourMobile />;
}

/* -------------------------------------------------------------------------- */
/* Desktop — pinned, scroll-driven progressive disclosure                     */
/* -------------------------------------------------------------------------- */

function TourDesktop({ reducedMotion }: { reducedMotion: boolean }) {
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Scrollspy: highlight the rail step whose visual is centered. rootMargin
  // collapses the root to a single line at the viewport's vertical center, so
  // exactly one visual reports intersecting as it crosses. We only act on
  // isIntersecting=true, so the gaps between visuals leave the highlight put.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = visualRefs.current.indexOf(entry.target as HTMLDivElement);
          if (i !== -1) setActive((prev) => (prev === i ? prev : i));
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    visualRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goToStep = (i: number) => {
    visualRefs.current[i]?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <div className="shell grid items-start gap-12 pb-24 lg:grid-cols-[4fr_8fr] lg:gap-16 lg:pb-32">
      {/* Left rail — pinned, holds while the right column scrolls past */}
      <div className="flex flex-col gap-10 lg:sticky lg:top-32 lg:self-start">
        {TOUR_STEPS.map((step, i) => {
          const isActive = i === active;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => goToStep(i)}
              aria-current={isActive ? "step" : undefined}
              className="relative block w-full pl-6 text-left"
            >
              {/* Active indicator line */}
              <motion.span
                aria-hidden
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.4 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute left-0 top-1 bottom-1 w-px origin-center bg-accent"
              />
              <StepEyebrow num={step.num} kicker={step.kicker} />
              <h3
                className={`mt-3 text-balance text-3xl font-medium leading-[1.08] tracking-[-0.02em] transition-colors duration-300 lg:text-[36px] ${
                  isActive ? "text-ink" : "text-muted/55"
                }`}
              >
                {step.header}
              </h3>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="body"
                    initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="mt-5 max-w-md text-pretty text-[16px] leading-[1.6] text-muted lg:text-[17px]">
                      {step.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      {/* Right column — three visuals, natural height, real scroll */}
      <div className="flex flex-col gap-24 lg:gap-32">
        {TOUR_STEPS.map((step, i) => {
          const Visual = step.Visual;
          return (
            <div
              key={step.id}
              ref={(el) => {
                visualRefs.current[i] = el;
              }}
            >
              <Visual />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile — simple vertical stack (text on top, visual below, ×3)             */
/* -------------------------------------------------------------------------- */

function TourMobile() {
  return (
    <div className="shell flex flex-col gap-20 pb-4">
      {TOUR_STEPS.map((step) => {
        const Visual = step.Visual;
        return (
          <div key={step.id} className="flex flex-col">
            <div className="relative">
              <StepEyebrow num={step.num} kicker={step.kicker} />
              <h3 className="mt-2 text-balance text-3xl font-medium leading-[1.08] tracking-[-0.02em] text-ink sm:text-4xl">
                {step.header}
              </h3>
              <p className="mt-3 max-w-md text-pretty text-[16px] leading-[1.6] text-muted">
                {step.body}
              </p>
            </div>
            <div className="mt-8">
              <Visual />
            </div>
          </div>
        );
      })}
    </div>
  );
}
