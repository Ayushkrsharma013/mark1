"use client";

import Link from "next/link";
import { Shield, FileText, RotateCcw, Truck, Ban, CreditCard } from "lucide-react";

const prospectingFeatures = [
  "Unlimited lead scraping",
  "AI ICP scoring with reasoning",
  "Slack & Telegram delivery",
  "Icebreaker message generation",
  "Pipeline dashboard access",
  "Monthly performance report",
];

const remiFeatures = [
  "Instant SMS response to missed calls",
  "AI lead qualification",
  "Appointment booking automation",
  "CRM integration",
  "Call analytics dashboard",
  "US phone number included",
];

const services = [
  { name: "AI Agent / Chatbot", price: "From $5,000", time: "3–4 weeks" },
  { name: "Workflow Automation", price: "From $8,000", time: "4–6 weeks" },
  { name: "Custom AI Development", price: "From $15,000", time: "6–8 weeks" },
  { name: "AI Analytics Dashboard", price: "From $6,000", time: "3–5 weeks" },
  { name: "AI Strategy & Consulting", price: "From $3,000", time: "2–3 weeks" },
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
    <div style={{ background: "#0A0A0A" }}>

      {/* ── HEADER ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 text-center">
        <p className="text-xs font-medium text-[#e8420a] tracking-widest uppercase mb-3">PRICING</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Simple, transparent pricing</h1>
        <p className="text-[#71717a] max-w-xl mx-auto">
          Productized AI agents with fixed monthly pricing, or custom builds scoped to your needs.
          All prices in USD.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* ── PRODUCTS ── */}
        <p className="text-xs font-medium text-[#71717a] tracking-widest uppercase mb-8">
          AI PRODUCTS — PLUG &amp; PLAY
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">

          {/* Prospecting OS — featured */}
          <div className="p-8 rounded-lg bg-[#111111] border-2 border-[#e8420a] relative">
            <div className="absolute -top-3 left-8">
              <span className="px-3 py-1 rounded-full bg-[#e8420a] text-white text-xs font-medium">
                Most Popular
              </span>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-1">Prospecting OS</h3>
              <p className="text-[#71717a] text-sm">AI-powered B2B lead generation</p>
            </div>
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">$499</span>
                <span className="text-[#71717a]">/month</span>
              </div>
              <p className="text-[#71717a] text-xs mt-1">+ $1,499 one-time setup fee</p>
            </div>
            <div className="space-y-3 mb-8">
              {prospectingFeatures.map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                  <span className="text-[#e8420a] font-bold">✓</span>
                  {f}
                </div>
              ))}
            </div>
            <Link
              href="/book"
              className="block w-full text-center py-3.5 rounded-full bg-[#e8420a] text-white font-semibold text-sm hover:bg-[#cc3a08] transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Remi */}
          <div className="p-8 rounded-lg bg-[#111111] border border-[#1a1a1a] hover:border-zinc-700 transition-colors relative">
            <div className="absolute -top-3 left-8">
              <span className="px-3 py-1 rounded-full bg-[#111111] border border-[#1a1a1a] text-[#71717a] text-xs font-medium">
                New
              </span>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-1">Remi</h3>
              <p className="text-[#71717a] text-sm">AI missed call recovery agent</p>
            </div>
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">$299</span>
                <span className="text-[#71717a]">/month</span>
              </div>
              <p className="text-[#71717a] text-xs mt-1">+ $999 one-time setup fee</p>
            </div>
            <div className="space-y-3 mb-8">
              {remiFeatures.map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                  <span className="text-[#e8420a] font-bold">✓</span>
                  {f}
                </div>
              ))}
            </div>
            <Link
              href="/book"
              className="block w-full text-center py-3.5 rounded-full border border-[#1a1a1a] text-white font-semibold text-sm hover:border-zinc-600 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* ── CUSTOM SERVICES ── */}
        <p className="text-xs font-medium text-[#71717a] tracking-widest uppercase mb-8">
          CUSTOM SERVICES — BUILT FOR YOU
        </p>

        <div className="rounded-lg bg-[#111111] border border-[#1a1a1a] overflow-hidden mb-8">
          {services.map(({ name, price, time }, i) => (
            <div
              key={name}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-2 ${
                i < services.length - 1 ? "border-b border-[#1a1a1a]" : ""
              }`}
            >
              <span className="text-white font-medium">{name}</span>
              <div className="flex items-center gap-6">
                <span className="text-[#71717a] text-sm">{time}</span>
                <span className="text-white font-semibold">{price}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[#71717a] text-sm mb-6">
          All custom engagements include 30 days post-launch support. Monthly retainers available from $2,000/month.
        </p>

        <Link
          href="/book"
          className="inline-flex px-8 py-3.5 rounded-full bg-[#e8420a] text-white font-semibold text-sm hover:bg-[#cc3a08] transition-colors"
        >
          Discuss Your Project
        </Link>

        {/* ── SCOPE CTA ── */}
        <div className="mt-16 p-8 rounded-lg border border-[#1a1a1a] bg-[#111111] text-center">
          <p className="text-white font-medium mb-2">Not sure which fits?</p>
          <p className="text-sm text-[#71717a] mb-6">Book a 30-min call — we&apos;ll scope it together.</p>
          <Link
            href="/book"
            className="inline-flex px-8 py-3.5 rounded-full bg-[#e8420a] text-white font-semibold text-sm hover:bg-[#cc3a08] transition-colors"
          >
            Book a Free Call
          </Link>
        </div>

        {/* ── LEGAL LINKS ── */}
        <div className="mt-24 mb-16">
          <h2 className="text-xl font-semibold text-white text-center mb-6">
            Everything you need to know before you start
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {legalLinks.map(({ icon: Icon, title, desc, href }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-start gap-3 rounded-lg border border-[#1a1a1a] bg-[#111111] p-4 hover:bg-[rgba(255,255,255,0.03)] hover:border-zinc-700 transition-colors"
              >
                <Icon className="w-4 h-4 text-[#52525b] group-hover:text-[#e8420a] transition-colors flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white group-hover:text-[#e8420a] transition-colors">
                    {title}
                  </p>
                  <p className="text-xs text-[#71717a] mt-0.5">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-center mt-5 text-xs text-[#52525b]">
            Questions about our policies?{" "}
            <a href="mailto:support@flow-forges.com" className="text-[#e8420a] hover:underline">
              support@flow-forges.com
            </a>
          </p>
        </div>

        {/* ── FAQ ── */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-xl font-semibold text-white text-center mb-6">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-lg border border-[#1a1a1a] bg-[#111111]"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-medium text-white select-none">
                  {q}
                  <span className="text-[#52525b] group-open:rotate-180 transition-transform ml-2 flex-shrink-0">▼</span>
                </summary>
                <p className="px-4 pb-4 text-sm text-[#a1a1aa] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="text-center">
          <p className="text-[#71717a] text-sm mb-3">Ready to get started?</p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#e8420a] text-white font-semibold text-sm hover:bg-[#cc3a08] transition-colors"
          >
            Book a Free Strategy Call
          </Link>
        </div>
      </div>
    </div>
  );
}
