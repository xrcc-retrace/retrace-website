import { Id, SectionHeader } from "./primitives";

const STACK: { side: string; items: React.ReactNode[] }[] = [
  {
    side: "Server",
    items: [
      <>FastAPI, Python 3.11, <Id>asyncio</Id> background tasks</>,
      <>SQLite in WAL mode: <Id>procedures</Id> and <Id>steps</Id> tables; JSON columns for lists; ALTER-TABLE migrations</>,
      <><Id>google-genai</Id> SDK: 2.5 Pro for extraction, 2.5 Flash for the oracle, ranking and grounded research, <Id>v1alpha</Id> auth tokens for Live</>,
      <>ffmpeg / ffprobe for clips, done-frames and authoritative durations</>,
      <>Bonjour advertisement as <Id>_retrace._tcp.local.</Id> on port 8000 via zeroconf</>,
    ],
  },
  {
    side: "Client",
    items: [
      <>SwiftUI iOS app; one <Id>GeminiLiveSessionBase</Id> shared by coaching, troubleshoot and the expert interviewer</>,
      <>Meta DAT SDK 0.8 for Ray-Ban Meta camera streaming; a refcounted <Id>DeviceSessionManager</Id> is the sole owner of every <Id>DeviceSession</Id></>,
      <>iPhone fallback transport: <Id>AVCaptureSession</Id> at 720×1280 so both transports share one geometry</>,
      <>Direct WebSocket to <Id>BidiGenerateContentConstrained</Id>; JSON control frames arrive as binary, so the client sniffs the first byte before parsing</>,
      <>Simulated Ray-Ban HUD with its own design system (600×600 square viewport, hover-then-select, hold-to-confirm)</>,
    ],
  },
];

const DECISIONS: { title: React.ReactNode; body: React.ReactNode; tradeoff: React.ReactNode }[] = [
  {
    title: "Voice goes phone → Gemini Live directly",
    body: (
      <>
        No server in the audio path. The phone opens the WebSocket, streams
        mic PCM and ~1 fps JPEG, and plays audio back with barge-in (a{" "}
        <Id>serverContent.interrupted</Id> flushes the playback buffer).
      </>
    ),
    tradeoff: (
      <>
        The server cannot observe the conversation, so everything it needs to
        know arrives as tool calls or transcripts, and reconnect logic lives
        on the device.
      </>
    ),
  },
  {
    title: "Verification runs out-of-band in a Flash oracle",
    body: (
      <>
        A dedicated <Id>gemini-2.5-flash</Id> call per poll, JSON-schema
        output, zero thinking budget, 10 s timeout, image-to-image against the
        expert&apos;s done-frame.
      </>
    ),
    tradeoff: (
      <>
        Detection latency is the poll cadence (~4 s, ~8 s for{" "}
        <Id>marginal</Id> steps with a 2-confirmation dwell), and each poll is
        a billable call. In exchange: no hallucinated advances and a bias we
        can tune in one prompt.
      </>
    ),
  },
  {
    title: "The system prompt embeds only the current step",
    body: (
      <>
        Future steps reach Live exclusively through injected{" "}
        <Id>[ADVANCE]</Id> turns. On token refresh or resumption the prompt is
        rebuilt from <Id>session[&quot;current_step&quot;]</Id>.
      </>
    ),
    tradeoff: (
      <>
        Live cannot answer &ldquo;what comes after this?&rdquo;, and the client
        has to sequence the deferred injection after Live finishes voicing the
        confirmation. The gain is that it cannot narrate ahead.
      </>
    ),
  },
  {
    title: "Ephemeral tokens instead of a bundled key",
    body: (
      <>
        <Id>auth_tokens.create</Id> with the full <Id>LiveConnectConfig</Id>{" "}
        as constraints. One mint at session start, one per reconnect.
      </>
    ),
    tradeoff: (
      <>
        Tokens force the <Id>v1alpha</Id> Constrained endpoint, which has its
        own wire quirks (binary JSON frames, a required empty{" "}
        <Id>setup</Id> frame) and an extra round-trip before the socket opens.
      </>
    ),
  },
  {
    title: "One Live session carries audio and video, with compression",
    body: (
      <>
        Rather than a separate vision channel, frames ride the same session
        under <Id>MEDIA_RESOLUTION_MEDIUM</Id>; compression (100k → 40k) and
        resumption handles make duration open-ended.
      </>
    ),
    tradeoff: (
      <>
        Per-frame token burn means compression fires sooner than on an
        audio-only session, which shortens how far back Live can see. Step
        position is unaffected because it is re-anchored by the prompt, not
        remembered by the model.
      </>
    ),
  },
  {
    title: "Bonjour discovery on the LAN",
    body: (
      <>
        The server advertises <Id>_retrace._tcp</Id> with its mDNS hostname
        in the TXT record; the app&apos;s <Id>NWBrowser</Id> fills the server
        URL without a hardcoded IP.
      </>
    ),
    tradeoff: (
      <>
        It only works on the same network. A manual URL override stays in
        Server Settings for anything else.
      </>
    ),
  },
  {
    title: "Sessions live in memory; procedures live in SQLite",
    body: (
      <>
        Learner, troubleshoot and interview sessions are dicts in the server
        process; procedures, steps, clips and interview logs persist on disk.
      </>
    ),
    tradeoff: (
      <>
        A server restart ends every active session. Acceptable for a
        single-server pilot; the first thing to move if there are ever two
        servers.
      </>
    ),
  },
];

export function Stack() {
  return (
    <section id="stack" className="border-t border-stroke">
      <div className="shell py-20 lg:py-32">
        <SectionHeader title="Stack and the decisions behind it." />

        <div className="mt-12 grid gap-10 border-y border-stroke py-10 md:grid-cols-2 md:gap-16">
          {STACK.map((s) => (
            <div key={s.side} className="min-w-0">
              <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted">
                {s.side}
              </h3>
              <ul className="mt-4 space-y-3 text-[15px] leading-[1.6] text-ink">
                {s.items.map((it, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-stroke-hi" />
                    <span className="min-w-0">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <ol className="mt-4">
          {DECISIONS.map((d, i) => (
            <li
              key={i}
              className="grid gap-3 border-b border-stroke py-8 lg:grid-cols-[72px_1fr_1fr] lg:gap-8"
            >
              <div className="font-mono text-[13px] tabular-nums text-muted lg:pt-1">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="min-w-0">
                <h3 className="text-[19px] font-medium leading-[1.25] tracking-[-0.015em] text-ink">
                  {d.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-muted">{d.body}</p>
              </div>
              <div className="min-w-0 border-l border-stroke pl-5 lg:pl-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  Trade-off
                </div>
                <p className="mt-2 text-[15px] leading-[1.6] text-muted">{d.tradeoff}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
