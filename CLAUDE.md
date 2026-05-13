# mark1 — FlowForges Agency Website

Next.js 16 App Router site for FlowForges, an AI automation agency. Public-facing pages + authenticated dashboard.

## Stack

- **Framework**: Next.js 16.2 (Turbopack, App Router)
- **UI**: React 19, Tailwind CSS 4, Framer Motion, Lucide Icons
- **Auth**: Supabase Auth with SSR cookies (`@supabase/ssr`)
- **Database**: Supabase Postgres (project: `mark1-flowforges`)
- **AI**: Gemini 2.5 Flash (`/api/chat`)
- **Email**: Resend (`/api/contact`)
- **Package manager**: pnpm

## Directory Structure

```
app/                        # Next.js App Router
├── layout.tsx              # Root layout (fonts, metadata)
├── page.tsx                # Homepage
├── login/page.tsx          # Auth login
├── dashboard/              # Protected dashboard (layout + pages)
├── api/chat/route.ts       # Gemini-powered chat widget API
├── api/contact/route.ts    # Contact form → Resend email
├── blog/[slug]/page.tsx    # Blog post (SSG from DB)
├── products/, services/, case-studies/, contact/
└── legal/privacy/, terms/, refund/

components/
├── shell/                  # Navbar, MobileNav, Footer
├── ui/                     # Button, Card, SectionHeading, GlowOrb, AsciiBackground
├── home/                   # HeroSection, ServicesGrid, ProductsPreview, Testimonials, CTASection
├── blog/                   # BlogCard
├── chat/                   # ChatWidget (floating AI assistant)
├── auth/                   # LoginForm
└── dashboard/              # Sidebar, StatCard

lib/
├── auth.ts                 # Session helpers, role checks, type guards
├── supabase/               # server.ts (SSR), client.ts (browser), admin.ts (service_role)
├── blog-data.ts            # Blog Post type + static fallback data
├── nav.ts                  # Navigation config
└── utils.ts                # cn() helper (clsx + tailwind-merge)
```

## Auth Model

- Supabase Auth manages sessions via cookies
- `profiles` table mirrors `auth.users` (auto-created by trigger on signup)
- Three roles: `super_admin`, `client`, `user`
- Only `super_admin` and `client` can access `/dashboard`
- Middleware (`middleware.ts`) protects dashboard routes, redirects `/login` if already authed
- All RLS policies are role-aware (super admins see all, users see own)

## Database (Supabase)

Project: `mark1-flowforges` (`otxifqcvgmxoxemmgbjd`), region ap-south-1

Tables: `profiles`, `contact_messages`, `blog_posts`, `activity_log`, `api_keys`, `notification_preferences`

All tables have RLS enabled. See Supabase dashboard for full schema.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL       # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY  # Supabase anon key (safe for client)
SUPABASE_SERVICE_ROLE_KEY      # Supabase service_role key (server-only)
GEMINI_API_KEY                 # Google Gemini API key for /api/chat
RESEND_API_KEY                 # Resend API key for /api/contact (optional)
```

## Running Locally

```bash
pnpm dev        # Start dev server (Turbopack)
pnpm build      # Production build
pnpm start      # Start production server
```

## Key Patterns

- **No ORM** — direct Supabase client calls; migrations via MCP `apply_migration`
- **Dark UI** — dark background (#060608), cyan accent (#00d4ff), glass-morphism borders
- **Chat fallback** — `/api/chat` works without API key (keyword-matching fallback)
- **Contact resilience** — `/api/contact` logs to console if Resend is not configured
- **Force dynamic** — all dashboard pages use `export const dynamic = "force-dynamic"` since they read auth
- **Blog SSG** — blog posts are statically generated from DB content
