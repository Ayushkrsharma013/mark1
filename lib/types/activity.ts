export type ActivityStatus = 'success' | 'error' | 'running';

export interface ActivityItem {
  id: string;
  agent_name: string;
  action: string;
  timestamp: string;
  status: ActivityStatus;
  duration_ms?: number;
}
