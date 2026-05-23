@AGENTS.md

# Retrace — investor landing site

Public single-page marketing site for [Retrace](https://github.com/) — an AI coaching system for industrial field technicians. Built for the XRCC Berlin 2026 hackathon. **Audience:** investors and industrial OEM pilot partners.

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
- **Framer Motion 12** (only the Hero and BuiltFor tabs use it; everything else is pure CSS)
- **`next/font/google`** — Inter (display + body) · Geist Mono (labels, mono accents)
- **`@vercel/og`** — generates `/opengraph-image` at build time
- **Deploy target:** Vercel (not yet wired)

## Layout

```
retrace-website/
├── app/
│   ├── layout.tsx            # fonts + metadata + OG card
│   ├── page.tsx              # composes 8 sections in order
│   ├── globals.css           # design tokens + Tailwind base
│   └── opengraph-image.tsx   # 1200×630 PNG via Satori
├── components/
│   ├── primitives/           # MonoLabel, ChipTag, Cta, Section, DiamondMark
│   ├── Hero.tsx              # client component — cursor-reactive HUD
│   ├── Problem.tsx           # editorial spread (no card grid)
│   ├── ProductTour/          # three cinematic panels (Capture · Coach · Troubleshoot)
│   ├── BuiltFor/             # client component — tabbed persona switcher
│   ├── WhyNow.tsx            # compact 2026-unlocks prose
│   ├── HumanoidArc.tsx       # deep platform-play section
│   ├── Team.tsx              # team cards + close + CTA
│   ├── Faq.tsx               # native <details> accordion
│   ├── StickyNav.tsx         # fixed top nav
│   └── Footer.tsx
├── lib/
│   └── procedure.ts          # static demo SOP (industrial framing)
└── public/
    ├── retrace-logo.svg
    └── video/                # expert-demo.mp4 + .webm + .jpg poster (~600 KB each)
```

## Design tokens — locked from the pitch deck

Single source of truth in `app/globals.css`. Match `main-local-server-test/pitch/generate_deck.py:30-52`.

| Token | Value | Use |
|---|---|---|
| `--bg-canvas` | `#0B0C0E` | page background — never pure black |
| `--bg-surface` | `#1A1C1F` | panel fill |
| `--bg-surface-hi` | `#24272B` | raised card / hover |
| `--stroke` | `#33373C` | 1px hairlines — never shadows |
| `--stroke-hi` | `#4A4F55` | brighter hairline |
| `--ink` | `#F2F4F6` | primary text |
| `--muted` | `#A8AEB6` | secondary text |
| `--accent` | `#FFC21C` | warm HUD focus — one CTA per section, never background |
| `--destructive` | `#F54236` | "broken / failed" framings only |

Type: **Inter** body/display (400/500/600/700, `-0.025em` tracking on display). **Geist Mono** for labels, timestamps, coord readouts (uppercase, `+0.14em`).

## The hero — cursor-reactive HUD reticle

`components/Hero.tsx` is the only signature interactive moment on the site. Move the cursor across the product canvas:

- Reticle (corner brackets + crosshair) follows in screen-space.
- **Left zone** (over recording) → bounding box materializes on the video; chip reads `TRACKING · OBJECT 03`.
- **Right zone** (over SOP) → hovered step lights up; chip reads `READ STEP · 03 / 06`.
- **Center zone** → animated dashed hairline connects recording region to active SOP step; chip reads `ADVANCE_STEP · candidate`.
- Composition has subtle ±2° parallax tilt that follows the cursor.

**Implementation:** Framer Motion springs drive CSS custom properties (`--rx`, `--ry`) on the container — no React re-renders per frame. Gated on `@media (hover: hover) and (pointer: fine)` and `prefers-reduced-motion`.

## Design principles (the anti-deck rules)

The v0 of this site translated the pitch deck slide-by-slide and read like one. v1 fixed it. Future changes must follow:

1. **One bold idea per viewport.** A section that needs a 3-card grid is two sections.
2. **Vary card layouts.** Never repeat the same card pattern twice in a row.
3. **Drop eyebrows + numbered labels.** `01/02/03` chips + mono `THE PRODUCT` eyebrows = slide patterns. Allowed in ≤ 3 places site-wide.
4. **Show, don't list.** Tabs > stacked cards. Cursor reticle > "we use vision AI" copy.
5. **Variable rhythm.** Loud (hero, product) interleaved with quiet (problem, why-now). No two adjacent sections at the same density.
6. **Asymmetric > symmetric.** When in doubt, off-center the content.
7. **No customer logos we don't have.** Industry-baseline stats with named sources only — TestFlight is the substitute for social proof.
8. **No vague vision-AI claims.** If we cite vision, we cite the mechanism (e.g., `advance_step` on per-step completion criterion, verified at 92% on the diagnostic probe).

## Positioning rules (also enforced in `~/.claude/memory/retrace-pitch-positioning.md`)

- **Headliner = AI copilot for field technicians.** Always. Humanoid / data-flywheel angle stays in `HumanoidArc.tsx`, never above it.
- **First three viewports must not mention humanoid robots, robotics labs, or "data flywheel."** Enforced in `Hero` + `Problem` + `ProductTour`.
- **Industrial framings only.** No consumer-product examples (the bundled Levoit fixture in the backend is *not* for marketing copy).
- **Operator voice.** Second person ("your senior technician"), not first. No "agentic AI" / "next-generation" / "transformative."

## Competitive context

Four rings, all relevant when writing copy:

- **Direct, same wedge:** Carbyn (carbyn.space) · LineWise / Vision Lab (thevisionlab.ai)
- **Service-intelligence SaaS:** Aquant.ai · Neuron7.ai
- **OEM-bundled service advisor:** John Deere Service ADVISOR · Caterpillar SIS · Schneider Remote Expertise
- **Connected-worker:** Augmentir · Tulip · Poka · L2L

Full teardown in `~/.claude/memory/retrace-competitive-landscape.md`.

## Asset prep

- **Hero video** — encoded from `main-local-server-test/uploads/05843659-…mp4` via ffmpeg (H.264 + VP9, ≤ 600 KB each). Re-encode with the flags in `main-local-server-test/services/clip_extractor.py` if a different clip is needed.
- **Demo SOP** — hardcoded in `lib/procedure.ts`. Industrial framing only (currently a hydraulic-manifold-seal-replace flow). Shape mirrors `models/procedure.py:ProcedureStep` so it stays plug-compatible if we later wire to a real API.
- **OG image** — generated server-side via Satori in `app/opengraph-image.tsx`. Edit copy + colors there; no font file needed (uses system monospace fallback).

## Adding new sections

1. Create `components/NewSection.tsx`. Lead with one bold claim; resist the 3-card grid impulse.
2. Import + place in `app/page.tsx` in the right scroll position (positioning rules above).
3. Add anchor + label to `components/StickyNav.tsx` if it deserves nav placement.
4. Verify: `npm run build` clean → `npm run dev` → mom-and-dad test.

## Deploy

Vercel target. Domain wiring not yet done — recommended order: `retrace.com` if available at consumer pricing, else `tryretrace.com` or `retrace.systems`. Avoid `.space` (Carbyn owns the TLD vibe).

## Related repos / docs

- Backend + pitch deck source: `../main-local-server-test/` (FastAPI + Gemini orchestration)
- iOS client: `../retrace-ios/` (SwiftUI + Meta DAT SDK + Gemini Live)
- Pitch deck: `../pitch/Retrace_AWE2026.pptx`
- Project root: `../CLAUDE.md` for full Retrace architecture
