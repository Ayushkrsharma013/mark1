import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Plug-and-play AI products. Prospecting OS and Remi — deployed in days, results from day one.",
};

export default function ProductsPage() {
  return (
    <div style={{ background: "#0A0A0A" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">

        <div className="mb-16">
          <p className="text-xs font-medium text-[#e8420a] tracking-widest uppercase mb-3">PRODUCTS</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Plug-and-play AI agents</h1>
          <p className="text-[#71717a] max-w-xl">
            Pre-built, production-ready AI agents. Setup in days. No technical knowledge required from
            your team.
          </p>
        </div>

        {/* ── Prospecting OS — LIVE ── */}
        <div className="p-8 rounded-lg bg-[#111111] border border-[#1a1a1a] mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-0.5 rounded-full bg-[#0a2a0a] border border-[#1a3a1a] text-[#4ade80] text-xs font-medium">
                  ● LIVE
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Prospecting OS</h2>
              <p className="text-[#71717a] leading-relaxed mb-6 max-w-lg">
                AI-powered B2B lead generation. Scrapes LinkedIn, Google Maps, and Amazon. Scores leads
                against your ICP. Delivers qualified prospects to Slack with icebreakers — automatically,
                every day.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Lead Scraping", detail: "LinkedIn, Google Maps, Amazon" },
                  { label: "AI Scoring", detail: "ICP fit with reasoning" },
                  { label: "Auto Delivery", detail: "Slack & Telegram" },
                ].map(({ label, detail }) => (
                  <div key={label} className="p-4 rounded-lg bg-[#0d0d0d] border border-[#1a1a1a]">
                    <p className="text-white text-sm font-medium mb-1">{label}</p>
                    <p className="text-[#71717a] text-xs">{detail}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://app.flow-forges.com/prospecting-os"
                  className="px-6 py-3 rounded-full bg-[#e8420a] text-white font-semibold text-sm hover:bg-[#cc3a08] transition-colors text-center"
                >
                  Open App
                </Link>
                <Link
                  href="/pricing"
                  className="px-6 py-3 rounded-full border border-[#1a1a1a] text-[#71717a] font-semibold text-sm hover:text-white hover:border-zinc-600 transition-colors text-center"
                >
                  View Pricing →
                </Link>
              </div>
            </div>
            <div className="lg:w-48 text-center p-6 rounded-lg bg-[#0d0d0d] border border-[#1a1a1a]">
              <p className="text-3xl font-bold text-white">$499</p>
              <p className="text-[#71717a] text-xs">/month</p>
              <p className="text-[#71717a] text-xs mt-1">+ $1,499 setup</p>
            </div>
          </div>
        </div>

        {/* ── Remi — LIVE ── */}
        <div className="p-8 rounded-lg bg-[#111111] border border-[#1a1a1a] mb-16">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-0.5 rounded-full bg-[#0a2a0a] border border-[#1a3a1a] text-[#4ade80] text-xs font-medium">
                  ● LIVE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#111111] border border-[#1a1a1a] text-[#71717a] text-xs">
                  New
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Remi — Missed Call Recovery</h2>
              <p className="text-[#71717a] leading-relaxed mb-6 max-w-lg">
                AI agent that responds to missed calls instantly via SMS. Qualifies the lead, answers
                questions, and books appointments — while you&apos;re busy. Never lose a client to voicemail
                again.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Instant SMS", detail: "Responds in seconds" },
                  { label: "Lead Qualification", detail: "AI-powered conversations" },
                  { label: "Booking", detail: "Auto appointment scheduling" },
                ].map(({ label, detail }) => (
                  <div key={label} className="p-4 rounded-lg bg-[#0d0d0d] border border-[#1a1a1a]">
                    <p className="text-white text-sm font-medium mb-1">{label}</p>
                    <p className="text-[#71717a] text-xs">{detail}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://agent.flow-forges.com"
                  className="px-6 py-3 rounded-full bg-[#e8420a] text-white font-semibold text-sm hover:bg-[#cc3a08] transition-colors text-center"
                >
                  Learn More
                </Link>
                <Link
                  href="/pricing"
                  className="px-6 py-3 rounded-full border border-[#1a1a1a] text-[#71717a] font-semibold text-sm hover:text-white hover:border-zinc-600 transition-colors text-center"
                >
                  View Pricing →
                </Link>
              </div>
            </div>
            <div className="lg:w-48 text-center p-6 rounded-lg bg-[#0d0d0d] border border-[#1a1a1a]">
              <p className="text-3xl font-bold text-white">$299</p>
              <p className="text-[#71717a] text-xs">/month</p>
              <p className="text-[#71717a] text-xs mt-1">+ $999 setup</p>
            </div>
          </div>
        </div>

        {/* ── Coming Soon ── */}
        <p className="text-xs font-medium text-[#71717a] tracking-widest uppercase mb-6">COMING SOON</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: "Support OS", desc: "AI customer support that learns from your docs." },
            { name: "Content Engine", desc: "Automated content pipeline — research to publish." },
          ].map(({ name, desc }) => (
            <div key={name} className="p-6 rounded-lg bg-[#0d0d0d] border border-[#1a1a1a] opacity-60">
              <span className="text-xs text-[#71717a] tracking-widest uppercase">In Development</span>
              <h3 className="text-white font-semibold mt-2 mb-1">{name}</h3>
              <p className="text-[#71717a] text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
