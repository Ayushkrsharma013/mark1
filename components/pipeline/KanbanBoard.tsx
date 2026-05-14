'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, RefreshCw } from 'lucide-react';
import { KanbanColumn } from './KanbanColumn';
import { useLeads } from '@/hooks/useLeads';
import type { LeadStatus } from '@/lib/leads/types';

const COLUMNS: LeadStatus[] = ['new', 'contacted', 'replied', 'hot', 'meeting', 'won', 'lost'];

export function KanbanBoard() {
  const { data: leads, isLoading, error, refetch, updateStatus, remove } = useLeads();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return leads;
    const q = search.toLowerCase();
    return leads.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.title.toLowerCase().includes(q)
    );
  }, [leads, search]);

  const byColumn = useMemo(() => {
    const map: Record<LeadStatus, typeof leads> = {
      new: [],
      contacted: [],
      replied: [],
      hot: [],
      meeting: [],
      won: [],
      lost: [],
    };
    for (const lead of filtered) {
      if (map[lead.status]) map[lead.status].push(lead);
      else map.new.push(lead);
    }
    return map;
  }, [filtered]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 text-[#6366F1] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <p className="text-sm text-[#EF4444]">{error}</p>
        <button
          onClick={refetch}
          className="flex items-center gap-1.5 text-xs font-medium text-[#6366F1] hover:text-[#818CF8] transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#475569]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full bg-[#161D30] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-sm text-[#F1F5F9] placeholder-[#475569] outline-none focus:border-[rgba(99,102,241,0.4)] transition-colors"
          />
        </div>
        <button
          onClick={refetch}
          className="flex items-center gap-1.5 text-xs font-medium text-[#6366F1] hover:text-[#818CF8] transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex gap-4 overflow-x-auto pb-2"
      >
        {COLUMNS.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            leads={byColumn[status]}
            onMove={updateStatus}
            onDelete={remove}
          />
        ))}
      </motion.div>
    </div>
  );
}
