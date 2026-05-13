"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Clock, Users, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

const studies = [
  {
    title: "From 50 cold calls/day to 20 qualified meetings/week",
    category: "Lead Generation",
    client: "B2B SaaS — Series A",
    result: "18x pipeline growth in 60 days",
    icon: TrendingUp,
    description:
      "Built a multi-source lead scraping engine with AI ICP scoring and automated outreach sequences. Replaced manual research with a system that finds, scores, and messages ideal prospects 24/7.",
    stats: [
      { label: "Pipeline Growth", value: "18x" },
      { label: "Time Saved", value: "35hr/wk" },
      { label: "Meetings Booked", value: "20/wk" },
    ],
  },
  {
    title: "70% of support tickets resolved without human touch",
    category: "AI Support",
    client: "Fintech — Growth Stage",
    result: "Response time: hours → seconds",
    icon: Clock,
    description:
      "Deployed a custom AI support agent trained on 2+ years of help desk history and product documentation. Handles tier-1 and tier-2 queries with 94% accuracy, escalating only complex edge cases.",
    stats: [
      { label: "Auto-resolution", value: "70%" },
      { label: "Response Time", value: "<30s" },
      { label: "CSAT Score", value: "4.8/5" },
    ],
  },
  {
    title: "90% reduction in manual data processing",
    category: "Workflow Automation",
    client: "Logistics — Enterprise",
    result: "$120K annual savings",
    icon: Zap,
    description:
      "Automated a 12-step freight documentation workflow that previously required 4 full-time staff. AI handles document extraction, validation, and ERP entry with 99.2% accuracy.",
    stats: [
      { label: "Cost Savings", value: "$120K/yr" },
      { label: "Processing Time", value: "-90%" },
      { label: "Accuracy", value: "99.2%" },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="pt-24">
      <section className="relative py-24 px-6 overflow-hidden">
        <AsciiBackground mode="case-studies" className="absolute inset-0 w-full h-full" />
        <GlowOrb color="green" size="md" className="top-1/3 right-0 opacity-40" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              label="Case Studies"
              title="Results, not promises"
              description="Every engagement ships measurable outcomes. Here are three of our favorites."
            />
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto max-w-5xl space-y-12">
          {studies.map((study, i) => {
            const Icon = study.icon;
            return (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 md:p-10 hover:border-[rgba(255,255,255,0.10)] transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold tracking-widest uppercase text-[#00ff88]">
                        {study.category}
                      </span>
                      <span className="text-xs text-[#71717a]">&bull;</span>
                      <span className="text-xs text-[#71717a]">{study.client}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white leading-tight">
                      {study.title}
                    </h2>
                    <p className="mt-3 text-[#a1a1aa] leading-relaxed">
                      {study.description}
                    </p>
                  </div>

                  <div className="lg:w-72 shrink-0">
                    <div className="rounded-xl border border-[rgba(0,255,136,0.10)] bg-[rgba(0,255,136,0.03)] p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <Icon className="h-5 w-5 text-[#00ff88]" />
                        <span className="text-sm font-semibold text-[#00ff88]">
                          {study.result}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {study.stats.map((stat) => (
                          <div key={stat.label}>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="text-xs text-[#71717a]">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-16 px-6 text-center border-t border-[rgba(255,255,255,0.04)]">
        <h3 className="text-2xl font-bold text-white">Want to be our next case study?</h3>
        <p className="mt-2 text-[#a1a1aa]">
          We&apos;re selective about the projects we take on, but when we commit, we deliver.
        </p>
        <div className="mt-6">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white text-black font-medium px-8 py-3 hover:bg-[#e4e4e7] transition-colors"
          >
            Work With Us
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
