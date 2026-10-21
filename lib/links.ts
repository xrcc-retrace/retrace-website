// TestFlight beta closed (checked 2026-10-21: "no longer accepting"); link removed site-wide.
export const TRAILER_URL = "https://youtu.be/JhW9ji7_pz4";
export const EMAILS = ["jacogoby@gmail.com", "ykarthurlee@gmail.com"];
export const MAILTO_URL = `mailto:${EMAILS.join(",")}?subject=Retrace%20pilot%20conversation`;

// The server and iOS repos are private (PM decision #9, 2026-10-21): link GitHub profiles, not repos.
export const GITHUB_HYUNSEOK_URL = "https://github.com/hshwang34";
export const GITHUB_ARTHUR_URL = "https://github.com/artlee06";

export const TEAM = [
  {
    name: "Hyunseok Hwang",
    role: "Backend · AI systems",
    github: "https://github.com/hshwang34",
    linkedin: null as string | null, // TODO(pm): LinkedIn URL
  },
  {
    name: "Arthur Lee",
    role: "Design · iOS · XR",
    github: "https://github.com/artlee06",
    linkedin: null as string | null, // TODO(pm): LinkedIn URL
  },
] as const;
