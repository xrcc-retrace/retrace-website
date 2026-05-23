"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";

type Mode = "default" | "active" | "press" | "hidden";

const INTERACTIVE_SELECTOR =
  'button, a, [role="button"], input, textarea, select, summary, [data-cursor="active"]';
const HIDDEN_SELECTOR = '[data-cursor="hidden"]';

export function CustomCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Raw pointer position drives the inner dot (1:1, no spring).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Springed values drive the outer reticle (small lag tail).
  const sx = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 26, mass: 0.6 });

  const [mode, setMode] = useState<Mode>("hidden");
  // Track whether the pointer has appeared in the viewport at all yet.
  const hasAppeared = useRef(false);

  // Write motion values to CSS custom properties — keeps motion off React's
  // render path. Inner dot reads --cx/--cy; outer reticle reads --rx/--ry.
  useMotionValueEvent(mx, "change", (v) => {
    wrapperRef.current?.style.setProperty("--cx", `${v}px`);
  });
  useMotionValueEvent(my, "change", (v) => {
    wrapperRef.current?.style.setProperty("--cy", `${v}px`);
  });
  useMotionValueEvent(sx, "change", (v) => {
    wrapperRef.current?.style.setProperty("--rx", `${v}px`);
  });
  useMotionValueEvent(sy, "change", (v) => {
    wrapperRef.current?.style.setProperty("--ry", `${v}px`);
  });

  useEffect(() => {
    // Gate the entire component on coarse-pointer + reduced-motion. On phones,
    // touch tablets, or when the user prefers reduced motion, just stay
    // hidden forever and let the native cursor (or no cursor) handle things.
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!hasAppeared.current) {
        hasAppeared.current = true;
        setMode("default");
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t || typeof t.closest !== "function") return;
      if (t.closest(HIDDEN_SELECTOR)) {
        setMode("hidden");
        return;
      }
      if (t.closest(INTERACTIVE_SELECTOR)) {
        setMode((prev) => (prev === "press" ? "press" : "active"));
        return;
      }
      setMode((prev) => (prev === "press" ? "press" : "default"));
    };

    const onLeave = () => setMode("hidden");
    const onEnter = () => {
      if (hasAppeared.current) setMode("default");
    };

    const onDown = () => setMode((prev) => (prev === "hidden" ? prev : "press"));
    const onUp = (e: PointerEvent) => {
      // Re-evaluate the underlying zone instead of always returning to default.
      const t = e.target as Element | null;
      if (!t || typeof t.closest !== "function") {
        setMode("default");
        return;
      }
      if (t.closest(HIDDEN_SELECTOR)) setMode("hidden");
      else if (t.closest(INTERACTIVE_SELECTOR)) setMode("active");
      else setMode("default");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={wrapperRef}
      data-cursor-mode={mode}
      aria-hidden
      className="custom-cursor-root pointer-events-none fixed inset-0 z-[9999] hidden"
      style={{
        // CSS vars are set imperatively; declared here for SSR sanity.
        ["--cx" as string]: "-100px",
        ["--cy" as string]: "-100px",
        ["--rx" as string]: "-100px",
        ["--ry" as string]: "-100px",
      }}
    >
      {/* Outer reticle — 4 corner brackets, springed follow */}
      <div className="cursor-reticle">
        <Bracket position="tl" />
        <Bracket position="tr" />
        <Bracket position="bl" />
        <Bracket position="br" />
        <span className="cursor-label">SELECT</span>
      </div>
      {/* Inner dot — 1:1 follow */}
      <div className="cursor-dot" />

      <style jsx>{`
        @media (hover: hover) and (pointer: fine) {
          .custom-cursor-root {
            display: block;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .custom-cursor-root {
            display: none !important;
          }
        }

        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          margin: -3px 0 0 -3px;
          border-radius: 50%;
          background: var(--accent);
          transform: translate3d(var(--cx), var(--cy), 0);
          opacity: 0.95;
          transition: width 120ms ease-out, height 120ms ease-out,
            margin 120ms ease-out, opacity 120ms ease-out,
            background 120ms ease-out;
          will-change: transform;
        }

        .cursor-reticle {
          position: fixed;
          top: 0;
          left: 0;
          width: 28px;
          height: 28px;
          margin: -14px 0 0 -14px;
          transform: translate3d(var(--rx), var(--ry), 0);
          transition: width 160ms cubic-bezier(0.22, 1, 0.36, 1),
            height 160ms cubic-bezier(0.22, 1, 0.36, 1),
            margin 160ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 160ms ease-out;
          opacity: 0.55;
          will-change: transform;
        }

        .cursor-label {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate(-50%, 8px);
          font-family: var(--font-mono-jb), monospace;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: var(--accent);
          opacity: 0;
          transition: opacity 140ms ease-out;
          white-space: nowrap;
        }

        /* Hidden mode — covers idle/touch/exempted zones (hero canvas etc.) */
        .custom-cursor-root[data-cursor-mode="hidden"] .cursor-dot,
        .custom-cursor-root[data-cursor-mode="hidden"] .cursor-reticle {
          opacity: 0;
        }

        /* Active mode — over an interactive element */
        .custom-cursor-root[data-cursor-mode="active"] .cursor-dot {
          width: 10px;
          height: 10px;
          margin: -5px 0 0 -5px;
          opacity: 1;
        }
        .custom-cursor-root[data-cursor-mode="active"] .cursor-reticle {
          width: 56px;
          height: 56px;
          margin: -28px 0 0 -28px;
          opacity: 0.85;
        }
        .custom-cursor-root[data-cursor-mode="active"] .cursor-label {
          opacity: 0.9;
        }

        /* Press mode — tactile feedback on mousedown */
        .custom-cursor-root[data-cursor-mode="press"] .cursor-dot {
          width: 8px;
          height: 8px;
          margin: -4px 0 0 -4px;
          opacity: 0.7;
        }
        .custom-cursor-root[data-cursor-mode="press"] .cursor-reticle {
          width: 22px;
          height: 22px;
          margin: -11px 0 0 -11px;
          opacity: 0.7;
        }
        .custom-cursor-root[data-cursor-mode="press"] .cursor-label {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

function Bracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const transform =
    position === "tl"
      ? ""
      : position === "tr"
        ? "rotate(90deg)"
        : position === "br"
          ? "rotate(180deg)"
          : "rotate(270deg)";

  const placement: Record<typeof position, string> = {
    tl: "top-0 left-0",
    tr: "top-0 right-0",
    bl: "bottom-0 left-0",
    br: "bottom-0 right-0",
  };

  return (
    <svg
      className={`absolute ${placement[position]} pointer-events-none`}
      width="6"
      height="6"
      viewBox="0 0 6 6"
      style={{ transform }}
      aria-hidden
    >
      <path d="M0 6 L0 0 L6 0" stroke="var(--accent)" strokeWidth="1" fill="none" />
    </svg>
  );
}
