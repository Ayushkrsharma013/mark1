'use client';

import { cn } from '@/lib/utils';

interface LiveDotProps {
  status: 'active' | 'paused' | 'error' | 'building';
  size?: number;
}

export function LiveDot({ status, size = 8 }: LiveDotProps) {
  const colors = {
    active: '#10B981',
    paused: '#F59E0B',
    error: '#EF4444',
    building: '#6366F1',
  };

  const color = colors[status];

  return (
    <span
      className={cn(
        'relative inline-flex rounded-full',
        status === 'active' && 'animate-pulse',
        status === 'error' && 'animate-ping'
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow:
          status === 'active'
            ? `0 0 0 0 ${color}99`
            : status === 'error'
            ? `0 0 0 0 ${color}99`
            : 'none',
      }}
    >
      {status === 'active' && (
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{
            backgroundColor: color,
            animation: 'live-pulse 2s ease-in-out infinite',
          }}
        />
      )}
      {status === 'error' && (
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{
            backgroundColor: color,
            animation: 'live-pulse 1s ease-in-out infinite',
          }}
        />
      )}
    </span>
  );
}
