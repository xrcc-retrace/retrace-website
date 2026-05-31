import Image from "next/image";
import { Play } from "lucide-react";
import { MonoLabel } from "../primitives";
import type { BlogPost } from "@/lib/posts";

// One feed row — a clickable preview that opens the post overlay.
export function PostCard({
  post,
  onOpen,
}: {
  post: BlogPost;
  onOpen: (id: string) => void;
}) {
  const meta = (
    <MonoLabel className="text-muted/80">
      {post.date} · {post.tag}
    </MonoLabel>
  );

  return (
    <button
      type="button"
      onClick={() => onOpen(post.id)}
      className="group block w-full border-t border-stroke py-8 text-left first:border-t-0 lg:py-10"
    >
      {post.video ? (
        <div className="grid grid-cols-[auto_1fr] items-start gap-5 sm:gap-6">
          {/* Portrait poster thumbnail — height-capped, never full-bleed */}
          <div className="relative aspect-[9/16] w-[116px] shrink-0 overflow-hidden rounded-[10px] border border-stroke bg-canvas sm:w-[132px]">
            <Image
              src={post.video.poster}
              alt=""
              fill
              sizes="132px"
              className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-canvas/70 backdrop-blur">
                <Play className="size-4 translate-x-px text-ink" strokeWidth={2} fill="currentColor" />
              </span>
            </span>
          </div>
          <div className="min-w-0">
            {meta}
            <h3 className="mt-2 text-balance text-xl font-medium leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-ink sm:text-2xl">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-pretty text-[15px] leading-relaxed text-muted">
              {post.body[0]}
            </p>
          </div>
        </div>
      ) : (
        <div>
          {meta}
          <h3 className="mt-2 text-balance text-2xl font-medium leading-snug tracking-[-0.015em] text-ink sm:text-[28px]">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-2 max-w-2xl text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
            {post.body[0]}
          </p>
        </div>
      )}
    </button>
  );
}
