'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchMetrics } from '@/lib/api/metrics';
import type { LiveMetrics } from '@/lib/types/metric';

const POLL_INTERVAL = 30_000;

export function useLiveMetrics() {
  const [data, setData] = useState<LiveMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try {
      const metrics = await fetchMetrics();
      setData(metrics);
      setLastUpdated(new Date());
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Unable to load metrics');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
    const interval = setInterval(fetch, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetch]);

  return { data, isLoading, lastUpdated, error, refetch: fetch };
}
