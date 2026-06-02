"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Workflow, BarChart3, Code2, Globe, Shield, Check } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Bot,
    title: "AI Agents & Chatbots",
    price: "From $5,000",
    description:
      "Custom conversational AI that handles customer support, books meetings, and qualifies leads. Deployed on your website, Slack, or WhatsApp.",
    deliverables: [
      "Custom-trained on your knowledge base",
      "Multi-channel deployment",
      "Human handoff workflows",
      "30 days of optimization",
    ],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    price: "From $8,000",
    description:
      "We map, redesign, and automate your core business processes — approvals, data pipelines, reporting, and more.",
    deliverables: [
      "End-to-end process audit",
      "Custom automation scripts",
      "Integration with your stack",
      "Documentation & training",
    ],
  },
  {
    icon: Code2,
    title: "Custom AI Development",
    price: "From $15,000",
    description:
      "Bespoke AI solutions using Claude, GPT, or open-source models. Full-cycle: data prep, model selection, deployment, and monitoring.",
    deliverables: [
      "Architecture & model selection",
      "Training data pipeline",
      "Production deployment",
      "Monitoring & maintenance plan",
    ],
  },
  {
    icon: Globe,
    title: "Productized Services",
    price: "Subscription",
    description:
      "Ready-to-deploy AI products like Prospecting OS. Plug in your keys, customize your settings, start generating value same-day.",
    deliverables: [
      "Instant deployment",
      "Regular feature updates",
      "Priority support",
      "Usage-based pricing available",
    ],
  },
  {
    icon: BarChart3,
    title: "AI Analytics",
    price: "From $6,000",
    description:
      "Turn raw data into predictive dashboards. Churn forecasting, lead scoring, revenue modeling — custom-built for your metrics.",
    deliverables: [
      "Data source integration",
      "Custom ML models",
      "Interactive dashboards",
      "Quarterly model refresh",
    ],
  },
  {
    icon: Shield,
    title: "AI Strategy & Consulting",
    price: "From $3,000",
    description:
      "Fractional AI advisory. We audit your operations, identify high-ROI automation opportunities, and build a phased execution roadmap.",
    deliverables: [
      "Operations deep-dive",
      "Opportunity sizing report",
      "Phased implementation plan",
      "Vendor & tool recommendations",
    ],
  },
];

export function ServicesContent() {
  return (
    <div style={{ background: "#0A0A0A" }}>
      {/* ── HERO ── */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-medium text-[#e8420a] tracking-widest uppercase mb-3">SERVICES</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">What we build for you</h1>
            <p className="text-[#71717a] leading-relaxed max-w-xl mx-auto">
              Everything is custom. Nothing is templated. We design AI solutions around your business logic
              — not the other way around.
            </p>
            <p className="text-sm text-[#52525b] mt-4">
              All prices in USD. Every engagement includes 30 days post-launch support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto pt-16 space-y-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="rounded-lg border border-[#1a1a1a] bg-[#111111] p-6 md:p-8 hover:border-zinc-700 transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-12 h-12 rounded-lg bg-[rgba(232,66,10,0.08)] flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-[#e8420a]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                      <span className="text-sm font-medium text-[#e8420a] bg-[rgba(232,66,10,0.06)] rounded-full px-3 py-1">
                        {service.price}
                      </span>
                    </div>
                    <p className="mt-3 text-[#a1a1aa] leading-relaxed">{service.description}</p>
                    <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                          <Check className="h-4 w-4 text-[#e8420a] mt-0.5 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-[#1a1a1a]">
        <h3 className="text-2xl font-bold text-white">Don&apos;t see what you need?</h3>
        <p className="mt-2 text-[#71717a]">
          We take on unconventional projects. If it involves AI and automation, we can build it.
        </p>
        <div className="mt-6">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#e8420a] text-white font-semibold text-sm hover:bg-[#cc3a08] transition-colors"
          >
            Tell Us About Your Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
