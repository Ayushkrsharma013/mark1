export interface MetricValue {
  value: number;
  delta: number;
  trend: number[];
}

export interface LiveMetrics {
  leads_generated: MetricValue;
  active_agents: MetricValue;
  tasks_completed: MetricValue;
  hours_saved: MetricValue;
}

export interface PipelineDay {
  date: string;
  scraped: number;
  qualified: number;
  contacted: number;
  responded: number;
}
