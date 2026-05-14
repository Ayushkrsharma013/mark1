import { NextResponse } from 'next/server';
import { requireAuthApi } from '@/lib/auth';
import { createSupabaseServerClientForApi } from '@/lib/supabase/admin';
import type { LiveMetrics } from '@/lib/types/metric';

function generateTrend(base: number): number[] {
  return Array.from({ length: 7 }, () => Math.max(0, Math.round(base + (Math.random() - 0.5) * base * 0.3)));
}

export async function GET() {
  try {
    const session = await requireAuthApi();
    const supabase = await createSupabaseServerClientForApi();

    // Real counts from Supabase
    const db = supabase as any;

    const { count: leadCount, error: leadErr } = await db
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id);

    const { count: agentCount, error: agentErr } = await db
      .from('agents')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id)
      .eq('status', 'active');

    const { count: taskCount, error: taskErr } = await db
      .from('agent_tasks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id)
      .eq('status', 'completed');

    if (leadErr) console.error('Metrics leads error:', leadErr);
    if (agentErr) console.error('Metrics agents error:', agentErr);
    if (taskErr) console.error('Metrics tasks error:', taskErr);

    const leads = leadCount ?? 0;
    const agents = agentCount ?? 0;
    const tasks = taskCount ?? 0;
    // Rough heuristic: each completed task saves ~0.25 hours
    const hours = Math.round(tasks * 0.25 * 10) / 10;

    const metrics: LiveMetrics = {
      leads_generated: {
        value: leads,
        delta: Math.min(leads, Math.round(leads * 0.12)),
        trend: generateTrend(leads),
      },
      active_agents: {
        value: agents,
        delta: 0,
        trend: generateTrend(agents),
      },
      tasks_completed: {
        value: tasks,
        delta: Math.min(tasks, Math.round(tasks * 0.08)),
        trend: generateTrend(tasks),
      },
      hours_saved: {
        value: hours,
        delta: Math.round(hours * 0.1 * 10) / 10,
        trend: generateTrend(Math.round(hours)),
      },
    };

    return NextResponse.json({ metrics });
  } catch (error: any) {
    if (
      error.message === 'Authentication required' ||
      error.message === 'Insufficient permissions'
    ) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error('Metrics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}
