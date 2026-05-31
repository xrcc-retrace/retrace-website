import type { Metadata } from "next";
import { StickyNav } from "@/components/StickyNav";
import { Blog } from "@/components/Blog";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog — Retrace",
  description:
    "The XRCC Berlin 2026 trailer plus field notes from building Retrace — record one expert, coach every learner.",
};

export default function BlogPage() {
  return (
    <>
      <StickyNav />
      <main className="pt-28 lg:pt-32">
        <Blog />
      </main>
      <Footer />
    </>
  );
}
