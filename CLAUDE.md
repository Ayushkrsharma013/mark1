# mark1 — FlowForges Agency Website

Next.js 16 App Router site for FlowForges, an AI automation agency. Public-facing pages + authenticated dashboard with AI Employee Workforce and integrated lead pipeline.

Repo: `github.com/Ayushkrsharma013/mark1`  
Live: deployed via Vercel

---

## Stack

- **Framework**: Next.js 16.2 (Turbopack, App Router)
- **UI**: React 19, Tailwind CSS 4, Framer Motion, Lucide Icons
- **Auth**: Supabase Auth with SSR cookies (`@supabase/ssr`)
- **Database**: Supabase Postgres (project: `mark1-flowforges` — shared with Lead Engine)
- **AI**: Gemini 2.5 Flash (`/api/chat`, `/api/agent-chat`, `/api/agent-builder`)
- **Email**: Resend + Resend MCP server (send, templates, broadcasts, contacts, domains)
- **Payments**: Dodo Payments (MoR, subscriptions/one-time) + Xflow wire transfer (custom projects)
- **Lead Scraping**: Apify actor `x_guru~Leads-Scraper-apollo-zoominfo`
- **Package manager**: pnpm (no `pnpm-workspace.yaml` — single app, not a workspace)

---

## Directory Structure

```
app/                        # Next.js App Router
├── layout.tsx              # Root layout (fonts, metadata)
├── page.tsx                # Homepage
├── login/page.tsx          # Auth login
├── dashboard/              # Protected dashboard
│   ├── agents/page.tsx         # AI Employee grid
│   ├── agents/[id]/page.tsx    # Agent chat
│   ├── agent-builder/page.tsx  # Chat-based agent creation wizard
│   ├── pipeline/page.tsx       # Lead pipeline Kanban
│   ├── blog/page.tsx           # Blog management
│   ├── analytics/page.tsx      # Dashboard analytics
│   ├── activity/page.tsx       # Activity feed
│   ├── settings/page.tsx       # User settings
│   ├── pricing/page.tsx        # Pricing tiers CMS admin (edit tiers in DB)
│   └── integrations/page.tsx   # Integrations
├── api/
│   ├── chat/route.ts           # Public chat widget API (Gemini, supports context: "contact")
│   ├── contact/route.ts        # Contact form → Resend
│   ├── appointments/route.ts   # GET/POST appointments (shared table with lead-engine)
│   ├── pricing/tiers/route.ts  # GET/POST/PUT pricing tiers (country-aware currency conversion)
│   ├── pricing/quote/route.ts  # POST quote requests → Resend email + Supabase store
│   ├── agents/route.ts         # AI Employee CRUD + auto-seed
│   ├── agents/[id]/route.ts    # Update/delete agent
│   ├── agent-chat/route.ts     # Chat with agent + history
│   ├── agent-builder/route.ts  # Wizard chat for creating agents
│   ├── agent-tasks/[id]/run/route.ts  # Execute agent task
│   ├── cron/run-agents/route.ts       # Vercel Cron — spawn tasks
│   ├── dodo/checkout/route.ts  # POST → Dodo hosted-checkout redirect URL
│   ├── dodo/webhook/route.ts   # Dodo webhook → dodo_payments / dodo_subscriptions
│   ├── xflow/invoice/route.ts  # POST → Resend wire-transfer invoice to client + self
│   ├── leads/route.ts          # Lead CRUD (search, filter, patch, delete)
│   ├── leads/scrape/route.ts   # Apify actor proxy (start + poll)
│   ├── leads/import/route.ts   # Import from Apify run into DB
│   ├── skills/route.ts         # List available skills
│   ├── metrics/route.ts        # Real metrics from DB
│   ├── pipeline/route.ts       # Real pipeline data from DB
│   └── activity/route.ts       # Real activity from DB
├── blog/[slug]/page.tsx    # Blog post (SSG from DB)
├── products/, services/, pricing/, case-studies/
├── thank-you/page.tsx       # Post-payment confirmation + book onboarding CTA
├── book/page.tsx            # 4-step booking wizard (calendar → time → details → confirmed)
├── contact/page.tsx         # Conversational AI agent (Gemini-powered chat)
└── legal/
    ├── page.tsx             # Legal hub — index of all 6 policies
    ├── privacy/page.tsx     # Privacy Policy — GDPR/DPDP/CCPA
    ├── terms/page.tsx       # Terms of Service — 21 sections incl. AI-specific clauses
    ├── refund/page.tsx      # Refund Policy — EU withdrawal, setup fee rules
    ├── shipping/page.tsx    # Delivery Policy — SLAs per product
    ├── cancellation/page.tsx # Cancellation Policy — 3 cancel methods
    └── payment-disclosure/page.tsx  # Dodo Payments MoR + Xflow wire transfer

components/
├── shell/                  # Navbar (solid #0A0A0A always), MobileNav, Footer
├── ui/                     # Button, Card, SectionHeading, GlowOrb, AsciiBackground (8 modes)
├── home/                   # HeroSection, ServicesGrid, ProductsPreview, Testimonials, CTASection
├── book/                   # BookingFlow (4-step wizard), BookingChat (conversational bot), BookPageContent
├── pricing/                # PricingContent (Dodo CheckoutButton, no custom services table)
├── dodo/                   # CheckoutButton — redirects to Dodo hosted checkout
├── xflow/                  # InvoiceSender — dashboard form to email wire-transfer invoices
├── blog/                   # BlogCard
├── chat/                   # ChatWidget (floating AI assistant, hidden on /contact)
├── auth/                   # LoginForm
├── agents/                 # AgentChat, AgentBuilderChat, AgentCard
├── command-center/         # Sidebar, Topbar, StatCard, panels (incl. InvoiceChat + InvoicePreview)
└── pipeline/               # KanbanBoard, KanbanColumn, LeadCard, PipelineClient

lib/
├── auth.ts                 # Session helpers, role checks
├── dodo.ts                 # getDodoClient() — lazy Dodo Payments SDK instance (server-only)
├── dodo-products.ts        # DODO_PRODUCTS constant map (product IDs from env)
├── xflow.ts                # XFLOW_ACCOUNT + XflowInvoiceData + generateInvoiceEmailHTML()
├── supabase/
│   ├── server.ts           # SSR client (RLS-aware)
│   ├── client.ts           # Browser client
│   └── admin.ts            # Service role client (RLS bypass)
├── skills/
│   ├── types.ts            # Skill, SkillCategory types
│   ├── registry.ts         # 12 skill definitions with system prompts
│   └── composer.ts         # Compose agent system prompt from skills
├── leads/
│   ├── types.ts            # Lead, LeadStatus, LeadSource types
│   └── storage.ts          # sanitizeLead, apifyItemToLead, stableLeadId, generateCSV
├── api/
│   ├── agents.ts           # Agent API wrappers
│   ├── ai-employees.ts     # AI Employee fetch/create/update/delete
│   ├── leads.ts            # Lead API wrappers (fetch, update, delete, scrape, import)
│   ├── metrics.ts          # Metrics fetch with cache
│   ├── pipeline.ts         # Pipeline fetch with cache
│   └── activity.ts         # Activity fetch with cache
├── types/
│   ├── agent.ts            # Agent, AIEmployee, AgentTask, AgentConversation types
│   ├── metric.ts           # LiveMetrics, PipelineDay types
│   └── activity.ts         # ActivityItem type
├── blog-data.ts            # Blog Post type + static fallback data
├── booking-chat.ts         # Conversational booking state machine (7 states)
├── currency.ts             # Country→currency mapping, conversion rates, locale formatting
├── google-calendar.ts      # Google Calendar OAuth2 — create events, refresh tokens
├── nav.ts                  # Navigation config (navLinks + footerLinks with 7 legal items)
└── utils.ts                # cn() helper (clsx + tailwind-merge)

hooks/
├── useAIEmployees.ts       # Fetch + mutate AI employees
├── useAgentChat.ts         # Agent chat state + send messages
├── useAgentBuilderChat.ts  # Wizard chat state
├── useLeads.ts             # Lead CRUD + scrape + import hooks
├── useLiveMetrics.ts       # Dashboard metrics polling
├── usePipelineData.ts      # Pipeline chart data
└── useActivityFeed.ts      # Activity feed polling
```

