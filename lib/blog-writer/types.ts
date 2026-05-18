export interface BlogWriterRun {
  id: string;
  topic: string;
  target_keywords: string[];
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  read_time: string;
  model: string;
  skill_version: string;
  created_at: string;
}

export interface KeywordGap {
  topic: string;
  keywords: string[];
  search_volume_estimate: 'high' | 'medium' | 'low';
  relevance_score: number; // 1-10
}

export interface BlogPerformance {
  post_id: string;
  title: string;
  views_7d: number;
  views_30d: number;
  avg_time_seconds: number;
  seo_score: number | null;
}

export interface BlogWriterSkillConfig {
  system_prompt: string;
  performance_context: string;
  version: string;
  model: string;
  temperature: number;
  max_tokens: number;
}

export interface BlogGenerationInput {
  topic: string;
  target_keywords: string[];
  category?: string;
  existing_posts: { title: string; slug: string; category: string }[];
  performance_context?: string;
}

export interface BlogGenerationOutput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  read_time: string;
  target_keywords: string[];
}
