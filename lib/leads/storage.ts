import type { Lead, LeadEmailStatus, LeadSource } from './types';

const EMAIL_STATUS_VALUES = new Set(['verified', 'risky', 'not_found']);
const SOURCE_VALUES = new Set(['linkedin', 'gmaps', 'amazon']);

export function validateLead(lead: unknown): lead is Lead {
  if (!lead || typeof lead !== 'object') return false;
  const l = lead as Record<string, unknown>;
  return (
    typeof l.id === 'string' && l.id.length > 0 &&
    typeof l.name === 'string' &&
    typeof l.title === 'string' &&
    typeof l.company === 'string' &&
    typeof l.email === 'string' &&
    typeof l.score === 'number' && l.score >= 0 && l.score <= 100 &&
    EMAIL_STATUS_VALUES.has(String(l.email_status)) &&
    SOURCE_VALUES.has(String(l.source))
  );
}

export function sanitizeLead(raw: Record<string, unknown>): Lead {
  const now = new Date().toISOString();
  return {
    id: String(raw.id || `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`),
    user_id: (raw.user_id as string | null) ?? null,
    client_id: (raw.client_id as string | null) ?? null,
    name: String(raw.name || '').trim().slice(0, 200),
    title: String(raw.title || '').trim().slice(0, 200),
    company: String(raw.company || '').trim().slice(0, 200),
    industry: String(raw.industry || '').trim().slice(0, 100),
    location: String(raw.location || '').trim().slice(0, 200),
    email: String(raw.email || '').trim().toLowerCase().slice(0, 254),
    email_status: EMAIL_STATUS_VALUES.has(String(raw.email_status))
      ? (raw.email_status as LeadEmailStatus)
      : 'not_found',
    linkedin: String(raw.linkedin || '').trim().slice(0, 500),
    website: String(raw.website || '').trim().slice(0, 500),
    company_size: String(raw.companySize || raw.company_size || '').trim().slice(0, 50),
    score: Math.max(0, Math.min(100, Math.round(Number(raw.score) || 0))),
    source: SOURCE_VALUES.has(String(raw.source))
      ? (raw.source as LeadSource)
      : 'linkedin',
    kanban_column: 'New',
    status: 'new',
    notes: null,
    tags: Array.isArray(raw.tags) ? raw.tags.map(String).slice(0, 20) : [],
    saved_at: typeof raw.saved_at === 'string' && raw.saved_at ? raw.saved_at : now,
    fetched_at: typeof raw.fetched_at === 'string' && raw.fetched_at ? raw.fetched_at : now,
    last_touched: null,
  };
}

/** Generate a stable, deterministic ID from the lead's best unique keys. */
export function stableLeadId(email: string, linkedin: string, name: string, company: string): string {
  const key = email.toLowerCase().trim()
    || linkedin.toLowerCase().trim()
    || `${name.toLowerCase().trim()}|${company.toLowerCase().trim()}`;
  let h = 5381;
  for (let i = 0; i < key.length; i++) {
    h = ((h << 5) + h) ^ key.charCodeAt(i);
    h = h >>> 0;
  }
  return `apify-${h.toString(36)}`;
}

type ApifyEmailObj = { address?: string; [k: string]: unknown };

function extractEmail(item: Record<string, unknown>): string {
  if (Array.isArray(item.emails) && item.emails.length > 0) {
    const first = item.emails[0];
    if (first && typeof first === 'object') return String((first as ApifyEmailObj).address || '');
    return String(first || '');
  }
  if (typeof item.emails === 'string' && item.emails.trim()) return item.emails.trim();
  if (typeof item.work_email === 'string' && item.work_email.trim()) return item.work_email.trim();
  if (typeof item.email === 'string' && item.email.trim()) return item.email.trim();
  if (Array.isArray(item.personal_emails) && item.personal_emails.length > 0)
    return String(item.personal_emails[0]);
  return '';
}

export function apifyItemToLead(item: Record<string, unknown>, userId?: string): Lead {
  const email = extractEmail(item).toLowerCase().trim();
  const linkedin = String(item.linkedin_url || '').trim();
  const name = String(item.full_name || item.name || '').trim();
  const company = String(item.job_company_name || item.company || '').trim();

  const rawStatus = String(item.email_status || '');
  const emailStatus: LeadEmailStatus = (
    ['verified', 'risky', 'not_found'].includes(rawStatus) ? rawStatus : 'not_found'
  ) as LeadEmailStatus;

  return sanitizeLead({
    id: stableLeadId(email, linkedin, name, company),
    user_id: userId ?? null,
    name,
    title: String(item.job_title || item.title || '').trim(),
    company,
    industry: String(item.job_company_industry || item.industry || '').trim(),
    location: String(item.location_name || item.location || '').trim(),
    email,
    email_status: emailStatus,
    linkedin,
    website: String(item.job_company_website || '').trim(),
    company_size: String(item.job_company_size || item.employee_size || '').trim(),
    score: Math.floor(70 + Math.random() * 28),
    source: 'linkedin',
    tags: [],
  });
}

export function generateCSV(leads: Lead[]): string {
  const HEADERS = [
    'Name', 'Title', 'Company', 'Industry', 'Location',
    'Email', 'Email Status', 'LinkedIn', 'Website',
    'Company Size', 'Score', 'Source', 'Saved At', 'Fetched At',
  ];
  const esc = (v: unknown) => {
    const s = String(v ?? '').replace(/"/g, '""');
    const safe = /^[=+\-\@\t\r]/.test(s) ? `'${s}` : s;
    return `"${safe}"`;
  };
  const rows = leads.map(l =>
    [
      l.name, l.title, l.company, l.industry, l.location,
      l.email, l.email_status, l.linkedin, l.website,
      l.company_size, l.score, l.source,
      l.saved_at ? new Date(l.saved_at).toLocaleString() : '',
      l.fetched_at ? new Date(l.fetched_at).toLocaleString() : '',
    ].map(esc).join(',')
  );
  return [HEADERS.map(esc).join(','), ...rows].join('\n');
}
