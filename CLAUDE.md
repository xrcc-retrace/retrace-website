@AGENTS.md

# Retrace — technical overview site

Public single-page site for [Retrace](https://retracelab.com) — an AI coaching system: record an expert once through smart glasses or a phone, then coach every learner by voice while a second model verifies each step from the camera. Built at XRCC Berlin 2026 and carried on afterwards.

**Audience:** technical recruiters and engineering hiring managers evaluating the team (2–3 minute skim). Secondary: B2B pilot partners (HVAC / electrical contractors) who want proof it is real.

One-liner: *"Record an expert once. Coach every learner forever."*

## Run

```bash
npm run dev      # http://localhost:3000
npm run build    # production build → .next/
npm run start    # serve production build
```

Requires Node ≥ 20. No env vars required for local dev.

## Stack

- **Next.js 16.2** (App Router, Turbopack) — *not the Next.js in your training data; check `node_modules/next/dist/docs/` first*
- **React 19**
- **Tailwind v4** (CSS-vars driven; tokens in `app/globals.css`)
- **Framer Motion 12** — only `CustomCursor.tsx` uses it. Everything else is CSS.
- **`next/font/google`** — Geist (display + body) · Geist Mono (identifiers, labels, payloads). The CSS variable for mono is still named `--font-mono-jb` for historical reasons.
- **`@vercel/og`** — generates `/opengraph-image` at build time
- **Deploy target:** Vercel (`main` → retracelab.com; see README for the branch flow)

`package.json` still lists `three`, `@react-three/*`, `postprocessing` and `@splinetool/*` from the earlier site. Nothing imports them any more; drop them (and re-lock) in a separate change.

## Layout

```
retrace-website/
├── app/
│   ├── layout.tsx              # fonts + metadata (metadataBase retracelab.com) + OG card
│   ├── page.tsx                # composes the sections below, in this order
│   ├── globals.css             # design tokens, smooth anchors, .ident, .diagram, hero log keyframe
│   └── opengraph-image.tsx     # 1200×630 PNG via Satori
├── components/
│   ├── primitives/             # MonoLabel, Id (inline identifier), ChipTag, DiamondMark,
│   │                           # SectionHeader, CodeBlock (annotated payload), Cta
│   ├── StickyNav.tsx           # fixed pill nav; exports NAV_LINKS (anchors)
│   ├── MobileNav.tsx           # < md glass menu; same anchors
│   ├── Hero.tsx                # one-liner + mechanism sentence + learner demo video + wire log; ONE CTA (#architecture)
│   ├── Flows.tsx               # three flows as a staggered spread (not a 3-card grid)
│   ├── CapturePipeline.tsx     # upload → Pro extraction (JSON proof panels) → ffmpeg clips + done-frames → editable procedure; interviewer aside
│   ├── Architecture/
│   │   ├── index.tsx           # id="architecture": diagram, "Why not one model?", check_step + verdict payloads, session guarantees
│   │   └── ParallelDiagram.tsx # inline SVG, two lanes (Live / oracle). Wide (≥ sm) and narrow (< sm) drawings
│   ├── Troubleshoot.tsx        # five tool calls in order, with abbreviated args/results and phase transitions
│   ├── Stack.tsx               # server / client stack + 7 numbered decisions, each with its trade-off
│   ├── Numbers.tsx             # real figures only (poll cadence, fps, compression, floor, voices, modes)
│   ├── Team.tsx                # two members, role, GitHub, LinkedIn (href="#" until PM supplies URLs)
│   ├── Faq.tsx                 # native <details>, technical questions
│   ├── AfterHackathon.tsx      # id="after": dated band with [PM: fill in] placeholders — never invent facts
│   ├── Footer.tsx              # closing statement + Product / Code / Contact columns + quiet dated line
│   ├── LazyVideo.tsx           # poster-first <video>; sources attach on intersection
│   └── CustomCursor.tsx        # desktop-only reticle cursor (Framer springs → CSS vars)
├── lib/
│   └── links.ts                # trailer, emails, GitHub profile URLs, TEAM (GitHub + LinkedIn TODO); TestFlight removed (beta closed)
└── public/
    ├── LogoIcon.svg · retrace-logo.svg
    └── video/
        ├── Learner43ratio.webm (1.3 MB) + learner-poster.jpg   # hero
        ├── Expert43ratio.webm  (2.5 MB) + expert43-poster.jpg  # capture section, lazy
        ├── expert-demo.mp4 / .webm / -poster.jpg (~0.5 MB)      # mp4 fallback for the hero
        └── Expert43ratio.mp4   (26 MB) — NEVER reference this from the page
```

`next.config.ts` redirects the retired `/how-to-vote` and `/blog` routes to `/`.

## Source of truth for copy

Every technical claim on the page must map to code in `../main-local-server-test/` or `../retrace-ios/`, or to a fact the PM supplied. Identifiers (`check_step`, `/api/learner/session/{id}/verify`, `[ADVANCE]`, `completion_criteria`, `visual_verifiability`, `web_search_for_fix`, …) are rendered with the `Id` primitive (Geist Mono). Before changing a number or a mechanism sentence, re-read the file it comes from:

- Oracle semantics, confidence floor (0.6), dwell table, insist-once, trust-on-failure → `routers/learner.py`, `services/step_oracle.py`
- Live tool set (`check_step`, `get_reference_clip`, `go_to_step`; no `advance_step`) and model id → `services/prompt_builder.py`, `config.py`
- Token constraints, compression 100k → 40k, resumption, `MEDIA_RESOLUTION_MEDIUM` → `services/ephemeral_token.py`
- Troubleshoot tools, phases, two-step web research (Flash + `google_search`, then Pro structured output) → `services/troubleshoot/`
- Poll cadence (4 s), ~1 fps, wire quirks (binary JSON frames, `setup` frame, `goAway`) → `retrace-ios/.../CoachingSessionViewModel.swift`, `GeminiLiveService.swift`

Pilot facts in `AfterHackathon.tsx` come only from the PM. Placeholders carry a visible `[PM: fill in]` prefix and a `TODO(pm)` comment; leave them visible rather than guessing.

## Design tokens

Single source of truth in `app/globals.css`.

| Token | Value | Use |
|---|---|---|
| `--bg-canvas` | `#0B0C0E` | page background — never pure black |
| `--bg-surface` | `#1A1C1F` | panel fill |
| `--bg-surface-hi` | `#24272B` | raised card / hover |
| `--stroke` | `#33373C` | 1px hairlines — never shadows |
| `--stroke-hi` | `#4A4F55` | brighter hairline |
| `--ink` | `#F2F4F6` | primary text |
| `--muted` | `#A8AEB6` | secondary text |
| `--accent` | `#FFC21C` | the one CTA, and the oracle / verification path in diagrams and payloads |
| `--destructive` | `#F54236` | "broken / failed" framings only |

Type: **Geist** body/display (400/500/600, `-0.025em` to `-0.035em` tracking on display). **Geist Mono** for identifiers, labels, timestamps, payloads.

**Accent rule for diagrams:** the accent marks the verification lane and the join (`[ADVANCE]`). Lane A (Gemini Live) stays in `currentColor`. This is what makes the parallel structure readable at a glance; don't spend the accent elsewhere in that section.

## Design principles (the anti-deck rules)

1. **One bold idea per viewport.** A section that needs a 3-card grid is two sections.
2. **Vary layouts.** Never repeat the same block pattern twice in a row (the page alternates: hero grid → staggered spread → rail with proof panels → diagram → log sequence → numbered list → numbers band → two-column lists).
3. **Eyebrows and numbered markers only where the content is a sequence.** Capture stages, troubleshoot calls and the decisions list are sequences; nothing else gets numbers.
4. **Show the mechanism, not the adjective.** Payloads, endpoints and file paths beat "AI-powered". No "agentic", "transformative", "next-generation".
5. **Variable rhythm.** Loud (hero, architecture) interleaved with quiet (flows, numbers, FAQ).
6. **Asymmetric over symmetric.** Off-centre the content when in doubt.
7. **Real values only.** No invented metrics, no customer logos we don't have, no pilot facts the PM didn't supply.
8. **Operator voice.** Plain verbs, sentence case. Second person where it helps.

## Mobile and motion

- 16 px minimum gutters (`--gutter`), no horizontal scroll at 375 px. Every flex/grid child holding code or prose has `min-w-0`; `<pre>` blocks scroll inside their own container.
- The architecture diagram ships two SVGs (`ParallelDiagramWide` ≥ `sm`, `ParallelDiagramNarrow` below) so text stays ≥ 10 px at any width.
- Animation: the hero log's one page-load reveal (`.log-line`), the mobile menu's height transition, and the cursor. `prefers-reduced-motion` collapses all of them (global rule in `globals.css`) and turns smooth anchor scrolling off.
- Videos are poster-first. The hero loads `Learner43ratio.webm` with `preload="metadata"`; everything below the fold goes through `LazyVideo`.

## Adding or changing a section

1. Create `components/NewSection.tsx`. Lead with the mechanism; resist the card grid.
2. Place it in `app/page.tsx`.
3. Add the anchor to `NAV_LINKS` in `components/StickyNav.tsx` if it deserves nav placement (the mobile menu reads the same list).
4. Check the claim against the backend or iOS code before writing it.
5. `npm run build` clean, then check 375 px and desktop.

## Related repos / docs

- Backend: `../main-local-server-test/` (FastAPI + Gemini orchestration) → private repo https://github.com/hshwang34/retrace-server (not linked from the site)
- iOS client: `../retrace-ios/` (SwiftUI + Meta DAT SDK + Gemini Live) → private repo https://github.com/hshwang34/retrace-ios (not linked from the site)
- Project root: `../CLAUDE.md` for the full Retrace architecture (decisions 1–9)
- Product brief for this site: `../docs/product/briefs/001-website-technical-overview-redesign.md`
