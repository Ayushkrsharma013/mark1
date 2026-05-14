import { NextRequest, NextResponse } from 'next/server';
import { requireAuthApi } from '@/lib/auth';
import { createSupabaseServerClientForApi } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuthApi();
    const supabase = await createSupabaseServerClientForApi();

    const { searchParams } = req.nextUrl;
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 500);
    const offset = parseInt(searchParams.get('offset') || '0');
    const source = searchParams.get('source');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let query = (supabase as any)
      .from('leads')
      .select('*', { count: 'exact' })
      .eq('user_id', session.user.id)
      .order('saved_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (source) query = query.eq('source', source);
    if (status) query = query.eq('status', status);
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({ leads: data || [], count: count || 0 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    if (msg === 'Authentication required' || msg === 'Insufficient permissions') {
      return NextResponse.json({ error: msg }, { status: 401 });
    }
    console.error('Leads GET error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await requireAuthApi();
    const supabase = await createSupabaseServerClientForApi();
    const body = await req.json();

    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: 'Missing lead id' }, { status: 400 });
    }

    const { data, error } = await (supabase as any)
      .from('leads')
      .update({ ...updates, last_touched: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', session.user.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ lead: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    if (msg === 'Authentication required' || msg === 'Insufficient permissions') {
      return NextResponse.json({ error: msg }, { status: 401 });
    }
    console.error('Leads PATCH error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await requireAuthApi();
    const supabase = await createSupabaseServerClientForApi();
    const { searchParams } = req.nextUrl;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing lead id' }, { status: 400 });
    }

    const { error } = await (supabase as any)
      .from('leads')
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    if (msg === 'Authentication required' || msg === 'Insufficient permissions') {
      return NextResponse.json({ error: msg }, { status: 401 });
    }
    console.error('Leads DELETE error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
