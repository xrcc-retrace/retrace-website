"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Play } from "lucide-react";
import { MonoLabel } from "../primitives";
import type { BlogPost } from "@/lib/posts";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PostModal({
  post,
  onClose,
}: {
  post: BlogPost | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {post && <ModalInner key={post.id} post={post} onClose={onClose} />}
    </AnimatePresence>
  );
}

function ModalInner({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [reduced, setReduced] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 640px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsDesktop(desktop.matches);
    setReduced(rm.matches);
    const sync = () => setIsDesktop(desktop.matches);
    desktop.addEventListener("change", sync);
    return () => desktop.removeEventListener("change", sync);
  }, []);

  // Esc to close + body scroll lock while open (mirrors MobileNav).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  // Panel motion: centered fade/rise on desktop, bottom-sheet slide on mobile.
  const panelMotion = reduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      }
    : isDesktop
      ? {
          initial: { opacity: 0, scale: 0.96, y: 12 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.97, y: 8 },
          transition: { duration: 0.32, ease: EASE },
        }
      : {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%" },
          transition: { duration: 0.34, ease: EASE },
        };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
    >
      {/* Backdrop */}
      <motion.button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-canvas/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Panel */}
      <motion.div
        {...panelMotion}
        className="relative flex max-h-[90dvh] w-full flex-col rounded-t-2xl border border-stroke bg-surface shadow-2xl sm:max-h-[85vh] sm:max-w-2xl sm:rounded-2xl"
      >
        {/* Mobile grab handle */}
        <div className="flex justify-center pt-3 sm:hidden">
          <span className="h-1 w-10 rounded-full bg-stroke-hi" aria-hidden />
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-stroke bg-canvas/60 text-muted backdrop-blur transition-colors hover:text-ink"
        >
          <X className="size-4" strokeWidth={2} />
        </button>

        <div className="overflow-y-auto px-6 py-7 sm:px-8 sm:py-9">
          <MonoLabel className="text-muted/80">
            {post.date} · {post.tag}
          </MonoLabel>
          <h2 className="mt-3 text-balance text-2xl font-medium leading-tight tracking-[-0.015em] text-ink sm:text-3xl">
            {post.title}
          </h2>

          {post.video && <PostVideo video={post.video} />}

          <div className="mt-6 space-y-4">
            {post.body.map((para, i) => (
              <p
                key={i}
                className="text-pretty text-[15.5px] leading-relaxed text-muted sm:text-base"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Poster → click-to-play inline video.
function PostVideo({ video }: { video: NonNullable<BlogPost["video"]> }) {
  const [playing, setPlaying] = useState(false);
  const webm = video.src.replace(/\.mp4$/, ".webm");
  const portrait = video.orientation === "portrait";
  const frame = portrait
    ? "mx-auto aspect-[9/16] w-full max-w-[300px]"
    : "aspect-video w-full";

  return (
    <div className="mt-6 rounded-[14px] border border-stroke bg-surface-hi/40 p-2">
      <div
        className={`relative overflow-hidden rounded-[10px] border border-stroke bg-canvas ${frame}`}
      >
        {playing ? (
          <video
            controls
            autoPlay
            playsInline
            poster={video.poster}
            className="h-full w-full object-cover"
          >
            <source src={webm} type="video/webm" />
            <source src={video.src} type="video/mp4" />
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Play video"
            className="group absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={video.poster}
              alt=""
              className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-canvas/70 backdrop-blur transition-transform group-hover:scale-105">
                <Play className="size-6 translate-x-0.5 text-ink" strokeWidth={2} fill="currentColor" />
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
