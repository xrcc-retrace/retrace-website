"use client";

import Image from "next/image";
import { motion, useMotionValue, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChipTag, Cta, MonoLabel } from "./primitives";
import { DEMO_PROCEDURE } from "@/lib/procedure";

const TESTFLIGHT_URL = "https://testflight.apple.com/join/3wSB8VEu";
const STEP_COUNT = DEMO_PROCEDURE.steps.length;

type Zone = "idle" | "left" | "right" | "center";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);

  // Raw normalized pointer position (0..1)
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  // Springed for buttery follow
  const sx = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 220, damping: 26, mass: 0.5 });

  // Parallax tilt on the composition wrapper
  const rotateY = useTransform(sx, [0, 1], [-2, 2]);
  const rotateX = useTransform(sy, [0, 1], [2, -2]);
  // The two panels lift very slightly toward the cursor for depth
  const leftZ = useTransform(sx, [0, 1], [18, -8]);
  const rightZ = useTransform(sx, [0, 1], [-8, 18]);

  // Drive CSS vars on the container — keeps reticle position in screen-space
  // without re-rendering React on every frame.
  useMotionValueEvent(sx, "change", (v) => {
    containerRef.current?.style.setProperty("--rx", `${v * 100}%`);
  });
  useMotionValueEvent(sy, "change", (v) => {
    containerRef.current?.style.setProperty("--ry", `${v * 100}%`);
  });

  const [zone, setZone] = useState<Zone>("idle");
  const [activeStep, setActiveStep] = useState(2); // 0-indexed → step 3
  const [coord, setCoord] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize CSS vars so reticle has a sensible default position
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "50%");
    el.style.setProperty("--ry", "50%");
  }, []);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rx = (e.clientX - rect.left) / rect.width;
    const ry = (e.clientY - rect.top) / rect.height;
    mx.set(Math.max(0, Math.min(1, rx)));
    my.set(Math.max(0, Math.min(1, ry)));

    if (rx < 0.42) setZone("left");
    else if (rx > 0.58) setZone("right");
    else setZone("center");

    const step = Math.min(STEP_COUNT - 1, Math.max(0, Math.floor(ry * STEP_COUNT)));
    setActiveStep(step);

    // Display readout in frame/object coordinates
    setCoord({
      x: Math.round(rx * 1280),
      y: Math.round(ry * 720),
    });
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
    setZone("idle");
  }

  const reticleVisible = zone !== "idle";

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-16 lg:pt-20"
    >
      {/* Ambient warm wash from top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[800px] bg-[radial-gradient(circle_at_50%_-10%,rgba(255,194,28,0.10),transparent_55%)]"
      />
      {/* Fine grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(circle at 50% 30%, black 30%, transparent 75%)",
        }}
      />

      <div className="shell relative">
        {/* Copy block — single column, generous, no card preview */}
        <div className="flex flex-col items-start pb-14 pt-14 lg:pb-20 lg:pt-24">
          <div className="mb-8 inline-flex items-center gap-3">
            <ChipTag tone="accent">XRCC BERLIN 2026</ChipTag>
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
              aria-hidden
            />
            <MonoLabel>Live on TestFlight today</MonoLabel>
          </div>

          <h1 className="max-w-[16ch] text-balance text-[56px] font-semibold leading-[0.98] tracking-[-0.035em] text-ink sm:text-[72px] lg:text-[112px]">
            AI copilot for{" "}
            <span className="text-muted">field technicians.</span>
          </h1>

          <p className="mt-10 max-w-2xl text-pretty text-lg leading-[1.55] text-muted lg:text-xl">
            Record one expert demo. Coach every junior technician forever.
            Real-time voice + visual coaching through their smart glasses or
            phone.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Cta href={TESTFLIGHT_URL} external variant="primary">
              Install on TestFlight
              <span aria-hidden>→</span>
            </Cta>
            <Cta
              href="mailto:jacogoby@gmail.com,ykarthurlee@gmail.com?subject=Retrace%20pilot%20conversation"
              variant="secondary"
            >
              Book a pilot
            </Cta>
          </div>
        </div>

        {/* Interactive product canvas */}
        <div
          ref={containerRef}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="hero-canvas relative [perspective:1400px]"
          aria-label="Interactive product preview — move your cursor to direct the AI's gaze"
        >
          {/* Reticle frame edges — fine bracket marks at the canvas corners */}
          <CanvasBrackets />

          {/* Tilting composition */}
          <motion.div
            ref={compositionRef}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative grid grid-cols-1 gap-3 rounded-[16px] border border-stroke bg-surface/30 p-3 backdrop-blur-sm lg:grid-cols-[1.05fr_1fr] lg:gap-4"
          >
            {/* LEFT — Recording */}
            <motion.div
              style={{ z: leftZ }}
              className="relative overflow-hidden rounded-[10px] border border-stroke bg-canvas"
            >
              <div className="relative aspect-[9/12] w-full lg:aspect-[10/11]">
                <video
                  muted
                  playsInline
                  loop
                  autoPlay
                  poster="/video/expert-demo-poster.jpg"
                  preload="metadata"
                  className="h-full w-full object-cover opacity-95"
                  aria-hidden
                >
                  <source src="/video/expert-demo.webm" type="video/webm" />
                  <source src="/video/expert-demo.mp4" type="video/mp4" />
                </video>
                {/* Frame-tracking bounding box — activates over recording */}
                <div
                  className={`pointer-events-none absolute left-[14%] top-[34%] h-[36%] w-[44%] rounded-[3px] border border-accent transition-opacity duration-300 ${
                    zone === "left" || zone === "center"
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                  style={{
                    boxShadow: "0 0 0 1px rgba(255,194,28,0.15)",
                  }}
                  aria-hidden
                >
                  {/* Bracket corners */}
                  <BoxBracket position="tl" />
                  <BoxBracket position="tr" />
                  <BoxBracket position="bl" />
                  <BoxBracket position="br" />
                  <div className="absolute -bottom-6 left-0 font-mono text-[10px] tracking-[0.12em] text-accent">
                    OBJECT&nbsp;03 · MANIFOLD&nbsp;COVER
                  </div>
                </div>

                {/* REC chip */}
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-[4px] bg-canvas/80 px-2 py-1 backdrop-blur">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--destructive)]"
                    aria-hidden
                  />
                  <MonoLabel className="text-ink">REC · 00:07</MonoLabel>
                </div>

                {/* Bottom strip */}
                <div className="absolute inset-x-3 bottom-3 flex items-end justify-between">
                  <MonoLabel className="text-ink">
                    Expert · iPhone capture
                  </MonoLabel>
                  <MonoLabel className="text-muted">720 × 1280</MonoLabel>
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Extracted SOP */}
            <motion.div
              style={{ z: rightZ }}
              className="relative overflow-hidden rounded-[10px] border border-stroke bg-canvas"
            >
              <div className="flex h-full flex-col p-6 lg:p-7">
                <div className="mb-1 flex items-center justify-between">
                  <MonoLabel>Extracted SOP</MonoLabel>
                  <MonoLabel className="text-accent">Gemini 2.5 Pro</MonoLabel>
                </div>
                <div className="mb-5 text-lg font-semibold tracking-tight text-ink lg:text-xl">
                  {DEMO_PROCEDURE.title}
                </div>

                <ol className="flex flex-1 flex-col">
                  {DEMO_PROCEDURE.steps.map((s, i) => {
                    const isActive =
                      (zone === "right" || zone === "center") &&
                      activeStep === i;
                    return (
                      <li
                        key={s.index}
                        className={`grid grid-cols-[42px_1fr_auto] items-start gap-3 border-t border-stroke py-3 transition-colors duration-200 first:border-t-0 ${
                          isActive ? "bg-accent/[0.04]" : ""
                        }`}
                      >
                        <span
                          className={`font-mono text-[10px] tracking-[0.14em] transition-colors ${
                            isActive ? "text-accent" : "text-muted/60"
                          }`}
                        >
                          STEP&nbsp;{String(s.index).padStart(2, "0")}
                        </span>
                        <div>
                          <div
                            className={`text-[13.5px] font-medium leading-snug transition-colors ${
                              isActive ? "text-ink" : "text-muted"
                            }`}
                          >
                            {s.title}
                          </div>
                          {isActive && (
                            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
                              ✓ COMPLETION CRITERION VISIBLE
                            </div>
                          )}
                        </div>
                        <span
                          className={`font-mono text-[10px] tracking-[0.12em] transition-colors ${
                            isActive ? "text-ink" : "text-muted/60"
                          }`}
                        >
                          {s.start}
                        </span>
                      </li>
                    );
                  })}
                </ol>

                {/* Footer line — fires when in center zone */}
                <div
                  className={`mt-4 flex items-center justify-between border-t border-stroke pt-3 transition-opacity ${
                    zone === "center" ? "opacity-100" : "opacity-60"
                  }`}
                >
                  <MonoLabel className="text-accent">
                    ADVANCE_STEP · visual
                  </MonoLabel>
                  <MonoLabel className="text-muted">
                    Gemini 3.1 Flash Live
                  </MonoLabel>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Reticle — sits in screen-space, no tilt */}
          <div
            className={`hero-reticle pointer-events-none absolute transition-opacity duration-200 ${
              reticleVisible ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden
          >
            <ReticleMark />
            <div className="absolute left-7 top-7 whitespace-nowrap rounded-[3px] border border-accent/40 bg-canvas/80 px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-accent backdrop-blur">
              {zone === "left" && <>TRACKING · OBJECT&nbsp;03</>}
              {zone === "right" && <>READ&nbsp;STEP · {String(activeStep + 1).padStart(2, "0")} / {STEP_COUNT}</>}
              {zone === "center" && <>ADVANCE_STEP · candidate</>}
              {" · "}
              <span className="text-muted">
                {coord.x.toString().padStart(4, "0")} · {coord.y.toString().padStart(4, "0")}
              </span>
            </div>
          </div>

          {/* Hairline connector — visible in center zone */}
          <svg
            className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-300 ${
              zone === "center" ? "opacity-80" : "opacity-0"
            }`}
            aria-hidden
          >
            <line
              x1="36%"
              y1="42%"
              x2="58%"
              y2={`${20 + activeStep * 9}%`}
              stroke="var(--accent)"
              strokeWidth="1"
              strokeDasharray="2 4"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-24"
                dur="1.2s"
                repeatCount="indefinite"
              />
            </line>
          </svg>
        </div>

        {/* Soft outcomes line — single editorial whisper, no card grid */}
        <div className="border-t border-stroke py-8">
          <p className="font-mono text-[11px] leading-relaxed tracking-[0.1em] text-muted">
            <span className="text-ink">75% FTFR INDUSTRY BASELINE</span>
            <span className="mx-3 text-muted/40">·</span>
            <span className="text-ink">+1PP UPLIFT</span> AT FLEET SCALE = MILLIONS / YR
            <span className="mx-3 text-muted/40">·</span>
            <span className="text-ink">$200–300</span> BURNED PER REPEAT TRUCK ROLL
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (hover: none), (pointer: coarse) {
          .hero-reticle {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-reticle {
            display: none;
          }
        }
        .hero-reticle {
          left: var(--rx, 50%);
          top: var(--ry, 50%);
          transform: translate(-50%, -50%);
          z-index: 30;
        }
      `}</style>
    </section>
  );
}

