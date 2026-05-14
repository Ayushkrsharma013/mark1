'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare, Pause, Play } from 'lucide-react';
import type { AIEmployee } from '@/lib/types/agent';
import { getAgentIcon } from '@/lib/agents/icons';
import { SkillBadge } from './SkillBadge';
import { cn } from '@/lib/utils';

interface AgentCardProps {
  agent: AIEmployee;
  onToggleStatus?: (id: string) => void;
}

export function AgentCard({ agent, onToggleStatus }: AgentCardProps) {
  const Icon = getAgentIcon(agent.icon_name);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18 }}
      className="rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#0F1422] p-5 hover:border-[rgba(99,102,241,0.25)] transition-colors group"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="h-10 w-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${agent.avatar_color}18` }}
        >
          <Icon className="h-5 w-5" style={{ color: agent.avatar_color }} />
        </div>
        <button
          onClick={() => onToggleStatus?.(agent.id)}
          className={cn(
            'p-1.5 rounded-md transition-colors',
            agent.status === 'active'
              ? 'text-[#10B981] hover:bg-[rgba(16,185,129,0.08)]'
              : 'text-[#475569] hover:text-[#F1F5F9] hover:bg-[rgba(255,255,255,0.04)]'
          )}
        >
          {agent.status === 'active' ? (
            <Pause className="h-3.5 w-3.5" />
          ) : (
            <Play className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      <h3 className="text-sm font-semibold text-[#F1F5F9] mb-0.5">{agent.name}</h3>
      <p className="text-xs text-[#94A3B8] mb-3">{agent.role}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {agent.skills.slice(0, 3).map((skill) => (
          <SkillBadge key={skill} name={skill.replace(/-/g, ' ')} />
        ))}
        {agent.skills.length > 3 && (
          <span className="text-[10px] text-[#475569] px-1">
            +{agent.skills.length - 3}
          </span>
        )}
      </div>

      <Link
        href={`/dashboard/agents/${agent.id}`}
        className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-medium bg-[rgba(99,102,241,0.10)] text-[#818CF8] hover:bg-[rgba(99,102,241,0.18)] transition-colors"
      >
        <MessageSquare className="h-3.5 w-3.5" />
        <span>Chat</span>
      </Link>
    </motion.div>
  );
}
