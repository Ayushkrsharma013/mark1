"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Rocket, Construction, Lightbulb } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

export default function ProductsPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <AsciiBackground mode="products" className="absolute inset-0 w-full h-full" />
        <GlowOrb color="blue" size="md" className="top-1/3 left-1/2 -translate-x-1/2 opacity-50" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              label="Products"
              title="Productized intelligence, ready to deploy"
              description="Plug-and-play AI tools built for specific business functions. No custom dev timeline — just results."
            />
          </motion.div>
        </div>
      </section>

      {/* Prospecting OS — flagship */}
      <section className="py-16 px-6 border-t border-[rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-8 md:p-12"
          >
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(0,255,136,0.10)] px-3 py-1 text-xs font-medium text-[#00ff88]">
                  <Rocket className="h-3 w-3" />
                  Live
                </span>
                <h2 className="mt-4 text-3xl font-bold text-white">Prospecting OS</h2>
                <p className="mt-3 text-[#a1a1aa] leading-relaxed max-w-xl">
                  AI-powered B2B lead generation platform. Scrape, score, message, and
                  manage leads from LinkedIn, Google Maps, and Amazon — all in one
                  workspace. Built for sales teams and solo operators who want pipeline
                  without the grind.
                </p>
              </div>
              <Button
                href="https://lead-engine-henna.vercel.app"
                variant="secondary"
                size="lg"
              >
                Open App
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { label: "Lead Scraping", desc: "LinkedIn, Google Maps, Amazon Seller Central" },
                { label: "AI Scoring", desc: "ICP fit scoring with reasoning breakdown" },
                { label: "Pipeline", desc: "Kanban board with drag-and-drop deal tracking" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-4"
                >
                  <div className="text-sm font-semibold text-white">{f.label}</div>
                  <div className="text-xs text-[#71717a] mt-1">{f.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-5xl">
          <h3 className="text-sm font-semibold tracking-widest uppercase text-[#71717a] text-center mb-8">
            Coming Soon
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: Construction,
                title: "Support OS",
                desc: "AI customer support agent that learns from your docs and handles tickets autonomously.",
              },
              {
                icon: Lightbulb,
                title: "Content Engine",
                desc: "Automated content pipeline — research, draft, optimize, and publish with AI.",
              },
            ].map((product) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl border border-dashed border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.01)] p-8"
                >
                  <div className="w-10 h-10 rounded-xl bg-[rgba(124,58,237,0.08)] flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">{product.title}</h4>
                  <p className="mt-2 text-sm text-[#a1a1aa] leading-relaxed">
                    {product.desc}
                  </p>
                  <span className="inline-block mt-4 text-xs font-medium text-[#71717a] bg-[rgba(255,255,255,0.03)] rounded-full px-3 py-1">
                    In development
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
