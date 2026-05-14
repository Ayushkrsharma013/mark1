'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchAgents, toggleAgent, deleteAgent, createAgent } from '@/lib/api/agents';
import type { Agent } from '@/lib/types/agent';

const POLL_INTERVAL = 60_000;

export function useAgents() {
  const [data, setData] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try {
      const agents = await fetchAgents();
      setData(agents);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Unable to load agents');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
    const interval = setInterval(fetch, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetch]);

  const handleToggle = useCallback(async (id: string) => {
    const current = data.find((a) => a.id === id);
    if (!current) return;

    // Optimistic update
    setData((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === 'active' ? 'paused' : 'active' as Agent['status'] }
          : a
      )
    );

    const updated = await toggleAgent(id);
    if (!updated) {
      // Rollback
      setData((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: current.status } : a))
      );
      setError('Failed to toggle agent');
    }
  }, [data]);

  const handleDelete = useCallback(async (id: string) => {
    setData((prev) => prev.filter((a) => a.id !== id));
    const ok = await deleteAgent(id);
    if (!ok) {
      setError('Failed to delete agent');
      fetch();
    }
  }, [fetch]);

  const handleCreate = useCallback(async (agent: Partial<Agent>) => {
    const created = await createAgent(agent);
    if (created) {
      setData((prev) => [created, ...prev]);
    } else {
      setError('Failed to create agent');
    }
    return created;
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetch,
    toggleAgent: handleToggle,
    deleteAgent: handleDelete,
    createAgent: handleCreate,
  };
}
