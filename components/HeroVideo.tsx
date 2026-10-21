"use client";

import { useEffect, useRef } from "react";

/** Hero demo: eager (above the fold) but honours prefers-reduced-motion. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) el.play().catch(() => {});
  }, []);
  return (
    <video
      ref={ref}
      muted
      playsInline
      loop
      preload="metadata"
      poster="/video/learner-poster.jpg"
      className="h-full w-full object-cover"
      aria-label="Learner's camera during a coaching session"
    >
      <source src="/video/Learner43ratio.webm" type="video/webm" />
      <source src="/video/Learner43ratio.mp4" type="video/mp4" />
    </video>
  );
}
