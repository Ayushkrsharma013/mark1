import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AsciiBackground } from "@/components/ui/AsciiBackground";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mapSupabasePost, getPostBySlug } from "@/lib/blog-data";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (data) return mapSupabasePost(data);
  } catch {
    // Fall through to static
  }
  return getPostBySlug(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function renderParagraph(paragraph: string, i: number) {
  // Headings
  if (paragraph.startsWith("### ")) {
    return (
      <h3 key={i} className="text-xl font-bold text-white mt-8 mb-3">
        {paragraph.replace("### ", "")}
      </h3>
    );
  }
  if (paragraph.startsWith("## ")) {
    return (
      <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">
        {paragraph.replace("## ", "")}
      </h2>
    );
  }

  // Blockquote
  if (paragraph.startsWith("> ")) {
    const lines = paragraph.split("\n").map((l) => l.replace(/^> /, "")).join(" ");
    return (
      <blockquote key={i} className="border-l-2 border-[#00d4ff] pl-4 text-[#a1a1aa] italic my-4">
        {lines}
      </blockquote>
    );
  }

  // Ordered lists
  if (/^\d+\.\s/.test(paragraph)) {
    const items = paragraph.split("\n").filter(Boolean);
    return (
      <ol key={i} className="list-decimal list-inside space-y-2 my-4 text-[#a1a1aa] leading-relaxed">
        {items.map((item, j) => (
          <li key={j}>{item.replace(/^\d+\.\s/, "")}</li>
        ))}
      </ol>
    );
  }

  // Bullet lists
  if (paragraph.startsWith("- ")) {
    const items = paragraph.split("\n").filter(Boolean);
    return (
      <ul key={i} className="list-disc list-inside space-y-2 my-4 text-[#a1a1aa] leading-relaxed">
        {items.map((item, j) => (
          <li key={j}>{item.replace(/^- /, "")}</li>
        ))}
      </ul>
    );
  }

  // Regular paragraph with inline formatting
  const html = paragraph
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code class=\"text-[#00d4ff] bg-[rgba(0,212,255,0.06)] rounded px-1 py-0.5 text-sm\">$1</code>");

  return (
    <p
      key={i}
      className="text-[#a1a1aa] leading-relaxed my-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <article className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-3xl">
        {/* Hero card with ASCII background */}
        <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-12">
          <AsciiBackground mode="blog" className="absolute inset-0 w-full h-full opacity-60" />
          <div className="relative z-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-[#71717a] hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-[#00d4ff] bg-[rgba(0,212,255,0.06)] rounded-full px-2.5 py-1">
                {post.category}
              </span>
              <span className="text-xs text-[#71717a]">{post.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              {post.title}
            </h1>

            <div className="mt-4 flex items-center gap-3 text-sm text-[#71717a]">
              <span>{post.author}</span>
              <span>&bull;</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {post.content.split("\n\n").map((paragraph, i) =>
            renderParagraph(paragraph, i)
          )}
        </div>

        <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.06)]">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white text-black font-medium px-6 py-3 hover:bg-[#e4e4e7] transition-colors text-sm"
          >
            Work with FlowForges
          </Link>
        </div>
      </div>
    </article>
  );
}
