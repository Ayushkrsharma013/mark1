export type LeadSource = 'linkedin' | 'gmaps' | 'amazon';
export type LeadEmailStatus = 'verified' | 'risky' | 'not_found';
export type LeadKanbanColumn = 'New' | 'Contacted' | 'Replied' | 'Hot' | 'Meeting' | 'Won' | 'Lost';
export type LeadStatus = 'new' | 'contacted' | 'replied' | 'hot' | 'meeting' | 'won' | 'lost';

export interface Lead {
  id: string;
  user_id: string | null;
  client_id: string | null;
  name: string;
  title: string;
  company: string;
  industry: string;
  location: string;
  email: string;
  email_status: LeadEmailStatus;
  linkedin: string;
  website: string;
  company_size: string;
  score: number;
  source: LeadSource;
  kanban_column: LeadKanbanColumn;
  status: LeadStatus;
  notes: string | null;
  tags: string[];
  saved_at: string;
  fetched_at: string | null;
  last_touched: string | null;
}
