# Monochrome Dashboard + Agentic Invoice Generator

**Date:** 2026-05-18  
**Status:** Design approved

---

## Part 1: Black + Glow Monochrome Theme

### Color System

| Role | Old | New |
|------|-----|-----|
| Background | `#080C14` | `#000000` |
| Surface | `#0F1422` | `#0A0A0A` |
| Surface 2 | `#161D30` | `#111111` |
| Surface 3 | `#1C2540` | `#1A1A1A` |
| Text primary | `#F1F5F9` | `#FAFAFA` |
| Text secondary | `#94A3B8` | `#999999` |
| Text muted | `#475569` | `#555555` |
| Border | `rgba(255,255,255,0.05-0.08)` | `rgba(255,255,255,0.06-0.15)` |

No color accents — all status indicators, icons, and active states use white/grayscale gradients.

### Component Changes

**globals.css `--cc-*` variables:** Replace all command-center variables with monochrome equivalents. Remove `--cc-primary` (indigo), `--cc-secondary` (amber), `--cc-success` (green), `--cc-danger` (red), `--cc-warning` (amber). Replace with grayscale `--cc-surface`/`--cc-border`/`--cc-text-*` variables.

**Sidebar:**
- Background: `#000000`
- Active nav item: thin white left-border + `linear-gradient(90deg, rgba(255,255,255,0.04), transparent)` background
- Logo FF box: white outline instead of indigo fill
- User avatar: white outline circle with letter

**Topbar:**
- Background: `rgba(0,0,0,0.8)` + `backdrop-blur-[16px]`
- Search bar focus: white glow ring instead of indigo
- "New Agent" button: white outline → fills white on hover, text inverts to black

**StatCard:** `whileHover` changes to white glow shadow `0 0 40px rgba(255,255,255,0.04)`, border `rgba(255,255,255,0.15)` on hover. Delta badges use grayscale. Sparkline in white/gray.

**All panels:** Replace colored icons with white. Remove indigo/amber/green/red accents.

**Hover effects system:**
- Cards: `transition-all duration-300`, `hover:shadow-[0_0_40px_rgba(255,255,255,0.04)]`, `hover:border-white/15`, `hover:-translate-y-0.5`
- Buttons: `hover:bg-[linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]`
- Nav items: gradient sweep on hover

---

## Part 2: Agentic Invoice Generator

### Route & Navigation

- **Route:** `/dashboard/invoices`
- **Sidebar:** New "Invoices" item with `Receipt` icon, between Activity Log and Blog
- **Breadcrumb:** Command Center / Invoices

### Page Layout

Split screen: left = chat (40%), right = live preview (60%).

**Left — InvoiceChat:**
- Chat interface with message history
- User types natural language: "Generate invoice for Acme Corp — custom CRM integration, 60 hours at $125/hr, add 18% GST"
- AI agent (Gemini 2.5 Flash) responds with structured breakdown, asks for confirmation
- Send/confirm/edit flow through conversation
- Messages stored in React state (session only, reset on page leave)

**Right — InvoicePreview:**
- Live invoice card that updates as AI extracts details
- Shows: FlowForges logo → client name → line items table → subtotal → tax → total → payment terms → notes
- "Download PDF" button generates and downloads invoice
- Monochrome styled: black background, white borders, clean typography

### API Route: `POST /api/invoices/generate`

- Accepts: `{ messages: [{role, content}], action: "generate" | "confirm" | "edit" }`
- Uses Gemini 2.5 Flash with system prompt tuned for invoice extraction
- Returns streamed JSON: `{ type: "invoice_update", data: { client, items, total, tax } }` or `{ type: "message", content: "..." }`
- On confirm action, saves to `invoices` table

### Database: `invoices` table

```sql
CREATE TABLE public.invoices (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  client_name text NOT NULL,
  client_email text,
  items jsonb DEFAULT '[]'::jsonb,
  subtotal numeric,
  tax_rate numeric DEFAULT 0,
  tax_amount numeric DEFAULT 0,
  total numeric,
  notes text,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### Component Tree

```
app/dashboard/invoices/page.tsx (force-dynamic)
├── InvoiceChat.tsx (left panel, client component)
│   └── Chat messages + input + send button
└── InvoicePreview.tsx (right panel, client component)
    └── Live invoice card + Download PDF button
```

### New Files (6)

```
app/dashboard/invoices/page.tsx
components/command-center/panels/InvoiceChat.tsx
components/command-center/panels/InvoicePreview.tsx
app/api/invoices/generate/route.ts
app/api/invoices/route.ts (GET/DELETE for history)
```

### Modified Files (12+)

```
app/globals.css                              — --cc-* variable overhaul
components/command-center/Sidebar.tsx         — monochrome + Invoices link
components/command-center/Topbar.tsx          — monochrome
components/command-center/CommandCenterShell.tsx — monochrome
components/command-center/shared/StatCard.tsx
components/command-center/shared/SparklineChart.tsx
components/command-center/shared/LiveDot.tsx
components/command-center/shared/AgentStatusBadge.tsx
components/command-center/shared/EmptyState.tsx
components/command-center/panels/OverviewStats.tsx
components/command-center/panels/PipelineChart.tsx
components/command-center/panels/AgentGrid.tsx
components/command-center/panels/ActivityFeed.tsx
components/command-center/panels/RecentTasks.tsx
components/command-center/panels/QuickActions.tsx
```
