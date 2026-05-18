# Monochrome Dashboard + Agentic Invoice Generator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform dashboard to pitch-black monochrome with white glow hover effects, and build a chat-based AI invoice generator module backed by Gemini.

**Architecture:** Overhaul `--cc-*` CSS variables from indigo/amber/green to pure grayscale. Replace all colored accents in sidebar, topbar, stat cards, charts, and panels with white/grayscale gradients and glow effects. Build `/dashboard/invoices` with split-panel chat+preview using Gemini 2.5 Flash for natural language invoice extraction, plus new `invoices` DB table.

**Tech Stack:** Next.js 16, Tailwind CSS 4, Framer Motion, Recharts, Supabase, Gemini 2.5 Flash

---

### Task 1: Overhaul `--cc-*` CSS Variables to Monochrome

**Files:**
- Modify: `app/globals.css` (the `:root` block, `--cc-*` variables)

- [ ] **Step 1: Replace `--cc-*` CSS variables**

Replace the command center variables block (lines 48-58) in `app/globals.css`:

```css
--cc-bg-primary: #000000;
--cc-bg-surface: #0A0A0A;
--cc-bg-surface-2: #111111;
--cc-bg-surface-3: #1A1A1A;
--cc-text-primary: #FAFAFA;
--cc-text-secondary: #999999;
--cc-text-muted: #555555;
--cc-border: rgba(255, 255, 255, 0.06);
--cc-border-hover: rgba(255, 255, 255, 0.15);
--cc-glow: 0 0 40px rgba(255, 255, 255, 0.04);
```

- [ ] **Step 2: Add monochrome keyframe**

Add to globals.css after existing keyframes:

```css
@keyframes white-glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.04); }
  50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.08); }
}
```

- [ ] **Step 3: Verify CSS compiles**

