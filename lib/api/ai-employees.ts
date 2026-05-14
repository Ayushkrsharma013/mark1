import type { AIEmployee } from '@/lib/types/agent';

export async function fetchAIEmployees(): Promise<AIEmployee[]> {
  const res = await fetch('/api/agents', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch agents');
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return (json.agents as AIEmployee[]) || [];
}

export async function createAIEmployee(
  agent: Partial<AIEmployee>
): Promise<AIEmployee> {
  const res = await fetch('/api/agents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(agent),
  });
  if (!res.ok) throw new Error('Failed to create agent');
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json.agent as AIEmployee;
}

export async function updateAIEmployee(
  id: string,
  updates: Partial<AIEmployee>
): Promise<AIEmployee> {
  const res = await fetch(`/api/agents/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update agent');
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json.agent as AIEmployee;
}

export async function deleteAIEmployee(id: string): Promise<void> {
  const res = await fetch(`/api/agents/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete agent');
}
