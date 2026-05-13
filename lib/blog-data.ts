export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

export interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  read_time: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export function mapSupabasePost(row: BlogPostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    author: row.author,
    date: row.published_at
      ? new Date(row.published_at).toISOString().split("T")[0]
      : new Date(row.created_at).toISOString().split("T")[0],
    readTime: row.read_time,
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-every-business-needs-an-ai-agent-in-2026",
    title: "Why Every Business Needs an AI Agent in 2026",
    excerpt:
      "The businesses winning right now aren't the ones with the biggest teams — they're the ones with the smartest automation. Here's why an AI agent is no longer optional.",
    content: `
The businesses winning right now aren't the ones with the biggest teams — they're the ones with the smartest automation.

We've crossed a threshold. AI agents today can handle customer support, qualify leads, schedule meetings, and even close deals — without a human in the loop. The companies deploying these agents aren't just saving money on headcount; they're operating at a speed that manual teams simply can't match.

## The Economics Have Changed

Two years ago, building a custom AI agent required a machine learning team and six figures of investment. Today, you can deploy one in weeks for a fraction of the cost. The underlying models (Claude, GPT, Gemini) are commoditizing fast, which means the value is shifting to the application layer — how well the agent is tailored to your specific business logic.

## What An AI Agent Actually Does

An AI agent isn't a chatbot. It's software that:

1. **Understands context** — it reads your knowledge base, your previous conversations, your business rules
2. **Takes actions** — it doesn't just reply; it creates tickets, updates CRMs, sends emails, triggers workflows
3. **Learns and improves** — every interaction feeds back into the system, making it better over time

## The ROI Is Real

Our clients see an average of 70% of Tier-1 support tickets resolved automatically. Sales teams using our prospecting agents book 3-5x more meetings than manual outreach. The math isn't complicated — an agent that costs $1,000/month and replaces 40 hours of human work per week is a 10x return.

## The Risk Is Waiting

The biggest mistake we see is analysis paralysis. Teams spend months evaluating tools while their competitors ship agents and start learning from real customer interactions. The model is the easy part. The hard part — and the real moat — is the training data, the conversation logs, the edge cases you handle. You can't buy that off the shelf. You have to start.
    `.trim(),
    category: "AI Strategy",
    author: "Ayush Kumar Sharma",
    date: "2026-05-10",
    readTime: "4 min read",
  },
  {
    slug: "from-spreadsheets-to-automation-a-practical-guide",
    title: "From Spreadsheets to Automation: A Practical Guide",
    excerpt:
      "Most businesses run on Excel and email. Here's how to identify which processes to automate first — and how to actually ship the automation without disrupting operations.",
    content: `
Every business has them — the "temporary" spreadsheet that's been running payroll for three years. The email chain that approves expenses. The manual data entry that someone does every Friday at 4 PM.

These aren't just annoyances. They're compounding costs. A 10-minute task done daily by a $50/hour employee costs the company over $2,000 per year. Scale that across a team of 20, and you're bleeding six figures annually on work a script could do in seconds.

## How to Find Your Automation Targets

Walk through your week and ask three questions about every recurring task:

1. **Is the input structured?** If the data comes in a predictable format (form submissions, API responses, spreadsheet columns), it's automatable.
2. **Is the decision logic clear?** If you can write down the rules you follow ("if amount > $500, escalate to manager"), code can follow them.
3. **Is the output standardized?** If the end result is always an email, a database entry, or a report — automate it.

## The 80/20 of Automation

Don't try to automate 100% of a process on day one. Automate the 80% that's repetitive and clear-cut. Let humans handle the 20% of edge cases. Over time, you codify those edge cases and gradually approach full automation.

## A Real Example

One of our clients — a logistics company — had a 12-step freight documentation workflow. Four people spent 6 hours a day on data entry, validation, and ERP updates. We automated the core 10 steps with an AI pipeline that handles document extraction, cross-checks against their database, and submits to their ERP. The remaining 2 steps (dispute resolution) stay human. Result: 90% time reduction, $120K annual savings, zero layoffs — the team now handles exceptions and strategic work instead of data entry.

## Start This Week

Pick one process. Write down every step. Identify which parts are rule-based vs. judgment-based. Then talk to someone who can build the automation. The first one is always the hardest — and the most valuable.
    `.trim(),
    category: "Automation",
    author: "Ayush Kumar Sharma",
    date: "2026-05-01",
    readTime: "5 min read",
  },
  {
    slug: "how-we-built-prospecting-os",
    title: "How We Built Prospecting OS — Architecture & Lessons",
    excerpt:
      "A technical deep-dive into the stack behind our flagship product: Next.js, Supabase, Claude API, and Apify. What we learned about real-time data, AI pipelines, and shipping fast.",
    content: `
Prospecting OS started as a frustration. I was doing B2B outreach manually — scraping LinkedIn, writing messages, tracking responses in a spreadsheet. Every tool I tried either did one thing well (scraping, email, CRM) but nothing connected end-to-end.

So I built the thing I wanted to exist.

## The Stack

- Next.js 14 (App Router) — server components for static pages, client components for interactive UIs. The layout system keeps the shell persistent across route changes.
- Supabase — Postgres with real-time subscriptions. The leads table streams updates to the UI without polling. Row-level security means each user only sees their own data.
- Claude API (Anthropic) — powers the message lab and lead scorer. Structured prompts with lead data produce personalized outreach messages and ICP fit scores with reasoning.
- Apify — handles LinkedIn and Google Maps scraping via their actor marketplace. API keys are proxied through our backend so they never touch the browser.
- Tailwind CSS — utility-first with CSS variables for theming. Dark mode by default because sales teams practically live in their CRM.

## Architecture Decisions I'd Make Again

**1. Server-side data fetching with React Context for state**

We use a global AppProvider with useReducer for UI state (filters, search, modals) while data fetching happens server-side. This avoids the complexity of Redux or Zustand while keeping things predictable.

**2. AI API keys in browser memory only**

The Claude API key is entered by the user, stored in React state, and never persisted to localStorage or the database. It resets on page reload. This eliminates a whole category of security concerns.

**3. Mock mode for development**

A single toggle switches between live Apify scraping and a local dataset of 50 realistic leads. This means I can demo the product anywhere, anytime, without burning API credits or waiting for scrapers to finish.

## What I'd Do Differently

- **Start with a Postgres schema, not ORM.** We went straight to Supabase client calls, which worked fine, but I'd add Prisma or Drizzle for migration management from day one.
- **Add rate limiting earlier.** The Apify and Claude APIs both have rate limits. We added client-side throttling late and should've built it into the API routes from the start.
- **Tests.** We shipped fast and tested manually. The product works but adding features now requires more regression testing than it should.

## The Takeaway

You don't need a big team to ship a production AI product. The tools are there. What matters is knowing the workflow deeply enough to automate it — and being willing to ship something imperfect and iterate.
    `.trim(),
    category: "Engineering",
    author: "Ayush Kumar Sharma",
    date: "2026-04-20",
    readTime: "6 min read",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
