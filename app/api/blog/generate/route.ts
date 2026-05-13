import { NextResponse } from "next/server";
import { requireSuperAdminApi } from "@/lib/auth";

const GENERATION_PROMPT = `You are a professional blog content writer for FlowForges, an AI automation agency. Write engaging, informative blog posts about AI, automation, and technology for business audiences.

Your response must be a valid JSON object with exactly these fields:
- title: A catchy, SEO-friendly title
- slug: URL-friendly version of the title (lowercase, hyphens)
- excerpt: A compelling 2-3 sentence summary that makes people want to read
- category: One of "AI Strategy", "Automation", "Engineering", "Business", "Technology"
- content: The full blog post body using this formatting:
  - Use ## for h2 headings
  - Use ### for h3 sub-headings
  - Use **bold** for emphasis
  - Use 1. 2. 3. for numbered lists
  - Use - for bullet points
  - Use > for blockquotes
  - Separate paragraphs with blank lines
  - Write 500-1000 words
- read_time: Estimated reading time like "4 min read" or "6 min read"

The writing style should be:
- Professional but conversational
- Data-driven where possible
- Practical and actionable
- Focused on business value of AI/automation`;

export async function POST(req: Request) {
  try {
    await requireSuperAdminApi();

    const { topic, category, tone } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const userPrompt = `Write a blog post about: ${topic}
Category: ${category || "Technology"}
Tone: ${tone || "professional"}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: GENERATION_PROMPT }],
          },
          contents: [
            { role: "user", parts: [{ text: userPrompt }] },
          ],
          generationConfig: {
            maxOutputTokens: 4096,
            temperature: 0.8,
            response_mime_type: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No content in Gemini response");
    }

    let generated;
    try {
      generated = JSON.parse(text);
    } catch {
      // Try to extract JSON from markdown code block
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        generated = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error("Failed to parse generated content as JSON");
      }
    }

    return NextResponse.json({
      post: {
        title: generated.title || topic,
        slug: generated.slug || topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        excerpt: generated.excerpt || "",
        content: generated.content || "",
        category: generated.category || category || "General",
        author: "Ayush Kumar Sharma",
        read_time: generated.read_time || "4 min read",
      },
    });
  } catch (error: any) {
    console.error("Blog generate error:", error);
    if (
      error.message === "Authentication required" ||
      error.message === "Insufficient permissions"
    ) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to generate content. Please try again." },
      { status: 500 }
    );
  }
}
