'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { SparklineChart } from './SparklineChart';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  delta: number;
  trend: number[];
  icon: LucideIcon;
  iconColor?: string;
  prefix?: string;
  suffix?: string;
  isLoading?: boolean;
}

export function StatCard({
  label,
  value,
  delta,
  trend,
  icon: Icon,
  iconColor = '#6366F1',
  prefix = '',
  suffix = '',
  isLoading,
}: StatCardProps) {
  const deltaPositive = delta > 0;
  const deltaNegative = delta < 0;

  if (isLoading) {
    return (
      <div className="rounded-[14px] border border-[var(--cc-border)] bg-[#0A0A0A] p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-3 w-20 rounded bg-[rgba(255,255,255,0.04)]" />
          <div className="h-9 w-9 rounded-full bg-[rgba(255,255,255,0.04)]" />
        </div>
        <div className="h-8 w-28 rounded bg-[rgba(255,255,255,0.04)] mb-2" />
        <div className="h-10 w-full rounded bg-[rgba(255,255,255,0.04)] mt-3" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{
        y: -2,
        boxShadow: '0 8px 32px rgba(255,255,255,0.05)',
      }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="rounded-[14px] border border-[var(--cc-border)] bg-[#0A0A0A] p-6 hover:border-white/15 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--cc-text-muted)]">
          {label}
        </span>
        <div
          className="h-9 w-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
        >
          <Icon className="h-[18px] w-[18px] text-white/70" />
        </div>
      </div>

      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-3xl font-semibold font-mono text-white">
          {prefix}{value}{suffix}
        </span>
        <span
          className={cn(
            'inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-md',
            deltaPositive && 'bg-[rgba(255,255,255,0.06)] text-white/80',
            deltaNegative && 'bg-[rgba(255,255,255,0.04)] text-[var(--cc-text-secondary)]',
            !deltaPositive && !deltaNegative && 'bg-[rgba(255,255,255,0.04)] text-[var(--cc-text-secondary)]'
          )}
        >
          {deltaPositive ? '↑' : deltaNegative ? '↓' : '—'} {Math.abs(delta)}%
        </span>
      </div>

      <div className="mt-3">
        <SparklineChart
          data={trend}
          color={deltaNegative ? '#777777' : '#FFFFFF'}
          height={48}
        />
      </div>

      <p className="text-xs text-[var(--cc-text-muted)] mt-2">vs yesterday</p>
    </motion.div>
  );
}
