import { NextResponse } from 'next/server';
import { requireAuthApi } from '@/lib/auth';
import { createSupabaseServerClientForApi } from '@/lib/supabase/admin';
import type { PipelineDay } from '@/lib/types/metric';

function generateDemoPipeline(): PipelineDay[] {
  const days: PipelineDay[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const scraped = Math.floor(Math.random() * 80) + 40;
    days.push({
      date: d.toISOString().split('T')[0],
      scraped,
      qualified: Math.floor(scraped * 0.6),
      contacted: Math.floor(scraped * 0.35),
      responded: Math.floor(scraped * 0.15),
    });
  }
  return days;
}

export async function GET() {
  try {
    const session = await requireAuthApi();
    const supabase = await createSupabaseServerClientForApi();
    const db = supabase as any;

    // Get leads created in last 7 days, grouped by day
    const { data: leads, error } = await db
      .from('leads')
      .select('status, saved_at')
      .eq('user_id', session.user.id)
      .gte('saved_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    if (error) {
      console.error('Pipeline leads error:', error);
      return NextResponse.json({ pipeline: generateDemoPipeline() });
    }

    if (!leads || leads.length === 0) {
      return NextResponse.json({ pipeline: generateDemoPipeline() });
    }

    // Build day map
    const dayMap: Record<string, PipelineDay> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      dayMap[key] = { date: key, scraped: 0, qualified: 0, contacted: 0, responded: 0 };
    }

    for (const lead of leads) {
      const dateKey = (lead.saved_at as string).split('T')[0];
      if (!dayMap[dateKey]) continue;

      dayMap[dateKey].scraped++;
      if (lead.status !== 'new') dayMap[dateKey].qualified++;
      if (['contacted', 'replied', 'hot', 'meeting', 'won'].includes(lead.status)) {
        dayMap[dateKey].contacted++;
      }
      if (['replied', 'hot', 'meeting', 'won'].includes(lead.status)) {
        dayMap[dateKey].responded++;
      }
    }

    const pipeline = Object.values(dayMap).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return NextResponse.json({ pipeline });
  } catch (error: any) {
    if (
      error.message === 'Authentication required' ||
      error.message === 'Insufficient permissions'
    ) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { pipeline: generateDemoPipeline() }
    );
  }
}
