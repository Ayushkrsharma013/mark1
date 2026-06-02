"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AsciiBackground } from "@/components/ui/AsciiBackground";
import { QuoteBuilder } from "@/components/pricing/QuoteBuilder";
import type { CurrencyCode } from "@/lib/currency";
import {
  ArrowRight,
  Check,
  Shield,
  FileText,
  RotateCcw,
  Truck,
  Ban,
  CreditCard,
  Globe,
} from "lucide-react";

interface Tier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
  href: string;
}

const FALLBACK_TIERS: Tier[] = [
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
    href: "/book",
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
    href: "/book",
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

const legalLinks = [
  {
    icon: Shield,
    title: "Privacy Policy",
    desc: "How we protect your data",
    href: "/legal/privacy",
  },
  {
    icon: FileText,
    title: "Terms of Service",
    desc: "Rules for using our services",
    href: "/legal/terms",
  },
  {
    icon: RotateCcw,
    title: "Refund Policy",
    desc: "Our refund terms",
    href: "/legal/refund",
  },
  {
    icon: Truck,
    title: "Shipping Policy",
    desc: "Digital delivery timelines",
    href: "/legal/shipping",
  },
  {
    icon: Ban,
    title: "Cancellation Policy",
    desc: "How to cancel services",
    href: "/legal/cancellation",
  },
  {
    icon: CreditCard,
    title: "Payment Disclosure",
    desc: "Processors & security",
    href: "/legal/payment-disclosure",
  },
];

const faqs = [
  {
    q: "Why no fixed prices?",
    a: "Every engagement is custom. Two clients might both want an AI agent — but one needs a simple FAQ bot and the other needs a multi-agent system integrated with their ERP. We scope first, then price. The ranges above are based on past engagements.",
  },
  {
    q: "Do you offer retainers?",
    a: "Yes. After the initial build, many clients move to a monthly retainer for ongoing optimization, monitoring, and new feature development. Retainers start at ₹25,000/month.",
  },
  {
    q: "How long does a typical engagement take?",
    a: "Starter audits: 2–3 weeks. Growth engagements: 4–8 weeks. Enterprise: 8–16 weeks. Timelines depend on scope, data availability, and integration complexity.",
  },
  {
    q: "What if I need changes after delivery?",
    a: "Growth and Enterprise engagements include 30 days of post-launch optimization. After that, changes are scoped as a new engagement or covered under a retainer.",
  },
  {
    q: "Do you work with startups?",
    a: "Yes. We've worked with companies from pre-seed to post-IPO. For early-stage startups, we can structure engagements with flexible payment terms.",
  },
  {
    q: "What payment methods do you accept?",
    a: "International clients: We accept major credit/debit cards and PayPal via Paddle (USD). Indian clients: UPI and net-banking available. See our Payment Disclosure for details.",
  },
];

export function PricingContent() {
  const [tiers, setTiers] = useState<Tier[]>(FALLBACK_TIERS);
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  useEffect(() => {
    fetch("/api/pricing/tiers")
      .then((res) => res.json())
      .then((data) => {
        if (data.currency) {
          setCurrency(data.currency);
        }
        if (data.tiers && !data.fallback) {
          const normalized = data.tiers.map((t: any) => ({
            ...t,
            features: typeof t.features === "string"
              ? JSON.parse(t.features)
              : t.features,
          }));
          setTiers(normalized);
        }
      })
      .catch(() => {
        // Use fallback tiers already set (default USD)
      });
  }, []);

  return (
    <div className="pt-24 pb-16 px-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground
          mode="legal"
          className="absolute inset-0 w-full h-full opacity-40"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-bold text-white">Pricing</h1>
          <p className="text-sm text-[#71717a] mt-2 max-w-lg mx-auto">
            Custom AI automation — scoped to your business, priced for your
            scale. No templates. No hidden fees.
          </p>
          {currency !== "INR" && (
            <div className="inline-flex items-center gap-1.5 mt-3 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-3 py-1 text-xs text-[#a1a1aa]">
              <Globe className="w-3 h-3" />
              Showing prices in {currency} for your region
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-5xl">
        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                tier.highlighted
                  ? "border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.03)] ring-1 ring-[rgba(0,212,255,0.1)]"
                  : "border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#00d4ff] text-[#04040a] text-xs font-semibold px-3 py-1">
                  Most Popular
                </span>
              )}
              <h2 className="text-lg font-semibold text-white">{tier.name}</h2>
              <p className="mt-2 text-2xl font-bold text-white">
                {tier.price}
              </p>
              <p className="text-xs text-[#52525b]">{tier.period}</p>
              <p className="mt-3 text-sm text-[#a1a1aa] leading-relaxed">
                {tier.description}
              </p>

              <ul className="mt-6 space-y-2.5 flex-1">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-[#a1a1aa]"
                  >
                    <Check className="w-4 h-4 text-[#00ff88] flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`mt-8 block text-center py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  tier.highlighted
                    ? "bg-[#00d4ff] text-[#04040a] hover:bg-[#00d4ff]/90 hover:shadow-[0_0_24px_rgba(0,212,255,0.25)]"
                    : "border border-[rgba(255,255,255,0.1)] text-white hover:bg-white/[0.04]"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Quote Builder */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">
              Scope Your Project
            </h2>
            <p className="text-sm text-[#71717a] mt-2 max-w-md mx-auto">
              Not sure which tier fits? Tell us what you need and get a
              personalized estimate in under 60 seconds.
            </p>
          </div>
          <QuoteBuilder currency={currency} />
        </div>

        {/* Legal trust strip */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-white text-center mb-6">
            Everything you need to know before you start
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {legalLinks.map(({ icon: Icon, title, desc, href }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-start gap-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-4 hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.1)] transition-colors"
              >
                <Icon className="w-4 h-4 text-[#52525b] group-hover:text-[#00d4ff] transition-colors flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white group-hover:text-[#00d4ff] transition-colors">
                    {title}
                  </p>
                  <p className="text-xs text-[#71717a] mt-0.5">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-center mt-5 text-xs text-[#52525b]">
            Questions about our policies?{" "}
            <a
              href="mailto:support@flow-forges.com"
              className="text-[#00d4ff] hover:underline"
            >
              support@flow-forges.com
            </a>
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-white text-center mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-medium text-white select-none">
                  {q}
                  <span className="text-[#52525b] group-open:rotate-180 transition-transform ml-2 flex-shrink-0">
                    ▼
                  </span>
                </summary>
                <p className="px-4 pb-4 text-sm text-[#a1a1aa] leading-relaxed">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-[#a1a1aa] text-sm">Ready to scope your project?</p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 mt-3 px-6 py-3 rounded-full bg-[#00d4ff] text-[#04040a] font-semibold text-sm hover:bg-[#00d4ff]/90 hover:shadow-[0_0_24px_rgba(0,212,255,0.25)] transition-all duration-200"
          >
            Book a Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
