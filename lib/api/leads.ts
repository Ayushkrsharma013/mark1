import type { Lead, LeadStatus } from '@/lib/leads/types';

export interface LeadListResponse {
  leads: Lead[];
  count: number;
}

export async function fetchLeads(params?: {
  limit?: number;
  offset?: number;
  source?: string;
  status?: string;
  search?: string;
}): Promise<LeadListResponse> {
  const searchParams = new URLSearchParams();
  if (params?.limit) searchParams.set('limit', String(params.limit));
  if (params?.offset) searchParams.set('offset', String(params.offset));
  if (params?.source) searchParams.set('source', params.source);
  if (params?.status) searchParams.set('status', params.status);
  if (params?.search) searchParams.set('search', params.search);

  const res = await fetch(`/api/leads?${searchParams.toString()}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch leads');
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return { leads: (json.leads as Lead[]) || [], count: json.count || 0 };
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
  const res = await fetch('/api/leads', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...updates }),
  });
  if (!res.ok) throw new Error('Failed to update lead');
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json.lead as Lead;
}

export async function deleteLead(id: string): Promise<void> {
  const res = await fetch(`/api/leads?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete lead');
}

export async function startScrape(source: string, fields?: Record<string, string>): Promise<{ runId: string }> {
  const res = await fetch('/api/leads/scrape', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source, fields }),
  });
  if (!res.ok) throw new Error('Failed to start scrape');
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json as { runId: string };
}

export async function pollScrape(runId: string): Promise<{
  status: string;
  leads?: Record<string, unknown>[];
  datasetId?: string;
  error?: string;
}> {
  const res = await fetch(`/api/leads/scrape?runId=${encodeURIComponent(runId)}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to poll scrape');
  return res.json();
}

export async function importRuns(runId: string): Promise<{
  message: string;
  added: number;
  updated: number;
  total: number;
  leads: Lead[];
}> {
  const res = await fetch('/api/leads/import', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ runId }),
  });
  if (!res.ok) throw new Error('Failed to import leads');
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json;
}

export async function fetchApifyRuns(): Promise<{
  runs: Array<{
    runId: string;
    finishedAt: string;
    leadCount: number;
    datasetId: string;
    hasMore: boolean;
  }>;
}> {
  const res = await fetch('/api/leads/import', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch Apify runs');
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json;
}
