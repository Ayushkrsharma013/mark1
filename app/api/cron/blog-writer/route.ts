import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Auth check
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
    }

    // Step 1: Fetch existing posts for gap analysis
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    const postsRes = await fetch(
      `${supabaseUrl}/rest/v1/blog_posts?select=title,slug,category&published=true&order=created_at.desc&limit=50`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } }
    );
    const existingPosts = await postsRes.json();

    // Step 2: Analyze keyword gaps
    const gapPrompt = `You are an SEO strategist. Given these existing blog posts, identify 5 high-value topics we haven't covered. Return ONLY a JSON array: [{"topic":"...","keywords":["kw1","kw2","kw3"],"search_volume_estimate":"high|medium|low","relevance_score":1-10}]`;
    const postsList = existingPosts.map((p: any) => `- [${p.category}] ${p.title}`).join('\n');

    const gapRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: gapPrompt }] },
          contents: [{ role: 'user', parts: [{ text: `Existing posts:\n\n${postsList}\n\nIdentify 5 uncovered topics.` }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 2048, response_mime_type: 'application/json' },
        }),
      }
    );

    let gaps: any[] = [];
    if (gapRes.ok) {
      const gapData = await gapRes.json();
      const gapText = gapData.candidates?.[0]?.content?.parts?.[0]?.text;
      if (gapText) gaps = JSON.parse(gapText);
    }

    // Pick best gap (sort by relevance * 0.6 + volume * 0.4)
    const volScore: Record<string, number> = { high: 3, medium: 2, low: 1 };
    const bestGap = gaps.sort((a: any, b: any) => {
      const aScore = (a.relevance_score || 5) * 0.6 + (volScore[a.search_volume_estimate] || 1) * 0.4;
      const bScore = (b.relevance_score || 5) * 0.6 + (volScore[b.search_volume_estimate] || 1) * 0.4;
      return bScore - aScore;
    })[0] || { topic: 'AI automation trends for digital agencies', keywords: ['AI automation', 'digital agencies', 'workflow automation'] };

    // Step 3: Generate blog content
    const contentPrompt = `You are FlowForges' autonomous blog writer. Write an SEO + AEO optimized blog post.

## Writing Priorities
1. ANSWER FIRST: Lead with a 2-3 sentence clear answer (for featured snippets)
2. STRUCTURE: H2 sections, H3 subsections. Include FAQ section with 3-5 Q&A pairs
3. KEYWORDS: Use target keywords naturally in H1, first paragraph, and H2s
4. INTERNAL LINKING: Reference other FlowForges posts naturally
5. Length: 800-1200 words in markdown
6. Tone: Professional, conversational, data-driven, actionable

## Output Format
Return ONLY valid JSON:
{
  "title": "SEO title (50-70 chars)",
  "slug": "url-friendly-slug",
  "excerpt": "Under 160 chars, keyword-rich",
  "content": "Full markdown content",
  "category": "AI Strategy|Automation|Engineering|Business|Technology",
  "read_time": "X min read",
  "target_keywords": ["kw1", "kw2", "kw3"]
}`;

    const existingRefs = existingPosts.slice(0, 10).map((p: any) => `- ${p.title} (/${p.slug})`).join('\n');

    const contentRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: contentPrompt }] },
          contents: [{
            role: 'user',
            parts: [{
              text: `Topic: ${bestGap.topic}\nTarget keywords: ${(bestGap.keywords || ['AI automation']).join(', ')}\n\nExisting posts for internal linking:\n${existingRefs}`,
            }],
          }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 4096, response_mime_type: 'application/json' },
        }),
      }
    );

    if (!contentRes.ok) {
      const errBody = await contentRes.text();
      throw new Error(`Content generation failed: ${contentRes.status} - ${errBody}`);
    }
    const contentData = await contentRes.json();
    const contentText = contentData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!contentText) throw new Error('No content generated');

    let generated: any;
    try {
      generated = JSON.parse(contentText);
    } catch {
      const jsonMatch = contentText.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) generated = JSON.parse(jsonMatch[1]);
      else throw new Error('Failed to parse generated content');
    }

    // Step 4: Insert into database
    const insertRes = await fetch(
      `${supabaseUrl}/rest/v1/blog_posts`,
      {
        method: 'POST',
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          slug: generated.slug || bestGap.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
          title: generated.title || bestGap.topic,
          excerpt: generated.excerpt || '',
          content: generated.content || '',
          category: generated.category || 'AI Strategy',
          author: 'Blog Writer AI',
          read_time: generated.read_time || '5 min read',
          published: true,
          published_at: new Date().toISOString(),
          target_keywords: generated.target_keywords || bestGap.keywords || [],
          generation_metadata: {
            model: 'gemini-2.5-flash',
            skill_version: '1.0.0',
            topic: bestGap.topic,
            generated_at: new Date().toISOString(),
          },
          views: 0,
        }),
      }
    );

    if (!insertRes.ok) {
      const errBody = await insertRes.text();
      throw new Error(`Insert failed: ${insertRes.status} - ${errBody}`);
    }

    const inserted = await insertRes.json();

    return NextResponse.json({
      success: true,
      post: inserted[0] || inserted,
      topic: bestGap.topic,
      keywords: bestGap.keywords,
    });
  } catch (error) {
    console.error('[blog-writer] Error:', error);
    return NextResponse.json(
      { error: 'Blog writer failed', details: String(error) },
      { status: 500 }
    );
  }
}
