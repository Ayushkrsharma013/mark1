'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Building2, MapPin, TrendingUp, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Lead, LeadStatus } from '@/lib/leads/types';

interface LeadCardProps {
  lead: Lead;
  onMove: (id: string, status: LeadStatus) => void;
  onDelete: (id: string) => void;
}

const STATUS_FLOW: LeadStatus[] = ['new', 'contacted', 'replied', 'hot', 'meeting', 'won', 'lost'];

const emailStatusColor = (status: string) => {
  switch (status) {
    case 'verified': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'risky': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
};

export function LeadCard({ lead, onMove, onDelete }: LeadCardProps) {
  const currentIndex = STATUS_FLOW.indexOf(lead.status);
  const nextStatus = STATUS_FLOW[currentIndex + 1];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group rounded-xl border border-white/[0.06] bg-[#161D30] p-3.5 hover:border-[#6366F1]/30 transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#F1F5F9] truncate">{lead.name || 'Unnamed'}</p>
          <p className="text-xs text-[#94A3B8] truncate">{lead.title}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={cn(
            'text-[10px] font-medium px-1.5 py-0.5 rounded border',
            emailStatusColor(lead.email_status)
          )}>
            {lead.email_status}
          </span>
        </div>
      </div>

      <div className="mt-2 space-y-1">
        <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
          <Building2 className="h-3 w-3 shrink-0" />
          <span className="truncate">{lead.company || '—'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{lead.location || '—'}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[11px] text-[#6366F1]">
            <TrendingUp className="h-3 w-3" />
            <span className="font-medium">{lead.score}</span>
          </div>
          {lead.email && (
            <a
              href={`mailto:${lead.email}`}
              onClick={(e) => e.stopPropagation()}
              className="text-[#475569] hover:text-[#F1F5F9] transition-colors"
            >
              <Mail className="h-3 w-3" />
            </a>
          )}
          {lead.linkedin && (
            <a
              href={lead.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[#475569] hover:text-[#F1F5F9] transition-colors"
            >
              <Linkedin className="h-3 w-3" />
            </a>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {nextStatus && nextStatus !== 'lost' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMove(lead.id, nextStatus);
              }}
              className="text-[10px] font-medium px-2 py-1 rounded bg-[#6366F1]/10 text-[#6366F1] hover:bg-[#6366F1]/20 transition-colors"
            >
              → {nextStatus}
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(lead.id);
            }}
            className="p-1 rounded text-[#475569] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
