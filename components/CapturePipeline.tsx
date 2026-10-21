import { CodeBlock, Id, MonoLabel, SectionHeader, ChipTag } from "./primitives";
import { LazyVideo } from "./LazyVideo";

// Shape mirrors models/procedure.py:ProcedureStep. Values are illustrative;
// the field names, enum values and the criterion style (present tense,
// spatial end-state, glossary vocabulary) are what the extractor is told to
// produce in services/gemini_processor.py.
const STEP_JSON = `{
  "step_number": 3,
  "title": "Thread the rivet nut onto the mandrel",
  "completion_criteria": "the rivet nut is threaded onto the mandrel,
    its flanged head flush against the nosepiece",
  "error_criteria": [
    "the rivet nut sits on the mandrel with its flanged head
     facing away from the nosepiece"
  ],
  "visual_verifiability": "reliable",   // reliable | marginal | none
  "clip_status": "ready"                // ready | failed | none
}`;

const PARTS_JSON = `"parts": [
  { "name": "mandrel",
    "appearance": "long solid steel rod, threaded on one end —
      unlike the rivet nut, which is short and hollow" }
]`;

const FILES = `data/clips/{procedure_id}/
├── step_1.mp4            H.264 + AAC, faststart
├── step_1_done.jpg       last frame = the oracle's reference
├── step_2.mp4
└── step_2_done.jpg`;

export function CapturePipeline() {
  return (
    <section id="capture" className="border-t border-stroke bg-surface/20">
      <div className="shell py-20 lg:py-32">
        <SectionHeader
          title="Capture: one video becomes a procedure the verifier can check."
          lede={
            <>
              The upload returns immediately; everything below runs in a
              background task. The extraction prompt is written for the
              verifier, not the reader: every criterion must be a single-frame
              spatial end-state, named with the same vocabulary as the parts
              glossary.
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          {/* Left: the expert recording, then the interviewer aside. */}
          <div className="min-w-0">
            <div className="overflow-hidden rounded-[12px] border border-stroke bg-canvas">
              <div className="relative aspect-[4/3]">
                <LazyVideo
                  webm="/video/Expert43ratio.webm"
                  poster="/video/expert43-poster.jpg"
                  label="Expert recording a task through smart glasses"
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-[4px] bg-canvas/80 px-2 py-1 backdrop-blur">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[color:var(--destructive)]"
                    aria-hidden
                  />
                  <MonoLabel className="text-ink">Expert · glasses</MonoLabel>
                </div>
              </div>
            </div>

            <div className="mt-8 border-l border-stroke-hi pl-5">
              <h3 className="text-[16px] font-medium text-ink">
                The interviewer asks what a learner would have asked
              </h3>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted/70">
                In progress · <Id>worktree-expert-interviewer</Id> branch, not yet on main
              </div>
              <p className="mt-2 text-[15px] leading-[1.6] text-muted">
                While the expert records, a Flash planner ticks every ~5 s,
                transcribes the narration and keeps a ledger of gaps. A pure
                policy module decides whether a gap is worth an interruption
                (time-sensitive only, 60 s minimum spacing, at most 6 live
                asks). Only then does Gemini Live voice the question; the mic
                is open to Live only inside the answer window. Answers upload
                with the video as an <Id>interview</Id> part and fold into the
                extraction prompt, and the AI&apos;s speech is ducked out of
                every step clip.
              </p>
            </div>
          </div>

          {/* Right: the pipeline as a rail with proof panels. */}
          <ol className="relative min-w-0 border-l border-stroke pl-6 sm:pl-8">
            <Stage
              label="Extract"
              title="Gemini 2.5 Pro, JSON-schema output"
            >
              <p>
                The video goes up through the Gemini Files API; Pro returns a{" "}
                <Id>GeminiVideoProcedureOutput</Id>: steps with timestamps,{" "}
                <Id>completion_criteria</Id>, up to three{" "}
                <Id>error_criteria</Id>, a <Id>visual_verifiability</Id> gate,
                and a procedure-level <Id>parts</Id> glossary. Step timestamps
                are clamped to the ffprobe duration before anything is cut.
              </p>
              <CodeBlock
                title="steps[2] · shape from models/procedure.py"
                code={STEP_JSON}
                className="mt-4"
              />
              <CodeBlock
                title="parts glossary · visual disambiguation on camera"
                code={PARTS_JSON}
                className="mt-3"
              />
            </Stage>

            <Stage label="Cut" title="ffmpeg per step, plus a done-state frame">
              <p>
                Each step becomes an MP4 clip and a last-frame JPEG. That JPEG
                is the reference the oracle compares against during coaching,
                so verification is image-to-image, not text-to-image. A failed
                cut marks only that step <Id>clip_status: failed</Id>; the
                procedure still ships.
              </p>
              <CodeBlock title="on disk" code={FILES} className="mt-4" />
            </Stage>

            <Stage label="Review" title="An editable procedure" last>
              <p>
                The procedure lands as <Id>completed</Id> or{" "}
                <Id>completed_partial</Id>. Title, step order, and every step
                field are editable from the iOS app and the server dashboard
                (<Id>PUT /api/procedures/{"{id}"}</Id>,{" "}
                <Id>PUT /api/procedures/{"{id}"}/steps/{"{n}"}</Id>).
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <ChipTag>processing</ChipTag>
                <ChipTag tone="accent">completed</ChipTag>
                <ChipTag tone="accent">completed_partial</ChipTag>
                <ChipTag tone="destructive">failed</ChipTag>
              </div>
            </Stage>
          </ol>
        </div>
      </div>
    </section>
  );
}

function Stage({
  label,
  title,
  children,
  last = false,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <li className={`relative ${last ? "" : "pb-12"}`}>
      <span
        aria-hidden
        className="absolute -left-6 top-[7px] h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-stroke-hi bg-canvas sm:-left-8"
      />
      <MonoLabel className="text-ink/80">{label}</MonoLabel>
      <h3 className="mt-1.5 text-[19px] font-medium tracking-[-0.01em] text-ink">
        {title}
      </h3>
      <div className="mt-3 text-[15px] leading-[1.65] text-muted">{children}</div>
    </li>
  );
}
