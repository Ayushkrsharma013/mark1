import { NextResponse } from 'next/server';
import { requireAuthApi } from '@/lib/auth';
import { createSupabaseServerClientForApi } from '@/lib/supabase/admin';
import { PREBUILT_AGENTS } from '@/lib/agents/prebuilt';
import { composeSystemPrompt } from '@/lib/skills/composer';

export async function GET() {
  try {
    const session = await requireAuthApi();
    const supabase = await createSupabaseServerClientForApi();

    const { data: agents, error } = await supabase
      .from('agents' as any)
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: true });

    if (error) throw error;

    // Seed prebuilt agents if user has none
    if (!agents || agents.length === 0) {
      const prebuiltRows = PREBUILT_AGENTS.map((template) => {
        const systemPrompt = composeSystemPrompt({
          name: template.name,
          role: template.role,
          description: template.description,
          skills: template.skills,
        });
        return {
          user_id: session.user.id,
          name: template.name,
          role: template.role,
          description: template.description,
          type: 'prebuilt',
          status: 'active',
          skills: template.skills,
          system_prompt: systemPrompt,
          avatar_color: template.avatarColor,
          icon_name: template.iconName,
          auto_run: false,
          run_schedule: null,
        };
      });

      const { data: seeded, error: seedError } = await supabase
        .from('agents' as any)
        .insert(prebuiltRows)
        .select();

      if (seedError) throw seedError;
      return NextResponse.json({ agents: seeded || [] });
    }

    return NextResponse.json({ agents: agents || [] });
  } catch (error: any) {
    if (
      error.message === 'Authentication required' ||
      error.message === 'Insufficient permissions'
    ) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error('Agents GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAuthApi();
    const body = await req.json();
    const supabase = await createSupabaseServerClientForApi();

    const systemPrompt =
      body.system_prompt ||
      composeSystemPrompt({
        name: body.name,
        role: body.role,
        description: body.description || '',
        skills: body.skills || [],
      });

    const { data, error } = await supabase
      .from('agents' as any)
      .insert({
        user_id: session.user.id,
        name: body.name,
        role: body.role,
        description: body.description || '',
        type: 'custom',
        status: body.status || 'active',
        skills: body.skills || [],
        system_prompt: systemPrompt,
        avatar_color: body.avatar_color || '#6366F1',
        icon_name: body.icon_name || 'Bot',
        auto_run: body.auto_run ?? false,
        run_schedule: body.run_schedule || null,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ agent: data }, { status: 201 });
  } catch (error: any) {
    if (
      error.message === 'Authentication required' ||
      error.message === 'Insufficient permissions'
    ) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error('Agents POST error:', error);
    return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 });
  }
}
