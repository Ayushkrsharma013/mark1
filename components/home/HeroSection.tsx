"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AsciiBackground mode="home" className="absolute inset-0 w-full h-full" />
      <GlowOrb color="blue" size="lg" className="top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <GlowOrb color="purple" size="md" className="top-1/4 right-[20%] opacity-40" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-1.5 text-xs text-[#a1a1aa] mb-8">
            <Sparkles className="h-3.5 w-3.5 text-[#00d4ff]" />
            AI-Powered Automation Agency
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]"
        >
          We build{" "}
          <span className="text-gradient">intelligence</span>
          <br />
          into your business
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-[#a1a1aa] max-w-2xl mx-auto leading-relaxed"
        >
          From AI-powered lead generation to workflow automation, we ship
          productized services that give your business an unfair advantage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/products" size="lg">
            Explore Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button href="/services" variant="secondary" size="lg">
            View Services
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
