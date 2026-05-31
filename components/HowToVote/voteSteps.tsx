import { PORTAL_REGISTER_URL, VOTE_RETRACE_URL } from "@/lib/links";

export type VoteStep = {
  id: string;
  num: string;
  kicker: string;
  header: string;
  body: string;
  image: string;
  alt: string;
  cta?: { label: string; href: string; variant: "primary" | "secondary" };
};

export const VOTE_STEPS: VoteStep[] = [
  {
    id: "portal",
    num: "01",
    kicker: "Portal",
    header: "Open the voting portal",
    body: "Go to the XRCC project portal and click Register for Public Voting on the sign-in card. You don't need an existing account — but you do need to make one before you can vote.",
    image: "/HowToVote/Step1_Portal.png",
    alt: "XRCC portal sign-in page with a Register for Public Voting button",
    cta: {
      label: "Open the portal",
      href: PORTAL_REGISTER_URL,
      variant: "secondary",
    },
  },
  {
    id: "register",
    num: "02",
    kicker: "Register",
    header: "Fill in the sign-up form",
    body: "Enter your details to create a public-voting account. This is the fiddly part — it only takes a minute, so bear with it.",
    image: "/HowToVote/Step2_FillUpForm.png",
    alt: "Public-voting registration form on the XRCC portal",
  },
  {
    id: "password",
    num: "03",
    kicker: "Password",
    header: "Set your password",
    body: "XRCC emails you a follow-up link. Open it, set a password to activate the account (check spam if it's slow to arrive), then sign in.",
    image: "/HowToVote/Step3_SetPassword.png",
    alt: "Set-password screen reached from the confirmation email",
  },
  {
    id: "vote",
    num: "04",
    kicker: "Vote",
    header: "Vote for Retrace",
    body: "Once you're signed in, open the Retrace project page and cast your vote. That's it — thank you.",
    image: "/HowToVote/Step4_VoteRetrace.png",
    alt: "Retrace project page on the XRCC portal with the vote button",
    cta: {
      label: "Vote for Retrace",
      href: VOTE_RETRACE_URL,
      variant: "primary",
    },
  },
];
