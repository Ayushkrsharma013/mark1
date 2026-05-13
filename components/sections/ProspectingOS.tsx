"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionLabel } from "@/components/ui/SectionLabel";

const features = [
  "LinkedIn + Google Maps + Amazon scraping",
  "AI-powered ICP scoring & enrichment",
  "Automated personalized outreach",
  "Pipeline management with smart stages",
  "Real-time analytics & reporting",
];

const stats = [
  { value: 10000, suffix: "+", label: "Leads Scraped" },
  { value: 94, suffix: "%", label: "ICP Match Rate" },
  { value: 100, suffix: "%", label: "AI Personalized" },
  { value: 15, suffix: "hrs/wk", label: "Saved Per SDR" },
];

const mockLeads = [
  { name: "Sarah Chen", company: "Vertex Labs", score: 92, status: "Qualified" },
  { name: "James Wilson", company: "NorthScale", score: 78, status: "Warm" },
  { name: "Priya Patel", company: "DataBridge", score: 61, status: "New" },
  { name: "Michael Ross", company: "Orbit Creative", score: 88, status: "Qualified" },
];

export function ProspectingOS() {
  const [activeTab, setActiveTab] = useState("Leads");
  const [showToast, setShowToast] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowToast(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%), #080C14",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel text="FLAGSHIP PRODUCT" className="mb-4" />
            <h2 className="text-[clamp(36px,4vw,56px)] font-semibold text-white leading-tight mb-4">
              Prospecting OS
            </h2>
            <p className="text-lg text-[#94A3B8] leading-relaxed mb-8">
              Find, score, message, and manage B2B leads from LinkedIn, Google
              Maps, and Amazon — all in one workspace.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[rgba(99,102,241,0.15)] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#6366F1]" />
                  </div>
                  <span className="text-[#94A3B8]">{feature}</span>
                </li>
              ))}
            </ul>

            <GlowButton variant="secondary" href="/products">
              Try Prospecting OS →
            </GlowButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)]">
                <div className="flex gap-4">
                  {["Leads", "Pipeline", "Analytics"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                        activeTab === tab
                          ? "text-white border-[#6366F1]"
                          : "text-[#64748B] border-transparent hover:text-[#94A3B8]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-4 gap-4 text-xs text-[#64748B] uppercase tracking-wider mb-4 px-2">
                  <span>Name</span>
                  <span>Company</span>
                  <span>Score</span>
                  <span>Status</span>
                </div>
                {mockLeads.map((lead, i) => (
                  <motion.div
                    key={lead.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="grid grid-cols-4 gap-4 items-center py-3 px-2 rounded-lg hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                  >
                    <span className="text-sm text-white font-medium">{lead.name}</span>
                    <span className="text-sm text-[#94A3B8]">{lead.company}</span>
                    <span
                      className={`inline-flex items-center justify-center w-10 h-6 rounded-full text-xs font-medium ${
                        lead.score >= 90
                          ? "bg-[rgba(0,255,136,0.15)] text-[#00ff88]"
                          : lead.score >= 75
                          ? "bg-[rgba(245,158,11,0.15)] text-[#F59E0B]"
                          : "bg-[rgba(255,200,0,0.15)] text-yellow-400"
                      }`}
                    >
                      {lead.score}%
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full w-fit ${
                        lead.status === "Qualified"
                          ? "bg-[rgba(99,102,241,0.15)] text-[#818CF8]"
                          : lead.status === "Warm"
                          ? "bg-[rgba(245,158,11,0.15)] text-[#F59E0B]"
                          : "bg-[rgba(255,255,255,0.06)] text-[#94A3B8]"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={showToast ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="absolute bottom-4 right-4 glass rounded-lg px-4 py-3 flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-sm text-white font-medium">New Lead Qualified</span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-[rgba(15,20,34,0.4)] border border-[rgba(255,255,255,0.06)]"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#6366F1] font-mono">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm text-[#94A3B8]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
