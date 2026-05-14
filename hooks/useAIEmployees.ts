'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  fetchAIEmployees,
  createAIEmployee,
  updateAIEmployee,
  deleteAIEmployee,
} from '@/lib/api/ai-employees';
import type { AIEmployee } from '@/lib/types/agent';

export function useAIEmployees() {
  const [data, setData] = useState<AIEmployee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const agents = await fetchAIEmployees();
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
  }, [fetch]);

  const create = useCallback(
    async (agent: Partial<AIEmployee>) => {
      try {
        const created = await createAIEmployee(agent);
        setData((prev) => [...prev, created]);
        return created;
      } catch (e: any) {
        setError(e.message || 'Failed to create agent');
        return null;
      }
    },
    []
  );

  const update = useCallback(
    async (id: string, updates: Partial<AIEmployee>) => {
      try {
        const updated = await updateAIEmployee(id, updates);
        setData((prev) =>
          prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
        );
        return updated;
      } catch (e: any) {
        setError(e.message || 'Failed to update agent');
        return null;
      }
    },
    []
  );

  const remove = useCallback(async (id: string) => {
    try {
      await deleteAIEmployee(id);
      setData((prev) => prev.filter((a) => a.id !== id));
      return true;
    } catch (e: any) {
      setError(e.message || 'Failed to delete agent');
      return false;
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetch,
    create,
    update,
    remove,
  };
}
