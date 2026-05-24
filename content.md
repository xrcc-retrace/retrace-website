# Retrace — Page Content

> Edit this file to update site copy. After editing, tell Claude to "sync content.md to the site."
> Structural notes in [brackets] are for context — don't include them in rendered copy.

---

# NAV

Logo: **retrace**

Links: Product · Built for · The arc · Team

CTA button: **TestFlight →**

---

# HERO

[chip] XRCC BERLIN 2026

[label] Live on TestFlight today

## Headline

AI copilot for field technicians.

## Body

Record one expert demo. Coach every junior technician forever. Real-time voice + visual coaching through their smart glasses or phone. 

## CTAs

- **Install on TestFlight →** [primary]
- Book a pilot [secondary → mailto]

## Stats bar [mono strip below the canvas]

75% FTFR INDUSTRY BASELINE · +1PP UPLIFT AT FLEET SCALE = MILLIONS / YR · $200–300 BURNED PER REPEAT TRUCK ROLL

---

# PROBLEM

[eyebrow] The problem

## Headline

Your senior technician walks out the door. Decades of judgment walk out with him.

## Body

Half of process knowledge is held in people's heads. Roughly **42%** [McKinsey] is tribal, undocumented, lost the day they leave. The 600-page service manual that's supposed to replace them is exhaustive and unreadable in the moment.

Junior technicians inherit the gap anyway.
- The Gap: 25% of failed dispatches trace directly to a training gap.
- The Cost: The average repeat truck roll costs $300 in fuel and time, before counting customer downtime.
- The Crunch: The US manufacturing workforce is 44.8 years old on average, the oldest it has ever been. By 2033, we face 3.8M jobs with roughly half left unfilled.

## Pull quote [right column, sticky]

> Hiring more people won't fix this. The people you'd hire don't exist.
> The only lever left is coaching the ones you have, faster.

[label] The Retrace thesis

---

# PRODUCT TOUR

## Intro heading

One recording. Three modes. One architecture.

---

## Panel 1 — Capture

[label] 01 / CAPTURE

### Headline

One expert. One narrated demo.

### Body

Wear the glasses or hold up the iPhone. Talk through the task once. Gemini 2.5 Pro structures it into ordered steps with per-step completion criteria. ffmpeg clips each step automatically.

[label] Gemini 2.5 Pro · structured output

### Demo SOP card [the interactive card on the right — edit lib/procedure.ts to change]

**Procedure title:** Replace hydraulic manifold seal

| Step | Title | Timestamp |
|------|-------|-----------|
| 01 | Isolate line pressure | 00:00 |
| 02 | Loosen housing bolts | 00:01 |
| 03 | Lift the manifold cover | 00:02 |
| 04 | Inspect the old seal | 00:03 |
| 05 | Seat the new seal | 00:04 |
| 06 | Reassemble and pressure-test | 00:06 |

---

## Panel 2 — Coach

[label] 02 / COACH

### Headline

Voice replies. Vision verifies.

### Body

Phone or glasses hold a direct WebSocket to Gemini 3.1 Live: voice and camera at ~0.5 fps. The model watches for the completion criterion and fires `advance_step` the moment it sees it. No server hop.

[label] <100 ms · indefinite sessions

---

## Panel 3 — Troubleshoot

[label] 03 / TROUBLESHOOT

### Headline

No procedure? Diagnose from scratch.

### Body

Describe the broken machine. The AI identifies the product, searches your library first, falls back to a web-grounded fix with cited sources, then hands off to a normal coaching session.

[label] Library search → web-grounded → handoff

---

# BUILT FOR

## Headline

One wedge. Pick the pain you own.

---

## Tab 1 — Service & Repair

**Claim:** Service ADVISOR and SIS lock diagnostics in the shop. Retrace puts them on the technician's face.

**Body:** Real-time visual guidance through smart glasses, on the equipment, no swivel-chair. Embeds into the OEM's after-sales motion as a branded service layer. The technician's hands stay on the machine while the model watches.

**Displaces:** John Deere Service ADVISOR · Caterpillar SIS · Schneider Remote Expertise

**Buyer:** OEM product lead
**Buyer note:** VP of after-sales · service organization

---

## Tab 2 — Onboarding & Upskilling

**Claim:** Poka trains workers through apps. Retrace trains them through their eyes.

**Body:** One expert demo becomes adaptive visual coaching for every new hire, on the machine, not in a slide deck. The model watches the work and adjusts. It isn't a scripted checklist. New techs onboard in weeks, not months.

**Displaces:** Poka · Augmentir · Tulip

**Buyer:** Plant ops director
**Buyer note:** VP of operations · manufacturing site

---

## Tab 3 — Field-Service Copilot

**Claim:** Aquant and Neuron7 are tools you open on a phone. Retrace stays on the work.

**Body:** Eyeball-on-target voice + vision through glasses or phone, real-time auto-advance, troubleshoot for the unknown. One expert demo replaces the institutional-data backfill those tools require to deliver an answer.

**Displaces:** Aquant.ai · Neuron7.ai

**Buyer:** CSO / SVP of Global Services
**Buyer note:** Cost-center owner · enterprise OEM

---

# WHY NOW

[eyebrow] Why now

## Headline

Three unlocks landed in the same year.

## Body

**Gemini 3.1 Flash Live** ships real-time video + audio + tools + context compression + session resumption. The model can finally watch and coach indefinitely. **Ray-Ban Meta** sold 7M units in 2025, +210% YoY; the capture layer is already on technicians' faces. **Meta's DAT SDK 0.6** shipped. Third-party apps can finally stream from the glasses.

