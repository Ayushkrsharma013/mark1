import type { KeywordGap, BlogGenerationInput } from './types';

const GAP_ANALYSIS_PROMPT = `You are an SEO strategist for FlowForges, an AI automation agency.

Given the list of existing blog posts, identify 5 high-value topics we HAVEN'T covered.

For each topic, provide:
- topic: The specific topic to write about
- keywords: 3 target keywords
- search_volume_estimate: "high", "medium", or "low"
- relevance_score: 1-10 how relevant this is to our audience (digital agencies, business owners interested in AI automation)

Focus on:
- Long-tail keywords that answer specific questions
- Topics that bridge AI automation with business ROI
- "How to" and "Why" content that ranks for featured snippets
- Topics that naturally allow Q&A formatting

Return ONLY a JSON array of objects with the fields above, no other text.`;

export async function analyzeKeywordGaps(
  existingPosts: { title: string; slug: string; category: string }[]
): Promise<KeywordGap[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  const postsList = existingPosts
    .map((p) => `- [${p.category}] ${p.title}`)
    .join('\n');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: GAP_ANALYSIS_PROMPT }] },
        contents: [
          { role: 'user', parts: [{ text: `Here are our existing blog posts:\n\n${postsList}\n\nIdentify 5 topics we haven't covered.` }] },
        ],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048, response_mime_type: 'application/json' },
      }),
    }
  );

  if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('No content in response');

  return JSON.parse(text);
}

export function pickBestGap(gaps: KeywordGap[], trendingTopic?: string): KeywordGap {
  // 80/20 rule: 80% gap-fill, 20% trending
  if (trendingTopic && Math.random() < 0.2) {
    return {
      topic: trendingTopic,
      keywords: [],
      search_volume_estimate: 'high',
      relevance_score: 9,
    };
  }

  // Sort by relevance then search volume
  return gaps.sort((a, b) => {
    const volScore = { high: 3, medium: 2, low: 1 };
    const aScore = a.relevance_score * 0.6 + volScore[a.search_volume_estimate] * 0.4;
    const bScore = b.relevance_score * 0.6 + volScore[b.search_volume_estimate] * 0.4;
    return bScore - aScore;
  })[0];
}
