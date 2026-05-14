'use client';

import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
}

export function SparklineChart({ data, color = '#6366F1', height = 48 }: SparklineProps) {
  const chartData = data.map((value, i) => ({ i, value }));
  const gradientId = `gradient-${color.replace('#', '')}`;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#${gradientId})`}
          dot={false}
          activeDot={{ r: 3, fill: color }}
        />
        <Tooltip
          content={({ payload }) =>
            payload?.[0] ? (
              <div className="bg-[#161D30] border border-[rgba(255,255,255,0.06)] text-xs px-2 py-1 rounded-md text-[#F1F5F9]">
                {payload[0].value}
              </div>
            ) : null
          }
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
