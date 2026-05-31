import type { ComponentType } from "react";
import { CaptureVisual } from "./CaptureToSopPanel";
import { CoachVisual } from "./CoachingPanel";
import { TroubleshootVisual } from "./TroubleshootPanel";

export type TourStep = {
  id: string;
  num: string;
  kicker: string;
  header: string;
  body: string;
  Visual: ComponentType;
};

export const TOUR_STEPS: TourStep[] = [
  {
    id: "capture",
    num: "01",
    kicker: "Capture",
    header: "Record an expert demo",
    body: "Put on the glasses or hold up your phone, then talk through the task once. The AI automatically breaks your video down into structured, step-by-step instructions and clips each step into a short video snippet.",
    Visual: CaptureVisual,
  },
  {
    id: "coach",
    num: "02",
    kicker: "Coach",
    header: "Guide junior learners live",
    body: "The AI watches through a beginner's phone or glasses camera. It listens, talks them through the steps in real time, and automatically moves to the next step the exact moment it sees the job done right.",
    Visual: CoachVisual,
  },
  {
    id: "troubleshoot",
    num: "03",
    kicker: "Troubleshoot",
    header: "Diagnose unknown issues",
    body: "No guide available? Just point the camera at the broken machine and describe the problem. The AI scans your internal library, checks verified manuals online to find a fix, and immediately starts a live coaching session to walk you through the repair.",
    Visual: TroubleshootVisual,
  },
];
