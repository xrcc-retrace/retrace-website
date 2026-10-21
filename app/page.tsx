import { StickyNav } from "@/components/StickyNav";
import { Hero } from "@/components/Hero";
import { Flows } from "@/components/Flows";
import { CapturePipeline } from "@/components/CapturePipeline";
import { Architecture } from "@/components/Architecture";
import { Troubleshoot } from "@/components/Troubleshoot";
import { Stack } from "@/components/Stack";
import { Numbers } from "@/components/Numbers";
import { Team } from "@/components/Team";
import { Faq } from "@/components/Faq";
import { AfterHackathon } from "@/components/AfterHackathon";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <StickyNav />
      <main>
        <Hero />
        <Flows />
        <CapturePipeline />
        <Architecture />
        <Troubleshoot />
        <Stack />
        <Numbers />
        <Team />
        <Faq />
        <AfterHackathon />
      </main>
      <Footer />
    </>
  );
}
