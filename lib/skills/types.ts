export type SkillCategory =
  | 'lead-gen'
  | 'sales'
  | 'content'
  | 'seo'
  | 'social'
  | 'ads'
  | 'email'
  | 'analytics'
  | 'operations'
  | 'research';

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  systemPrompt: string;
  triggers: string[];
  dependencies: string[];
  tools: string[];
}

export interface SkillRegistry {
  skills: Skill[];
  getById(id: string): Skill | undefined;
  getByCategory(category: SkillCategory): Skill[];
  composeSystemPrompt(skillIds: string[], role: string, name: string): string;
}
