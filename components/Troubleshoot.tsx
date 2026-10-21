import { Id, SectionHeader } from "./primitives";

// The five tools in the order the troubleshoot prompt calls them, with the
// phase transitions from services/troubleshoot/session.py. Args and results
// are abbreviated from services/troubleshoot/handlers.py.
const CALLS = [
  {
    phase: "discovering",
    name: "identify_product",
    args: `{ "query": "pneumatic rivet nut tool", "category": "hand tool" }`,
    result: `{ "status": "ok",
  "product": { "product_name": "…", "confidence": 0.82 },
  "message": "Describe it back in one sentence and ASK to confirm." }`,
    note: (
      <>
        The query is canonicalized server-side against the library before it
        becomes the product name. Phase does not move yet; only the user can
        confirm.
      </>
    ),
  },
  {
    phase: "discovering → diagnosing",
    name: "confirm_identification",
    args: `{}`,
    result: `{ "status": "ok",
  "message": "Confirmed. Ask one observable-symptom question." }`,
    note: <>An explicit yes from the user is the only way into diagnosis.</>,
  },
  {
    phase: "diagnosing → resolving",
    name: "search_procedures",
    args: `{ "product_name": "…", "symptom": "mandrel spins, nut won't set" }`,
    result: `{ "status": "no_match", "candidates": [],
  "message": "Call web_search_for_fix next." }`,
    note: (
      <>
        Gemini 2.5 Flash ranks the existing library by product + symptom. No
        separate search index: tens of procedures, one ranking call.
      </>
    ),
  },
  {
    phase: "resolving",
    name: "web_search_for_fix",
    args: `{ "product_name": "…", "symptom": "…", "diagnostic_summary": "…" }`,
    result: `{ "status": "ok",
  "procedure_id": "9c1e…",
  "sources_count": 4,
  "message": "Generated a fix from 4 online sources." }`,
    note: (
      <>
        Two steps, because <Id>google_search</Id> and{" "}
        <Id>response_schema</Id> are mutually exclusive: Flash researches with
        grounding and returns <Id>groundingChunks</Id> URLs; Pro then writes a
        structured procedure with those URLs echoed into <Id>sources</Id>. The
        procedure is saved with <Id>source_type: web</Id>, its steps{" "}
        <Id>clip_status: none</Id>.
      </>
    ),
  },
  {
    phase: "resolving → resolved",
    name: "handoff_to_learner",
    args: `{ "procedure_id": "9c1e…", "summary": "…" }`,
    result: `{ "status": "ok",
  "message": "Give a brief closing line and stop talking." }`,
    note: (
      <>
        The phone then calls{" "}
        <Id>POST /api/troubleshoot/session/{"{id}"}/handoff</Id>, which returns
        a full learner <Id>SessionStartResponse</Id>. From here it is the same
        two-lane coaching session as above.
      </>
    ),
  },
];

export function Troubleshoot() {
  return (
    <section id="troubleshoot" className="border-t border-stroke bg-surface/20">
      <div className="shell py-20 lg:py-32">
        <SectionHeader
          title="Troubleshoot: from a broken thing to a coaching session in five tool calls."
          lede={
            <>
              A parallel mode with its own router, session store and prompt.
              No procedure is required to start; Live drives the diagnosis
              through function calls, and every call is logged to the
              session&apos;s diagnostic log.
            </>
          }
        />

        <ol className="mt-14 divide-y divide-stroke border-y border-stroke">
          {CALLS.map((c, i) => (
            <li
              key={c.name}
              className="grid gap-4 py-8 lg:grid-cols-[200px_1fr_1.1fr] lg:gap-8"
            >
              <div className="min-w-0">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {i + 1} · {c.phase}
                </div>
                <h3 className="mt-2 break-words font-mono text-[15px] text-ink">
                  {c.name}
                </h3>
              </div>
              <div className="min-w-0 text-[14.5px] leading-[1.6] text-muted">
                {c.note}
              </div>
              <div className="min-w-0 overflow-hidden rounded-[8px] border border-stroke bg-canvas">
                <pre className="whitespace-pre-wrap break-words border-b border-stroke px-4 py-3 text-[12px] leading-[1.55] text-ink">
                  <code>{`→ ${c.name}(${c.args})`}</code>
                </pre>
                <pre className="whitespace-pre-wrap break-words px-4 py-3 text-[12px] leading-[1.55] text-muted">
                  <code>{`← ${c.result}`}</code>
                </pre>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
