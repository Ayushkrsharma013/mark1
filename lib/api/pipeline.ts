import type { PipelineDay } from '@/lib/types/metric';

const CACHE_KEY = 'cc_pipeline_cache';
const CACHE_TTL = 5 * 60 * 1000;

interface CacheEntry {
  data: PipelineDay[];
  ts: number;
}

function getCached(): PipelineDay[] | null {
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

function setCached(data: PipelineDay[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
}

export async function fetchPipelineData(): Promise<PipelineDay[]> {
  try {
    const res = await fetch('/api/pipeline', { cache: 'no-store' });
    if (!res.ok) throw new Error('Pipeline fetch failed');
    const json = await res.json();
    if (json.error) throw new Error(json.error);
    const data = (json.pipeline as PipelineDay[]) || [];
    setCached(data);
    return data;
  } catch {
    const cached = getCached();
    if (cached) return cached;
    // Generate last 7 days of zeros so chart never breaks
    const days: PipelineDay[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push({
        date: d.toISOString().split('T')[0],
        scraped: 0,
        qualified: 0,
        contacted: 0,
        responded: 0,
      });
    }
    return days;
  }
}
