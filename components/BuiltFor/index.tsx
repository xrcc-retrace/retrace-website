"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MonoLabel } from "../primitives";

type Vertical = {
  id: string;
  chip: string;
  claim: string;
  body: string;
  displaces: string[];
  buyer: string;
  buyerNote: string;
};

const verticals: Vertical[] = [
  {
    id: "service",
    chip: "Service & Repair",
    claim:
      "Service ADVISOR and SIS lock diagnostics in the shop. Retrace puts them on the technician's face.",
    body:
      "Real-time visual guidance through smart glasses, on the equipment, no swivel-chair. Embeds into the OEM's after-sales motion as a branded service layer — the technician's hands stay on the machine while the model watches.",
    displaces: [
      "John Deere Service ADVISOR",
      "Caterpillar SIS",
      "Schneider Remote Expertise",
    ],
    buyer: "OEM product lead",
    buyerNote: "VP of after-sales · service organization",
  },
  {
    id: "onboarding",
    chip: "Onboarding & Upskilling",
    claim:
      "Poka trains workers through apps. Retrace trains them through their eyes.",
    body:
      "One expert demo becomes adaptive visual coaching for every new hire, on the machine, not in a slide deck. The model watches the work and adjusts — it isn't a scripted checklist. New techs onboard in weeks, not months.",
    displaces: ["Poka", "Augmentir", "Tulip"],
    buyer: "Plant ops director",
    buyerNote: "VP of operations · manufacturing site",
  },
  {
    id: "field",
    chip: "Field-Service Copilot",
    claim:
      "Aquant and Neuron7 are tools you open on a phone. Retrace stays on the work.",
    body:
      "Eyeball-on-target voice + vision through glasses or phone, real-time auto-advance, troubleshoot for the unknown. One expert demo replaces the institutional-data backfill those tools require to deliver an answer.",
    displaces: ["Aquant.ai", "Neuron7.ai"],
    buyer: "CSO / SVP of Global Services",
    buyerNote: "Cost-center owner · enterprise OEM",
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
      <div className="shell py-24 lg:py-40">
        <div className="mb-12 flex flex-col gap-7 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[18ch] text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[52px]">
            One wedge.
            <br />
            <span className="text-muted">Pick the pain you own.</span>
          </h2>

          {/* Tab strip */}
          <div
            role="tablist"
            aria-label="Choose a buyer persona"
            className="inline-flex flex-wrap items-center gap-1 self-start rounded-full border border-stroke bg-canvas p-1"
          >
            {verticals.map((v) => (
              <button
                key={v.id}
                role="tab"
                aria-selected={activeId === v.id}
                aria-controls={`panel-${v.id}`}
                onClick={() => setActiveId(v.id)}
                className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
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
                <span className="relative z-10">{v.chip}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Panel */}
        <div className="relative min-h-[360px] lg:min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              id={`panel-${active.id}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20"
            >
              <div className="max-w-3xl">
                <h3 className="text-balance text-[26px] font-semibold leading-[1.15] tracking-[-0.018em] text-ink lg:text-[40px]">
                  {active.claim}
                </h3>
                <p className="mt-7 text-pretty text-[16px] leading-[1.65] text-muted lg:text-[18px]">
                  {active.body}
                </p>
              </div>

              <aside className="flex flex-col gap-7 lg:border-l lg:border-stroke lg:pl-12">
                <div>
                  <MonoLabel>Displaces</MonoLabel>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {active.displaces.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-2.5 text-[14.5px] text-ink"
                      >
                        <span
                          aria-hidden
                          className="inline-block h-px w-3 bg-stroke-hi"
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <MonoLabel>Buyer</MonoLabel>
                  <div className="mt-2 text-[16px] font-medium text-ink">
                    {active.buyer}
                  </div>
                  <div className="mt-1 text-[13px] text-muted">
                    {active.buyerNote}
                  </div>
                </div>
              </aside>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
