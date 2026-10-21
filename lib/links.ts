export const TESTFLIGHT_URL = "https://testflight.apple.com/join/3wSB8VEu";
export const TRAILER_URL = "https://youtu.be/JhW9ji7_pz4";
export const EMAILS = ["jacogoby@gmail.com", "ykarthurlee@gmail.com"];
export const MAILTO_URL = `mailto:${EMAILS.join(",")}?subject=Retrace%20pilot%20conversation`;

export const REPO_SERVER_URL = "https://github.com/hshwang34/retrace-server";
export const REPO_IOS_URL = "https://github.com/hshwang34/retrace-ios";

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