---

## Auth Model

- Supabase Auth manages sessions via cookies
- `profiles` table mirrors `auth.users` (auto-created by trigger on signup)
- Three roles: `super_admin`, `client`, `user`
- Only `super_admin` and `client` can access `/dashboard`
- Middleware (`middleware.ts`) protects dashboard routes, redirects `/login` if already authed
- All RLS policies are role-aware (super admins see all, users see own)

---

## Database (Supabase)

**Project**: `mark1-flowforges` (`otxifqcvgmxoxemmgbjd`), region ap-south-1  
**Shared with**: Lead Engine (Prospecting OS)

### Core Tables
| Table | Purpose |
|---|---|
| `profiles` | Auth user profiles (id, email, full_name, role) |
| `agents` | AI Employees (name, role, skills, system_prompt, status, auto_run) |
| `agent_conversations` | Chat history per agent (role, content) |
| `agent_tasks` | Scheduled/manual/chat tasks (status, result, trigger) |
| `leads` | Scraped/enriched leads (shared with Lead Engine) |
| `messages` | AI-generated outreach messages per lead |
| `sequences` | Outreach sequences (steps JSONB) |
| `campaigns` | Campaigns (lead_ids JSONB, status) |
| `clients` | Client manager entries |
| `activity_log` | Generic activity feed |
| `lead_activity_log` | Lead-specific activity |
| `email_captures` | Landing page email collection |
| `appointments` | Book-a-demo scheduling |
| `blog_posts` | CMS blog posts |
| `contact_messages` | Contact form submissions |
| `pricing_tiers` | CMS-driven pricing tiers (name, price, features JSONB, sort_order, active) |
| `quote_requests` | Quote builder submissions (services, team size, timeline, estimate, country, currency) |
| `dodo_payments` | One-time payment records from Dodo webhook (payment_id, email, amount, status) |
| `dodo_subscriptions` | Recurring subscription records from Dodo webhook (subscription_id, status, next_billing) |
| `api_keys` | API key management |
| `notification_preferences` | User notification settings |

