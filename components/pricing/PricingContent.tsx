"use client";

import Link from "next/link";
import { AsciiBackground } from "@/components/ui/AsciiBackground";
import {
  ArrowRight,
  Check,
  Shield,
  FileText,
  RotateCcw,
  Truck,
  Ban,
  CreditCard,
} from "lucide-react";

const products = [
  {
    name: "Prospecting OS",
    badge: "Most Popular",
    badgeStyle: "bg-[#00d4ff] text-[#04040a]",
    price: "$499",
    period: "/month",
    setup: "+ $1,499 one-time setup",
    description:
      "AI-powered B2B lead generation. Scrape, score, and manage leads from LinkedIn, Google Maps, and Amazon.",
    features: [
      "Unlimited lead scraping",
      "AI ICP scoring with reasoning",
      "Slack & Telegram delivery",
      "Dedicated pipeline dashboard",
      "Icebreaker generation",
      "Monthly performance report",
    ],
    highlighted: true,
    href: "/book",
  },
  {
    name: "Remi — Missed Call Recovery",
    badge: "New",
    badgeStyle: "bg-[rgba(0,255,136,0.12)] text-[#00ff88]",
    price: "$299",
    period: "/month",
    setup: "+ $999 one-time setup",
    description:
      "AI agent that recovers missed calls 24/7. Texts back instantly, qualifies leads, books appointments automatically.",
    features: [
      "Instant SMS response to missed calls",
      "AI lead qualification",
      "Appointment booking",
      "CRM integration",
      "Call analytics dashboard",
      "US phone number included",
    ],
    highlighted: false,
    href: "/book",
  },
];

const services = [
  { name: "AI Agent / Chatbot", price: "From $5,000", timeline: "3–4 weeks" },
  { name: "Workflow Automation", price: "From $8,000", timeline: "4–6 weeks" },
  { name: "Custom AI Development", price: "From $15,000", timeline: "6–8 weeks" },
  { name: "AI Analytics Dashboard", price: "From $6,000", timeline: "3–5 weeks" },
  { name: "AI Strategy & Consulting", price: "From $3,000", timeline: "2–3 weeks" },
];

const legalLinks = [
  { icon: Shield, title: "Privacy Policy", desc: "How we protect your data", href: "/legal/privacy" },
  { icon: FileText, title: "Terms of Service", desc: "Rules for using our services", href: "/legal/terms" },
  { icon: RotateCcw, title: "Refund Policy", desc: "Our refund terms", href: "/legal/refund" },
  { icon: Truck, title: "Shipping Policy", desc: "Digital delivery timelines", href: "/legal/shipping" },
  { icon: Ban, title: "Cancellation Policy", desc: "How to cancel services", href: "/legal/cancellation" },
  { icon: CreditCard, title: "Payment Disclosure", desc: "Processors & security", href: "/legal/payment-disclosure" },
];

const faqs = [
  {
    q: "What payment methods do you accept?",
    a: "International clients: Credit/debit cards and PayPal via Paddle (USD). Indian clients: UPI and net-banking available. All subscriptions auto-renew monthly.",
  },
  {
    q: "Do you work with startups?",
    a: "Yes. We work with early-stage startups and scaling agencies. For startups, we can structure milestone-based payment terms. Book a call to discuss.",
  },
  {
    q: "Do you offer retainers?",
    a: "Yes. After your initial build, retainers start at $2,000/month for ongoing optimization, monitoring, and new feature development.",
  },
  {
    q: "How long does a typical engagement take?",
    a: "Strategy audits: 2–3 weeks. AI agent builds: 3–6 weeks. Enterprise projects: 6–12 weeks. Timelines depend on scope and integration complexity.",
  },
  {
    q: "What if I need changes after delivery?",
    a: "All engagements include 30 days of post-launch support. After that, changes are scoped as a new engagement or covered under a monthly retainer.",
  },
  {
    q: "Why no fixed prices on custom work?",
    a: "Every engagement is different. A simple FAQ bot and a multi-agent ERP integration are both 'AI agents' — but the scope is very different. We scope first, then price. Book a call and we'll give you a clear estimate.",
  },
];

