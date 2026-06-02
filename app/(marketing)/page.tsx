import type { Metadata } from "next";
import Link from "next/link";
import { Box, Wrench, Compass, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FlowForges — AI Automation Agency",
  description:
    "FlowForges builds done-for-you AI agents for digital agencies and e-commerce brands in the US and UK. Prospecting, outreach, support — fully automated.",
};

const whatWeBuild = [
  {
    icon: Box,
    title: "Productized AI Agents",
    body: "Pre-built, ready to deploy. Prospecting OS finds and scores leads automatically. Remi recovers missed calls. Plug in and start seeing results same day.",
    cta: "Explore Products",
    href: "/products",
  },
  {
    icon: Wrench,
    title: "Custom AI Development",
    body: "We build bespoke AI agents, workflow automations, and analytics dashboards tailored to your exact business process. Done-for-you, start to finish.",
    cta: "View Services",
    href: "/services",
  },
  {
    icon: Compass,
    title: "AI Strategy & Consulting",
    body: "Not sure where to start? We audit your operations, identify the highest-ROI automation opportunities, and hand you a phased execution plan.",
    cta: "Book a Call",
    href: "/book",
  },
];

const steps = [
  {
    step: "01",
    title: "Discovery Call",
    body: "We learn your business, bottlenecks, and goals in 30 minutes.",
  },
  {
    step: "02",
    title: "We Build",
    body: "Our team builds and tests your AI agent or automation in 2–4 weeks.",
  },
  {
    step: "03",
    title: "You Launch",
    body: "We deploy, train your team, and handle all integrations.",
  },
  {
    step: "04",
    title: "It Runs",
    body: "Your AI agent works 24/7. We monitor, optimize, and support.",
  },
];

const stats = [
  { stat: "15+", label: "AI Agents Built" },
  { stat: "Done-For-You", label: "Delivery" },
  { stat: "2–4 Weeks", label: "Setup" },
  { stat: "500+", label: "Leads Scored" },
];

const testimonials = [
  {
    quote:
      "FlowForges set up our entire prospecting pipeline in under 2 weeks. We went from manually hunting leads to having a full AI system running overnight.",
    author: "Digital Agency, US",
  },
  {
    quote:
      "The Remi agent recovered 3 clients in the first month who called after hours. ROI was immediate.",
    author: "Service Business, UK",
  },
  {
    quote:
      "Finally an AI agency that actually delivers. No fluff, no templates — they built exactly what we needed.",
    author: "E-commerce Brand, AU",
  },
];

export default function HomePage() {
  return (
    <div style={{ background: "#0A0A0A" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-a  { animation: heroFadeUp 0.55s ease both; }
        .hero-b  { animation: heroFadeUp 0.55s ease 0.1s both; }
        .hero-c  { animation: heroFadeUp 0.55s ease 0.2s both; }
        .hero-d  { animation: heroFadeUp 0.55s ease 0.3s both; }
        .hero-e  { animation: heroFadeUp 0.55s ease 0.4s both; }
      `}} />

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-20 text-center">
        <span className="hero-a inline-flex items-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-4 py-1.5 text-xs font-medium text-[#a1a1aa] mb-7">
          AI Automation Agency · US &amp; UK Clients
        </span>

        <h1 className="hero-b text-5xl md:text-6xl lg:text-7xl font-bold text-white max-w-3xl leading-[1.05] tracking-tight mb-6">
          We Build AI Agents That
          <br />
          Run Your Business
        </h1>

        <p className="hero-c text-lg md:text-xl text-[#a1a1aa] max-w-xl leading-relaxed mb-10">
          Done-for-you AI automation for digital agencies and e-commerce brands.
          Prospecting, outreach, support, and analytics — fully automated.
        </p>

        <div className="hero-d flex flex-col sm:flex-row gap-4 items-center mb-12">
          <Link
            href="/book"
            className="px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_28px_rgba(232,66,10,0.35)]"
            style={{ background: "#e8420a" }}
          >
            Book a Free Strategy Call
          </Link>
          <Link
            href="/case-studies"
            className="px-7 py-3.5 rounded-full font-semibold text-sm text-white border border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-200"
          >
            See Our Work
          </Link>
        </div>

        <p className="hero-e text-xs text-[#52525b] tracking-wide">
          Trusted by agencies in US · UK · AU &nbsp;&middot;&nbsp; Backed by real results &nbsp;&middot;&nbsp; Setup in days, not months
        </p>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className="px-6 py-24 border-t border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-white text-center mb-12">What We Build</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {whatWeBuild.map(({ icon: Icon, title, body, cta, href }) => (
              <div
                key={title}
                className="flex flex-col rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(0,212,255,0.08)] flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-[#00d4ff]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-[#a1a1aa] leading-relaxed mb-5 flex-1">{body}</p>
                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00d4ff] hover:underline"
                >
                  {cta} <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-24 border-t border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {steps.map(({ step, title, body }) => (
              <div
                key={step}
                className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6"
              >
                <div className="text-3xl font-bold text-[rgba(255,255,255,0.08)] mb-3 font-mono">
                  {step}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-[#a1a1aa] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="px-6 py-16 border-t border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ stat, label }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-white">{stat}</div>
              <div className="text-xs text-[#71717a] mt-1.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="px-6 py-24 border-t border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Built for agencies who want results, not complexity
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ quote, author }) => (
              <div
                key={author}
                className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6"
              >
                {/* TODO: replace with real testimonials */}
                <div className="flex gap-0.5 mb-4" aria-label="5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-[#FBBF24] text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-[#a1a1aa] leading-relaxed mb-5">
                  &ldquo;{quote}&rdquo;
                </p>
                <p className="text-xs font-medium text-[#52525b]">— {author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-24 border-t border-[rgba(255,255,255,0.04)] text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to automate your business?
        </h2>
        <p className="text-[#a1a1aa] mb-10 max-w-md mx-auto text-sm leading-relaxed">
          Start with a free 30-minute strategy call. We&apos;ll map out the highest-ROI
          automation for your business.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_32px_rgba(232,66,10,0.3)]"
          style={{ background: "#e8420a" }}
        >
          Book a Free Strategy Call
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
