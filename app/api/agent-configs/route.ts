import { NextResponse } from 'next/server';
import { requireAuthApi } from '@/lib/auth';
import { createSupabaseServerClientForApi } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const session = await requireAuthApi();
    const supabase = await createSupabaseServerClientForApi();
    const { data, error } = await supabase
      .from('agent_configs')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ configs: data || [] });
  } catch (error: any) {
    if (
      error.message === 'Authentication required' ||
      error.message === 'Insufficient permissions'
    ) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch agent configs' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAuthApi();
    const body = await req.json();
    const supabase = await createSupabaseServerClientForApi();

    const { data, error } = await supabase
      .from('agent_configs')
      .upsert({
        id: body.id,
        user_id: session.user.id,
        name: body.name,
        description: body.description || '',
        type: body.type,
        tags: body.tags || [],
        status: body.status || 'building',
        retry_on_failure: body.retry_on_failure ?? false,
        max_execution_minutes: body.max_execution_minutes ?? 30,
        nodes: body.nodes || [],
        edges: body.edges || [],
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ config: data }, { status: 201 });
  } catch (error: any) {
    if (
      error.message === 'Authentication required' ||
      error.message === 'Insufficient permissions'
    ) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to save agent config' },
      { status: 500 }
    );
  }
}
