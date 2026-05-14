import { NextRequest, NextResponse } from 'next/server';
import { requireAuthApi } from '@/lib/auth';
import { createSupabaseServerClientForApi } from '@/lib/supabase/admin';
import { apifyItemToLead } from '@/lib/leads/storage';
import type { Lead } from '@/lib/leads/types';

export const maxDuration = 300;

const APIFY_TOKEN = process.env.APIFY_API_KEY || '';
const ACTOR = 'x_guru~Leads-Scraper-apollo-zoominfo';
const APIFY_HEADERS = { Authorization: `Bearer ${APIFY_TOKEN}` };

async function fetchAllDatasetItems(datasetId: string): Promise<Record<string, unknown>[]> {
  const allItems: Record<string, unknown>[] = [];
  const PAGE_SIZE = 1000;
  const MAX_PAGES = 50;
  let offset = 0;

  for (let page = 0; page < MAX_PAGES; page++) {
    const res = await fetch(
      `https://api.apify.com/v2/datasets/${datasetId}/items?limit=${PAGE_SIZE}&offset=${offset}`,
      { headers: APIFY_HEADERS },
    );
    if (!res.ok) {
      console.error(`fetchAllDatasetItems: page ${page} failed HTTP ${res.status} for dataset ${datasetId}`);
      break;
    }
    const items = await res.json() as Record<string, unknown>[];
    if (!Array.isArray(items) || items.length === 0) break;
    allItems.push(...items);
    if (items.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
    await new Promise(r => setTimeout(r, 100));
  }

  return allItems;
}

// GET — List past Apify runs with lead counts
export async function GET(req: NextRequest) {
  try {
    await requireAuthApi();

    if (!APIFY_TOKEN) {
      return NextResponse.json({ error: 'APIFY_API_KEY not configured' }, { status: 500 });
    }

    const runsRes = await fetch(
      `https://api.apify.com/v2/acts/${ACTOR}/runs?status=SUCCEEDED&limit=50`,
      { headers: APIFY_HEADERS },
    );
    if (!runsRes.ok) {
      throw new Error(`Apify list-runs failed: HTTP ${runsRes.status}`);
    }

    const runsData = await runsRes.json() as {
      data?: { items?: Array<{ id: string; defaultDatasetId: string; finishedAt: string }> };
    };
    const runs = runsData?.data?.items ?? [];

    if (runs.length === 0) {
      return NextResponse.json({ runs: [] });
    }

    const runList = await Promise.all(
      runs.map(async (run) => {
        try {
          const countRes = await fetch(
            `https://api.apify.com/v2/datasets/${run.defaultDatasetId}/items?limit=100`,
            { headers: APIFY_HEADERS },
          );
          if (!countRes.ok) return null;
          const items = await countRes.json() as Record<string, unknown>[];
          const count = Array.isArray(items) ? items.length : 0;
          return {
            runId: run.id,
            finishedAt: run.finishedAt || '',
            leadCount: count,
            datasetId: run.defaultDatasetId,
            hasMore: count >= 100,
          };
        } catch {
          return null;
        }
      })
    );

    const validRuns = runList.filter(Boolean).sort(
      (a, b) => new Date(b!.finishedAt).getTime() - new Date(a!.finishedAt).getTime()
    );

    return NextResponse.json({ runs: validRuns });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err ?? '');
    if (msg === 'Authentication required' || msg === 'Insufficient permissions') {
      return NextResponse.json({ error: msg }, { status: 401 });
    }
    console.error('Import GET error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST — Import leads from selected Apify run
export async function POST(req: NextRequest) {
  try {
    const session = await requireAuthApi();
    const supabase = await createSupabaseServerClientForApi();

    if (!APIFY_TOKEN) {
      return NextResponse.json({ error: 'APIFY_API_KEY not configured' }, { status: 500 });
    }

    let body: { runId?: string; runIds?: string[] } = {};
    try { body = await req.json(); } catch { /* no body */ }

    const targetRunIds = body.runId ? [body.runId] : body.runIds ?? [];
    if (targetRunIds.length === 0) {
      return NextResponse.json({ error: 'No runId provided' }, { status: 400 });
    }

    const runIdSet = new Set(targetRunIds);

    const runsRes = await fetch(
      `https://api.apify.com/v2/acts/${ACTOR}/runs?status=SUCCEEDED&limit=50`,
      { headers: APIFY_HEADERS },
    );
    if (!runsRes.ok) {
      throw new Error(`Apify list-runs failed: HTTP ${runsRes.status}`);
    }

    const runsData = await runsRes.json() as {
      data?: { items?: Array<{ id: string; defaultDatasetId: string; finishedAt: string }> };
    };
    const allRuns = runsData?.data?.items ?? [];
    const runs = allRuns.filter(r => runIdSet.has(r.id));

    if (runs.length === 0) {
      return NextResponse.json({
        message: 'No matching runs found',
        added: 0, updated: 0, total: 0,
      });
    }

    const allLeads: Lead[] = [];
    for (const run of runs) {
      if (!run.defaultDatasetId) continue;
      try {
        const items = await fetchAllDatasetItems(run.defaultDatasetId);
        if (items.length === 0) continue;
        const leads = items.map(item => apifyItemToLead(item, session.user.id));
        allLeads.push(...leads);
      } catch { /* skip single dataset failure */ }
    }

    if (allLeads.length === 0) {
      return NextResponse.json({
        message: `Found ${runs.length} run(s) but all datasets were empty`,
        added: 0, updated: 0, total: 0,
      });
    }

    // Deduplicate by stable ID
    const seen = new Map<string, Lead>();
    for (const lead of allLeads) {
      if (!seen.has(lead.id)) seen.set(lead.id, lead);
    }
    const deduped = Array.from(seen.values());

    // Find which IDs already exist
    const ids = deduped.map(l => l.id);
    const { data: existingRows } = await (supabase as any)
      .from('leads')
      .select('id')
      .in('id', ids)
      .eq('user_id', session.user.id);

    const existingIds = new Set((existingRows || []).map((r: { id: string }) => r.id));

    // Batch upsert all leads
    const upsertPayload = deduped.map(lead => ({
      id: lead.id,
      user_id: session.user.id,
      name: lead.name,
      title: lead.title,
      company: lead.company,
      industry: lead.industry,
      location: lead.location,
      email: lead.email,
      email_status: lead.email_status,
      linkedin: lead.linkedin,
      website: lead.website,
      company_size: lead.company_size,
      score: lead.score,
      source: lead.source,
      kanban_column: lead.kanban_column,
      status: lead.status,
      tags: lead.tags,
      saved_at: lead.saved_at,
      fetched_at: lead.fetched_at,
    }));

    const { error: upsertError } = await (supabase as any)
      .from('leads')
      .upsert(upsertPayload, { onConflict: 'id' });

    if (upsertError) throw upsertError;

    const added = deduped.filter(l => !existingIds.has(l.id)).length;
    const updated = deduped.filter(l => existingIds.has(l.id)).length;

    return NextResponse.json({
      message: `${added + updated} leads imported successfully`,
      added,
      updated,
      total: added + updated,
      leads: deduped,
    });
  } catch (err: unknown) {
    const detail = err instanceof Error
      ? err.message
      : typeof err === 'object' ? JSON.stringify(err) : String(err ?? '');
    console.error('Import POST error:', detail);
    if (detail === 'Authentication required' || detail === 'Insufficient permissions') {
      return NextResponse.json({ error: detail }, { status: 401 });
    }
    return NextResponse.json({ error: detail || 'Failed to import leads' }, { status: 500 });
  }
}
