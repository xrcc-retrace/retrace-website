import { Eye, AudioLines, ListChecks, RotateCcw, Factory } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import BorderGlow from "./BorderGlow";

const differentiators: {
  title: string;
  body: string;
  icon: LucideIcon;
}[] = [
  {
    title: "First-person POV",
    body: "Same camera the humanoids will use. Ego4D had to convince 855 strangers to wear cameras around. Retrace's data comes from technicians whose existing capture habit is on-glasses or in-phone.",
    icon: Eye,
  },
  {
    title: "Spoken explanations",
    body: "Every video is paired with a live, real-time spoken narration explaining exactly why a person is performing an action, connecting visual movement to human intent.",
    icon: AudioLines,
  },
  {
    title: "Clear step boundaries",
    body: "The system records precise markers the exact moment a task step is completed successfully, giving AI models perfect proof of what a job done right looks like.",
    icon: ListChecks,
  },
  {
    title: "Learning from mistakes",
    body: "By capturing both the perfect expert demo and the real-world corrections made by beginners, the data teaches AI how to spot errors and self-correct mid-task.",
    icon: RotateCcw,
  },
  {
    title: "Industrial verticals",
    body: "Field service, OEM equipment, skilled trades. Exactly where Ego4D leans thin. The work humanoids will eventually be sold into.",
    icon: Factory,
  },
];

function Card({ title, body, icon: Icon }: (typeof differentiators)[number]) {
  return (
    <BorderGlow
      backgroundColor="var(--bg-surface)"
      borderColor="var(--stroke)"
      borderRadius={12}
      glowColor="44 100 55"
      colors={["#FFC21C", "#E0860F", "#FFE9B0"]}
      glowRadius={40}
      animated
      className="h-full"
    >
      <div className="flex flex-col gap-5 p-6 lg:p-8">
        <Icon className="size-6 text-accent" strokeWidth={1.5} />
        <div>
          <div className="text-[18px] font-semibold tracking-tight text-ink lg:text-[20px]">
            {title}
          </div>
          <p className="mt-2 text-pretty text-[15px] leading-[1.65] text-muted lg:text-[16px]">
            {body}
          </p>
        </div>
      </div>
    </BorderGlow>
  );
}

export function UniqueData() {
  return (
    <section id="unique-data" className="border-t border-stroke">
      <div className="shell py-24 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-balance font-light leading-[1.15] tracking-[-0.018em] text-ink text-3xl sm:text-4xl lg:text-[56px]">
            Five elements. One irreplaceable asset.
          </h3>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-[16px] leading-[1.65] text-muted lg:text-[18px]">
            When you combine first-person sight, spoken intent, and real
            industrial tasks, you get a highly specialized dataset that cannot be
            scraped from the web or replicated in a lab.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-4 lg:mt-20">
          {/* top row: 2 wide */}
          <div className="grid gap-4 lg:grid-cols-2">
            {differentiators.slice(0, 2).map((d) => (
              <Card key={d.title} {...d} />
            ))}
          </div>
          {/* bottom row: 3 */}
          <div className="grid gap-4 lg:grid-cols-3">
            {differentiators.slice(2).map((d) => (
              <Card key={d.title} {...d} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
