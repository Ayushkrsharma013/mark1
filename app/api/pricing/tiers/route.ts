import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";

const FALLBACK_TIERS = [
  {
    name: "Starter",
    price: "From ₹3,000",
    period: "per engagement",
    description:
      "AI strategy and readiness audit. One-off engagements that give you a clear automation roadmap.",
    features: [
      "Operations deep-dive & audit",
      "High-ROI opportunity sizing report",
      "Phased implementation roadmap",
      "Vendor & tool recommendations",
      "Delivered in 2–3 weeks",
    ],
    highlighted: false,
    cta: "Book a Call",
    href: "/home/book-demo",
  },
  {
    name: "Growth",
    price: "From ₹50,000",
    period: "per engagement",
    description:
      "Custom AI agents and workflow automation. We build, deploy, and optimize for 30 days post-launch.",
    features: [
      "Custom conversational AI agent",
      "Multi-channel deployment (web, Slack, WhatsApp)",
      "Workflow automation scripts",
      "Integration with your existing stack",
      "30 days of optimization & support",
      "Documentation & team training",
    ],
    highlighted: true,
    cta: "Book a Demo",
    href: "/home/book-demo",
  },
  {
    name: "Enterprise",
    price: "From ₹1,50,000",
    period: "per engagement",
    description:
      "Full AI workforce. Multiple agents, custom models, end-to-end process automation. Ongoing retainer available.",
    features: [
      "Everything in Growth, plus:",
      "Multiple AI agents working in parallel",
      "Custom ML model development",
      "Predictive analytics dashboards",
      "Dedicated AI strategist",
      "Quarterly model refresh & audit",
      "Priority Slack/phone support",
    ],
    highlighted: false,
    cta: "Contact Sales",
    href: "/home#contact",
  },
];

async function fetchTiers() {
  try {
    const supabase = getAdminClient();
    const { data, error } = await (supabase as any)
      .from("pricing_tiers")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    if (data && data.length > 0) return data;
    return null;
  } catch {
    return null;
  }
}

export async function GET() {
  const tiers = await fetchTiers();

  if (tiers) {
    return NextResponse.json({ tiers });
  }

  return NextResponse.json({ tiers: FALLBACK_TIERS, fallback: true });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabase = getAdminClient();
    const { data, error } = await (supabase as any)
      .from("pricing_tiers")
      .insert({
        name: body.name,
        price: body.price,
        period: body.period,
        description: body.description,
        features: body.features,
        highlighted: body.highlighted ?? false,
        cta: body.cta ?? "Book a Call",
        href: body.href ?? "/home/book-demo",
        sort_order: body.sort_order ?? 0,
        active: body.active ?? true,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ tier: data }, { status: 201 });
  } catch (error) {
    console.error("Failed to create pricing tier:", error);
    return NextResponse.json(
      { error: "Failed to create tier" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();
    const { data, error } = await (supabase as any)
      .from("pricing_tiers")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ tier: data });
  } catch (error) {
    console.error("Failed to update pricing tier:", error);
    return NextResponse.json(
      { error: "Failed to update tier" },
      { status: 500 }
    );
  }
}
