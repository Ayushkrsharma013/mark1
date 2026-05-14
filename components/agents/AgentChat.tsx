'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useAgentChat } from '@/hooks/useAgentChat';
import type { AIEmployee } from '@/lib/types/agent';
import { getAgentIcon } from '@/lib/agents/icons';
import { cn } from '@/lib/utils';

interface AgentChatProps {
  agent: AIEmployee;
}

export function AgentChat({ agent }: AgentChatProps) {
  const { messages, isLoading, sendMessage, fetchHistory } = useAgentChat(agent.id);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const Icon = getAgentIcon(agent.icon_name);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setInput('');
    await sendMessage(msg);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[rgba(255,255,255,0.06)]">
        <Link
          href="/dashboard/agents"
          className="p-1.5 rounded-lg text-[#475569] hover:text-[#F1F5F9] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div
          className="h-8 w-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${agent.avatar_color}18` }}
        >
          <Icon className="h-4 w-4" style={{ color: agent.avatar_color }} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#F1F5F9]">{agent.name}</h2>
          <p className="text-[10px] text-[#94A3B8]">{agent.role}</p>
        </div>
        <span
          className={cn(
            'ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full',
            agent.status === 'active'
              ? 'bg-[rgba(16,185,129,0.10)] text-[#10B981]'
              : 'bg-[rgba(71,85,105,0.10)] text-[#475569]'
          )}
        >
          {agent.status}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3">
            <div
              className="h-12 w-12 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${agent.avatar_color}18` }}
            >
              <Sparkles className="h-6 w-6" style={{ color: agent.avatar_color }} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#F1F5F9]">
                Start chatting with {agent.name}
              </p>
              <p className="text-xs text-[#94A3B8] mt-1 max-w-sm">
                {agent.description}
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <motion.div
            key={msg.id || i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'flex gap-3',
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {msg.role === 'assistant' && (
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: `${agent.avatar_color}18` }}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: agent.avatar_color }} />
              </div>
            )}
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-[#6366F1] text-white rounded-br-md'
                  : 'bg-[#1C2540] text-[#E2E8F0] rounded-bl-md'
              )}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div
              className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${agent.avatar_color}18` }}
            >
              <Icon className="h-3.5 w-3.5" style={{ color: agent.avatar_color }} />
            </div>
            <div className="bg-[#1C2540] rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-[#475569] animate-bounce" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#475569] animate-bounce delay-100" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#475569] animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="px-6 py-4 border-t border-[rgba(255,255,255,0.06)]"
      >
        <div className="flex items-center gap-2 bg-[#1C2540] rounded-xl px-3 py-2 border border-[rgba(255,255,255,0.06)] focus-within:border-[rgba(99,102,241,0.4)] transition-colors">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${agent.name} anything...`}
            className="flex-1 bg-transparent text-sm text-[#F1F5F9] placeholder:text-[#475569] outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-1.5 rounded-lg bg-[#6366F1] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#4F46E5] transition-colors"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
