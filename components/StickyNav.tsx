"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "./MobileNav";
import { TESTFLIGHT_URL } from "@/lib/links";

const links: { label: string; href?: string }[] = [
  { label: "How to Vote", href: "/how-to-vote" },
  { label: "Blog", href: "/blog" },
];

export function StickyNav() {
  const [showCta, setShowCta] = useState(false);
  const pathname = usePathname();

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
        {/* Mobile — collapse/expand glass menu (below sm) */}
        <MobileNav className="absolute inset-x-[var(--gutter)] top-0 sm:hidden" />

        {/* Center pill — logo + (disabled) links (sm and up) */}
        <nav
          className="pointer-events-auto hidden items-center gap-4 rounded-full border border-white/10 bg-white/[0.06] py-2 pl-3 pr-5 backdrop-blur-md sm:flex sm:gap-6 sm:pr-6"
          aria-label="Primary"
        >
          <Link href="/" aria-label="Retrace home" className="flex items-center">
            <img src="/LogoIcon.svg" className="h-5 w-5" alt="" aria-hidden />
          </Link>
          {links.map((l) =>
            l.href ? (
              <Link
                key={l.label}
                href={l.href}
                className={`select-none whitespace-nowrap text-[13px] font-medium transition-colors sm:text-[15px] ${
                  pathname === l.href ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            ) : (
              <span
                key={l.label}
                aria-disabled="true"
                className="cursor-default select-none whitespace-nowrap text-[13px] font-medium text-muted sm:text-[15px]"
              >
                {l.label}
              </span>
            ),
          )}
        </nav>

        {/* Right pill — Install on TestFlight, fades in after the hero */}
        <a
          href={TESTFLIGHT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute right-[var(--gutter)] hidden items-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[13px] font-medium text-ink backdrop-blur-md transition-opacity duration-500 hover:bg-white/[0.10] sm:inline-flex sm:text-[15px] ${
            showCta
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          Install on TestFlight
        </a>
      </div>
    </header>
  );
}
