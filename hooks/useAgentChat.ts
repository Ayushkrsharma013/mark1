'use client';

import { useState, useCallback } from 'react';
import type { AgentConversation } from '@/lib/types/agent';

export function useAgentChat(agentId: string) {
  const [messages, setMessages] = useState<AgentConversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch(`/api/agent-chat?agentId=${agentId}`, {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch history');
      const json = await res.json();
      setMessages(json.messages || []);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Unable to load conversation');
    }
  }, [agentId]);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return null;
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/agent-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agentId, message }),
        });
        if (!res.ok) throw new Error('Failed to send message');
        const json = await res.json();

        // Optimistically append and then refresh
        setMessages((prev) => [
          ...prev,
          {
            id: `temp-${Date.now()}`,
            agent_id: agentId,
            user_id: '',
            role: 'user',
            content: message,
            created_at: new Date().toISOString(),
          },
          {
            id: `temp-${Date.now() + 1}`,
            agent_id: agentId,
            user_id: '',
            role: 'assistant',
            content: json.reply,
            created_at: new Date().toISOString(),
          },
        ]);

        return json.reply as string;
      } catch (e: any) {
        setError(e.message || 'Failed to send message');
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [agentId]
  );

  return {
    messages,
    isLoading,
    error,
    fetchHistory,
    sendMessage,
  };
}
