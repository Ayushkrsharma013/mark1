'use client';

import { motion } from 'framer-motion';
import { Users, Bot, CheckCircle2, Clock } from 'lucide-react';
import { StatCard } from '../shared/StatCard';
import { useLiveMetrics } from '@/hooks/useLiveMetrics';

const CONTAINER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const ITEM = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

export function OverviewStats() {
  const { data: metrics, isLoading } = useLiveMetrics();

  const stats = [
    {
      label: 'Leads Generated',
      value: metrics?.leads_generated.value ?? 0,
      delta: metrics?.leads_generated.delta ?? 0,
      trend: metrics?.leads_generated.trend ?? [0, 0, 0, 0, 0, 0, 0],
      icon: Users,
      iconColor: '#6366F1',
    },
    {
      label: 'Active Agents',
      value: metrics?.active_agents.value ?? 0,
      delta: metrics?.active_agents.delta ?? 0,
      trend: metrics?.active_agents.trend ?? [0, 0, 0, 0, 0, 0, 0],
      icon: Bot,
      iconColor: '#10B981',
    },
    {
      label: 'Tasks Completed',
      value: metrics?.tasks_completed.value ?? 0,
      delta: metrics?.tasks_completed.delta ?? 0,
      trend: metrics?.tasks_completed.trend ?? [0, 0, 0, 0, 0, 0, 0],
      icon: CheckCircle2,
      iconColor: '#F59E0B',
    },
    {
      label: 'Hours Saved',
      value: metrics?.hours_saved.value ?? 0,
      delta: metrics?.hours_saved.delta ?? 0,
      trend: metrics?.hours_saved.trend ?? [0, 0, 0, 0, 0, 0, 0],
      icon: Clock,
      iconColor: '#EC4899',
      suffix: 'h',
    },
  ];

  return (
    <motion.div
      variants={CONTAINER}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={ITEM}>
          <StatCard
            label={stat.label}
            value={stat.value}
            delta={stat.delta}
            trend={stat.trend}
            icon={stat.icon}
            iconColor={stat.iconColor}
            suffix={stat.suffix}
            isLoading={isLoading}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
