import Link from "next/link";
import { DiamondMark } from "./primitives";

const TESTFLIGHT_URL = "https://testflight.apple.com/join/3wSB8VEu";

const links = [
  { href: "#product", label: "Product" },
  { href: "#built-for", label: "Built for" },
  { href: "#humanoid-arc", label: "The arc" },
  { href: "#team", label: "Team" },
];

export function StickyNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stroke bg-canvas/80 backdrop-blur-md">
      <div className="shell flex h-14 items-center justify-between gap-6">
        <Link
          href="#top"
          className="flex items-center gap-2.5 text-ink"
          aria-label="Retrace home"
        >
          <DiamondMark className="h-5 w-5" />
          <span className="text-[15px] font-semibold tracking-tight">
            retrace
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={TESTFLIGHT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-[13px] font-medium text-[#1a1300] transition-colors hover:bg-accent/90"
        >
          TestFlight
          <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}
