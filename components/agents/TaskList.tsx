'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle, Loader2 } from 'lucide-react';
import type { AgentTask } from '@/lib/types/agent';
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: AgentTask[];
}

const statusConfig = {
  pending: { icon: Clock, color: '#F59E0B', label: 'Pending' },
  in_progress: { icon: Loader2, color: '#6366F1', label: 'In Progress' },
  completed: { icon: CheckCircle2, color: '#10B981', label: 'Completed' },
  failed: { icon: AlertCircle, color: '#EF4444', label: 'Failed' },
};

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xs text-[#475569]">No tasks yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task, i) => {
        const config = statusConfig[task.status];
        const Icon = config.icon;

        return (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            <div className="mt-0.5">
              <Icon
                className={cn(
                  'h-4 w-4',
                  task.status === 'in_progress' && 'animate-spin'
                )}
                style={{ color: config.color }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#F1F5F9] truncate">
                {task.title}
              </p>
              <p className="text-[10px] text-[#94A3B8] mt-0.5 line-clamp-2">
                {task.description}
              </p>
              {task.result && (
                <p className="text-[10px] text-[#475569] mt-1 line-clamp-3 border-l-2 border-[rgba(255,255,255,0.08)] pl-2">
                  {task.result}
                </p>
              )}
            </div>
            <span
              className="text-[10px] font-medium shrink-0 mt-0.5"
              style={{ color: config.color }}
            >
              {config.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
