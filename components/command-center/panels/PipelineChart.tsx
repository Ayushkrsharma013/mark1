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
  { key: 'scraped', label: 'Scraped', color: '#6366F1' },
  { key: 'qualified', label: 'Qualified', color: '#10B981' },
  { key: 'contacted', label: 'Contacted', color: '#F59E0B' },
  { key: 'responded', label: 'Responded', color: '#94A3B8' },
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
      className="rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#0F1422] p-6 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h3 className="text-base font-semibold text-[#F1F5F9]">
          Lead Pipeline — Last 7 Days
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          {totals.map((stage) => (
            <div key={stage.key} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: stage.color }}
              />
              <span className="text-[11px] text-[#94A3B8]">
                {stage.label} <span className="text-[#F1F5F9] font-medium">{stage.total}</span>
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
                tick={{ fill: '#475569', fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                content={({ payload, label }) => {
                  if (!payload?.length) return null;
                  return (
                    <div className="bg-[#161D30] border border-[rgba(255,255,255,0.06)] rounded-lg px-3 py-2 shadow-xl">
                      <p className="text-xs font-medium text-[#F1F5F9] mb-1.5">{label}</p>
                      {payload.map((p, idx) => (
                        <div key={`${p.name}-${idx}`} className="flex items-center justify-between gap-4 text-xs">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: p.color }}
                            />
                            <span className="text-[#94A3B8]">{p.name}</span>
                          </div>
                          <span className="text-[#F1F5F9] font-medium">{p.value}</span>
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