function ReticleMark() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Corner brackets */}
      <path d="M2 12 L2 2 L12 2" stroke="var(--accent)" strokeWidth="1.5" />
      <path d="M44 2 L54 2 L54 12" stroke="var(--accent)" strokeWidth="1.5" />
      <path d="M54 44 L54 54 L44 54" stroke="var(--accent)" strokeWidth="1.5" />
      <path d="M12 54 L2 54 L2 44" stroke="var(--accent)" strokeWidth="1.5" />
      {/* Crosshair */}
      <line x1="28" y1="22" x2="28" y2="26" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="28" y1="30" x2="28" y2="34" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="22" y1="28" x2="26" y2="28" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="30" y1="28" x2="34" y2="28" stroke="var(--accent)" strokeWidth="1.5" />
      {/* Center dot */}
      <circle cx="28" cy="28" r="1" fill="var(--accent)" />
    </svg>
  );
}

function CanvasBrackets() {
  // Fine 16px L-marks at the four corners of the canvas — frames the whole
  // composition as if it were the inside of a viewfinder.
  const stroke = "var(--stroke-hi)";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <svg className="absolute left-0 top-0 h-4 w-4" viewBox="0 0 16 16">
        <path d="M0 6 L0 0 L6 0" stroke={stroke} strokeWidth="1.5" />
      </svg>
      <svg className="absolute right-0 top-0 h-4 w-4" viewBox="0 0 16 16">
        <path d="M10 0 L16 0 L16 6" stroke={stroke} strokeWidth="1.5" />
      </svg>
      <svg className="absolute bottom-0 left-0 h-4 w-4" viewBox="0 0 16 16">
        <path d="M0 10 L0 16 L6 16" stroke={stroke} strokeWidth="1.5" />
      </svg>
      <svg className="absolute bottom-0 right-0 h-4 w-4" viewBox="0 0 16 16">
        <path d="M16 10 L16 16 L10 16" stroke={stroke} strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function BoxBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const cls =
    position === "tl"
      ? "-left-px -top-px"
      : position === "tr"
        ? "-right-px -top-px rotate-90"
        : position === "bl"
          ? "-left-px -bottom-px -rotate-90"
          : "-right-px -bottom-px rotate-180";
  return (
    <svg
      className={`absolute h-2.5 w-2.5 ${cls}`}
      viewBox="0 0 10 10"
      aria-hidden
    >
      <path d="M0 5 L0 0 L5 0" stroke="var(--accent)" strokeWidth="1.5" />
    </svg>
  );
}
