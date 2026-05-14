'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchPipelineData } from '@/lib/api/pipeline';
import type { PipelineDay } from '@/lib/types/metric';

const POLL_INTERVAL = 5 * 60_000;

export function usePipelineData() {
  const [data, setData] = useState<PipelineDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try {
      const pipeline = await fetchPipelineData();
      setData(pipeline);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Unable to load pipeline');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
    const interval = setInterval(fetch, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetch]);

  return { data, isLoading, error, refetch: fetch };
}
