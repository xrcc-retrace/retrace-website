"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { DiamondMark } from "./primitives";

// Hosted Spline scene — the cursor-following robot. Its head/eye tracking is
// baked into the scene and responds to pointer + touch, so desktop cursor-follow
// and mobile tap-to-turn come for free.
const SCENE_URL = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

const Spline = lazy(() => import("@splinetool/react-spline"));

export function SplineRobot({ className = "" }: { className?: string }) {
  // Hydration + capability gate. The canvas only mounts client-side; under
  // reduced-motion we skip WebGL entirely and show a static panel instead.
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!mounted || reducedMotion) {
    return <StaticFallback className={className} />;
  }

  return (
    <div className={`relative ${className}`}>
      <Suspense fallback={<Loader />}>
        <Spline scene={SCENE_URL} className="h-full w-full" />
      </Suspense>
      {/* Mask the bottom-right "Built with Spline" badge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-10 w-36 bg-canvas"
      />
    </div>
  );
}

function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted/70">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        Loading model
      </span>
    </div>
  );
}

function StaticFallback({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
    >
      <DiamondMark className="h-12 w-12 text-stroke-hi" />
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted/60">
        Embodied agent · static
      </span>
    </div>
  );
}