Run: `pnpm build 2>&1 | head -5`
Expected: No CSS compilation errors

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "style: switch cc variables to pitch-black monochrome"
```

---

### Task 2: Monochrome Sidebar

**Files:**
- Modify: `components/command-center/Sidebar.tsx`

- [ ] **Step 1: Update Sidebar colors**

Replace all hardcoded colors in Sidebar.tsx:

| Old | New |
|-----|-----|
| `bg-[#080C14]` | `bg-black` |
| `border-[rgba(255,255,255,0.05)]` | `border-[var(--cc-border)]` |
| `#6366F1` (logo BG, active indicator, user avatar) | `#FFFFFF` with `bg-white/10` for subtle areas |
| `#F1F5F9` (text primary) | `var(--cc-text-primary)` |
| `#94A3B8` (text secondary) | `var(--cc-text-secondary)` |
| `#475569` (text muted) | `var(--cc-text-muted)` |
| Active bg `rgba(99,102,241,0.12)` | `rgba(255,255,255,0.04)` |
| `#F59E0B` (NEW badge) | `rgba(255,255,255,0.15)` with white text |

```tsx
// Logo FF box — change from indigo fill to white outline
<div className="h-7 w-7 rounded-lg border border-white/20 flex items-center justify-center">
  <span className="text-white text-xs font-bold">FF</span>
</div>

// Active indicator — change from indigo to white
className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-white"

// Active background — change from indigo tint to white tint
className="absolute inset-0 rounded-lg bg-[rgba(255,255,255,0.04)]"

// NEW badge — change from amber to white outline
<span className="text-[10px] font-semibold border border-white/20 text-white/80 rounded-full px-1.5 py-0">
  {item.badge}
</span>

// User avatar — change from indigo to white outline
<div className="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center text-xs font-semibold text-white shrink-0">
```

- [ ] **Step 2: Add gradient hover to nav items**

```tsx
className={cn(
  'relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 group',
  isActive
    ? 'text-white'
    : 'text-[var(--cc-text-secondary)] hover:text-white'
)}
// Add subtle gradient sweep on hover (non-active items)
style={!isActive ? {} : undefined}
// Hover effect via CSS class instead of inline:
// Add to the parent nav: [&_a]:hover:bg-[linear-gradient(90deg,rgba(255,255,255,0.04),transparent)]
```

- [ ] **Step 3: Verify sidebar visually**

Run: `pnpm dev`, navigate to `http://localhost:3000/dashboard`
Check: Sidebar renders with white accents, no indigo/amber visible

- [ ] **Step 4: Commit**

```bash
git add components/command-center/Sidebar.tsx
git commit -m "style: monochrome sidebar with white glow accents"
```

---

### Task 3: Monochrome Topbar

**Files:**
- Modify: `components/command-center/Topbar.tsx`

- [ ] **Step 1: Replace all colors in Topbar**

```tsx
// Header background
className="sticky top-0 z-40 flex items-center gap-4 px-4 sm:px-6 py-3 bg-[rgba(0,0,0,0.85)] backdrop-blur-[16px] border-b border-[var(--cc-border)]"

// Search focus — white glow instead of indigo
searchFocused
  ? 'border-white/30 shadow-[0_0_0_3px_rgba(255,255,255,0.06)]'
  : 'border-[var(--cc-border)]'

// Search background
className="flex items-center gap-2 rounded-lg border bg-[#0A0A0A] px-3 py-2 transition-all"

// New Agent button — white outline, fills on hover
className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-white/20 text-white text-xs font-semibold px-3 py-2 hover:bg-white hover:text-black transition-all duration-300"

// User avatar mini
className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center text-xs font-semibold text-white shrink-0"

// Bell icon — white instead of muted
<Bell className="h-[18px] w-[18px] text-[var(--cc-text-muted)] hover:text-white" />

// Notification dot — white
<span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-white" />

// Breadcrumb text
<span className="text-[var(--cc-text-secondary)]">{breadcrumb}</span>

// Mobile hamburger
className="lg:hidden p-2 rounded-lg text-[var(--cc-text-muted)] hover:text-white hover:bg-[rgba(255,255,255,0.04)]"
```

- [ ] **Step 2: Verify topbar**

Navigate to `http://localhost:3000/dashboard`
Check: White accents, no indigo/amber

- [ ] **Step 3: Commit**

```bash
git add components/command-center/Topbar.tsx
git commit -m "style: monochrome topbar with white glow"
```

---

### Task 4: Monochrome Shared Components

**Files:**
- Modify: `components/command-center/shared/StatCard.tsx`
- Modify: `components/command-center/shared/SparklineChart.tsx`
- Modify: `components/command-center/shared/LiveDot.tsx`
- Modify: `components/command-center/shared/AgentStatusBadge.tsx`
- Modify: `components/command-center/shared/EmptyState.tsx`

- [ ] **Step 1: Update StatCard.tsx**

```tsx
// Card background and border
className="rounded-[14px] border border-[var(--cc-border)] bg-[#0A0A0A] p-6 transition-all duration-300 hover:border-white/15"

// Hover effect — white glow instead of indigo
whileHover={{
  y: -2,
  boxShadow: '0 8px 32px rgba(255,255,255,0.05)',
}}

// Label
<span className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--cc-text-muted)]">

// Icon circle — white tint
style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
<Icon className="h-[18px] w-[18px] text-white/70" />

// Value
<span className="text-3xl font-semibold font-mono text-white">

// Delta badge — grayscale
deltaPositive && 'bg-[rgba(255,255,255,0.06)] text-white/80',
deltaNegative && 'bg-[rgba(255,255,255,0.04)] text-[var(--cc-text-secondary)]',

// Remove iconColor prop usage — always use white
// Change default: iconColor = '#FFFFFF'

// Sparkline color — white for positive, muted for negative
color={deltaNegative ? '#777777' : '#FFFFFF'}

// Loading skeleton — match new surface
<div className="rounded-[14px] border border-[var(--cc-border)] bg-[#0A0A0A] p-6 animate-pulse">
  <div className="h-3 w-20 rounded bg-[rgba(255,255,255,0.04)]" />
```

- [ ] **Step 2: Update SparklineChart.tsx**

```tsx
// Default color
color = '#FFFFFF'

// Tooltip background
<div className="bg-[#1A1A1A] border border-white/10 text-xs px-2 py-1 rounded-md text-white">
```

- [ ] **Step 3: Update LiveDot.tsx**

```tsx
const colors = {
  active: '#FFFFFF',    // was #10B981
  paused: '#888888',    // was #F59E0B
  error: '#555555',     // was #EF4444
  building: '#AAAAAA',  // was #6366F1
};
```

- [ ] **Step 4: Update AgentStatusBadge.tsx**

```tsx
const styles: Record<AgentStatus, string> = {
  active: 'bg-[rgba(255,255,255,0.06)] text-white/80',
  paused: 'bg-[rgba(255,255,255,0.04)] text-[var(--cc-text-secondary)]',
  error: 'bg-[rgba(255,255,255,0.04)] text-[var(--cc-text-muted)]',
  building: 'bg-[rgba(255,255,255,0.06)] text-white/70',
};
```

- [ ] **Step 5: Update EmptyState.tsx**

```tsx
// Icon circle
<div className="h-12 w-12 rounded-full bg-[rgba(255,255,255,0.04)] flex items-center justify-center mb-4">
  <Icon className="h-5 w-5 text-[var(--cc-text-muted)]" />
</div>

// Title
<h3 className="text-sm font-semibold text-[var(--cc-text-secondary)] mb-1">

// Action button — white instead of indigo
className="text-xs font-medium text-white/70 hover:text-white transition-colors"
```

- [ ] **Step 6: Commit**

```bash
git add components/command-center/shared/
git commit -m "style: monochrome shared dashboard components"
```

---

### Task 5: Monochrome Dashboard Panels

**Files:**
- Modify: `components/command-center/panels/OverviewStats.tsx`
- Modify: `components/command-center/panels/PipelineChart.tsx`
- Modify: `components/command-center/panels/AgentGrid.tsx`
- Modify: `components/command-center/panels/ActivityFeed.tsx`
- Modify: `components/command-center/panels/RecentTasks.tsx`
- Modify: `components/command-center/panels/QuickActions.tsx`

- [ ] **Step 1: Update OverviewStats.tsx**

```tsx
// All iconColors → white
const stats = [
  { ..., iconColor: '#FFFFFF' },  // Leads
  { ..., iconColor: '#CCCCCC' },  // Agents
  { ..., iconColor: '#AAAAAA' },  // Tasks
  { ..., iconColor: '#999999' },  // Hours
];
```

- [ ] **Step 2: Update PipelineChart.tsx**

```tsx
// Stage colors → grayscale
const STAGES = [
  { key: 'scraped', label: 'Scraped', color: '#FFFFFF' },
  { key: 'qualified', label: 'Qualified', color: '#CCCCCC' },
  { key: 'contacted', label: 'Contacted', color: '#999999' },
  { key: 'responded', label: 'Responded', color: '#666666' },
];

// Card background → use new surface
className="rounded-[14px] border border-[var(--cc-border)] bg-[#0A0A0A] p-6 h-full flex flex-col"

// Tooltip
<div className="bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 shadow-xl">

// XAxis tick
tick={{ fill: '#555555', fontSize: 12 }}

// Tooltip cursor
cursor={{ fill: 'rgba(255,255,255,0.03)' }}
```

- [ ] **Step 3: Update AgentGrid.tsx**

```tsx
// Card background
className="rounded-[14px] border border-[var(--cc-border)] bg-[#0A0A0A] p-6 h-full flex flex-col"

// Hover — white tint instead of indigo tint
hoveredId === agent.id ? 'bg-[#111111]' : 'bg-transparent'

// Role badge
<span className="text-[10px] font-medium uppercase tracking-wide text-[var(--cc-text-muted)] bg-[rgba(255,255,255,0.04)] rounded px-1.5 py-0.5">

// New Agent link — white instead of indigo
className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors py-2 rounded-lg hover:bg-[rgba(255,255,255,0.04)]"

// Loading skeleton
<div key={i} className="h-14 rounded-lg bg-[rgba(255,255,255,0.02)] animate-pulse" />

// Toggle buttons
className="p-1.5 rounded-md text-[var(--cc-text-muted)] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-colors"
```

- [ ] **Step 4: Update ActivityFeed.tsx**

```tsx
// Status icons → grayscale
const STATUS_ICONS: Record<ActivityStatus, React.ReactNode> = {
  success: <CheckCircle2 className="h-3.5 w-3.5 text-white/70" />,
  error: <XCircle className="h-3.5 w-3.5 text-[var(--cc-text-muted)]" />,
  running: <Loader2 className="h-3.5 w-3.5 text-white/70 animate-spin" />,
};

// Card
className="rounded-[14px] border border-[var(--cc-border)] bg-[#0A0A0A] p-6 h-full flex flex-col"

// Hover
className="flex items-start gap-2.5 px-2 py-2 rounded-lg hover:bg-[#111111] transition-colors"

// Offline badge
<span className="text-[10px] text-white/70 bg-[rgba(255,255,255,0.04)] rounded-full px-2 py-0.5">

// Loading skeleton
<div key={i} className="h-10 rounded-lg bg-[rgba(255,255,255,0.02)] animate-pulse" />
```

- [ ] **Step 5: Update RecentTasks.tsx**

```tsx
// Card
className="rounded-[14px] border border-[var(--cc-border)] bg-[#0A0A0A] p-6 h-full flex flex-col"

// Hover
className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer transition-colors group hover:bg-[#111111]"

// Completed check — white instead of indigo
<CheckCircle2 className="h-4 w-4 text-white/50 shrink-0" />

// Circle hover — white instead of indigo
<Circle className="h-4 w-4 text-[var(--cc-text-muted)] group-hover:text-white shrink-0 transition-colors" />

// Priority dots → grayscale
const priorityColor = (p: Task['priority']) =>
  p === 'high' ? 'bg-white' : p === 'medium' ? 'bg-white/60' : 'bg-white/30';

// Filter active — white instead of indigo
filter === f
  ? 'bg-[rgba(255,255,255,0.06)] text-white'
  : 'text-[var(--cc-text-muted)] hover:text-white'

// Add task button
className="px-3 py-2 rounded-lg bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors"

// Add task input focus
className="flex-1 bg-[#111111] border border-[var(--cc-border)] rounded-lg px-3 py-2 text-sm text-white placeholder-[var(--cc-text-muted)] outline-none focus:border-white/30"

// Add Task link
className="mt-2 flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-colors"
```

- [ ] **Step 6: Update QuickActions.tsx**

```tsx
// Remove color field from ACTIONS array
const ACTIONS = [
  { label: 'Run All Agents', icon: Zap, href: '#' },
  { label: 'Send Campaign', icon: Mail, href: '#' },
  { label: 'Generate Content', icon: FileText, href: '#' },
  { label: 'View Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

// All icons → white
<action.icon className="h-4 w-4 text-white/60" />

// Button style → white glow
className="inline-flex items-center gap-2 rounded-lg border border-[var(--cc-border)] bg-[#0A0A0A] px-4 py-2.5 text-sm text-[var(--cc-text-secondary)] hover:text-white hover:border-white/20 hover:bg-[#111111] transition-all duration-300 shrink-0"
```

- [ ] **Step 7: Commit**

```bash
git add components/command-center/panels/
git commit -m "style: monochrome dashboard panels with white glow hover"
```

---

### Task 6: Monochrome CommandCenterShell

**Files:**
- Modify: `components/command-center/CommandCenterShell.tsx`

- [ ] **Step 1: Update loading and shell colors**

```tsx
// Loading state
<div className="h-screen bg-black flex items-center justify-center">
  <div className="flex flex-col items-center gap-3">
    <div className="h-8 w-8 rounded-lg bg-white/10 animate-pulse" />
    <p className="text-sm text-[var(--cc-text-muted)]">Loading Command Center...</p>
  </div>
</div>

// Main shell
<div className="flex h-screen bg-black">

// Main content area
<main className="flex-1 overflow-y-auto bg-black">
```

- [ ] **Step 2: Commit**

```bash
git add components/command-center/CommandCenterShell.tsx
git commit -m "style: monochrome CommandCenterShell"
```

---

### Task 7: Create `invoices` Database Table

**Files:**
- Create: DB migration via Supabase MCP

- [ ] **Step 1: Apply migration**

Use Supabase MCP `apply_migration` on project `otxifqcvgmxoxemmgbjd`:

```sql
CREATE TABLE IF NOT EXISTS public.invoices (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  client_name text NOT NULL,
  client_email text,
  items jsonb DEFAULT '[]'::jsonb,
  subtotal numeric DEFAULT 0,
  tax_rate numeric DEFAULT 0,
  tax_amount numeric DEFAULT 0,
  total numeric DEFAULT 0,
  notes text DEFAULT '',
  status text DEFAULT 'draft' CHECK (status = ANY (ARRAY['draft', 'sent', 'paid', 'cancelled'])),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_view_own_invoices" ON public.invoices
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "users_insert_own_invoices" ON public.invoices
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_update_own_invoices" ON public.invoices
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
```

- [ ] **Step 2: Verify table exists**

Run via Supabase MCP `execute_sql`:
```sql
SELECT table_name FROM information_schema.tables WHERE table_name = 'invoices';
```
Expected: returns `invoices`

- [ ] **Step 3: Generate TypeScript types**

Run via Supabase MCP `generate_typescript_types` on project `otxifqcvgmxoxemmgbjd`

- [ ] **Step 4: Commit** — note: migration applied to remote DB, no local files to commit for this task

---

### Task 8: Create Invoice Generator API Route

**Files:**
- Create: `app/api/invoices/generate/route.ts`

- [ ] **Step 1: Write the API route**

```ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are FlowForges Invoice Agent. Extract invoice details from the user's message.

Return ONLY valid JSON in this exact format, no other text:
{
  "client_name": "Company or person name",
  "client_email": "email if mentioned or null",
  "items": [{"description": "Service description", "quantity": 1, "rate": 0, "amount": 0}],
  "tax_rate": 0,
  "notes": "any additional notes or empty string",
  "subtotal": 0,
  "tax_amount": 0,
  "total": 0
}

Rules:
- If user says "18% GST" or similar, set tax_rate to that number
- Calculate amounts: amount = quantity * rate, subtotal = sum of amounts, tax_amount = subtotal * (tax_rate / 100), total = subtotal + tax_amount
- Use whole numbers for rates unless decimal specified
- Default to 0 tax_rate if not mentioned
- Extract whatever details the user provides, leave missing fields as defaults`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body as {
      messages: { role: 'user' | 'assistant'; content: string }[];
    };

    if (!messages?.length) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: 'Understood. I will extract invoice details and return valid JSON only.' }] },
        ...messages.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
      ],
      generationConfig: { temperature: 0.1, maxOutputTokens: 1024 },
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const text = result.response.text();

    // Parse the JSON from the response
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const invoiceData = JSON.parse(cleaned);

    return NextResponse.json({ success: true, data: invoiceData });
  } catch (error) {
    console.error('[invoice/generate] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate invoice', details: String(error) },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Test API locally**

```bash
curl -X POST http://localhost:3000/api/invoices/generate \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Invoice for Acme Corp — CRM integration, 60 hours at $125/hr, 18% GST"}]}'
```
Expected: Returns JSON with client_name, items, totals

- [ ] **Step 3: Commit**

```bash
git add app/api/invoices/generate/route.ts
git commit -m "feat: add invoice generator API route with Gemini"
```

---

### Task 9: Create Invoice API Route (CRUD)

**Files:**
- Create: `app/api/invoices/route.ts`

- [ ] **Step 1: Write the CRUD route**

```ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ invoices: data });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { data, error } = await supabase
    .from('invoices')
    .insert({ ...body, user_id: user.id })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ invoice: data });
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/invoices/route.ts
git commit -m "feat: add invoice CRUD API route"
```

---

### Task 10: Create InvoiceChat Component

**Files:**
- Create: `components/command-center/panels/InvoiceChat.tsx`

- [ ] **Step 1: Write the component**

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface InvoiceData {
  client_name: string;
  client_email: string | null;
  items: { description: string; quantity: number; rate: number; amount: number }[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  notes: string;
}

interface InvoiceChatProps {
  onInvoiceUpdate: (data: InvoiceData) => void;
  invoiceData: InvoiceData | null;
}

export function InvoiceChat({ onInvoiceUpdate, invoiceData }: InvoiceChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "I'm your invoice agent. Describe what you need — client, services, hours, rates, taxes — and I'll build it. Example: \"Invoice for Acme Corp — built custom CRM, 60 hours at $125/hr, 18% GST\"",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const allMessages = [...messages, userMsg].filter((m) => m.role !== 'assistant' || m !== messages[0]);
      const res = await fetch('/api/invoices/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages.slice(-6) }),
      });
      const json = await res.json();

      if (json.success && json.data) {
        onInvoiceUpdate(json.data);
        const summary = `Got it. Invoice for **${json.data.client_name}**: ${json.data.items.length} line item(s), subtotal $${json.data.subtotal}, tax $${json.data.tax_amount} (${json.data.tax_rate}%), **total $${json.data.total}**. Type \"save\" to store this invoice, or describe changes.`;
        setMessages((prev) => [...prev, { role: 'assistant', content: summary }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I had trouble parsing that. Try being more specific — client name, service, hours, rate, and tax rate.' }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!invoiceData) return;
    const res = await fetch('/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoiceData),
    });
    const json = await res.json();
    if (json.invoice) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Invoice saved successfully. You can download the PDF now.' }]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--cc-border)]">
        <h3 className="text-base font-semibold text-white">Invoice Agent</h3>
        <span className="text-[10px] font-mono text-[var(--cc-text-muted)] uppercase tracking-wider">Gemini 2.5 Flash</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-white text-black'
                  : 'bg-[#111111] border border-[var(--cc-border)] text-white'
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#111111] border border-[var(--cc-border)] rounded-xl px-4 py-3">
              <Loader2 className="h-4 w-4 text-white/50 animate-spin" />
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-[var(--cc-border)]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe the invoice..."
            className="flex-1 bg-[#0A0A0A] border border-[var(--cc-border)] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[var(--cc-text-muted)] outline-none focus:border-white/30 transition-colors"
          />
          {invoiceData && (
            <button
              onClick={handleSave}
              className="px-4 py-2.5 rounded-lg border border-white/20 text-white/80 text-sm hover:bg-white hover:text-black transition-all duration-300"
            >
              Save
            </button>
          )}
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 disabled:opacity-30 transition-all duration-300"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/command-center/panels/InvoiceChat.tsx
git commit -m "feat: add InvoiceChat component"
```

---

### Task 11: Create InvoicePreview Component

**Files:**
- Create: `components/command-center/panels/InvoicePreview.tsx`

- [ ] **Step 1: Write the component**

```tsx
'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceData {
  client_name: string;
  client_email: string | null;
  items: InvoiceItem[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  notes: string;
}

interface InvoicePreviewProps {
  data: InvoiceData | null;
}

function EmptyPreview() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="h-16 w-16 rounded-2xl bg-[rgba(255,255,255,0.04)] flex items-center justify-center mb-4">
        <FileText className="h-7 w-7 text-[var(--cc-text-muted)]" />
      </div>
      <h3 className="text-sm font-semibold text-[var(--cc-text-secondary)] mb-1">No Invoice Yet</h3>
      <p className="text-xs text-[var(--cc-text-muted)] max-w-[240px]">
        Describe your invoice in the chat panel and it will appear here in real-time.
      </p>
    </div>
  );
}

export function InvoicePreview({ data }: InvoicePreviewProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!printRef.current) return;
    const html = printRef.current.outerHTML;
    const blob = new Blob(
      [`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Invoice</title><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-black text-white">${html}</body></html>`],
      { type: 'text/html' }
    );
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  if (!data) return <EmptyPreview />;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--cc-border)]">
        <h3 className="text-base font-semibold text-white">Invoice Preview</h3>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          Download
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <motion.div
          ref={printRef}
          key={JSON.stringify(data)}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black border border-[var(--cc-border)] rounded-xl p-6 space-y-5"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-lg font-bold text-white font-display">FlowForges</h4>
              <p className="text-[11px] text-[var(--cc-text-muted)] mt-0.5">AI Automation Agency</p>
              <p className="text-[11px] text-[var(--cc-text-muted)]">hello@flowforges.com</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--cc-text-muted)]">Invoice</p>
              <p className="text-xs text-[var(--cc-text-muted)] mt-0.5">
                {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="h-px bg-[var(--cc-border)]" />

          {/* Bill To */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--cc-text-muted)] mb-1">Bill To</p>
            <p className="text-sm font-semibold text-white">{data.client_name}</p>
            {data.client_email && (
              <p className="text-xs text-[var(--cc-text-secondary)] mt-0.5">{data.client_email}</p>
            )}
          </div>

          {/* Items */}
          <div>
            <div className="grid grid-cols-12 gap-2 text-[10px] font-mono uppercase tracking-wider text-[var(--cc-text-muted)] pb-2 border-b border-[var(--cc-border)] mb-2">
              <span className="col-span-5">Description</span>
              <span className="col-span-2 text-center">Qty</span>
              <span className="col-span-2 text-right">Rate</span>
              <span className="col-span-3 text-right">Amount</span>
            </div>
            {data.items.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 py-1.5 text-sm">
                <span className="col-span-5 text-white">{item.description}</span>
                <span className="col-span-2 text-center text-[var(--cc-text-secondary)]">{item.quantity}</span>
                <span className="col-span-2 text-right text-[var(--cc-text-secondary)]">${item.rate}</span>
                <span className="col-span-3 text-right text-white font-mono">${item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="h-px bg-[var(--cc-border)]" />

          {/* Totals */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--cc-text-secondary)]">Subtotal</span>
              <span className="text-white font-mono">${data.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--cc-text-secondary)]">Tax ({data.tax_rate}%)</span>
              <span className="text-white font-mono">${data.tax_amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-[var(--cc-border)]">
              <span className="text-white">Total</span>
              <span className="text-white font-mono">${data.total.toLocaleString()}</span>
            </div>
          </div>

          {data.notes && (
            <>
              <div className="h-px bg-[var(--cc-border)]" />
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--cc-text-muted)] mb-1">Notes</p>
                <p className="text-xs text-[var(--cc-text-secondary)]">{data.notes}</p>
              </div>
            </>
          )}

          {/* Footer */}
          <div className="h-px bg-[var(--cc-border)]" />
          <div className="text-center">
            <p className="text-[10px] text-[var(--cc-text-muted)]">Thank you for your business.</p>
            <p className="text-[10px] text-[var(--cc-text-muted)] mt-0.5">Payment due within 30 days.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/command-center/panels/InvoicePreview.tsx
