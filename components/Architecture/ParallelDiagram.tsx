// Two-lane diagram of one coaching session. Lane A is the Gemini Live
// WebSocket (voice); Lane B is the out-of-band Flash oracle (verification).
// The accent is reserved for Lane B and the join, so the parallel structure
// reads at a glance. Two drawings share one claim: a wide one for ≥ 768 px
// and a narrow one below that, so text stays ≥ 10 px at any width.
// Marker ids are prefixed per drawing: the hidden copy must not capture url(#…).

const ACCENT = "#FFC21C";
const CLAIM =
  "One coaching session: Gemini Live carries voice and ~1 fps video over a direct WebSocket from the phone; a separate Flash oracle receives a frame every ~4 s via POST /verify, compares it to the step's done-frame and criteria, and only its confirmed verdict advances the step, which the phone injects back into Live as an [ADVANCE] text turn.";

function Defs({ prefix }: { prefix: string }) {
  return (
    <defs>
      <marker
        id={`${prefix}-arrow`}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
      </marker>
      <marker
        id={`${prefix}-arrow-accent`}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={ACCENT} />
      </marker>
    </defs>
  );
}

function Box({
  x,
  y,
  w,
  h,
  title,
  sub,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  accent?: boolean;
}) {
  const cx = x + w / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="6"
        fill="var(--bg-canvas)"
        stroke={accent ? ACCENT : "currentColor"}
        strokeOpacity={accent ? 0.9 : 0.55}
        strokeWidth="1.25"
      />
      <text
        x={cx}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 4}
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="600"
        fill="currentColor"
      >
        {title}
      </text>
      {sub && (
        <text
          x={cx}
          y={y + h / 2 + 13}
          textAnchor="middle"
          fontSize="10.5"
          className="mono"
          fill={accent ? ACCENT : "currentColor"}
          fillOpacity={accent ? 1 : 0.7}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

export function ParallelDiagramWide() {
  return (
    <svg
      viewBox="0 0 960 452"
      role="img"
      aria-label={CLAIM}
      className="diagram hidden h-auto w-full max-w-full text-ink md:block"
    >
      <Defs prefix="w" />

      {/* Shared clock */}
      <line x1="330" y1="34" x2="788" y2="34" stroke="currentColor" strokeOpacity="0.35" />
      {[
        [330, "0 s"],
        [559, "~4 s"],
        [788, "~8 s"],
      ].map(([x, t]) => (
        <g key={String(x)}>
          <line x1={x} y1="29" x2={x} y2="39" stroke="currentColor" strokeOpacity="0.5" />
          <text x={x} y="20" textAnchor="middle" fontSize="11" className="mono" fill="currentColor" fillOpacity="0.7">
            {t}
          </text>
        </g>
      ))}
      <text x="230" y="38" fontSize="11" className="mono" fill="currentColor" fillOpacity="0.5">
        shared clock
      </text>

      {/* Lane A */}
      <rect x="8" y="56" width="944" height="180" rx="8" fill="currentColor" fillOpacity="0.035" stroke="currentColor" strokeOpacity="0.15" />
      <text x="24" y="80" fontSize="12.5" fontWeight="600" fill="currentColor">Lane A · Gemini Live</text>
      <text x="24" y="96" fontSize="10.5" className="mono" fill="currentColor" fillOpacity="0.65">gemini-3.1-flash-live-preview</text>
      <text x="24" y="112" fontSize="10.5" fill="currentColor" fillOpacity="0.65">voice · continuous</text>

      <Box x={800} y={112} w={150} h={96} title="Gemini Live" sub="WebSocket, direct" />

      <line x1="330" y1="136" x2="798" y2="136" stroke="currentColor" strokeOpacity="0.75" markerEnd="url(#w-arrow)" />
      <text x="564" y="128" textAnchor="middle" fontSize="11" className="mono" fill="currentColor" fillOpacity="0.85">
        realtimeInput.audio + .video (image/jpeg, ~1 fps)
      </text>

      <line x1="798" y1="160" x2="332" y2="160" stroke="currentColor" strokeOpacity="0.75" markerEnd="url(#w-arrow)" />
      <text x="564" y="175" textAnchor="middle" fontSize="11" className="mono" fill="currentColor" fillOpacity="0.85">
        audio out + input/output transcripts
      </text>

      {/* Join: verdict enters the phone, phone injects a text turn into Live */}
      <path d="M 280 350 V 188 H 798" fill="none" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#w-arrow-accent)" />
      <text x="564" y="204" textAnchor="middle" fontSize="11" className="mono" fill={ACCENT}>
        realtimeInput.text · [ADVANCE] / [CORRECTION]
      </text>
      <text x="340" y="226" fontSize="10.5" fill="currentColor" fillOpacity="0.6">
        Prompt embeds only the current step. Live has no tool that advances a step; it speaks what the join hands it.
      </text>

      {/* Lane B */}
      <rect x="8" y="252" width="944" height="192" rx="8" fill={ACCENT} fillOpacity="0.04" stroke={ACCENT} strokeOpacity="0.45" />
      <text x="24" y="276" fontSize="12.5" fontWeight="600" fill={ACCENT}>Lane B · Flash oracle</text>
      <text x="24" y="292" fontSize="10.5" className="mono" fill={ACCENT} fillOpacity="0.85">gemini-2.5-flash</text>
      <text x="24" y="308" fontSize="10.5" fill="currentColor" fillOpacity="0.65">verification · out of band</text>

      <Box x={500} y={310} w={150} h={64} title="Retrace server" sub="POST /verify" />
      <Box x={800} y={310} w={150} h={64} title="Flash oracle" sub="thinking_budget: 0" accent />

      <line x1="330" y1="326" x2="498" y2="326" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#w-arrow-accent)" />
      <text x="415" y="317" textAnchor="middle" fontSize="10.5" className="mono" fill={ACCENT}>
        frame · ~4 s or check_step
      </text>

      <line x1="650" y1="326" x2="798" y2="326" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#w-arrow-accent)" />
      <text x="724" y="300" textAnchor="middle" fontSize="10.5" className="mono" fill={ACCENT}>
        frame + step_N_done.jpg
      </text>
      <text x="724" y="313" textAnchor="middle" fontSize="10.5" className="mono" fill={ACCENT}>
        + criteria + glossary
      </text>

      <line x1="798" y1="358" x2="652" y2="358" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#w-arrow-accent)" />
      <line x1="498" y1="358" x2="332" y2="358" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#w-arrow-accent)" />
      <text x="415" y="374" textAnchor="middle" fontSize="10.5" className="mono" fill={ACCENT}>
        advanced · method: visual
      </text>
      <text x="500" y="394" fontSize="10.5" className="mono" fill={ACCENT}>
        verdict → {"{ complete, confidence, error_index, reason }"}
      </text>
      <text x="340" y="428" fontSize="10.5" fill="currentColor" fillOpacity="0.6">
        Biased against false positives: confidence ≥ 0.6 · dwell 1 (reliable) / 2 (marginal) before a poll advance.
      </text>

      {/* The phone spans both lanes: one device, two paths. Drawn last. */}
      <Box x={230} y={112} w={100} h={270} title="Phone" sub="SwiftUI" />
      <text x="280" y="300" textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity="0.55">
        cached frame
      </text>
    </svg>
  );
}

export function ParallelDiagramNarrow() {
  return (
    <svg
      viewBox="0 0 360 690"
      role="img"
      aria-label={CLAIM}
      className="diagram h-auto w-full max-w-full text-ink md:hidden"
    >
      <Defs prefix="n" />

      {/* Lane A */}
      <rect x="4" y="4" width="352" height="256" rx="8" fill="currentColor" fillOpacity="0.035" stroke="currentColor" strokeOpacity="0.15" />
      <text x="18" y="28" fontSize="12.5" fontWeight="600" fill="currentColor">Lane A · Gemini Live</text>
      <text x="18" y="44" fontSize="10.5" className="mono" fill="currentColor" fillOpacity="0.65">gemini-3.1-flash-live-preview · voice</text>

      <Box x={18} y={66} w={96} h={126} title="Phone" sub="SwiftUI" />
      <Box x={246} y={66} w={96} h={126} title="Gemini Live" sub="WebSocket" />

      <line x1="114" y1="92" x2="244" y2="92" stroke="currentColor" strokeOpacity="0.75" markerEnd="url(#n-arrow)" />
      <text x="180" y="84" textAnchor="middle" fontSize="10" className="mono" fill="currentColor" fillOpacity="0.85">audio + jpeg ~1 fps</text>

      <line x1="244" y1="126" x2="116" y2="126" stroke="currentColor" strokeOpacity="0.75" markerEnd="url(#n-arrow)" />
      <text x="180" y="140" textAnchor="middle" fontSize="10" className="mono" fill="currentColor" fillOpacity="0.85">audio + transcripts</text>

      <line x1="114" y1="172" x2="244" y2="172" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#n-arrow-accent)" />
      <text x="180" y="164" textAnchor="middle" fontSize="10" className="mono" fill={ACCENT}>[ADVANCE] text turn</text>

      <text x="18" y="222" fontSize="10.5" fill="currentColor" fillOpacity="0.6">Prompt embeds only the current step.</text>
      <text x="18" y="238" fontSize="10.5" fill="currentColor" fillOpacity="0.6">Live has no tool that advances a step.</text>

      {/* Lane B */}
      <rect x="4" y="276" width="352" height="406" rx="8" fill={ACCENT} fillOpacity="0.04" stroke={ACCENT} strokeOpacity="0.45" />
      <text x="18" y="300" fontSize="12.5" fontWeight="600" fill={ACCENT}>Lane B · Flash oracle</text>
      <text x="18" y="316" fontSize="10.5" className="mono" fill={ACCENT} fillOpacity="0.85">gemini-2.5-flash · out of band</text>

      <Box x={18} y={336} w={122} h={48} title="Phone" sub="cached frame" />
      <line x1="79" y1="384" x2="79" y2="418" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#n-arrow-accent)" />
      <text x="92" y="406" fontSize="10" className="mono" fill={ACCENT}>frame · ~4 s or check_step</text>

      <Box x={18} y={420} w={122} h={48} title="Retrace server" sub="POST /verify" />
      <line x1="79" y1="468" x2="79" y2="502" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#n-arrow-accent)" />
      <text x="92" y="490" fontSize="10" className="mono" fill={ACCENT}>frame + done.jpg + criteria</text>

      <Box x={18} y={504} w={122} h={48} title="Flash oracle" sub="thinking_budget: 0" accent />

      {/* Verdict returns to the server, server advances, phone injects. */}
      <path d="M 140 528 H 300 V 360 H 142" fill="none" stroke={ACCENT} strokeWidth="1.5" markerEnd="url(#n-arrow-accent)" />
      <text x="150" y="548" fontSize="10" className="mono" fill={ACCENT}>{"{ complete, confidence,"}</text>
      <text x="150" y="561" fontSize="10" className="mono" fill={ACCENT}>{"error_index, reason }"}</text>
      <text x="292" y="450" textAnchor="end" fontSize="10" className="mono" fill={ACCENT}>server advances</text>
      <text x="292" y="463" textAnchor="end" fontSize="10" className="mono" fill={ACCENT}>method: visual</text>
      <text x="150" y="352" fontSize="10" className="mono" fill={ACCENT}>[ADVANCE] into Lane A</text>

      <text x="18" y="592" fontSize="10.5" fill="currentColor" fillOpacity="0.6">Biased against false positives:</text>
      <text x="18" y="608" fontSize="10.5" fill="currentColor" fillOpacity="0.6">confidence ≥ 0.6 · dwell 1 (reliable) / 2 (marginal)</text>
      <text x="18" y="624" fontSize="10.5" fill="currentColor" fillOpacity="0.6">On-demand: insist-once · trust-on-failure.</text>
      <text x="18" y="660" fontSize="10.5" className="mono" fill="currentColor" fillOpacity="0.5">voice ≤ 200 ms · verification ~4 s</text>
    </svg>
  );
}
