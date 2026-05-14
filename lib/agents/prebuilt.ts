import type { Skill } from '../skills/types';

export interface PrebuiltAgentTemplate {
  id: string;
  name: string;
  role: string;
  description: string;
  skills: string[];
  avatarColor: string;
  iconName: string;
}

export const PREBUILT_AGENTS: PrebuiltAgentTemplate[] = [
  {
    id: 'atlas',
    name: 'Atlas',
    role: 'Lead Researcher',
    description:
      'I find and enrich high-quality leads that match your Ideal Customer Profile. I score prospects, research their companies, and prepare outreach-ready contact lists.',
    skills: ['lead-research', 'lead-scraping', 'competitive-intel', 'analytics-reporting'],
    avatarColor: '#6366F1',
    iconName: 'Target',
  },
  {
    id: 'echo',
    name: 'Echo',
    role: 'Outreach Copywriter',
    description:
      'I write hyper-personalized cold emails, LinkedIn messages, and follow-up sequences that actually get replies. Every message is tailored to the prospect.',
    skills: ['outreach-copywriting', 'email-marketing', 'social-media'],
    avatarColor: '#EC4899',
    iconName: 'PenTool',
  },
  {
    id: 'closer',
    name: 'Closer',
    role: 'Sales Development Rep',
    description:
      'I help you move deals forward. I handle objections, schedule demos, draft proposals, and guide prospects to a confident "yes."',
    skills: ['sales-closing', 'lead-research', 'outreach-copywriting'],
    avatarColor: '#F59E0B',
    iconName: 'Handshake',
  },
  {
    id: 'orbit',
    name: 'Orbit',
    role: 'SEO Strategist',
    description:
      'I optimize your content for search. I do keyword research, technical audits, on-page optimization, and content briefs that rank.',
    skills: ['seo-optimization', 'content-writing', 'analytics-reporting'],
    avatarColor: '#10B981',
    iconName: 'Globe',
  },
  {
    id: 'scribe',
    name: 'Scribe',
    role: 'Content Marketer',
    description:
      'I create blogs, whitepapers, case studies, and newsletters that educate your audience and drive qualified leads.',
    skills: ['content-writing', 'seo-optimization', 'social-media', 'email-marketing'],
    avatarColor: '#8B5CF6',
    iconName: 'FileText',
  },
  {
    id: 'pulse',
    name: 'Pulse',
    role: 'Social Media Manager',
    description:
      'I create engaging social content, manage your posting schedule, and grow your brand presence across LinkedIn, X, and Instagram.',
    skills: ['social-media', 'content-writing', 'analytics-reporting', 'ad-management'],
    avatarColor: '#06B6D4',
    iconName: 'Share2',
  },
  {
    id: 'spark',
    name: 'Spark',
    role: 'Ad Campaign Manager',
    description:
      'I manage your paid acquisition. I write ad copy, design targeting strategies, run A/B tests, and optimize for ROAS.',
    skills: ['ad-management', 'analytics-reporting', 'competitive-intel', 'email-marketing'],
    avatarColor: '#EF4444',
    iconName: 'Flame',
  },
  {
    id: 'flow',
    name: 'Flow',
    role: 'Email Marketing Specialist',
    description:
      'I design drip campaigns, newsletters, and automation flows that nurture leads from first touch to closed deal.',
    skills: ['email-marketing', 'outreach-copywriting', 'analytics-reporting', 'customer-success'],
    avatarColor: '#14B8A6',
    iconName: 'Mail',
  },
  {
    id: 'lens',
    name: 'Lens',
    role: 'Competitive Intelligence Analyst',
    description:
      'I track your competitors, analyze their positioning and pricing, and identify market gaps you can exploit.',
    skills: ['competitive-intel', 'lead-research', 'analytics-reporting', 'seo-optimization'],
    avatarColor: '#A855F7',
    iconName: 'ScanEye',
  },
  {
    id: 'nexus',
    name: 'Nexus',
    role: 'Revenue Operations Analyst',
    description:
      'I optimize your revenue engine. I audit CRM hygiene, analyze pipeline velocity, build forecasts, and fix process bottlenecks.',
    skills: ['revenue-ops', 'analytics-reporting', 'lead-research', 'sales-closing'],
    avatarColor: '#F97316',
    iconName: 'BarChart3',
  },
];
