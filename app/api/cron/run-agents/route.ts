import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/admin';

export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const db = getAdminClient() as any;

    const { data: agents, error } = await db
      .from('agents')
      .select('*')
      .eq('status', 'active')
      .eq('auto_run', true);

    if (error) throw error;

    const tasks: any[] = [];
    for (const agent of agents || []) {
      const { data: task, error: taskError } = await db
        .from('agent_tasks')
        .insert({
          agent_id: agent.id,
          user_id: agent.user_id,
          title: `Scheduled run: ${agent.name}`,
          description: `Auto-executed task for ${agent.role}`,
          status: 'pending',
          trigger: 'scheduled',
        })
        .select()
        .single();

      if (taskError) {
        console.error(`Failed to create task for agent ${agent.id}:`, taskError);
      } else {
        tasks.push(task);
      }
    }

    return NextResponse.json({ queued: tasks.length, tasks });
  } catch (error) {
    console.error('Cron run-agents error:', error);
    return NextResponse.json(
      { error: 'Failed to queue agent tasks' },
      { status: 500 }
    );
  }
}
