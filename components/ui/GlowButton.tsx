"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function GlowButton({
  children,
  variant = "primary",
  href,
  onClick,
  className,
}: GlowButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 focus-ring";

  const variants = {
    primary:
      "bg-[#6366F1] text-white hover:bg-[#4F46E5] shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]",
    secondary:
      "bg-[#F59E0B] text-black hover:bg-[#D97706] shadow-[0_0_20px_rgba(245,158,11,0.3)]",
    ghost:
      "bg-transparent border border-[rgba(255,255,255,0.15)] text-white hover:border-[#6366F1] hover:text-[#6366F1]",
  };

  const Component = href ? Link : "button";

  return (
    <motion.div whileTap={{ scale: 0.97 }} className="inline-block">
      <Component
        href={href as string}
        onClick={onClick}
        className={cn(baseStyles, variants[variant], className)}
      >
        {children}
      </Component>
    </motion.div>
  );
}
