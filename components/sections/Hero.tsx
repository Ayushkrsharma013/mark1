"use client";

import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import { MetricBadge } from "@/components/ui/MetricBadge";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HeroScene } from "@/components/three/HeroScene";
import { Suspense } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-gradient-to-br from-[#080C14] via-[#0F1422] to-[#080C14]" />
        }
      >
        <HeroScene />
      </Suspense>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 w-full">
        <div className="max-w-2xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <SectionLabel text="AI AUTOMATION AGENCY" className="mb-6" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-[clamp(52px,7vw,96px)] font-bold leading-[1.05] tracking-[-0.03em] text-white"
            >
              We build intelligence{" "}
              <span className="text-gradient">into your business</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg text-[#94A3B8] max-w-lg leading-relaxed"
            >
              From AI lead generation to full workflow automation — we ship
              productized services that give your agency an unfair, compounding
              advantage.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-4"
            >
              <GlowButton variant="primary" href="/contact">
                Start a Project →
              </GlowButton>
              <GlowButton variant="ghost" href="/case-studies">
                View Case Studies
              </GlowButton>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-3"
            >
              <MetricBadge value="Trusted by 40+ agencies" label="" />
              <MetricBadge value="★★★★★" label="4.9/5" />
              <MetricBadge value="Ships in 14 days" label="" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
