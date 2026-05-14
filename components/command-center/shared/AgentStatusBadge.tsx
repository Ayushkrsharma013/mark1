'use client';

import { cn } from '@/lib/utils';
import type { AgentStatus } from '@/lib/types/agent';

interface AgentStatusBadgeProps {
  status: AgentStatus;
}

export function AgentStatusBadge({ status }: AgentStatusBadgeProps) {
  const styles: Record<AgentStatus, string> = {
    active: 'bg-[rgba(16,185,129,0.12)] text-[#10B981]',
    paused: 'bg-[rgba(245,158,11,0.12)] text-[#F59E0B]',
    error: 'bg-[rgba(239,68,68,0.12)] text-[#EF4444]',
    building: 'bg-[rgba(99,102,241,0.12)] text-[#6366F1]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center text-[11px] font-medium rounded-md px-2 py-0.5 uppercase tracking-wide',
        styles[status]
      )}
    >
      {status}
    </span>
  );
}