### RLS
All tables have RLS enabled. Leads use `user_id = auth.uid()` policies. Agent tables use `user_id` scoped access.

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL       # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY  # Supabase anon key (safe for client)
SUPABASE_SERVICE_ROLE_KEY      # Supabase service_role key (server-only) — REQUIRED for cron + task runner
GEMINI_API_KEY                 # Google Gemini API key
APIFY_API_KEY                  # Apify API key for lead scraping
RESEND_API_KEY                 # Resend API key for /api/contact and /api/xflow/invoice

# Dodo Payments (fill after account approval at app.dodopayments.com)
DODO_API_KEY                           # Server-only — Dodo API key
DODO_WEBHOOK_SECRET                    # Server-only — Dodo webhook signing secret
DODO_ENV                               # "test_mode" | "live_mode"
NEXT_PUBLIC_DODO_ENV                   # Client-readable env flag
NEXT_PUBLIC_DODO_PROS_SETUP_ID         # Product ID — Prospecting OS setup fee
NEXT_PUBLIC_DODO_PROS_MONTHLY_ID       # Product ID — Prospecting OS monthly
NEXT_PUBLIC_DODO_REMI_SETUP_ID         # Product ID — Remi setup fee
NEXT_PUBLIC_DODO_REMI_MONTHLY_ID       # Product ID — Remi monthly

# Xflow — no API key needed (wire transfer, account details hardcoded in lib/xflow.ts)
```

---

## Running Locally

```bash
pnpm dev        # Start dev server (Turbopack)
pnpm build      # Production build
pnpm start      # Start production server
```

---

## Key Patterns

- **No ORM** — direct Supabase client calls; migrations via MCP `apply_migration`
- **Dark UI** — background `#0A0A0A`, orange accent `#e8420a`, zinc grays for secondary text; no cyan/purple/amber from old design
- **Navbar** — solid `#0A0A0A` background always (not transparent-on-load); "Book a Demo" = orange `bg-[#e8420a]`
- **ASCII animation canvas** — every marketing page has a themed falling-character background (8 modes: home, products, services, case-studies, blog, contact, legal, testimonials)
- **Conversational contact** — `/contact` is a full-page Gemini-powered AI agent; `/api/chat` supports `context: "contact"` for sales-oriented system prompt
- **Dodo Payments** — MoR for Prospecting OS + Remi subscriptions. `CheckoutButton` in `components/dodo/` calls `/api/dodo/checkout` which creates a Dodo payment and returns a hosted-checkout URL. Webhook at `/api/dodo/webhook` writes to `dodo_payments` / `dodo_subscriptions`. Client is lazy (`getDodoClient()`) — safe at build time with no env var.
- **Xflow wire transfer** — custom projects ($5k+) invoiced via `/api/xflow/invoice` which sends a branded HTML email with JPMorgan Chase wire details to the client + a copy to `support@flow-forges.com`. No external API — pure Resend. `InvoiceSender` component available in dashboard.
- **Pricing page** — USD-only. No custom services table. "Book a Scoping Call" CTA replaces the table. Checkout buttons wired to Dodo product IDs from env.
- **Legal pages** — all 6 pages reference Dodo Payments as MoR (not Paddle). Payment Disclosure also documents wire transfer path for custom projects.
- **4-step booking flow** — `/book`: calendar date picker → time slots → details form → confirmation. Posts to `/api/appointments`. Conversational booking chat bot with 7-state machine.
- **Google Calendar integration** — OAuth2 refresh token flow, auto-creates calendar events for booked appointments.
- **Resend MCP server** — full email platform via MCP. Configured in `~/.claude.json`.
- **Force dynamic** — all dashboard pages use `export const dynamic = "force-dynamic"` since they read auth
- **Skills composition** — agents are built from static skill modules in `lib/skills/registry.ts`
- **Auto-seed** — `/api/agents` seeds 10 prebuilt AI employees on first fetch
- **Apify integration** — `/api/leads/scrape` starts actor, `/api/leads/import` imports dataset into `leads` table
- **Shared database** — Lead Engine and FlowForges both point to the same Supabase project
- **Public assets** — logo-icon.png (navbar), Dark_Header_Logo.png (footer), Logo.png (OG images), favicons + webmanifest
- **pnpm workspace** — no `pnpm-workspace.yaml` (deleted — caused "packages field missing" on Vercel). `onlyBuiltDependencies` is in `package.json#pnpm` instead.
