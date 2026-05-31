"use client";

import { useState } from "react";
import { BLOG_POSTS } from "@/lib/posts";
import { PostCard } from "./PostCard";
import { PostModal } from "./PostModal";

export function BlogFeed() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openPost = BLOG_POSTS.find((p) => p.id === openId) ?? null;

  return (
    <>
      <div className="shell flex flex-col">
        {BLOG_POSTS.map((post) => (
          <PostCard key={post.id} post={post} onOpen={setOpenId} />
        ))}
      </div>
      <PostModal post={openPost} onClose={() => setOpenId(null)} />
    </>
  );
}
