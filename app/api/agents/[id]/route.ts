import { NextResponse } from 'next/server';
import { requireAuthApi } from '@/lib/auth';
import { createSupabaseServerClientForApi } from '@/lib/supabase/admin';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuthApi();
    const { id } = await params;
    const body = await req.json();
    const supabase = await createSupabaseServerClientForApi();

    const updates: Record<string, unknown> = {};
    if (body.name !== undefined) updates.name = body.name;
    if (body.role !== undefined) updates.role = body.role;
    if (body.description !== undefined) updates.description = body.description;
    if (body.status !== undefined) updates.status = body.status;
    if (body.skills !== undefined) updates.skills = body.skills;
    if (body.system_prompt !== undefined) updates.system_prompt = body.system_prompt;
    if (body.avatar_color !== undefined) updates.avatar_color = body.avatar_color;
    if (body.icon_name !== undefined) updates.icon_name = body.icon_name;
    if (body.auto_run !== undefined) updates.auto_run = body.auto_run;
    if (body.run_schedule !== undefined) updates.run_schedule = body.run_schedule;
    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('agents' as any)
      .update(updates)
      .eq('id', id)
      .eq('user_id', session.user.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ agent: data });
  } catch (error: any) {
    if (
      error.message === 'Authentication required' ||
      error.message === 'Insufficient permissions'
    ) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error('Agents PUT error:', error);
    return NextResponse.json({ error: 'Failed to update agent' }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuthApi();
    const { id } = await params;
    const supabase = await createSupabaseServerClientForApi();

    const { error } = await supabase
      .from('agents' as any)
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id);

    if (error) throw error;
    return NextResponse.json({ success: true, deleted: id });
  } catch (error: any) {
    if (
      error.message === 'Authentication required' ||
      error.message === 'Insufficient permissions'
    ) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error('Agents DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete agent' }, { status: 500 });
  }
}
