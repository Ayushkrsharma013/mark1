'use client';

import { useState, useCallback } from 'react';

interface BuilderMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function useAgentBuilderChat() {
  const [messages, setMessages] = useState<BuilderMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm your Agent Builder. Tell me what kind of AI employee you need — for example, 'I need someone to handle my LinkedIn outreach' or 'I want an SEO expert to optimize my blog content'.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return null;
    setIsLoading(true);
    setError(null);

    const newMessages: BuilderMessage[] = [
      ...messages,
      { role: 'user', content },
    ];
    setMessages(newMessages);

    try {
      const res = await fetch('/api/agent-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      if (!res.ok) throw new Error('Failed to get response');
      const json = await res.json();

      const reply: BuilderMessage = {
        role: 'assistant',
        content: json.reply,
      };
      setMessages((prev) => [...prev, reply]);
      return json.reply as string;
    } catch (e: any) {
      setError(e.message || 'Failed to send message');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  };
}
