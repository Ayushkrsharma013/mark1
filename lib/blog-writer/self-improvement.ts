import type { BlogPerformance } from './types';

const ANALYSIS_PROMPT = `You are analyzing blog performance data to improve future content.

Given performance data for blog posts, identify:

1. Top 3 patterns: What do the best-performing posts have in common? (topic type, content structure, length, keyword patterns)
2. Bottom 3 patterns: What do poor performers share?
3. 3 actionable recommendations: What specific changes should we make to future posts?

Keep it concise and actionable. Return as plain text, 3-4 paragraphs max.`;

export async function analyzePerformance(
  performances: BlogPerformance[]
): Promise<string> {
  if (!performances.length) return '';

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return '';

  try {
    const perfData = performances
      .map(
        (p) =>
          `- "${p.title}" | Views: ${p.views_30d}/mo | Avg time: ${p.avg_time_seconds}s | Score: ${p.seo_score || 'N/A'}`
      )
      .join('\n');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: ANALYSIS_PROMPT }] },
          contents: [{ role: 'user', parts: [{ text: perfData }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 1024 },
        }),
      }
    );

    if (!response.ok) return '';
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } catch {
    return '';
  }
}

export function buildPerformanceContext(analysis: string): string {
  if (!analysis) return '';
  return `## What's Working (from performance data)\n${analysis}`;
}
