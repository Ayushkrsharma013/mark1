import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireSuperAdminApi } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const published = searchParams.get("published");

    const supabase = await createSupabaseServerClient();
    let query = supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (published === "true") {
      query = query.eq("published", true);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ posts: data });
  } catch (error) {
    console.error("Blog GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await requireSuperAdminApi();

    const body = await req.json();
    const { slug, title, excerpt, content, category, author, read_time, published } = body;

    if (!slug || !title) {
      return NextResponse.json(
        { error: "Slug and title are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .insert({
        slug,
        title,
        excerpt: excerpt || "",
        content: content || "",
        category: category || "General",
        author: author || "Ayush Kumar Sharma",
        read_time: read_time || "3 min read",
        published: published || false,
        published_at: published ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json({ post: data }, { status: 201 });
  } catch (error: any) {
    console.error("Blog POST error:", error);
    if (
      error.message === "Authentication required" ||
      error.message === "Insufficient permissions"
    ) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
