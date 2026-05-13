"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function WhatWeDo() {
  return (
    <section className="py-24 bg-[#080C14]">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <SectionLabel text="CAPABILITIES" className="mb-4" />
          <h2 className="text-[clamp(36px,4vw,56px)] font-semibold text-white leading-tight">
            Full-stack AI automation,
            <br />
            <span className="text-gradient">end to end</span>
          </h2>
          <p className="mt-4 text-lg text-[#94A3B8] max-w-xl">
            We cover every layer so you don't stitch together five vendors.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <motion.div variants={cardVariants} className="md:col-span-2">
            <ServiceCard service={services[0]} />
          </motion.div>
          <motion.div variants={cardVariants}>
            <ServiceCard service={services[1]} />
          </motion.div>
          <motion.div variants={cardVariants}>
            <ServiceCard service={services[2]} />
          </motion.div>
          <motion.div variants={cardVariants}>
            <ServiceCard service={services[3]} />
          </motion.div>
          <motion.div variants={cardVariants} className="md:col-span-1">
            <ServiceCard service={services[5]} />
          </motion.div>
          <motion.div variants={cardVariants} className="md:col-span-2">
            <ServiceCard service={services[4]} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  const Icon = service.icon;

  return (
    <GlassCard
      className={cn("h-full flex flex-col", service.size === "large" && "min-h-[280px]")}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-xl bg-[rgba(99,102,241,0.1)] flex items-center justify-center">
          <Icon className="w-7 h-7 text-[#6366F1]" />
        </div>
        {service.badge && (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-[rgba(99,102,241,0.15)] text-[#818CF8]">
            {service.badge}
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
      <p className="text-[#94A3B8] leading-relaxed flex-1">{service.description}</p>

      {service.id === "custom-ai" && (
        <div className="mt-4 p-4 rounded-lg bg-[#161D30] border border-[rgba(255,255,255,0.06)] font-mono text-xs text-[#94A3B8] overflow-x-auto">
          <code>
            <span className="text-[#6366F1]">agent</span>.run({"{"}
            <br />
            &nbsp;&nbsp;model: <span className="text-[#F59E0B]">&quot;claude-opus&quot;</span>,
            <br />
            &nbsp;&nbsp;task: <span className="text-[#F59E0B]">&quot;qualify_lead&quot;</span>,
            <br />
            &nbsp;&nbsp;context: lead_data
            <br />
            {"}"})
          </code>
        </div>
      )}
    </GlassCard>
  );
}
