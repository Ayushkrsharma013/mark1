'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Skill } from '@/lib/skills/types';

export function useSkills() {
  const [data, setData] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSkills = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/skills', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch skills');
      const json = await res.json();
      setData(json.skills || []);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Unable to load skills');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  return {
    data,
    isLoading,
    error,
    refetch: loadSkills,
  };
}
