import type { ActivityItem } from '@/lib/types/activity';

const CACHE_KEY = 'cc_activity_cache';
const CACHE_TTL = 5 * 60 * 1000;

interface CacheEntry {
  data: ActivityItem[];
  ts: number;
}

function getCached(): ActivityItem[] | null {
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

function setCached(data: ActivityItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
}

export async function fetchActivity(limit = 20): Promise<ActivityItem[]> {
  try {
    const res = await fetch(`/api/activity?limit=${limit}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Activity fetch failed');
    const json = await res.json();
    if (json.error) throw new Error(json.error);
    const data = (json.items as ActivityItem[]) || [];
    setCached(data);
    return data;
  } catch {
    return getCached() || [];
  }
}
