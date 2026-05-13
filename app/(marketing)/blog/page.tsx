import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/blog/BlogCard";
import { AsciiBackground } from "@/components/ui/AsciiBackground";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mapSupabasePost, blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on AI, automation, and building products that matter. By the team at FlowForges.",
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
    <div className="pt-24">
      <section className="relative py-24 px-6 overflow-hidden">
        <AsciiBackground mode="blog" className="absolute inset-0 w-full h-full" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <SectionHeading
            label="Blog"
            title="Thoughts on AI, automation, and shipping"
            description="We write about what we're building and what we're learning along the way."
          />
        </div>
      </section>

      <section className="py-16 px-6 border-t border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
