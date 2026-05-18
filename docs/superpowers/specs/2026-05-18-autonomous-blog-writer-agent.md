# Autonomous Blog Writer Agent

**Date:** 2026-05-18  
**Status:** Design approved

---

## Goal

An autonomous AI agent that writes 1 SEO + AEO optimized blog post per day, fills keyword gaps in the existing content library, and self-improves through performance tracking + human editing feedback.

---

## Architecture

```
Vercel Cron (daily @ 9 AM IST / 0 3 * * * UTC)
    │
    ▼
/api/cron/blog-writer
    │
    ├─► Keyword Gap Analyzer
    │   - Scans existing blog_posts for covered topics/keywords
    │   - Uses Gemini to identify high-value uncovered topics
    │   - Picks 1 topic + 3 target keywords
    │
    ├─► Blog Writer Skill (Gemini 2.5 Flash)
    │   - System prompt: balanced SEO + AEO blog writing
    │   - Generates structured output: title, slug, excerpt, content, keywords
    │   - Content: 800-1200 words, Q&A sections, schema-ready
    │
    ├─► Auto-Publisher
    │   - Inserts into blog_posts with published=true
    │   - Stores generation metadata (keywords, skill version, model)
    │
    └─► Self-Improvement Loop
        - Tracks per-post view counts and performance
        - Summarizes top-performing posts and injects learnings into future prompts
        - Human edits are captured as diffs for style learning
```

---

## Blog Writer Skill

Registered in `lib/skills/registry.ts` as `blog-writer`.

### System Prompt

The agent writes with these priorities:
1. **Answer the question first** — every post leads with a clear 2-3 sentence answer to the target query (AEO)
2. **Structure for featured snippets** — use H2/H3 for scannable sections, Q&A format in body
3. **Keyword-optimized headings** — primary keyword in H1, secondary in H2s
4. **Internal linking** — reference other FlowForges blog posts naturally
5. **Compelling meta** — excerpt is under 160 chars, keyword-rich, makes you click
6. **Business value angle** — every post ties back to ROI, time savings, or competitive advantage

### Self-Improvement Config

The skill embeds a `performance_context` string that gets updated weekly:
- Top 3 performing posts (by views) with their titles, keywords, and content patterns
- Low performers (under 50 views) with analysis of what went wrong
- Edit diffs: patterns from human edits (e.g., "editor consistently shortens intros, adds more bullet points")

---

## Database Changes

### blog_posts — new columns

| Column | Type | Purpose |
|--------|------|---------|
| `target_keywords` | text[] | Keywords this post targets |
| `generation_metadata` | jsonb | Skill version, model, prompt snapshot |
| `views` | integer | Page view counter, default 0 |

### blog_performance — new table

```sql
CREATE TABLE public.blog_performance (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id uuid REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  views_7d integer DEFAULT 0,
  views_30d integer DEFAULT 0,
  avg_time_seconds integer DEFAULT 0,
  seo_score integer CHECK (seo_score >= 1 AND seo_score <= 5),
  edit_diff jsonb,
  updated_at timestamptz DEFAULT now()
);
```

---

## Keyword Gap Strategy

The agent uses Gemini to analyze the existing blog catalog and identify gaps:

1. Fetch all published post titles, categories, and target keywords
2. Send to Gemini with: "Here are our existing blog topics. Identify 5 high-value topics in AI automation that we haven't covered, ranked by search volume potential. For each, provide 3 target keywords."
3. Pick the top-ranked gap topic
4. 80% of runs: fill gap. 20% of runs: check for trending AI news and write timely piece if warranted.

---

## Cron Flow

`GET /api/cron/blog-writer` (secured by CRON_SECRET header)

1. Authenticate via `Bearer ${CRON_SECRET}`
2. Run keyword gap analysis
3. Select topic + keywords
4. Call Gemini with blog-writer skill prompt
5. Parse structured JSON response
6. Insert into blog_posts (published=true)
7. Log task in agent_tasks for dashboard visibility
8. Return summary: `{ topic, title, slug, keywords }`

---

## Files

### New (6)

```
app/api/cron/blog-writer/route.ts
lib/blog-writer/types.ts
lib/blog-writer/keyword-gap.ts
lib/blog-writer/prompt-builder.ts
lib/blog-writer/self-improvement.ts
lib/blog-writer/index.ts
```

### Modified (2)

```
lib/skills/registry.ts         — add blog-writer skill definition
components/command-center/panels/AgentGrid.tsx  — Blog Writer agent card
```

### Database (2 migrations)

```
blog_posts_add_seo_columns      — add target_keywords, generation_metadata, views
create_blog_performance_table   — new tracking table
```
