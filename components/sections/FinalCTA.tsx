"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";

const trustPoints = [
  "Response within 4 hours",
  "No long-term contracts",
  "Fixed-scope pricing",
];

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden noise">
      <div className="absolute inset-0 bg-gradient-to-b from-[#080C14] via-[#0a1020] to-[#080C14]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[clamp(36px,5vw,64px)] font-bold text-white leading-tight mb-6">
            Ready to automate your{" "}
            <span className="text-gradient-indigo">competitive edge?</span>
          </h2>

          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us what you&apos;re building. We&apos;ll tell you where AI gives you an
            unfair advantage. No commitment. 30-minute discovery call.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <GlowButton variant="secondary" href="/contact">
              Book a Discovery Call →
            </GlowButton>
            <GlowButton variant="ghost" href="/case-studies">
              View Our Work
            </GlowButton>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                <Check className="w-4 h-4 text-[#6366F1]" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
