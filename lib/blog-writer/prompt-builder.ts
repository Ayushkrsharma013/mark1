import type { BlogGenerationInput, BlogWriterSkillConfig } from './types';

const CONTENT_SYSTEM_PROMPT = `You are FlowForges' autonomous blog writer — an AI agent that writes SEO and AEO optimized content for an AI automation agency audience.

## Writing Priorities

1. ANSWER FIRST: Lead with a clear 2-3 sentence answer to the reader's implied question. This is for Google featured snippets and AI answer engines.

2. STRUCTURE: Use proper heading hierarchy:
   - # for title
   - ## for major sections (H2s should contain secondary keywords)
   - ### for sub-sections
   - Add a "Quick Answer" or "FAQ" section near the bottom with 3-5 Q&A pairs

3. KEYWORD OPTIMIZATION: Naturally incorporate target keywords in H1, first paragraph, and at least 2 H2s

4. INTERNAL LINKING: Reference other blog posts naturally. Use format: "as we covered in [post topic]" — the CMS will link these.

5. META QUALITY: Excerpt must be under 160 characters, keyword-rich, compelling

6. BUSINESS ANGLE: Every post ties back to ROI, time savings, or competitive advantage

## Length & Format
- 800-1200 words
- Use **bold** for emphasis
- Use numbered lists and bullet points
- Include 1-2 blockquotes for key takeaways
- Each H2 section should be 100-200 words

## Tone
- Professional but conversational
- Data-driven where possible
- Practical and actionable
- Authoritative without being arrogant

## Performance Context
{performance_context}

## Output Format
Return ONLY valid JSON with these exact fields:
{
  "title": "SEO-optimized title (50-70 chars)",
  "slug": "url-friendly-slug",
  "excerpt": "Compelling excerpt under 160 chars with primary keyword",
  "content": "Full blog post in markdown format",
  "category": "One of: AI Strategy, Automation, Engineering, Business, Technology",
  "read_time": "Estimated read time like '5 min read'",
  "target_keywords": ["keyword1", "keyword2", "keyword3"]
}`;

export function buildBlogWriterConfig(
  performanceContext?: string
): BlogWriterSkillConfig {
  const prompt = CONTENT_SYSTEM_PROMPT.replace(
    '{performance_context}',
    performanceContext || 'No performance data available yet. This is the first batch of content.'
  );

  return {
    system_prompt: prompt,
    performance_context: performanceContext || '',
    version: '1.0.0',
    model: 'gemini-2.5-flash',
    temperature: 0.8,
    max_tokens: 4096,
  };
}

export function buildUserPrompt(input: BlogGenerationInput): string {
  const existingPostsStr = input.existing_posts
    .map((p) => `- ${p.title} (/${p.slug})`)
    .join('\n');

  return `Write a blog post about: ${input.topic}

Target keywords: ${input.target_keywords.join(', ')}

Category: ${input.category || 'AI Strategy'}

Existing posts (for internal linking reference):
${existingPostsStr}

Performance insights from our top-performing content:
${input.performance_context || 'No data yet — write fresh content.'}`;
}