Hardware mature. Model mature. Distribution mature. Nobody had built the field-service coaching layer yet. Until now.

---

# THE LONGER ARC

[eyebrow] The longer arc

## Headline

AI copilot for technicians today.
Training corpus for humanoids tomorrow.

## Body

Robotics labs aren't compute-starved. They're data-starved. The humanoid wave needs first-person video of humans doing useful work, paired with speech and task-completion ground truth. That's scarce. Most of what exists is consumer or household.

The public benchmarks tell the story. **3,670 hrs** [Ego4D · Meta '22] of egocentric video across 9 countries. **1,422 hrs** [Ego-Exo4D · Meta '23] of paired first-person + third-person footage. **76K demos** [DROID · Stanford '24] of robot manipulation across 86 tasks. **1M+ episodes** [Open X-Embodiment · DeepMind '23] spanning 22 different embodiments. All landmark releases. None indexed by industrial procedure, none paired with expert narration, none capturing the long tail of skilled-trade tasks that pay the labs' bills.

---

## Labs strip [5 cards — edit data below]

| Lab | Funding | Status | Note |
|-----|---------|--------|------|
| Figure | $675M Series B | $2.6B (Feb '24) | OpenAI partnership |
| 1X | $100M Series B | NVIDIA-backed | NEO Beta |
| Tesla Optimus | Mass-production goal | Public co. | Trained on egocentric video |
| Physical Intelligence | $400M | $2.4B (Nov '24) | π0 foundation model |
| Skild AI | $300M | $1.5B (Jul '24) | General-purpose robot brain |

**Caption:** Combined Series-B+ funding across the five frontier humanoid programs: over $1.4B raised in 18 months on the promise of robots that can do useful physical work. The bottleneck is the same in every deck.

---

## Differentiators

[label] What Retrace's data is, that nobody else's is

### Heading

Five attributes the public corpora don't have together.

### List

1. **First-person POV.** Same camera the humanoids will use. Ego4D had to convince 855 strangers to wear cameras around. Retrace's data comes from technicians whose existing capture habit is on-glasses or in-phone.

2. **Synchronized speech.** Narrated demos with timestamped transcripts. Most egocentric corpora are silent video. Narration grounds intent and procedure.

3. **Tool-call ground-truth.** Explicit advance_step segmentation on completion criteria. Explicit task boundaries are rare in public datasets and gold for downstream RL.

4. **Paired attempts.** Expert demo + every learner attempt of the same task. Positive and negative samples paired by procedure. The kind of contrastive data RT-2 and π0 wish they had.

5. **Industrial verticals.** Field service, OEM equipment, skilled trades. Exactly where Ego4D leans thin. The work humanoids will eventually be sold into.

---

## Closing line

Same data, two markets. AI copilot today. Training corpus tomorrow.

---

# TEAM

[eyebrow] Two builders

## Headline

Full-stack, end-to-end.

## Subhead

Backend / AI + iOS / XR. One real shipped product in four weeks.

---

## Members

**Hyunseok Hwang**
Role: Backend · AI systems
Bio: FastAPI server, Gemini orchestration (2.5 Pro + 3.1 Live), structured-output extraction, ephemeral tokens, troubleshoot mode, web-grounded search.

**Arthur Lee**
Role: Design · iOS · XR
Bio: Design across the entire Retrace including SwiftUI app, Ray-Ban HUD design system. Content and storytelling as well.

---

## Right column [sticky aside]

> AI copilot for technicians today.
> Training humanoids tomorrow.

Try Retrace on TestFlight. Or talk to us about industrial pilots.

- **Install on TestFlight →** [primary CTA]
- jacogoby@gmail.com
- ykarthurlee@gmail.com

---

# FAQ

[eyebrow] Frequently Asked Questions (FAQ)

## Heading

Six questions, six straight answers.

---

**Do I need smart glasses?**
No. Retrace runs on iPhone today. The phone holds the direct Gemini Live session, audio and camera. Ray-Ban Meta is an optional capture layer for hands-free work. Glasses and phone are interchangeable per session.

**What about the privacy of recorded video?**
Expert recordings stay in your tenant. Voice and video stream peer-to-peer between the technician's phone and Gemini Live. The recording is only retained server-side when you publish it as a procedure. Ephemeral tokens scope every Live session to a single voice, tool set, and resumption handle.

**Who owns the data?**
You do. Procedures, clips, and session telemetry are yours. Egocentric training data is opt-in per-procedure, with named export controls and a per-fleet kill switch.

**How is this different from Aquant or Neuron7?**
Aquant and Neuron7 are powerful service-intelligence tools you open on a phone or laptop after stopping the work. Retrace runs continuously through the technician's glasses or phone camera while they work: visual auto-advance, voice replies, no swivel-chair.

**How is this different from John Deere Service ADVISOR or Cat SIS?**
Those are office and shop tools: searchable manuals, diagnostic codes, calibrations. They don't deliver real-time visual guidance on the equipment. Retrace is the layer on top: the technician's hands stay on the machine, the model watches, the procedure auto-advances when the completion criterion is visible.

**Deployment model?**
Hackathon-stage today. iOS app on TestFlight, backend on AWS Lightsail (migrating to eu-central-1 before Berlin). Production deployment is a self-hosted FastAPI + your Gemini API tenant. No third-party data egress.

---

# FOOTER

**retrace** · XRCC Berlin 2026

© 2026 Retrace · all rights reserved

Built with Gemini Live · Meta DAT SDK · FastAPI · SwiftUI
