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
  { label: 'Run All Agents', icon: Zap, href: '#', color: '#6366F1' },
  { label: 'Send Campaign', icon: Mail, href: '#', color: '#10B981' },
  { label: 'Generate Content', icon: FileText, href: '#', color: '#F59E0B' },
  { label: 'View Analytics', icon: BarChart3, href: '/dashboard/analytics', color: '#EC4899' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings', color: '#94A3B8' },
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
          className="inline-flex items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#0F1422] px-4 py-2.5 text-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:border-[rgba(255,255,255,0.10)] hover:bg-[#161D30] transition-colors shrink-0"
        >
          <action.icon className="h-4 w-4" style={{ color: action.color }} />
          <span>{action.label}</span>
          <ArrowUpRight className="h-3 w-3 text-[#475569]" />
        </Link>
      ))}
    </motion.div>
  );
}
