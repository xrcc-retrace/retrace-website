import Image from "next/image";
import {
  EMAILS,
  MAILTO_URL,
  REPO_IOS_URL,
  REPO_SERVER_URL,
  TRAILER_URL,
} from "@/lib/links";

const COLUMNS: { heading: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Capture pipeline", href: "#capture" },
      { label: "Coaching architecture", href: "#architecture" },
      { label: "Troubleshoot", href: "#troubleshoot" },
      { label: "Stack and decisions", href: "#stack" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Code",
    links: [
      { label: "retrace-server (FastAPI)", href: REPO_SERVER_URL, external: true },
      { label: "retrace-ios (SwiftUI)", href: REPO_IOS_URL, external: true },
      { label: "Demo film", href: TRAILER_URL, external: true },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: EMAILS[0], href: MAILTO_URL },
      { label: EMAILS[1], href: MAILTO_URL },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-stroke">
      <div className="shell pb-10 pt-16 lg:pt-24">
        <p className="max-w-[26ch] text-balance text-[28px] font-medium leading-[1.1] tracking-[-0.025em] text-ink sm:text-[36px] lg:text-[44px]">
          The learner never hears a step the camera didn&apos;t confirm.
        </p>

        <div className="mt-14 grid gap-10 border-t border-stroke pt-10 sm:grid-cols-3">
          {COLUMNS.map((c) => (
            <div key={c.heading} className="min-w-0">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {c.heading}
              </h3>
              <ul className="mt-4 space-y-2.5 text-[14.5px]">
                {c.links.map((l) => (
                  <li key={l.label} className="min-w-0">
                    <a
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined}
                      className="break-words text-ink/85 transition-colors hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-stroke pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted/70 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/retrace-logo.svg"
              alt="Retrace"
              width={958}
              height={180}
              className="h-4 w-auto opacity-80"
            />
            <span>© {year} Retrace</span>
          </div>
          <span>Gemini Live · Meta DAT SDK · FastAPI · SwiftUI</span>
        </div>
      </div>
    </footer>
  );
}
