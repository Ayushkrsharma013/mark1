'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { LeadCard } from './LeadCard';
import type { Lead, LeadStatus } from '@/lib/leads/types';

interface KanbanColumnProps {
  status: LeadStatus;
  leads: Lead[];
  onMove: (id: string, status: LeadStatus) => void;
  onDelete: (id: string) => void;
}

const COLUMN_META: Record<LeadStatus, { label: string; color: string }> = {
  new: { label: 'New', color: '#6366F1' },
  contacted: { label: 'Contacted', color: '#06B6D4' },
  replied: { label: 'Replied', color: '#8B5CF6' },
  hot: { label: 'Hot', color: '#F59E0B' },
  meeting: { label: 'Meeting', color: '#10B981' },
  won: { label: 'Won', color: '#14B8A6' },
  lost: { label: 'Lost', color: '#EF4444' },
};

export function KanbanColumn({ status, leads, onMove, onDelete }: KanbanColumnProps) {
  const meta = COLUMN_META[status];

  return (
    <div className="flex flex-col min-w-[260px] w-[260px] shrink-0">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: meta.color }} />
          <h3 className="text-sm font-semibold text-[#F1F5F9]">{meta.label}</h3>
        </div>
        <span className="text-xs text-[#475569] font-medium bg-white/[0.04] px-2 py-0.5 rounded-full">
          {leads.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 pb-2" style={{ maxHeight: 'calc(100vh - 220px)' }}>
        <AnimatePresence mode="popLayout">
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onMove={onMove}
              onDelete={onDelete}
            />
          ))}
        </AnimatePresence>

        {leads.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 rounded-xl border border-dashed border-white/[0.06]">
            <p className="text-xs text-[#475569]">No leads</p>
          </div>
        )}
      </div>
    </div>
  );
}
