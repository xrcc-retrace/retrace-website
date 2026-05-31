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

// No posts published yet — the blog shows an empty/teaser state while this is
// empty. Add entries using the BlogPost shape above (the feed + modal/drawer
// machinery in components/Blog/ renders automatically once posts exist).
export const BLOG_POSTS: BlogPost[] = [];
