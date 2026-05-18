'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { usePipelineData } from '@/hooks/usePipelineData';
import { EmptyState } from '../shared/EmptyState';
import { TrendingUp } from 'lucide-react';

const STAGES = [
  { key: 'scraped', label: 'Scraped', color: '#FFFFFF' },
  { key: 'qualified', label: 'Qualified', color: '#CCCCCC' },
  { key: 'contacted', label: 'Contacted', color: '#999999' },
  { key: 'responded', label: 'Responded', color: '#666666' },
];

export function PipelineChart() {
  const { data, isLoading } = usePipelineData();

  const chartData = data.map((d) => ({
    ...d,
    day: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
  }));

  const totals = STAGES.map((stage) => ({
    ...stage,
    total: data.reduce((sum, d) => sum + (d[stage.key as keyof typeof d] as number), 0),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.16 }}
      className="rounded-[14px] border border-[var(--cc-border)] bg-[#0A0A0A] p-6 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h3 className="text-base font-semibold text-white">
          Lead Pipeline — Last 7 Days
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          {totals.map((stage) => (
            <div key={stage.key} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: stage.color }}
              />
              <span className="text-[11px] text-[var(--cc-text-secondary)]">
                {stage.label} <span className="text-white font-medium">{stage.total}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[220px]">
        {isLoading ? (
          <div className="h-full w-full animate-pulse bg-[rgba(255,255,255,0.03)] rounded-lg" />
        ) : data.length === 0 ? (
          <EmptyState
            icon={TrendingUp}
            title="No pipeline data"
            description="Connect your pipeline data source to see lead flow across stages."
            action={{ label: 'Go to Integrations', onClick: () => {} }}
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap="20%">
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#555555', fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                content={({ payload, label }) => {
                  if (!payload?.length) return null;
                  return (
                    <div className="bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 shadow-xl">
                      <p className="text-xs font-medium text-white mb-1.5">{label}</p>
                      {payload.map((p, idx) => (
                        <div key={`${p.name}-${idx}`} className="flex items-center justify-between gap-4 text-xs">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: p.color }}
                            />
                            <span className="text-[var(--cc-text-secondary)]">{p.name}</span>
                          </div>
                          <span className="text-white font-medium">{p.value}</span>
                        </div>
                      ))}
                    </div>
                  );
                }}
              />
              {STAGES.map((stage) => (
                <Bar
                  key={stage.key}
                  dataKey={stage.key}
                  name={stage.label}
                  fill={stage.color}
                  radius={[4, 4, 0, 0]}
                  animationDuration={800}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}
