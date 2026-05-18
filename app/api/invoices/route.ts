import { NextRequest, NextResponse } from 'next/server';
import { requireAuthApi } from '@/lib/auth';
import { getAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuthApi();
    const supabase = getAdminClient();

    const { data, error } = await (supabase as any)
      .from('invoices')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ invoices: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    if (msg === 'Authentication required' || msg === 'Insufficient permissions') {
      return NextResponse.json({ error: msg }, { status: 401 });
    }
    console.error('Invoices GET error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuthApi();
    const supabase = getAdminClient();

    const body = await req.json();
    const { data, error } = await (supabase as any)
      .from('invoices')
      .insert({ ...body, user_id: session.user.id })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ invoice: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    if (msg === 'Authentication required' || msg === 'Insufficient permissions') {
      return NextResponse.json({ error: msg }, { status: 401 });
    }
    console.error('Invoices POST error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await requireAuthApi();
    const supabase = getAdminClient();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const { error } = await (supabase as any)
      .from('invoices')
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
    console.error('Invoices DELETE error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
