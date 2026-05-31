import type { Metadata } from "next";
import { StickyNav } from "@/components/StickyNav";
import { HowToVote } from "@/components/HowToVote";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "How to Vote for Retrace",
  description:
    "Public voting on the XRCC portal takes four quick steps: register, fill in the form, set your password, then vote for Retrace.",
};

export default function HowToVotePage() {
  return (
    <>
      <StickyNav />
      <main className="pt-28 lg:pt-32">
        <HowToVote />
      </main>
      <Footer />
    </>
  );
}
