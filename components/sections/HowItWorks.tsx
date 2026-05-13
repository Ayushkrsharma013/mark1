"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    timeline: "Day 1–2",
    description:
      "We map your ops, identify the highest-ROI automation opportunities.",
  },
  {
    number: "02",
    title: "Architecture & Scoping",
    timeline: "Day 3–5",
    description:
      "We blueprint the agent/automation stack and scope deliverables.",
  },
  {
    number: "03",
    title: "Build & Test",
    timeline: "Day 6–12",
    description:
      "We build in production, run live tests, and share daily updates.",
  },
  {
    number: "04",
    title: "Deploy & Handoff",
    timeline: "Day 13–14",
    description:
      "We deploy, document, and train your team. You own everything.",
  },
];

export function HowItWorks() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#080C14]">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-[clamp(36px,4vw,56px)] font-semibold text-white leading-tight">
            From kickoff to live agent in{" "}
            <span className="text-gradient-indigo">14 days</span>
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          <svg
            className="absolute top-24 left-0 w-full h-4 hidden md:block"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="12.5%"
              y1="8"
              x2="87.5%"
              y2="8"
              stroke="#6366F1"
              strokeWidth="2"
              strokeDasharray="8 8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                <div className="w-12 h-12 rounded-full bg-[#6366F1] flex items-center justify-center mb-6 relative z-10">
                  <span className="text-white font-bold text-sm">{step.number}</span>
                </div>

                <div className="absolute left-6 top-12 w-0.5 h-full bg-[rgba(99,102,241,0.2)] md:hidden" />

                <h3 className="text-xl font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-sm text-[#6366F1] font-medium mb-3">{step.timeline}</p>
                <p className="text-[#94A3B8] leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
