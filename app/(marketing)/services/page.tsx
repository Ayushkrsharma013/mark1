"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Workflow, BarChart3, Code2, Globe, Shield, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { AsciiBackground } from "@/components/ui/AsciiBackground";

const services = [
  {
    icon: Bot,
    title: "AI Agents & Chatbots",
    price: "From $5,000",
    description:
      "Custom conversational AI that handles customer support, books meetings, and qualifies leads. Deployed on your website, Slack, or WhatsApp.",
    deliverables: [
      "Custom-trained on your knowledge base",
      "Multi-channel deployment",
      "Human handoff workflows",
      "30 days of optimization",
    ],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    price: "From $8,000",
    description:
      "We map, redesign, and automate your core business processes — approvals, data pipelines, reporting, and more.",
    deliverables: [
      "End-to-end process audit",
      "Custom automation scripts",
      "Integration with your stack",
      "Documentation & training",
    ],
  },
  {
    icon: Code2,
    title: "Custom AI Development",
    price: "From $15,000",
    description:
      "Bespoke AI solutions using Claude, GPT, or open-source models. Full-cycle: data prep, model selection, deployment, and monitoring.",
    deliverables: [
      "Architecture & model selection",
      "Training data pipeline",
      "Production deployment",
      "Monitoring & maintenance plan",
    ],
  },
  {
    icon: Globe,
    title: "Productized Services",
    price: "Subscription",
    description:
      "Ready-to-deploy AI products like Prospecting OS. Plug in your keys, customize your settings, start generating value same-day.",
    deliverables: [
      "Instant deployment",
      "Regular feature updates",
      "Priority support",
      "Usage-based pricing available",
    ],
  },
  {
    icon: BarChart3,
    title: "AI Analytics",
    price: "From $6,000",
    description:
      "Turn raw data into predictive dashboards. Churn forecasting, lead scoring, revenue modeling — custom-built for your metrics.",
    deliverables: [
      "Data source integration",
      "Custom ML models",
      "Interactive dashboards",
      "Quarterly model refresh",
    ],
  },
  {
    icon: Shield,
    title: "AI Strategy & Consulting",
    price: "From $3,000",
    description:
      "Fractional AI advisory. We audit your operations, identify high-ROI automation opportunities, and build a phased execution roadmap.",
    deliverables: [
      "Operations deep-dive",
      "Opportunity sizing report",
      "Phased implementation plan",
      "Vendor & tool recommendations",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-24">
      <section className="relative py-24 px-6 overflow-hidden">
        <AsciiBackground mode="services" className="absolute inset-0 w-full h-full" />
        <GlowOrb color="purple" size="md" className="top-1/3 left-1/2 -translate-x-1/2 opacity-50" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              label="Services"
              title="What we build for you"
              description="Everything is custom. Nothing is templated. We design AI solutions around your business logic — not the other way around."
            />
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto max-w-5xl space-y-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 md:p-8 hover:border-[rgba(255,255,255,0.10)] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(0,212,255,0.08)] flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-[#00d4ff]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                      <span className="text-sm font-medium text-[#00d4ff] bg-[rgba(0,212,255,0.06)] rounded-full px-3 py-1">
                        {service.price}
                      </span>
                    </div>
                    <p className="mt-3 text-[#a1a1aa] leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                          <Check className="h-4 w-4 text-[#00ff88] mt-0.5 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-16 px-6 text-center border-t border-[rgba(255,255,255,0.04)]">
        <h3 className="text-2xl font-bold text-white">Don&apos;t see what you need?</h3>
        <p className="mt-2 text-[#a1a1aa]">
          We take on unconventional projects. If it involves AI and automation, we can build it.
        </p>
        <div className="mt-6">
          <Button href="/contact" size="lg">
            Tell Us About Your Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
