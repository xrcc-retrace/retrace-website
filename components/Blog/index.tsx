import { TRAILER_EMBED_URL } from "@/lib/links";
import { BlogFeed } from "./BlogFeed";

export function Blog() {
  return (
    <section id="blog" className="relative">
      {/* Trailer hero */}
      <div className="shell py-12 lg:py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          XRCC Berlin 2026
        </p>
        <h1 className="mt-5 max-w-3xl text-balance text-3xl font-light leading-[1.1] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[52px]">
          Watch the XRCC trailer
        </h1>
        <div className="mt-8 overflow-hidden rounded-[14px] border border-stroke bg-surface/40 p-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-[8px] border border-stroke bg-canvas">
            <iframe
              src={TRAILER_EMBED_URL}
              title="XRCC Berlin 2026 trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </div>

      {/* Post feed */}
      <div className="border-t border-stroke pb-24 pt-4 lg:pb-32">
        <div className="shell pb-2 pt-6">
          <h2 className="text-xl font-medium tracking-[-0.01em] text-ink">
            Latest posts
          </h2>
        </div>
        <BlogFeed />
      </div>
    </section>
  );
}
