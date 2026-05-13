"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Users, Target, Brain, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Button } from "@/components/ui/Button";

const metrics = [
  { icon: Users, label: "Leads Scraped", value: "10K+" },
  { icon: Target, label: "ICP Match Rate", value: "94%" },
  { icon: Brain, label: "AI Personalization", value: "100%" },
  { icon: Zap, label: "Time Saved", value: "15hr/wk" },
];

export function ProductsPreview() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <GlowOrb color="green" size="md" className="top-1/2 right-0 opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          label="Flagship Product"
          title="Prospecting OS"
          description="Find, score, message, and manage B2B leads from LinkedIn, Google Maps, and Amazon — all in one workspace. The first productized service from FlowForges."
          align="left"
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5"
                  >
                    <Icon className="h-5 w-5 text-[#00ff88] mb-3" />
                    <div className="text-2xl font-bold text-white">{metric.value}</div>
                    <div className="text-xs text-[#a1a1aa] mt-1">{metric.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-8">
              <h3 className="text-xl font-bold text-white mb-3">
                Everything a sales team needs
              </h3>
              <ul className="space-y-3 text-sm text-[#a1a1aa]">
                <li className="flex gap-3">
                  <span className="text-[#00ff88] mt-0.5">&bull;</span>
                  Multi-source lead scraping (LinkedIn, Google Maps, Amazon)
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00ff88] mt-0.5">&bull;</span>
                  AI-powered ICP scoring with reasoning breakdown
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00ff88] mt-0.5">&bull;</span>
                  AI message lab — personalized outreach at scale
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00ff88] mt-0.5">&bull;</span>
                  Kanban pipeline with drag-and-drop deal tracking
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00ff88] mt-0.5">&bull;</span>
                  Built-in analytics with 7/30/90-day filters
                </li>
              </ul>
            </div>

            <Button
              href="https://lead-engine-henna.vercel.app"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Try Prospecting OS
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
