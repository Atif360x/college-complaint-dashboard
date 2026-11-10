"use client";

import { useEffect, useState } from "react";
import PostButton from "./components/button"

type Post = {
  title: string;
  body: string;
  userName: string;
  createdAt: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      try {
        const response = await fetch("http://localhost:3001/api/", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Unable to load posts.");

        const data = await response.json();
        setPosts(Array.isArray(data) ? data : data.posts ?? []);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Unable to load posts.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadPosts();
    return () => controller.abort();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-16 font-[Arial,sans-serif] text-zinc-100">

      {/* <PostButton /> */}

      <section className="mx-auto max-w-[760px]">

        {loading ? (
          <p className="text-zinc-400">Loading posts…</p>
        ) : error ? (
          <p role="alert" className="text-red-300">
            {error}
          </p>
        ) : posts.length === 0 ? (
          <p className="text-zinc-400">No posts yet.</p>
        ) : (
          <div className="grid gap-4">
            {posts.map((post, index) => (
              <article
                key={`${post.title}-${index}`}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
              >
                <h2 className="mb-3 text-xl font-bold">{post.title}</h2>
                <p className="mb-3 whitespace-pre-wrap text-zinc-300 leading-[1.65]">
                  {post.body}
                </p>
                <div className="border-b border-zinc-200/50 mb-2 "></div>
                <p className="text-[13px] text-zinc-400">
                  By #{post.userName}, {new Date(post.createdAt).toLocaleString()}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}