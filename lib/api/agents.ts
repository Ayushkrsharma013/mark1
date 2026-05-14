import type { Agent, AgentConfig } from '@/lib/types/agent';

const CACHE_KEY = 'cc_agents_cache';
const CACHE_TTL = 60_000;

interface CacheEntry {
  data: Agent[];
  ts: number;
}

function getCached(): Agent[] | null {
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

function setCached(data: Agent[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
}

export async function fetchAgents(): Promise<Agent[]> {
  try {
    const res = await fetch('/api/agents', { cache: 'no-store' });
    if (!res.ok) throw new Error('Agents fetch failed');
    const json = await res.json();
    if (json.error) throw new Error(json.error);
    const data = (json.agents as Agent[]) || [];
    setCached(data);
    return data;
  } catch {
    return getCached() || [];
  }
}

export async function toggleAgent(id: string): Promise<Agent | null> {
  try {
    const res = await fetch(`/api/agents/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'toggle' }),
    });
    if (!res.ok) throw new Error('Toggle failed');
    const json = await res.json();
    return json.agent as Agent | null;
  } catch {
    return null;
  }
}

export async function deleteAgent(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/agents/${id}`, { method: 'DELETE' });
    return res.ok;
  } catch {
    return false;
  }
}

export async function createAgent(agent: Partial<Agent>): Promise<Agent | null> {
  try {
    const res = await fetch('/api/agents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agent),
    });
    if (!res.ok) throw new Error('Create failed');
    const json = await res.json();
    return json.agent as Agent | null;
  } catch {
    return null;
  }
}

export async function saveAgentConfig(config: AgentConfig): Promise<AgentConfig | null> {
  try {
    const res = await fetch('/api/agent-configs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    if (!res.ok) throw new Error('Save failed');
    const json = await res.json();
    return json.config as AgentConfig | null;
  } catch {
    return null;
  }
}

export async function fetchAgentConfigs(): Promise<AgentConfig[]> {
  try {
    const res = await fetch('/api/agent-configs', { cache: 'no-store' });
    if (!res.ok) throw new Error('Fetch failed');
    const json = await res.json();
    return (json.configs as AgentConfig[]) || [];
  } catch {
    return [];
  }
}
