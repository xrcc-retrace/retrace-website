import { CodeBlock, Id, SectionHeader } from "../primitives";
import { ParallelDiagramNarrow, ParallelDiagramWide } from "./ParallelDiagram";

// Wire shapes. The tool call is the Gemini Live `toolCall` message as the
// iOS client parses it (GeminiLiveService.swift); the verdict is the
// OracleVerdict schema (services/step_oracle.py); the /verify body is what
// routers/learner.py returns for an on-demand check.
const TOOL_CALL = `// Gemini Live → phone
{ "toolCall": { "functionCalls": [
    { "id": "call_8f2…",
      "name": "check_step",
      "args": { "claim": "done" } }      // "done" | "question"
] } }

// phone → server (multipart; a frame can't ride the tool-call body)
POST /api/learner/session/{id}/verify
  mode  = on_demand
  claim = done
  frame = <latest cached JPEG>`;

const VERDICT = `// Flash oracle → server  (OracleVerdict, JSON schema)
{ "complete": true,
  "confidence": 0.86,        // floor 0.6
  "error_index": null,       // index into step.error_criteria
  "reason": "" }

// server → phone
{ "status": "advanced",
  "method": "visual",
  "new_step": 4,
  "step_title": "Fire the tool and set the fastener",
  "completion_criteria": "…" }

// phone → Live, after Live finishes voicing the confirmation
realtimeInput.text:
  "[ADVANCE] The learner just finished this step. Next step: …"`;

const GUARANTEES: { title: React.ReactNode; body: React.ReactNode }[] = [
  {
    title: "The phone never holds the API key",
    body: (
      <>
        The server mints an ephemeral token through the <Id>v1alpha</Id>{" "}
        <Id>auth_tokens</Id> API (<Id>uses=1</Id>, 1 h expiry, 120 s window to
        open the socket). Model, system prompt, tool set, voice,
        transcription, compression and resumption handle are locked into the
        token via <Id>LiveConnectConstraints</Id>, so the client cannot alter
        them.
      </>
    ),
  },
  {
    title: "Context compression: 100k → 40k",
    body: (
      <>
        <Id>ContextWindowCompressionConfig</Id> with{" "}
        <Id>trigger_tokens=100_000</Id> and a sliding window of{" "}
        <Id>target_tokens=40_000</Id> keeps one audio+video session open
        indefinitely. Step state is re-anchored through the prompt, so a
        compression only shortens visual memory, never the procedure
        position.
      </>
    ),
  },
  {
    title: "Session resumption on goAway",
    body: (
      <>
        Live emits <Id>sessionResumptionUpdate.newHandle</Id> every second or
        two. On <Id>goAway</Id> the client mints a token with{" "}
        <Id>?handle=</Id>, reopens the socket, waits for{" "}
        <Id>setupComplete</Id>, then injects{" "}
        <Id>GET /session/{"{id}"}/context-summary</Id> as a user turn.
      </>
    ),
  },
  {
    title: "Insist-once, trust-on-failure",
    body: (
      <>
        On a <Id>claim: done</Id> the oracle may say <Id>not_confirmed</Id>{" "}
        once with a reason; a second consecutive done-claim on the same step
        advances with <Id>method: verbal</Id>. If the oracle times out (10 s)
        or the step is <Id>visual_verifiability: none</Id>, the learner&apos;s
        word is trusted. The session never blocks on a model.
      </>
    ),
  },
];

