import { StickyNav } from "@/components/StickyNav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { ProductTour } from "@/components/ProductTour";
import { BuiltFor } from "@/components/BuiltFor";
import { UniqueData } from "@/components/UniqueData";
import { HumanoidArc } from "@/components/HumanoidArc";
import { Team } from "@/components/Team";
import { Faq } from "@/components/Faq";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <StickyNav />
      <main>
        <Hero />
        <Problem />
        <ProductTour />
        <BuiltFor />
        <UniqueData />
        <HumanoidArc />
        <Team />
        <Faq />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
