import { HowToVoteClient } from "./HowToVoteClient";

export function HowToVote() {
  return (
    <section id="how-to-vote" className="relative">
      {/* Section opener */}
      <div className="shell py-16 text-left md:text-center lg:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Public voting · XRCC Berlin 2026
        </p>
        <h1 className="mx-auto mt-5 max-w-4xl text-balance text-3xl font-light leading-[1.1] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[56px]">
          How to vote for Retrace
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-[16px] leading-[1.6] text-muted lg:text-[17px]">
          Voting on the XRCC portal takes four quick steps. It&rsquo;s a little
          fiddly — here&rsquo;s exactly what to click.
        </p>
      </div>

      {/* Scroll-driven progressive disclosure (desktop) / vertical stack (mobile) */}
      <HowToVoteClient />
    </section>
  );
}
