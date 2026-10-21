"use client";

import { useEffect, useState } from "react";
import { Plus, Play } from "lucide-react";
import { TRAILER_URL } from "@/lib/links";
import { NAV_LINKS } from "./StickyNav";

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
      {/* One glass surface; height is the animated property, so the menu
          unfurls from under the pinned header row. */}
      <div
        role={open ? "dialog" : undefined}
        aria-modal={open ? true : undefined}
        aria-label={open ? "Site menu" : undefined}
        className={`flex flex-col justify-between overflow-hidden rounded-3xl transition-[height] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${GLASS} ${
          open ? "h-[calc(100dvh-2rem)]" : "h-[60px]"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between pl-6">
          <a
            href="#top"
            aria-label="Retrace home"
            onClick={() => setOpen(false)}
            className="flex items-center py-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/retrace-logo.svg" alt="Retrace" className="h-7 w-auto" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex items-center px-6 py-4"
          >
          <Plus
            className={`size-6 text-ink transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "rotate-45" : "rotate-0"
            }`}
            strokeWidth={2}
          />
          </button>
        </div>
        

        <nav
          aria-label="Site"
          aria-hidden={!open}
          className={`flex flex-col gap-3 px-6 transition-opacity duration-200 ${
            open ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
          }`}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              tabIndex={open ? undefined : -1}
              onClick={() => setOpen(false)}
              className="select-none text-[38px] font-light leading-[1.1] tracking-[-0.02em] text-white/80 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div
          className={`flex flex-col gap-3 px-6 pb-6 transition-opacity duration-200 ${
            open ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
          }`}
        >
          <a
            href="#architecture"
            tabIndex={open ? undefined : -1}
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 self-stretch rounded-full bg-accent px-5 py-3 text-[14px] font-medium text-[#1A1300] transition-opacity hover:opacity-90"
          >
            See how it works
          </a>
          <a
            href={TRAILER_URL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? undefined : -1}
            className={`flex items-center justify-center gap-2 self-stretch rounded-full px-5 py-3 text-[14px] font-medium text-ink transition-colors hover:bg-white/[0.10] ${GLASS}`}
          >
            <Play className="size-5" strokeWidth={2} />
            Watch the demo film
          </a>
        </div>
      </div>
    </div>
  );
}
