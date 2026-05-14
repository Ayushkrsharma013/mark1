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
      <div className="rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#0F1422] p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-3 w-20 rounded bg-[rgba(255,255,255,0.06)]" />
          <div className="h-9 w-9 rounded-full bg-[rgba(255,255,255,0.06)]" />
        </div>
        <div className="h-8 w-28 rounded bg-[rgba(255,255,255,0.06)] mb-2" />
        <div className="h-10 w-full rounded bg-[rgba(255,255,255,0.04)] mt-3" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{
        y: -2,
        boxShadow: '0 8px 32px rgba(99,102,241,0.10)',
      }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#0F1422] p-6 hover:border-[rgba(99,102,241,0.28)] transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium uppercase tracking-[0.1em] text-[#475569]">
          {label}
        </span>
        <div
          className="h-9 w-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${iconColor}18` }}
        >
          <Icon className="h-[18px] w-[18px]" style={{ color: iconColor }} />
        </div>
      </div>

      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-3xl font-semibold font-mono text-[#F1F5F9]">
          {prefix}{value}{suffix}
        </span>
        <span
          className={cn(
            'inline-flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-md',
            deltaPositive && 'bg-[rgba(16,185,129,0.10)] text-[#10B981]',
            deltaNegative && 'bg-[rgba(239,68,68,0.10)] text-[#EF4444]',
            !deltaPositive && !deltaNegative && 'bg-[rgba(148,163,184,0.10)] text-[#94A3B8]'
          )}
        >
          {deltaPositive ? '↑' : deltaNegative ? '↓' : '—'} {Math.abs(delta)}%
        </span>
      </div>

      <div className="mt-3">
        <SparklineChart
          data={trend}
          color={deltaNegative ? '#EF4444' : '#6366F1'}
          height={48}
        />
      </div>

      <p className="text-xs text-[#475569] mt-2">vs yesterday</p>
    </motion.div>
  );
}
