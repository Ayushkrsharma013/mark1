export type AgentType = 'lead-gen' | 'support' | 'content' | 'outreach' | 'data' | 'custom';
export type AgentStatus = 'active' | 'paused' | 'error' | 'building';

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  status: AgentStatus;
  executions_today: number;
  success_rate: number;
  last_run: string;
  uptime_hours: number;
  n8n_workflow_id: string;
  tags: string[];
}

export type NodeType =
  | 'trigger'
  | 'action'
  | 'condition'
  | 'output';

export type TriggerKind =
  | 'webhook'
  | 'schedule'
  | 'new-row'
  | 'email'
  | 'manual';

export type ActionKind =
  | 'http-request'
  | 'ai-prompt'
  | 'send-email'
  | 'add-to-sheet'
  | 'supabase-row'
  | 'slack-message'
  | 'n8n-workflow'
  | 'webhook-call';

export type OutputKind =
  | 'send-webhook'
  | 'log-to-sheet'
  | 'notify-slack'
  | 'update-crm'
  | 'done';

export interface FlowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: {
    label: string;
    kind: TriggerKind | ActionKind | OutputKind | string;
    config: Record<string, unknown>;
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface AgentConfig {
  id?: string;
  name: string;
  description: string;
  type: AgentType;
  tags: string[];
  status: AgentStatus;
  retry_on_failure: boolean;
  max_execution_minutes: number;
  nodes: FlowNode[];
  edges: FlowEdge[];
  created_at?: string;
  updated_at?: string;
}

// New AI Employee types (chat-based agent system)
export type AIEmployeeType = 'prebuilt' | 'custom';
export type AIEmployeeStatus = 'active' | 'paused';

export interface AIEmployee {
  id: string;
  user_id: string;
  name: string;
  role: string;
  description: string;
  type: AIEmployeeType;
  status: AIEmployeeStatus;
  skills: string[];
  system_prompt: string;
  avatar_color: string;
  icon_name: string;
  auto_run: boolean;
  run_schedule: string | null;
  created_at: string;
  updated_at: string;
}

export interface AgentConversation {
  id: string;
  agent_id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface AgentTask {
  id: string;
  agent_id: string;
  user_id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  result: string | null;
  trigger: 'manual' | 'scheduled' | 'chat';
  created_at: string;
  completed_at: string | null;
}