export function PricingContent() {
  return (
    <div className="pt-24 pb-16 px-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-8 md:p-12 mb-10">
        <AsciiBackground
          mode="legal"
          className="absolute inset-0 w-full h-full opacity-40"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-bold text-white">
            Simple, Transparent Pricing
          </h1>
          <p className="text-sm text-[#71717a] mt-2 max-w-lg mx-auto">
            Choose between our ready-to-deploy AI products or custom-built
            solutions. All prices in USD.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl">

        {/* ── Products ── */}
        <div className="mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-[#52525b] text-center mb-8">
            AI PRODUCTS — PLUG &amp; PLAY
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {products.map((product) => (
              <div
                key={product.name}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  product.highlighted
                    ? "border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.03)] ring-1 ring-[rgba(0,212,255,0.1)]"
                    : "border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
                }`}
              >
                <span
                  className={`inline-flex items-center self-start rounded-full px-3 py-1 text-xs font-semibold mb-4 ${product.badgeStyle}`}
                >
                  {product.badge}
                </span>
                <h2 className="text-xl font-bold text-white mb-1">{product.name}</h2>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-white">{product.price}</span>
                  <span className="text-sm text-[#52525b]">{product.period}</span>
                </div>
                <p className="text-xs text-[#52525b] mb-4">{product.setup}</p>
                <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6">
                  {product.description}
                </p>
                <ul className="space-y-2.5 flex-1 mb-8">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                      <Check className="w-4 h-4 text-[#00ff88] flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={product.href}
                  className={`block text-center py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                    product.highlighted
                      ? "bg-[#00d4ff] text-[#04040a] hover:bg-[#00d4ff]/90 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]"
                      : "border border-[rgba(255,255,255,0.1)] text-white hover:bg-white/[0.04]"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ── Custom Services ── */}
        <div className="mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-[#52525b] text-center mb-8">
            CUSTOM SERVICES — BUILT FOR YOU
          </p>
          <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.04)]">
                  <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-[#52525b]">
                    Service
                  </th>
                  <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-[#52525b]">
                    Starting Price
                  </th>
                  <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-[#52525b]">
                    Timeline
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((s, i) => (
                  <tr
                    key={s.name}
                    className={i < services.length - 1 ? "border-b border-[rgba(255,255,255,0.04)]" : ""}
                  >
                    <td className="p-4 font-medium text-white">{s.name}</td>
                    <td className="p-4 text-[#00d4ff] font-medium">{s.price}</td>
                    <td className="p-4 text-[#a1a1aa]">{s.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#71717a] text-center mt-4">
            All custom engagements include 30 days post-launch support. Monthly
            retainers available from $2,000/month.
          </p>
          <div className="text-center mt-6">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[rgba(255,255,255,0.1)] text-white text-sm font-semibold hover:bg-white/[0.04] transition-all duration-200"
            >
              Discuss Your Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ── Scope CTA (replaces QuoteBuilder) ── */}
        <div className="mb-16 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-8 text-center">
          <p className="text-white font-medium mb-2">Not sure which fits?</p>
          <p className="text-sm text-[#a1a1aa] mb-6">
            Book a 30-min call — we&apos;ll scope it together.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00d4ff] text-[#04040a] text-sm font-semibold hover:bg-[#00d4ff]/90 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] transition-all duration-200"
          >
            Book a Free Call
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Legal trust strip ── */}
        <div className="mb-16">
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

        {/* ── FAQ ── */}
        <div className="max-w-2xl mx-auto mb-16">
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

        {/* ── Bottom CTA ── */}
        <div className="text-center">
          <p className="text-[#a1a1aa] text-sm mb-3">Ready to get started?</p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00d4ff] text-[#04040a] font-semibold text-sm hover:bg-[#00d4ff]/90 hover:shadow-[0_0_24px_rgba(0,212,255,0.25)] transition-all duration-200"
          >
            Book a Free Strategy Call
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