git commit -m "feat: add InvoicePreview component with download"
```

---

### Task 12: Create Dashboard Invoices Page

**Files:**
- Create: `app/dashboard/invoices/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { InvoiceChat } from '@/components/command-center/panels/InvoiceChat';
import { InvoicePreview } from '@/components/command-center/panels/InvoicePreview';

interface InvoiceData {
  client_name: string;
  client_email: string | null;
  items: { description: string; quantity: number; rate: number; amount: number }[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  notes: string;
}

export const dynamic = 'force-dynamic';

export default function InvoicesPage() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-64px)] flex"
    >
      {/* Left panel — Chat */}
      <div className="w-full lg:w-[40%] border-r border-[var(--cc-border)]">
        <InvoiceChat onInvoiceUpdate={setInvoiceData} invoiceData={invoiceData} />
      </div>

      {/* Right panel — Preview */}
      <div className="hidden lg:flex flex-1 flex-col">
        <InvoicePreview data={invoiceData} />
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/dashboard/invoices/page.tsx
git commit -m "feat: add dashboard invoices page"
```

---

### Task 13: Add Invoices to Sidebar Navigation

**Files:**
- Modify: `components/command-center/Sidebar.tsx`

- [ ] **Step 1: Add Invoices nav item**

Add `Receipt` to the lucide-react import:
```tsx
import { ..., Receipt } from 'lucide-react';
```

Add to NAV_ITEMS array (between Activity Log and Blog):
```tsx
{ label: 'Invoices', icon: Receipt, href: '/dashboard/invoices' },
```

- [ ] **Step 2: Commit**

```bash
git add components/command-center/Sidebar.tsx
git commit -m "feat: add Invoices link to sidebar"
```

---

### Task 14: Build Verification

- [ ] **Step 1: Run production build**

```bash
pnpm build 2>&1
```
Expected: `✓ Compiled successfully`, `✓ TypeScript`, zero errors

- [ ] **Step 2: Test dashboard visually**

```bash
pnpm dev
```
Navigate to `http://localhost:3000/dashboard`
Verify:
- Background is pure black (`#000000`)
- Sidebar has white accents, no indigo/amber/green
- Stat cards have white hover glow
- Pipeline chart bars are grayscale
- Agent grid uses white status indicators
- All text is white/grayscale

- [ ] **Step 3: Test invoice generator**

Navigate to `http://localhost:3000/dashboard/invoices`
- Type: "Invoice for Acme Corp — CRM integration, 60 hours at $125/hr, add 18% GST"
- Verify chat responds with structured invoice
- Verify right panel shows live invoice preview
- Click Download — verify new tab opens with invoice

- [ ] **Step 4: Test existing pages unaffected**

Navigate to `/`, `/products`, `/services`, `/blog`, `/contact`
Verify: All existing pages render with their original themes unchanged

- [ ] **Step 5: Commit any remaining fixes**

```bash
git status
git add [any modified files]
git commit -m "chore: final verification fixes"
```
