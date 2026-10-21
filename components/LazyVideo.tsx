"use client";

import { useEffect, useRef } from "react";

/**
 * Poster-first video. Sources are attached only once the element is near the
 * viewport, so below-the-fold demos (the 2.5 MB expert webm) never load on
 * first paint. The poster is a real still from the same clip, so the resting
 * state already shows the content.
 */
export function LazyVideo({
  webm,
  mp4,
  poster,
  className = "",
  label,
}: {
  webm: string;
  mp4?: string;
  poster: string;
  className?: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      const add = (src: string, type: string) => {
        const s = document.createElement("source");
        s.src = src;
        s.type = type;
        el.appendChild(s);
      };
      add(webm, "video/webm");
      if (mp4) add(mp4, "video/mp4");
      el.load();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduced) el.play().catch(() => {});
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [webm, mp4]);

  return (
    <video
      ref={ref}
      muted
      playsInline
      loop
      preload="none"
      poster={poster}
      aria-label={label}
      className={className}
    />
  );
}
