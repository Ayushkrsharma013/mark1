import type { LiveMetrics } from '@/lib/types/metric';

const CACHE_KEY = 'cc_metrics_cache';
const CACHE_TTL = 5 * 60 * 1000;

interface CacheEntry {
  data: LiveMetrics;
  ts: number;
}

function getCached(): LiveMetrics | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(CACHE_KEY);
  if (!raw) return null;
  try {
    const parsed: CacheEntry = JSON.parse(raw);
    if (Date.now() - parsed.ts < CACHE_TTL) return parsed.data;
  } catch {
    /* ignore */
  }
  return null;
}

function setCached(data: LiveMetrics) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
}

export async function fetchMetrics(): Promise<LiveMetrics> {
  try {
    const res = await fetch('/api/metrics', { cache: 'no-store' });
    if (!res.ok) throw new Error('Metrics fetch failed');
    const json = await res.json();
    if (json.error) throw new Error(json.error);
    const data = json.metrics as LiveMetrics;
    setCached(data);
    return data;
  } catch {
    const cached = getCached();
    if (cached) return cached;
    // Graceful fallback — zeroed metrics with flat trends so UI never breaks
    const zeroTrend = [0, 0, 0, 0, 0, 0, 0];
    return {
      leads_generated: { value: 0, delta: 0, trend: zeroTrend },
      active_agents: { value: 0, delta: 0, trend: zeroTrend },
      tasks_completed: { value: 0, delta: 0, trend: zeroTrend },
      hours_saved: { value: 0, delta: 0, trend: zeroTrend },
    };
  }
}
