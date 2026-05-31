"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { TOUR_STEPS } from "./tourSteps";

const EASE = [0.22, 1, 0.36, 1] as const;

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
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(
      TOUR_STEPS.length - 1,
      Math.max(0, Math.floor(p * TOUR_STEPS.length)),
    );
    setActive((prev) => (prev === next ? prev : next));
  });

  // Scroll so the picked step lands in the middle of its segment.
  const goToStep = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const start = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    const p = (i + 0.5) / TOUR_STEPS.length;
    window.scrollTo({
      top: start + p * scrollable,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const ActiveVisual = TOUR_STEPS[active].Visual;

  return (
    <div
      ref={trackRef}
      style={{ height: `${TOUR_STEPS.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen items-center">
        <div className="shell grid w-full items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {/* Left rail */}
          <div className="flex flex-col gap-10">
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
                  <div className="font-mono text-[11px] tracking-[0.2em] text-muted">
                    {step.num} / {step.kicker.toUpperCase()}
                  </div>
                  <h3
                    className={`mt-3 text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] transition-colors duration-300 sm:text-4xl lg:text-[40px] ${
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

          {/* Right pane — crossfading visual */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={TOUR_STEPS[active].id}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <ActiveVisual />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
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
            <div className="relative pl-6">
              <span
                aria-hidden
                className="absolute left-0 top-1 bottom-1 w-px bg-accent"
              />
              <div className="font-mono text-[11px] tracking-[0.2em] text-muted">
                {step.num} / {step.kicker.toUpperCase()}
              </div>
              <h3 className="mt-3 text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-4xl">
                {step.header}
              </h3>
              <p className="mt-5 max-w-md text-pretty text-[16px] leading-[1.6] text-muted">
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
