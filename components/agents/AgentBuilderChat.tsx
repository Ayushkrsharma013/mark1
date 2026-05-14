'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Send, Wand2, Check, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAgentBuilderChat } from '@/hooks/useAgentBuilderChat';
import { useAIEmployees } from '@/hooks/useAIEmployees';
import { cn } from '@/lib/utils';

function parseAgentConfig(reply: string) {
  const nameMatch = reply.match(/NAME:\s*(.+)/i);
  const roleMatch = reply.match(/ROLE:\s*(.+)/i);
  const skillsMatch = reply.match(/SKILLS:\s*(.+)/i);
  const descMatch = reply.match(/DESCRIPTION:\s*([\s\S]+?)(?=\n\n|$)/i);

  return {
    name: nameMatch?.[1]?.trim(),
    role: roleMatch?.[1]?.trim(),
    skills: skillsMatch?.[1]
      ?.split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    description: descMatch?.[1]?.trim(),
  };
}

export function AgentBuilderChat() {
  const router = useRouter();
  const { messages, isLoading, sendMessage } = useAgentBuilderChat();
  const { create } = useAIEmployees();
  const [input, setInput] = useState('');
  const [creating, setCreating] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

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

  const handleCreate = async (reply: string) => {
    const config = parseAgentConfig(reply);
    if (!config.name || !config.role) return;
    setCreating(true);
    const created = await create({
      name: config.name,
      role: config.role,
      description: config.description || '',
      skills: config.skills || [],
    });
    setCreating(false);
    if (created) {
      router.push('/dashboard/agents');
    }
  };

  const lastAssistantMessage = messages
    .filter((m) => m.role === 'assistant')
    .pop();

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[rgba(255,255,255,0.06)]">
        <Link
          href="/dashboard/agents"
          className="p-1.5 rounded-lg text-[#475569] hover:text-[#F1F5F9] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="h-8 w-8 rounded-lg bg-[rgba(99,102,241,0.12)] flex items-center justify-center">
          <Wand2 className="h-4 w-4 text-[#6366F1]" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#F1F5F9]">Agent Builder</h2>
          <p className="text-[10px] text-[#94A3B8]">Describe what you need</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'flex gap-3',
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {msg.role === 'assistant' && (
              <div className="h-7 w-7 rounded-lg bg-[rgba(99,102,241,0.12)] flex items-center justify-center shrink-0 mt-0.5">
                <Wand2 className="h-3.5 w-3.5 text-[#6366F1]" />
              </div>
            )}
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap',
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
            <div className="h-7 w-7 rounded-lg bg-[rgba(99,102,241,0.12)] flex items-center justify-center shrink-0">
              <Wand2 className="h-3.5 w-3.5 text-[#6366F1]" />
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

        {lastAssistantMessage &&
          parseAgentConfig(lastAssistantMessage.content).name && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center"
            >
              <button
                onClick={() => handleCreate(lastAssistantMessage.content)}
                disabled={creating}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#10B981] text-white text-xs font-medium hover:bg-[#059669] transition-colors disabled:opacity-50"
              >
                <Check className="h-3.5 w-3.5" />
                {creating ? 'Creating...' : 'Create This Agent'}
              </button>
            </motion.div>
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
            placeholder="Describe the agent you need..."
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
