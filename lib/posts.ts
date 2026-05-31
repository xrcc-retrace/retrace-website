export type BlogPost = {
  id: string;
  date: string; // display label, e.g. "MAR 2026"
  tag: string; // kicker, e.g. "FIELD NOTE" | "NOTE"
  title: string;
  body: string[]; // paragraphs — body[0] doubles as the feed excerpt
  video?: {
    src: string; // "/video/expert-demo.mp4" — the .webm sibling is derived in the player
    poster: string;
    orientation: "portrait" | "landscape";
  };
};

// Stub content — placeholder copy + the one clip we have on hand (expert-demo,
// shot portrait). Swap in real posts/video by editing this array.
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "seal-swap-capture",
    date: "MAR 2026",
    tag: "FIELD NOTE",
    title: "Recording a hydraulic seal swap, end to end",
    body: [
      "A senior technician walked through a manifold seal replacement once, on the glasses. No script, no second take — just the job, narrated the way they'd explain it to an apprentice on the floor.",
      "Retrace turned that single pass into a structured procedure: each step clipped to its own short snippet, with a completion check the AI can verify on a learner's camera later. The clip below is the raw capture before any editing.",
      "What used to live only in one person's hands is now something every junior tech can pull up, follow, and be coached through in real time.",
    ],
    video: {
      src: "/video/expert-demo.mp4",
      poster: "/video/expert-demo-poster.jpg",
      orientation: "portrait",
    },
  },
  {
    id: "capture-once",
    date: "FEB 2026",
    tag: "NOTE",
    title: "Why we capture the expert once",
    body: [
      "Most field knowledge never gets written down. It lives in the hands of a handful of senior people, and it walks out the door when they retire.",
      "Our bet is simple: record the expert one time, doing the real task, and let the system do the rest — break it into steps, watch the learner attempt it, and step in exactly when something goes wrong.",
      "No documentation project. No classroom. The demo is the curriculum.",
    ],
  },
  {
    id: "advance-step-probe",
    date: "FEB 2026",
    tag: "FIELD NOTE",
    title: "What the camera actually checks before advancing",
    body: [
      "Real-time coaching only works if the system knows when a step is genuinely done — not when the learner says it is.",
      "Each step carries its own completion criterion, and the AI holds the learner there until it sees that criterion met on camera. The short clip shows the moment it advances on its own.",
    ],
    video: {
      src: "/video/expert-demo.mp4",
      poster: "/video/expert-demo-poster.jpg",
      orientation: "portrait",
    },
  },
];
