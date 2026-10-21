"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";
import { TESTFLIGHT_URL } from "@/lib/links";

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Capture", href: "#capture" },
  { label: "Architecture", href: "#architecture" },
  { label: "Troubleshoot", href: "#troubleshoot" },
  { label: "Stack", href: "#stack" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
];

export function StickyNav() {
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowCta(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50">
      <div className="shell relative flex items-center justify-center">
        <MobileNav className="absolute inset-x-[var(--gutter)] top-0 md:hidden" />

        <nav
          className="pointer-events-auto hidden items-center gap-5 rounded-full border border-white/10 bg-white/[0.06] py-2 pl-3 pr-5 backdrop-blur-md md:flex lg:gap-6 lg:pr-6"
          aria-label="Primary"
        >
          <a href="#top" aria-label="Retrace home" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/LogoIcon.svg" className="h-5 w-5" alt="" aria-hidden />
          </a>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="select-none whitespace-nowrap text-[13.5px] font-medium text-muted transition-colors hover:text-ink lg:text-[14.5px]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={TESTFLIGHT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute right-[var(--gutter)] hidden items-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[13px] font-medium text-ink backdrop-blur-md transition-opacity duration-500 hover:bg-white/[0.10] lg:inline-flex ${
            showCta ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          TestFlight
        </a>
      </div>
    </header>
  );
}
