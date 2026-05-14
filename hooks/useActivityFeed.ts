'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchActivity } from '@/lib/api/activity';
import type { ActivityItem } from '@/lib/types/activity';

const POLL_INTERVAL = 15_000;
const MAX_ITEMS = 50;

export function useActivityFeed() {
  const [data, setData] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const seenIds = useRef(new Set<string>());

  const fetch = useCallback(async () => {
    try {
      const items = await fetchActivity(20);
      setData((prev) => {
        const merged = [...items, ...prev];
        // De-duplication
        const unique = merged.filter((item, idx, arr) => {
          if (seenIds.current.has(item.id)) return false;
          seenIds.current.add(item.id);
          return arr.findIndex((i) => i.id === item.id) === idx;
        });
        return unique.slice(0, MAX_ITEMS);
      });
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Unable to load activity');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
    const interval = setInterval(fetch, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetch]);

  const clear = useCallback(() => {
    setData([]);
    seenIds.current.clear();
  }, []);

  return { data, isLoading, error, refetch: fetch, clear };
}
