"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MonoLabel } from "../primitives";

type Vertical = {
  id: string;
  tab: string;
  body: string;
  idealFor: string;
};

const verticals: Vertical[] = [
  {
    id: "service",
    tab: "Equipment Service & Repair",
    body:
      "Retrace moves diagnostic data from back-office screens straight to the technician’s eyes. The AI watches the live repair, giving hands-free visual guidance so technicians can fix complex machinery without looking away from the equipment.",
    idealFor:
      "Equipment manufacturers, service directors, and technical support leads.",
  },
  {
    id: "onboarding",
    tab: "Onboarding & Training",
    body:
      "Transform one expert recording into an active, on-the-floor mentor for every new hire. The AI tracks real-time progress and guides learners at their own pace, replacing boring classroom slideshows with confident, on-the-job training.",
    idealFor:
      "Plant managers, operational directors, and training supervisors.",
  },
  {
    id: "field",
    tab: "Field-Service Assistance",
    body:
      "Equip your field team with a smart partner that looks through their camera to troubleshoot unexpected breakdowns. It scans your library to find verified solutions instantly, eliminating costly guesswork out in the wild.",
    idealFor:
      "Field operations leaders, global service executives, and remote support teams.",
  },
];

export function BuiltFor() {
  const [activeId, setActiveId] = useState(verticals[0].id);
  const active = verticals.find((v) => v.id === activeId) ?? verticals[0];

  return (
    <section
      id="built-for"
      className="relative border-t border-stroke bg-surface/20"
    >
      <div className="shell flex flex-col items-center py-24 text-center lg:py-40">
        {/* Header */}
        <h2 className="mx-auto max-w-[20ch] text-balance font-light leading-[1.1] tracking-[-0.025em] text-ink text-3xl sm:text-4xl lg:text-[56px]">
          One platform. Infinite operational possibilities.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-[16px] leading-[1.6] text-muted lg:text-[18px]">
          Deploy Retrace wherever your team needs eyes-on-the-job intelligence.
        </p>

        {/* Segmented control */}
        <div
          role="tablist"
          aria-label="Choose a deployment scenario"
          className="mx-auto mt-10 flex max-w-full items-stretch gap-1 self-stretch overflow-x-auto rounded-full border border-stroke bg-canvas p-1 sm:mt-12 sm:self-auto"
        >
          {verticals.map((v) => (
            <button
              key={v.id}
              role="tab"
              aria-selected={activeId === v.id}
              aria-controls={`panel-${v.id}`}
              onClick={() => setActiveId(v.id)}
              className={`relative flex-none whitespace-nowrap rounded-full px-4 py-2.5 text-[12px] font-medium transition-colors sm:px-6 sm:text-[14px] ${
                activeId === v.id
                  ? "text-[#1a1300]"
                  : "text-muted hover:text-ink"
              }`}
            >
              {activeId === v.id && (
                <motion.span
                  layoutId="builtfor-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{v.tab}</span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="relative mt-10 min-h-[240px] w-full sm:mt-12 sm:min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              id={`panel-${active.id}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <p className="mx-auto text-pretty max-w-2xl text-left text-[18px] leading-[1.6] text-ink lg:text-[20px]">
                {active.body}
              </p>
              <div className="mx-auto mt-7 flex w-full max-w-2xl flex-col items-start gap-2">
                <MonoLabel>Ideal for</MonoLabel>
                <p className="text-[14.5px] text-left text-muted">
                  {active.idealFor}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
