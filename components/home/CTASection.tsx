"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/ui/GlowOrb";

export function CTASection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden border-t border-[rgba(255,255,255,0.04)]">
      <GlowOrb color="purple" size="md" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            Ready to automate
            <br />
            <span className="text-gradient">your competitive edge?</span>
          </h2>
          <p className="mt-4 text-lg text-[#a1a1aa] leading-relaxed">
            Tell us what you&apos;re building. We&apos;ll tell you how AI can
            make it faster, cheaper, and smarter.
          </p>
          <div className="mt-8">
            <Button href="/contact" size="lg">
              Start a Conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
