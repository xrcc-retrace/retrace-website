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
  id: "demo-rivet-install",
  title: "Install structural blind rivet nut insert",
  product: "Pneumatic rivet nut tool",
  steps: [
    {
      index: 1,
      title: "Select mandrel and nose piece",
      description:
        "Match mandrel diameter to rivet nut spec. Torque nose piece to 15 Nm before attaching to tool.",
      start: "00:00",
      end: "00:01",
      completion_criteria: "Nose piece seated flush, no lateral play.",
    },
    {
      index: 2,
      title: "Set tool stroke depth",
      description:
        "Dial stroke to rivet nut grip range per fastener datasheet. Verify with a pull test on scrap material.",
      start: "00:01",
      end: "00:02",
      completion_criteria: "Stroke confirmed within ±0.2 mm of nominal.",
    },
    {
      index: 3,
      title: "Drill and deburr pilot hole",
      description:
        "Drill to H7 tolerance. Deburr both faces — any burr will prevent the flange from seating flush.",
      start: "00:02",
      end: "00:03",
      completion_criteria: "Hole clean, no burr on either face.",
    },
    {
      index: 4,
      title: "Thread rivet nut onto mandrel",
      description:
        "Hand-thread until the flange contacts the nose piece. Do not cross-thread — apply axial pressure while threading.",
      start: "00:03",
      end: "00:04",
      completion_criteria: "Rivet nut seated against nose piece, no wobble.",
    },
    {
      index: 5,
      title: "Fire tool and set fastener",
      description:
        "Insert into pilot hole and hold perpendicular to the panel. Squeeze trigger fully — single stroke only.",
      start: "00:04",
      end: "00:06",
      completion_criteria: "Audible click on stroke completion. Flange flush to panel surface.",
    },
    {
      index: 6,
      title: "Verify pull-out torque",
      description:
        "Apply torque wrench to installed thread at spec value. Inspect backside for uniform collar deformation.",
      start: "00:06",
      end: "00:07",
      completion_criteria: "Fastener holds rated pull-out torque. No spin-out or panel distortion.",
    },
  ],
};
