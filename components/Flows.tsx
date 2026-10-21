import { Id } from "./primitives";

// Three flows, one asymmetric spread. Each block shifts right and shrinks, so
// the eye reads capture → coaching → troubleshoot as a hand-off, not a grid.
const FLOWS = [
  {
    id: "capture",
    title: "Capture → procedure",
    mechanism: (
      <>
        An expert records a task once. <Id>POST /api/expert/upload</Id> returns{" "}
        <Id>202</Id>; a background task has Gemini 2.5 Pro extract numbered
        steps with a spatial <Id>completion_criteria</Id> each, then ffmpeg
        cuts a clip and a done-state frame per step.
      </>
    ),
    href: "#capture",
    span: "lg:col-span-7 lg:col-start-1",
    size: "text-[28px] sm:text-[34px]",
  },
  {
    id: "coach",
    title: "Coached session",
    mechanism: (
      <>
        The phone holds a direct WebSocket to Gemini Live for voice. In
        parallel, a Flash oracle receives a camera frame every ~4 s at{" "}
        <Id>POST /verify</Id> and is the only thing allowed to advance a step.
      </>
    ),
    href: "#architecture",
    span: "lg:col-span-6 lg:col-start-4",
    size: "text-[26px] sm:text-[30px]",
  },
  {
    id: "troubleshoot",
    title: "Troubleshoot",
    mechanism: (
      <>
        No procedure yet? Live identifies the product, searches the library
        with <Id>search_procedures</Id>, falls back to a grounded web search
        with cited sources, and hands the result into a normal coaching
        session.
      </>
    ),
    href: "#troubleshoot",
    span: "lg:col-span-5 lg:col-start-7",
    size: "text-[24px] sm:text-[27px]",
  },
];

export function Flows() {
  return (
    <section id="flows" className="border-t border-stroke">
      <div className="shell py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-y-14">
          {FLOWS.map((f) => (
            <article key={f.id} className={`min-w-0 ${f.span}`}>
              <h2
                className={`font-medium leading-[1.1] tracking-[-0.025em] text-ink ${f.size}`}
              >
                {f.title}
              </h2>
              <p className="mt-4 max-w-[36rem] text-pretty text-[16px] leading-[1.65] text-muted">
                {f.mechanism}
              </p>
              <a
                href={f.href}
                className="mt-4 inline-block text-[14px] text-ink underline decoration-stroke-hi underline-offset-4 hover:decoration-ink"
              >
                Read the mechanism
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
