"use client";

import { motion } from "framer-motion";
import { Bot, Workflow, BarChart3, Code2, Globe, Shield } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const services = [
  {
    icon: Bot,
    title: "AI Agents & Chatbots",
    description:
      "Custom AI agents that handle customer support, lead qualification, and scheduling — 24/7, without human intervention.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "End-to-end automation of repetitive business processes. From data entry to multi-step approval chains.",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description:
      "Turn your data into forecasts. ICP scoring, churn prediction, and revenue modeling powered by machine learning.",
  },
  {
    icon: Code2,
    title: "Custom AI Development",
    description:
      "Bespoke solutions built on Claude, GPT, and open-source models. Tailored to your exact business logic and workflows.",
  },
  {
    icon: Globe,
    title: "Productized Services",
    description:
      "Ready-to-use AI tools like Prospecting OS — plug in your API keys and start generating pipeline in minutes.",
  },
  {
    icon: Shield,
    title: "AI Strategy & Consulting",
    description:
      "Not sure where to start? We audit your operations and build a phased AI adoption roadmap that actually ships.",
  },
];

export function ServicesGrid() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="What We Do"
          title="Full-stack AI automation, end to end"
          description="From strategy to deployment, we cover every layer of the AI stack so you don't have to stitch together five different vendors."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 hover:border-[rgba(255,255,255,0.12)] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(0,212,255,0.08)] flex items-center justify-center mb-4 group-hover:bg-[rgba(0,212,255,0.12)] transition-colors">
                  <Icon className="h-5 w-5 text-[#00d4ff]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#a1a1aa] leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
