'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, MoreHorizontal, Bot, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAIEmployees } from '@/hooks/useAIEmployees';
import { LiveDot } from '../shared/LiveDot';
import { AgentStatusBadge } from '../shared/AgentStatusBadge';
import { EmptyState } from '../shared/EmptyState';
import { cn } from '@/lib/utils';

export function AgentGrid() {
  const { data: agents, isLoading, update } = useAIEmployees();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleToggle = async (id: string) => {
    const agent = agents.find((a) => a.id === id);
    if (!agent) return;
    await update(id, {
      status: agent.status === 'active' ? 'paused' : 'active',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.24 }}
      className="rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#0F1422] p-6 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-[#F1F5F9]">My Agents</h3>
        <span className="text-xs text-[#475569]">{agents.length} total</span>
      </div>

      <div className="flex-1 overflow-y-auto -mx-2 px-2 space-y-1"
        style={{ maxHeight: 320 }}
      >
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 rounded-lg bg-[rgba(255,255,255,0.03)] animate-pulse" />
            ))}
          </div>
        ) : agents.length === 0 ? (
          <EmptyState
            icon={Bot}
            title="No agents yet"
            description="Build your first agent to start automating workflows."
            action={{ label: 'Open Agent Builder', onClick: () => {} }}
          />
        ) : (
          agents.map((agent) => (
            <motion.div
              key={agent.id}
              onMouseEnter={() => setHoveredId(agent.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-default',
                hoveredId === agent.id ? 'bg-[#1C2540]' : 'bg-transparent'
              )}
            >
              <LiveDot status={agent.status} size={8} />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#F1F5F9] truncate">{agent.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-medium uppercase tracking-wide text-[#475569] bg-[rgba(255,255,255,0.04)] rounded px-1.5 py-0.5">
                    {agent.role}
                  </span>
                  <span className="text-[10px] text-[#475569]">
                    {agent.skills.length} skills
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-3 text-xs text-[#94A3B8] shrink-0">
                <AgentStatusBadge status={agent.status} />
              </div>

              <AnimatePresence>
                {hoveredId === agent.id && (
                  <motion.div
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 4 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-0.5 shrink-0"
                  >
                    <button
                      onClick={() => handleToggle(agent.id)}
                      className="p-1.5 rounded-md text-[#475569] hover:text-[#F1F5F9] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                      title={agent.status === 'active' ? 'Pause' : 'Start'}
                    >
                      {agent.status === 'active' ? (
                        <Pause className="h-3.5 w-3.5" />
                      ) : (
                        <Play className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <Link
                      href={`/dashboard/agents/${agent.id}`}
                      className="p-1.5 rounded-md text-[#475569] hover:text-[#F1F5F9] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                    >
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>

      <Link
        href="/dashboard/agent-builder"
        className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-[#6366F1] hover:text-[#818CF8] transition-colors py-2 rounded-lg hover:bg-[rgba(99,102,241,0.06)]"
      >
        <span>New Agent</span>
        <ArrowRight className="h-3 w-3" />
      </Link>
    </motion.div>
  );
}
