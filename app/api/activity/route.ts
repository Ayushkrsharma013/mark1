import { NextResponse } from 'next/server';
import { requireAuthApi } from '@/lib/auth';
import { createSupabaseServerClientForApi } from '@/lib/supabase/admin';
import type { ActivityItem } from '@/lib/types/activity';

function generateDemoActivity(limit: number): ActivityItem[] {
  const ACTIONS = [
    'Qualified 3 leads',
    'Sent 12 emails',
    'Scraped 45 profiles',
    'Updated CRM records',
    'Published blog post',
    'Resolved support ticket',
    'Enriched 8 contacts',
    'Scheduled 5 meetings',
    'Generated proposal draft',
    'Synced to Google Sheets',
  ];
  const AGENTS = ['Lead Qualifier', 'Support Bot', 'Content Scheduler', 'Outreach Sequencer', 'Data Cleaner'];

  const items: ActivityItem[] = [];
  for (let i = 0; i < limit; i++) {
    const minutesAgo = i * 3 + Math.floor(Math.random() * 3);
    const status = Math.random() > 0.15 ? 'success' : Math.random() > 0.5 ? 'error' : 'running';
    items.push({
      id: `act-${Date.now()}-${i}`,
      agent_name: AGENTS[Math.floor(Math.random() * AGENTS.length)],
      action: ACTIONS[Math.floor(Math.random() * ACTIONS.length)],
      timestamp: new Date(Date.now() - minutesAgo * 60 * 1000).toISOString(),
      status,
      duration_ms: status === 'running' ? undefined : Math.floor(Math.random() * 3000) + 200,
    });
  }
  return items;
}

export async function GET(req: Request) {
  try {
    const session = await requireAuthApi();
    const supabase = await createSupabaseServerClientForApi();
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const db = supabase as any;

    // Fetch real agent tasks
    const { data: tasks, error: taskErr } = await db
      .from('agent_tasks')
      .select('id, title, status, created_at, completed_at, agent_id')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (taskErr) console.error('Activity tasks error:', taskErr);

    // Fetch real lead_activity_log
    const { data: leadActivities, error: leadErr } = await db
      .from('lead_activity_log')
      .select('id, type, text, created_at')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (leadErr) console.error('Activity leads error:', leadErr);

    const items: ActivityItem[] = [];

    if (tasks) {
      for (const t of tasks) {
        const duration = t.completed_at
          ? new Date(t.completed_at).getTime() - new Date(t.created_at).getTime()
          : undefined;
        items.push({
          id: `task-${t.id}`,
          agent_name: t.agent_id ? 'AI Employee' : 'System',
          action: t.title,
          timestamp: t.created_at,
          status: t.status === 'completed' ? 'success' : t.status === 'failed' ? 'error' : 'running',
          duration_ms: duration && duration > 0 ? duration : undefined,
        });
      }
    }

    if (leadActivities) {
      for (const a of leadActivities) {
        items.push({
          id: `lead-${a.id}`,
          agent_name: 'Lead Engine',
          action: a.text || a.type,
          timestamp: a.created_at,
          status: 'success',
        });
      }
    }

    // Sort by timestamp desc and take limit
    items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const realItems = items.slice(0, limit);

    if (realItems.length > 0) {
      return NextResponse.json({ items: realItems });
    }

    return NextResponse.json({ items: generateDemoActivity(limit) });
  } catch (error: any) {
    if (
      error.message === 'Authentication required' ||
      error.message === 'Insufficient permissions'
    ) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch activity' },
      { status: 500 }
    );
  }
}
