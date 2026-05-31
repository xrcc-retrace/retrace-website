import { Section, SectionHeading } from "./primitives";

const items = [
  {
    q: "Do I need smart glasses?",
    a: "No. Retrace runs on iPhone today. The phone holds the direct Gemini Live session, audio and camera. Ray-Ban Meta is an optional capture layer for hands-free work. Glasses and phone are interchangeable per session.",
  },
  {
    q: "What about the privacy of recorded video?",
    a: "Expert recordings stay in your tenant. Voice and video stream peer-to-peer between the technician's phone and Gemini Live. The recording is only retained server-side when you publish it as a procedure. Ephemeral tokens scope every Live session to a single voice, tool set, and resumption handle.",
  },
  {
    q: "Who owns the data?",
    a: "You do. Procedures, clips, and session telemetry are yours. Egocentric training data is opt-in per-procedure, with named export controls and a per-fleet kill switch.",
  },
  {
    q: "How is this different from Aquant or Neuron7?",
    a: "Aquant and Neuron7 are powerful service-intelligence tools you open on a phone or laptop after stopping the work. Retrace runs continuously through the technician's glasses or phone camera while they work: visual auto-advance, voice replies, no swivel-chair.",
  },
  {
    q: "How is this different from John Deere Service ADVISOR or Cat SIS?",
    a: "Those are office and shop tools: searchable manuals, diagnostic codes, calibrations. They don't deliver real-time visual guidance on the equipment. Retrace is the layer on top: the technician's hands stay on the machine, the model watches, the procedure auto-advances when the completion criterion is visible.",
  },
  {
    q: "Deployment model?",
    a: "Hackathon-stage today. iOS app on TestFlight, backend on AWS Lightsail (migrating to eu-central-1 before Berlin). Production deployment is a self-hosted FastAPI + your Gemini API tenant. No third-party data egress.",
  },
];

export function Faq() {
  return (
    <Section id="faq" eyebrow="Frequently Asked Questions (FAQ)" bordered={false}>
      <SectionHeading title="Six questions, six straight answers." />
      <div className="overflow-hidden border border-stroke">
        {items.map((it, i) => (
          <details
            key={i}
            className="group border-t border-stroke first:border-t-0 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-6 bg-surface px-6 py-5 text-[16px] font-medium text-ink transition-colors hover:bg-surface-hi lg:px-8">
              <span>{it.q}</span>
              <span
                aria-hidden
                className="font-mono text-xl leading-none text-muted transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="bg-canvas px-6 pb-6 pt-1 text-[15px] leading-relaxed text-muted lg:px-8 lg:pb-8">
              {it.a}
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