export function Architecture() {
  return (
    <section id="architecture" className="border-t border-stroke">
      <div className="shell py-20 lg:py-32">
        <SectionHeader
          title="Coaching: two models, one session. Only one of them may say a step is done."
          lede={
            <>
              Gemini Live is a good conversationalist and a poor judge of
              whether a nut is flush. So the session splits: Live owns voice
              and the camera for ad-hoc questions; a separate Flash call owns
              completion. The join is a text turn the phone writes, which
              means every step change Live announces is a verified event.
            </>
          }
        />

        <figure className="mt-14 min-w-0 rounded-[12px] border border-stroke bg-surface/40 p-3 sm:p-5">
          <ParallelDiagramWide />
          <ParallelDiagramNarrow />
          <figcaption className="mt-3 px-1 text-[13px] leading-[1.55] text-muted">
            One session on a shared clock. Lane A streams audio and ~1 fps
            JPEG to Gemini Live over a direct WebSocket. Lane B posts a frame
            to <Id>/verify</Id> every ~4 s in Active mode, or on demand when
            Live calls <Id>check_step</Id>; the oracle&apos;s confirmed verdict
            advances the step server-side, and the phone injects{" "}
            <Id>[ADVANCE]</Id> or <Id>[CORRECTION]</Id> into Live as text.
          </figcaption>
        </figure>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Why two models */}
          <div className="min-w-0">
            <h3 className="text-[24px] font-medium leading-[1.15] tracking-[-0.02em] text-ink sm:text-[28px]">
              Why not one model?
            </h3>
            <div className="mt-5 space-y-5 text-[16px] leading-[1.65] text-muted">
              <p>
                We tried it. With an in-band <Id>[check]</Id> heartbeat, Live
                hallucinated advances on empty scenes, and a false
                &ldquo;done&rdquo; pulls a learner forward mid-action. A missed
                completion only costs the learner a sentence. The oracle prompt
                is written for that asymmetry: when the frame is ambiguous,
                occluded, or merely resembles the reference, it answers{" "}
                <Id>complete: false</Id>.
              </p>
              <p>
                The latency budgets also differ by an order of magnitude. The
                voice path has to feel conversational, so it goes phone →
                model with no server hop (adding one costs 100–200 ms).
                Verification can take ~4 s and nobody notices, because Live
                covers it (&ldquo;let me take a look&rdquo;). Putting both jobs in one
                model means paying the strict budget for the lenient job.
              </p>
              <p>
                Removing the decision from Live also removes the tool: the old{" "}
                <Id>advance_step</Id> is no longer in Live&apos;s toolset.{" "}
                <Id>check_step</Id> asks; it does not decide. The server
                tags each advance <Id>method: visual</Id> or{" "}
                <Id>method: verbal</Id> so the session history says which path
                moved the step.
              </p>
            </div>
            <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-stroke pt-5">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Voice path
                </dt>
                <dd className="mt-1 text-[22px] font-medium tracking-[-0.02em] text-ink">
                  ≤ 200 ms
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  Verification
                </dt>
                <dd className="mt-1 text-[22px] font-medium tracking-[-0.02em] text-ink">
                  ~4 s
                </dd>
              </div>
            </dl>
          </div>

          {/* Payloads */}
          <div className="flex min-w-0 flex-col gap-4">
            <CodeBlock
              title="check_step · the only completion tool Live has"
              code={TOOL_CALL}
              notes={[
                <>
                  The phone intercepts <Id>check_step</Id> on-device and
                  synthesizes the <Id>toolResponse</Id> itself. Every other
                  tool forwards to <Id>POST /session/{"{id}"}/tool-call</Id>.
                </>,
                <>
                  The audio send gate closes while a tool call is pending, so
                  no poll can race the on-demand check.
                </>,
              ]}
            />
            <CodeBlock
              title="verdict · oracle → server → phone → Live"
              tone="accent"
              code={VERDICT}
              notes={[
                <>
                  Image-to-image: the oracle sees the learner&apos;s frame next
                  to <Id>step_N_done.jpg</Id>, plus <Id>completion_criteria</Id>,{" "}
                  <Id>error_criteria</Id> and the parts glossary.
                </>,
                <>
                  The <Id>toolResponse</Id> Live receives carries zero
                  next-step content; the next step arrives only in the
                  deferred <Id>[ADVANCE]</Id> turn, so Live cannot narrate
                  ahead.
                </>,
              ]}
            />
          </div>
        </div>

        {/* Session guarantees */}
        <ul className="mt-14 grid gap-x-10 gap-y-8 border-t border-stroke pt-10 sm:grid-cols-2">
          {GUARANTEES.map((g, i) => (
            <li key={i} className="min-w-0">
              <h4 className="text-[16.5px] font-medium text-ink">{g.title}</h4>
              <p className="mt-2 text-[15px] leading-[1.6] text-muted">{g.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
