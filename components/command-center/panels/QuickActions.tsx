'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  Mail,
  FileText,
  BarChart3,
  Settings,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';

const ACTIONS = [
  { label: 'Run All Agents', icon: Zap, href: '#' },
  { label: 'Send Campaign', icon: Mail, href: '#' },
  { label: 'Generate Content', icon: FileText, href: '#' },
  { label: 'View Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.48 }}
      className="flex items-center gap-2 overflow-x-auto pb-1"
    >
      {ACTIONS.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--cc-border)] bg-[#0A0A0A] px-4 py-2.5 text-sm text-[var(--cc-text-secondary)] hover:text-white hover:border-white/20 hover:bg-[#111111] transition-all duration-300 shrink-0"
        >
          <action.icon className="h-4 w-4 text-white/60" />
          <span>{action.label}</span>
          <ArrowUpRight className="h-3 w-3 text-[var(--cc-text-muted)]" />
        </Link>
      ))}
    </motion.div>
  );
}
