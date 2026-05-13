import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";

interface Props {
  post: BlogPost;
}

export function BlogCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 hover:border-[rgba(255,255,255,0.12)] transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-medium text-[#00d4ff] bg-[rgba(0,212,255,0.06)] rounded-full px-2.5 py-1">
          {post.category}
        </span>
        <span className="text-xs text-[#71717a]">{post.readTime}</span>
      </div>
      <h3 className="text-lg font-semibold text-white leading-snug group-hover:text-[#00d4ff] transition-colors">
        {post.title}
      </h3>
      <p className="mt-2 text-sm text-[#a1a1aa] leading-relaxed line-clamp-2">
        {post.excerpt}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-[#71717a]">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <ArrowRight className="h-4 w-4 text-[#52525b] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
}
