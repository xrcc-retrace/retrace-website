// Static demo SOP. Industrial framing per pitch-deck positioning rule —
// never consumer-product examples in marketing material.
// Shape mirrors models/procedure.py:ProcedureStep so it stays plug-compatible
// if we later wire to the real API.

export type DemoStep = {
  index: number;
  title: string;
  description: string;
  start: string;
  end: string;
  completion_criteria: string;
};

export type DemoProcedure = {
  id: string;
  title: string;
  product: string;
  steps: DemoStep[];
};

export const DEMO_PROCEDURE: DemoProcedure = {
  id: "demo-manifold-swap",
  title: "Replace hydraulic manifold seal",
  product: "Industrial fluid system",
  steps: [
    {
      index: 1,
      title: "Isolate line pressure",
      description:
        "Close upstream and downstream valves. Verify gauge reads zero before opening housing.",
      start: "00:00",
      end: "00:01",
      completion_criteria: "Both valves visibly closed. Gauge at 0 psi.",
    },
    {
      index: 2,
      title: "Loosen housing bolts",
      description:
        "Counter-rotate diagonal pairs in two passes. Do not fully remove on the first pass.",
      start: "00:01",
      end: "00:02",
      completion_criteria: "Four bolts backed out one full turn each.",
    },
    {
      index: 3,
      title: "Lift the manifold cover",
      description: "Pry corners evenly to break the seal. Set the cover aside on shop towel.",
      start: "00:02",
      end: "00:03",
      completion_criteria: "Cover is removed and resting clean-side down.",
    },
    {
      index: 4,
      title: "Inspect the old seal",
      description:
        "Note score marks, deformation, or contamination. Flag for the maintenance log.",
      start: "00:03",
      end: "00:04",
      completion_criteria: "Old seal removed and inspection visible.",
    },
    {
      index: 5,
      title: "Seat the new seal",
      description:
        "Lubricate with system fluid. Press evenly until fully seated in the channel.",
      start: "00:04",
      end: "00:06",
      completion_criteria: "New seal fully seated, no twist or bulge visible.",
    },
    {
      index: 6,
      title: "Reassemble and pressure-test",
      description:
        "Torque the housing bolts to spec in a star pattern. Re-open valves slowly and watch for weep.",
      start: "00:06",
      end: "00:07",
      completion_criteria: "Gauge holds nominal pressure for 60 seconds. No visible weep.",
    },
  ],
};
