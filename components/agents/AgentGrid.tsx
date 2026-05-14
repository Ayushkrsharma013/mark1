'use client';

import { motion } from 'framer-motion';
import { Bot, Plus } from 'lucide-react';
import Link from 'next/link';
import { useAIEmployees } from '@/hooks/useAIEmployees';
import { AgentCard } from './AgentCard';
import { EmptyState } from '@/components/command-center/shared/EmptyState';

export function AgentGrid() {
  const { data: agents, isLoading, update } = useAIEmployees();

  const handleToggle = async (id: string) => {
    const agent = agents.find((a) => a.id === id);
    if (!agent) return;
    await update(id, {
      status: agent.status === 'active' ? 'paused' : 'active',
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-[200px] rounded-[14px] bg-[#0F1422] border border-[rgba(255,255,255,0.06)] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <EmptyState
        icon={Bot}
        title="No agents yet"
        description="Create your first AI employee to get started."
        action={{
          label: 'Create Agent',
          onClick: () => {},
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {agents.map((agent, i) => (
        <motion.div
          key={agent.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          <AgentCard agent={agent} onToggleStatus={handleToggle} />
        </motion.div>
      ))}

      <Link
        href="/dashboard/agent-builder"
        className="flex flex-col items-center justify-center gap-2 rounded-[14px] border border-dashed border-[rgba(255,255,255,0.10)] bg-[#0F1422] p-5 min-h-[200px] text-[#475569] hover:text-[#94A3B8] hover:border-[rgba(255,255,255,0.15)] transition-colors"
      >
        <Plus className="h-6 w-6" />
        <span className="text-xs font-medium">Create Custom Agent</span>
      </Link>
    </div>
  );
}
