"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Plus,
  Pencil,
  Trash2,
  Sparkles,
  X,
  Loader2,
  Eye,
} from "lucide-react";
import type { BlogPostRow } from "@/lib/blog-data";

interface FormData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  read_time: string;
  published: boolean;
}

const EMPTY_FORM: FormData = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "General",
  author: "Ayush Kumar Sharma",
  read_time: "3 min read",
  published: false,
};

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genPrompt, setGenPrompt] = useState({
    topic: "",
    category: "Technology",
    tone: "professional",
  });
  const [genOpen, setGenOpen] = useState(false);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  function openNew() {
    setEditingSlug(null);
    setForm(EMPTY_FORM);
    setError("");
    setModalOpen(true);
  }

  function openEdit(post: BlogPostRow) {
    setEditingSlug(post.slug);
    setForm({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      read_time: post.read_time,
      published: post.published,
    });
    setError("");
    setModalOpen(true);
  }

  function updateForm(field: keyof FormData, value: string | boolean) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && !editingSlug) {
        next.slug = (value as string)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
      }
      return next;
    });
  }

  async function handleSave() {
    if (!form.title || !form.slug) {
      setError("Title and slug are required");
      return;
    }
    setSaving(true);
    setError("");

    try {
      const isEdit = !!editingSlug;
      const url = isEdit ? `/api/blog/${editingSlug}` : "/api/blog";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Save failed");
      }

      setModalOpen(false);
      fetchPosts();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(slug: string) {
    try {
      const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setDeleteSlug(null);
      fetchPosts();
    } catch (e: any) {
      setError(e.message);
    }
  }

  async function handleGenerate() {
    if (!genPrompt.topic) {
      setError("Topic is required");
      return;
    }
    setGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(genPrompt),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Generation failed");
      }

      const data = await res.json();
      setForm({
        slug: data.post.slug,
        title: data.post.title,
        excerpt: data.post.excerpt,
        content: data.post.content,
        category: data.post.category,
        author: data.post.author,
        read_time: data.post.read_time,
        published: false,
      });
      setGenOpen(false);
      setEditingSlug(null);
      setModalOpen(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setGenerating(false);
    }
  }

  if (loading) {
    return (
      <div className="px-6 py-6 lg:px-8 lg:py-8">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 text-[#6366F1] animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-6 lg:px-8 lg:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#F1F5F9]">Blog</h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Manage posts, generate content with AI, and publish to your blog.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setGenOpen(true);
              setError("");
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.06)] text-[#94A3B8] px-4 py-2 text-sm hover:text-[#F1F5F9] hover:border-[rgba(255,255,255,0.10)] transition-colors"
          >
            <Sparkles className="h-4 w-4 text-[#6366F1]" />
            Generate with AI
          </button>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 rounded-lg bg-[#6366F1] text-white font-medium px-4 py-2 text-sm hover:bg-[#5558E0] transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Post
          </button>
        </div>
      </div>

      {error && !modalOpen && !genOpen && (
        <div className="mb-6 text-sm text-red-400 bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.10)] rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* Post list */}
      {posts.length === 0 ? (
        <div className="rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#0F1422] p-12 text-center">
          <FileText className="h-10 w-10 text-[#475569] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#F1F5F9] mb-2">
            No posts yet
          </h3>
          <p className="text-[#94A3B8] text-sm mb-6">
            Create your first blog post or let AI generate one for you.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setGenOpen(true);
                setError("");
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.06)] text-[#94A3B8] px-4 py-2 text-sm hover:text-[#F1F5F9] hover:border-[rgba(255,255,255,0.10)] transition-colors"
            >
              <Sparkles className="h-4 w-4 text-[#6366F1]" />
              Generate with AI
            </button>
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 rounded-lg bg-[#6366F1] text-white font-medium px-4 py-2 text-sm hover:bg-[#5558E0] transition-colors"
            >
              <Plus className="h-4 w-4" />
              Write Manually
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#0F1422] p-5 hover:border-[rgba(255,255,255,0.10)] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-sm font-semibold text-[#F1F5F9] truncate">
                    {post.title}
                  </h3>
                  <span
                    className={`shrink-0 text-[10px] font-medium rounded-full px-2 py-0.5 ${
                      post.published
                        ? "text-[#10B981] bg-[rgba(16,185,129,0.08)]"
                        : "text-[#94A3B8] bg-[rgba(255,255,255,0.05)]"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#475569]">
                  <span className="text-[#6366F1] bg-[rgba(99,102,241,0.06)] rounded-full px-2 py-0.5">
                    {post.category}
                  </span>
                  <span>{post.read_time}</span>
                  <span>
                    {new Date(
                      post.published_at || post.created_at
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[#475569] hover:text-[#6366F1] hover:bg-[rgba(99,102,241,0.06)] transition-colors"
                  title="View on site"
                >
                  <Eye className="h-4 w-4" />
                </a>
                <button
                  onClick={() => openEdit(post)}
                  className="p-2 rounded-lg text-[#475569] hover:text-[#F1F5F9] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteSlug(post.slug)}
                  className="p-2 rounded-lg text-[#475569] hover:text-red-400 hover:bg-[rgba(239,68,68,0.05)] transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 pb-12 px-4 overflow-y-auto">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-2xl bg-[#0F1422] border border-[rgba(255,255,255,0.06)] rounded-[14px] p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#F1F5F9]">
                {editingSlug ? "Edit Post" : "New Post"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-[#475569] hover:text-[#F1F5F9] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 text-sm text-red-400 bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.10)] rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => updateForm("title", e.target.value)}
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[#F1F5F9] text-sm outline-none focus:border-[#6366F1] transition-colors"
                    placeholder="Post title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => updateForm("slug", e.target.value)}
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[#F1F5F9] text-sm outline-none focus:border-[#6366F1] transition-colors font-mono"
                    placeholder="url-friendly-slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
                  Excerpt
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => updateForm("excerpt", e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[#F1F5F9] text-sm outline-none focus:border-[#6366F1] transition-colors resize-none"
                  placeholder="Brief summary of the post"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => updateForm("category", e.target.value)}
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[#F1F5F9] text-sm outline-none focus:border-[#6366F1] transition-colors"
                    placeholder="e.g. AI Strategy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
                    Author
                  </label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => updateForm("author", e.target.value)}
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[#F1F5F9] text-sm outline-none focus:border-[#6366F1] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={form.read_time}
                    onChange={(e) => updateForm("read_time", e.target.value)}
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[#F1F5F9] text-sm outline-none focus:border-[#6366F1] transition-colors"
                    placeholder="e.g. 4 min read"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
                  Content
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => updateForm("content", e.target.value)}
                  rows={14}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[#F1F5F9] text-sm outline-none focus:border-[#6366F1] transition-colors resize-none font-mono"
                  placeholder="Write your post content. Use ## for headings, **bold** for emphasis, - for bullet points."
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    className={`w-11 h-6 rounded-full transition-colors ${
                      form.published
                        ? "bg-[#6366F1]"
                        : "bg-[rgba(255,255,255,0.08)]"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white mt-0.5 transition-transform ${
                        form.published
                          ? "translate-x-[22px]"
                          : "translate-x-[2px]"
                      }`}
                    />
                  </div>
                  <span className="text-sm text-[#94A3B8]">
                    {form.published ? "Published" : "Draft"}
                  </span>
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => updateForm("published", e.target.checked)}
                    className="sr-only"
                  />
                </label>

                <div className="flex gap-3">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="rounded-lg border border-[rgba(255,255,255,0.06)] text-[#94A3B8] px-5 py-2.5 text-sm hover:text-[#F1F5F9] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#6366F1] text-white font-medium px-5 py-2.5 text-sm hover:bg-[#5558E0] transition-colors disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Post"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Generation Modal */}
      {genOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setGenOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-[#0F1422] border border-[rgba(255,255,255,0.06)] rounded-[14px] p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#F1F5F9]">
                Generate with AI
              </h2>
              <button
                onClick={() => setGenOpen(false)}
                className="p-1.5 rounded-lg text-[#475569] hover:text-[#F1F5F9] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 text-sm text-red-400 bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.10)] rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
                  Topic *
                </label>
                <input
                  type="text"
                  value={genPrompt.topic}
                  onChange={(e) =>
                    setGenPrompt({ ...genPrompt, topic: e.target.value })
                  }
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[#F1F5F9] text-sm outline-none focus:border-[#6366F1] transition-colors"
                  placeholder="e.g. How AI is transforming supply chain management"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
                  Category
                </label>
                <select
                  value={genPrompt.category}
                  onChange={(e) =>
                    setGenPrompt({ ...genPrompt, category: e.target.value })
                  }
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[#F1F5F9] text-sm outline-none focus:border-[#6366F1] transition-colors"
                >
                  <option value="AI Strategy" className="bg-[#0F1422]">
                    AI Strategy
                  </option>
                  <option value="Automation" className="bg-[#0F1422]">
                    Automation
                  </option>
                  <option value="Engineering" className="bg-[#0F1422]">
                    Engineering
                  </option>
                  <option value="Business" className="bg-[#0F1422]">
                    Business
                  </option>
                  <option value="Technology" className="bg-[#0F1422]">
                    Technology
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
                  Tone
                </label>
                <select
                  value={genPrompt.tone}
                  onChange={(e) =>
                    setGenPrompt({ ...genPrompt, tone: e.target.value })
                  }
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[#F1F5F9] text-sm outline-none focus:border-[#6366F1] transition-colors"
                >
                  <option value="professional" className="bg-[#0F1422]">
                    Professional
                  </option>
                  <option value="conversational" className="bg-[#0F1422]">
                    Conversational
                  </option>
                  <option value="technical" className="bg-[#0F1422]">
                    Technical
                  </option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setGenOpen(false)}
                  className="flex-1 rounded-lg border border-[rgba(255,255,255,0.06)] text-[#94A3B8] px-5 py-2.5 text-sm hover:text-[#F1F5F9] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#6366F1] text-white font-medium px-5 py-2.5 text-sm hover:bg-[#5558E0] transition-colors disabled:opacity-50"
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeleteSlug(null)}
          />
          <div className="relative z-10 w-full max-w-sm bg-[#0F1422] border border-[rgba(255,255,255,0.06)] rounded-[14px] p-6">
            <h3 className="text-lg font-semibold text-[#F1F5F9] mb-2">
              Delete Post?
            </h3>
            <p className="text-sm text-[#94A3B8] mb-6">
              This action cannot be undone. The post will be permanently
              removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteSlug(null)}
                className="flex-1 rounded-lg border border-[rgba(255,255,255,0.06)] text-[#94A3B8] px-5 py-2.5 text-sm hover:text-[#F1F5F9] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteSlug)}
                className="flex-1 rounded-lg bg-red-500 text-white font-medium px-5 py-2.5 text-sm hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
