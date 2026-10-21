import { Id, SectionHeader } from "./primitives";

const ITEMS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Where does the Gemini API key live?",
    a: (
      <>
        Only on the server. Each session start mints an ephemeral token
        through the <Id>v1alpha</Id> <Id>auth_tokens</Id> API with{" "}
        <Id>uses=1</Id>, a one-hour expiry and a 120 s window to open the
        socket. The model, system prompt, tools, voice, compression and
        resumption settings are constraints baked into that token, so the
        phone connects to Gemini Live directly but cannot change what the
        session is allowed to do.
      </>
    ),
  },
  {
    q: "What happens when the WebSocket drops or Gemini sends goAway?",
    a: (
      <>
        The client keeps the latest <Id>sessionResumptionUpdate.newHandle</Id>.
        On <Id>goAway</Id> or a socket error it calls{" "}
        <Id>POST /session/{"{id}"}/token?handle=…</Id>, reopens the socket,
        waits for <Id>setupComplete</Id>, then injects the server&apos;s{" "}
        <Id>context-summary</Id> as a user turn. The prompt is rebuilt from
        the server&apos;s current step, so a resumed session never reopens on
        step 1.
      </>
    ),
  },
  {
    q: "What if the verification oracle is slow or down?",
    a: (
      <>
        The poll path returns <Id>pending</Id> and tries again on the next
        tick; nothing advances. The on-demand path trusts the learner: a{" "}
        <Id>claim: done</Id> with no verdict (10 s timeout, parse failure, no
        usable frame) advances with <Id>method: verbal</Id>, and a{" "}
        <Id>claim: question</Id> returns <Id>check_failed</Id> so Live asks
        the learner to describe what they see. Coaching never blocks on the
        oracle.
      </>
    ),
  },
  {
    q: "Why ~4 seconds between checks?",
    a: (
      <>
        A Flash call with <Id>thinking_budget=0</Id> returns in about a
        second, and the oracle is deliberately biased toward{" "}
        <Id>complete: false</Id>. Polling faster buys little and costs a
        billable call per tick; polling slower makes auto-advance feel late.
        Four seconds, with a second confirmation required for{" "}
        <Id>marginal</Id> steps, was where a confirmed advance felt earned
        rather than guessed. The poll also pauses while audio is active and
        while any tool call is pending.
      </>
    ),
  },
  {
    q: "Does it work without the glasses?",
    a: (
      <>
        Yes. <Id>CaptureTransport</Id> is chosen per session: <Id>.glasses</Id>{" "}
        streams from Ray-Ban Meta through the DAT SDK 0.8, <Id>.iPhone</Id>{" "}
        wraps <Id>AVCaptureSession</Id> at the same 720×1280 geometry. Both
        recording and coaching honour it end to end, and the app runs the
        full flow with no glasses paired.
      </>
    ),
  },
  {
    q: "What is stored, and where?",
    a: (
      <>
        Procedures and steps in SQLite (<Id>data/retrace.db</Id>, WAL mode).
        Source videos in <Id>uploads/</Id>; per-step clips and done-frames in{" "}
        <Id>data/clips/{"{procedure_id}"}/</Id>; interview logs in{" "}
        <Id>data/interviews/</Id>. Learner and troubleshoot sessions are
        in-memory and end with the server process. Voice and camera frames
        stream from the phone to Gemini and are not retained by the server.
      </>
    ),
  },
  {
    q: "Does Gemini Live ever decide a step is done?",
    a: (
      <>
        No. The <Id>advance_step</Id> tool was removed from Live&apos;s
        toolset after it hallucinated advances on empty scenes. Live can only
        ask (<Id>check_step</Id>); the oracle answers; the server advances;
        and Live learns about it from the <Id>[ADVANCE]</Id> turn the phone
        injects. The server handler for <Id>advance_step</Id> still exists
        for the HUD swipe gesture.
      </>
    ),
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-stroke">
      <div className="shell py-20 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHeader
            title="Questions engineers ask first."
            lede={<>Straight answers, each backed by a file in one of the two repos.</>}
          />
          <div className="divide-y divide-stroke border-y border-stroke">
            {ITEMS.map((it, i) => (
              <details
                key={i}
                className="group [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-[16.5px] font-medium leading-[1.4] text-ink transition-colors hover:text-ink/80">
                  <span>{it.q}</span>
                  <span
                    aria-hidden
                    className="mt-0.5 font-mono text-xl leading-none text-muted transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="max-w-[44rem] pb-6 text-[15px] leading-[1.65] text-muted">
                  {it.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
