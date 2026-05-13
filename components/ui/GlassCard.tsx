"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ children, className, hover = true, glow = false }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-xl p-8",
        "bg-[rgba(15,20,34,0.6)] backdrop-blur-xl",
        "border border-[rgba(255,255,255,0.06)]",
        "transition-colors duration-300",
        hover && "hover:border-[rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.08)]",
        glow && "shadow-[0_0_40px_rgba(99,102,241,0.08)]",
        className
      )}
      whileHover={hover ? { scale: 1.01, y: -2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
