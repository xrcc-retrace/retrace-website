import Image from "next/image";
import { MonoLabel } from "./primitives";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-stroke">
      <div className="shell flex flex-col gap-6 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/retrace-logo.svg"
            alt="Retrace"
            width={958}
            height={180}
            className="h-5 w-auto"
          />
          <MonoLabel className="ml-3 text-muted/70">XRCC Berlin 2026</MonoLabel>
        </div>
        <div className="flex flex-col gap-1 sm:items-end">
          <MonoLabel className="text-muted/70">
            © {year} Retrace · all rights reserved
          </MonoLabel>
          <MonoLabel className="text-muted/60">
            Built with Gemini Live · Meta DAT SDK · FastAPI · SwiftUI
          </MonoLabel>
        </div>
      </div>
    </footer>
  );
}
