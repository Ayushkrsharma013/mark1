import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireSuperAdminApi } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post: data });
  } catch (error) {
    console.error("Blog GET by slug error:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await requireSuperAdminApi();
    const { slug } = await params;
    const body = await req.json();

    const updateData: Record<string, unknown> = {};
    const fields = [
      "slug", "title", "excerpt", "content", "category",
      "author", "read_time", "published",
    ] as const;

    for (const field of fields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // If publishing, set published_at unless it already exists
    if (updateData.published === true) {
      const { data: existing } = await supabaseAdmin
        .from("blog_posts")
        .select("published_at, published")
        .eq("slug", slug)
        .single();

      if (existing && !existing.published_at && !existing.published) {
        updateData.published_at = new Date().toISOString();
      }
    }

    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .update(updateData)
      .eq("slug", slug)
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

    return NextResponse.json({ post: data });
  } catch (error: any) {
    console.error("Blog PUT error:", error);
    if (
      error.message === "Authentication required" ||
      error.message === "Insufficient permissions"
    ) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await requireSuperAdminApi();
    const { slug } = await params;

    const { error } = await supabaseAdmin
      .from("blog_posts")
      .delete()
      .eq("slug", slug);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Blog DELETE error:", error);
    if (
      error.message === "Authentication required" ||
      error.message === "Insufficient permissions"
    ) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
