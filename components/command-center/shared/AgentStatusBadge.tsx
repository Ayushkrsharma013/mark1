'use client';

import { cn } from '@/lib/utils';
import type { AgentStatus } from '@/lib/types/agent';

interface AgentStatusBadgeProps {
  status: AgentStatus;
}

export function AgentStatusBadge({ status }: AgentStatusBadgeProps) {
  const styles: Record<AgentStatus, string> = {
    active: 'bg-[rgba(255,255,255,0.06)] text-white/80',
    paused: 'bg-[rgba(255,255,255,0.04)] text-[var(--cc-text-secondary)]',
    error: 'bg-[rgba(255,255,255,0.04)] text-[var(--cc-text-muted)]',
    building: 'bg-[rgba(255,255,255,0.06)] text-white/70',
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
