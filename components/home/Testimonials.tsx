"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    quote:
      "FlowForges built our entire lead generation pipeline. We went from cold outreach to a system that books 20+ qualified meetings per week.",
    author: "Rajesh Kumar",
    role: "Founder, ScaleUp India",
  },
  {
    quote:
      "The AI chatbot they deployed handles 70% of our support tickets automatically. Our response time dropped from hours to seconds.",
    author: "Priya Sharma",
    role: "Head of Ops, FinStack",
  },
  {
    quote:
      "We brought them a messy spreadsheet workflow. They shipped a custom AI pipeline that reduced processing time by 90%.",
    author: "Michael Chen",
    role: "CTO, DataBridge",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 border-t border-[rgba(255,255,255,0.04)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Testimonials"
          title="Trusted by founders and operators"
          description="We don't just ship code. We ship outcomes. Here's what our clients say."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-[#00d4ff] text-[#00d4ff]"
                  />
                ))}
              </div>
              <p className="text-sm text-[#a1a1aa] leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.04)]">
                <div className="text-sm font-semibold text-white">{t.author}</div>
                <div className="text-xs text-[#71717a]">{t.role}</div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
