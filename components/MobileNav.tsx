"use client";

import { useEffect, useState } from "react";
import { Plus, Download, Play } from "lucide-react";

const TESTFLIGHT_URL = "https://testflight.apple.com/join/3wSB8VEu";
const TRAILER_URL =
  "https://drive.google.com/file/d/1zvRnLul5eNXFzZw67pSLdawgPnB8gdAX/view?usp=sharing";

const navLinks = ["Home", "How to Vote", "Blog"];

const GLASS = "border border-white/10 bg-white/[0.06] backdrop-blur-md";

export function MobileNav({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);

  // Escape closes; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <div className={`pointer-events-auto ${className}`}>
      {/* Single glass surface — extends down on open, contracts up on close.
          Height is the animated property; overflow-hidden clips the lower
          content so it unfurls from under the pinned header row. */}
      <div
        role={open ? "dialog" : undefined}
        aria-modal={open ? true : undefined}
        className={`flex flex-col justify-between overflow-hidden rounded-3xl transition-[height] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${GLASS} ${
          open ? "h-[calc(100dvh-2rem)]" : "h-[60px]"
        }`}
      >
        {/* Header row — pinned at the top of the surface in both states. */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex shrink-0 items-center justify-between px-6 py-4 text-left"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/retrace-logo.svg"
            alt="Retrace"
            className="h-7 w-auto"
          />
          <Plus
            className={`size-6 text-ink transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "rotate-45" : "rotate-0"
            }`}
            strokeWidth={2}
          />
        </button>

        {/* Decorative nav links — mirror the desktop placeholders.
            A direct child of the surface so justify-between spaces it
            equally between the header and the CTAs as the panel grows. */}
        <nav
          aria-label="Site"
          aria-hidden={!open}
          className={`flex flex-col gap-4 px-6 transition-opacity duration-200 ${
            open ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
          }`}
        >
          {navLinks.map((label, i) => (
            <span
              key={label}
              aria-disabled="true"
              className={`select-none text-[44px] tracking-[-0.35px] leading-[1.1] ${
                i === 0 ? "font-normal text-ink" : "font-light text-white/70"
              }`}
            >
              {label}
            </span>
          ))}
        </nav>

        {/* CTAs */}
        <div
          className={`flex flex-col gap-3 px-6 pb-6 transition-opacity duration-200 ${
            open ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
          }`}
        >
            <a
              href={TESTFLIGHT_URL}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? undefined : -1}
              className="flex items-center justify-center gap-2 self-stretch rounded-full bg-accent px-5 py-3 text-[14px] font-medium text-[#1A1300] transition-opacity hover:opacity-90"
            >
              <Download className="size-5" strokeWidth={2} />
              Install on TestFlight
            </a>
            <a
              href={TRAILER_URL}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? undefined : -1}
              className={`flex items-center justify-center gap-2 self-stretch rounded-full px-5 py-3 text-[14px] font-medium text-ink transition-colors hover:bg-white/[0.10] ${GLASS}`}
            >
              <Play className="size-5" strokeWidth={2} />
              Watch the XRCC trailer
            </a>
        </div>
      </div>
    </div>
  );
}
