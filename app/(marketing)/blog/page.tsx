import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mapSupabasePost, blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "AI automation insights, tutorials, and agency growth strategies from FlowForges.",
};

export const revalidate = 60;

export default async function BlogPage() {
  let posts = blogPosts;

  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (data && data.length > 0) {
      posts = data.map(mapSupabasePost);
    }
  } catch {
    // Fallback to static data
  }

  return (
    <div style={{ background: "#0A0A0A" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">

        <div className="mb-16">
          <p className="text-xs font-medium text-[#e8420a] tracking-widest uppercase mb-3">BLOG</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">AI automation insights</h1>
          <p className="text-[#71717a]">Practical guides on AI automation, agency growth, and building with AI.</p>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-[#1a1a1a] rounded-lg bg-[#111111]">
            <p className="text-[#71717a] text-lg mb-2">First posts coming soon.</p>
            <p className="text-sm text-[#52525b]">Subscribe to get notified when we publish.</p>
          </div>
        )}
      </div>
    </div>
  );
}
