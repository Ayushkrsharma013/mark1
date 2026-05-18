'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Plus, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  agent: string;
  due: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

const STORAGE_KEY = 'cc_tasks';

const FILTERS = ['All', 'Pending', 'Completed', 'Overdue'] as const;
type Filter = (typeof FILTERS)[number];

function loadTasks(): Task[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getDemoTasks();
  } catch {
    return getDemoTasks();
  }
}

function saveTasks(tasks: Task[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function getDemoTasks(): Task[] {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  return [
    { id: 't1', title: 'Review lead scoring model', agent: 'Lead Qualifier', due: today, priority: 'high', completed: false },
    { id: 't2', title: 'Update outreach templates', agent: 'Outreach Sequencer', due: tomorrow, priority: 'medium', completed: false },
    { id: 't3', title: 'Audit CRM sync errors', agent: 'Data Cleaner', due: yesterday, priority: 'high', completed: false },
    { id: 't4', title: 'Approve blog drafts', agent: 'Content Scheduler', due: today, priority: 'low', completed: true },
    { id: 't5', title: 'Check Slack integration', agent: 'Support Bot', due: tomorrow, priority: 'medium', completed: false },
  ];
}

export function RecentTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('All');
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const addTask = useCallback(() => {
    if (!newTitle.trim()) return;
    const task: Task = {
      id: `t-${Date.now()}`,
      title: newTitle.trim(),
      agent: 'Custom',
      due: new Date().toISOString().split('T')[0],
      priority: 'medium',
      completed: false,
    };
    setTasks((prev) => [task, ...prev]);
    setNewTitle('');
    setAdding(false);
  }, [newTitle]);

  const isOverdue = (task: Task) => !task.completed && task.due < new Date().toISOString().split('T')[0];

  const filtered = tasks.filter((t) => {
    if (filter === 'Pending') return !t.completed;
    if (filter === 'Completed') return t.completed;
    if (filter === 'Overdue') return isOverdue(t);
    return true;
  });

  const priorityColor = (p: Task['priority']) =>
    p === 'high' ? 'bg-white' : p === 'medium' ? 'bg-white/60' : 'bg-white/30';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.4 }}
      className="rounded-[14px] border border-[var(--cc-border)] bg-[#0A0A0A] p-6 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-white">Recent Tasks</h3>
        <div className="flex items-center gap-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'text-[10px] font-medium rounded-md px-2 py-1 transition-colors',
                filter === f
                  ? 'bg-[rgba(255,255,255,0.06)] text-white'
                  : 'text-[var(--cc-text-muted)] hover:text-[var(--cc-text-secondary)]'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 pr-1" style={{ maxHeight: 280 }}>
        {filtered.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={cn(
              'flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer transition-colors group',
              'hover:bg-[#111111]'
            )}
          >
            {task.completed ? (
              <CheckCircle2 className="h-4 w-4 text-white/50 shrink-0" />
            ) : (
              <Circle className="h-4 w-4 text-[var(--cc-text-muted)] group-hover:text-white shrink-0 transition-colors" />
            )}
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  'text-sm truncate',
                  task.completed ? 'text-[var(--cc-text-muted)] line-through' : 'text-white'
                )}
              >
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-[var(--cc-text-muted)] bg-[rgba(255,255,255,0.04)] rounded px-1.5 py-0">
                  {task.agent}
                </span>
                <span
                  className={cn(
                    'text-[10px] flex items-center gap-1',
                    isOverdue(task) ? 'text-[var(--cc-text-muted)]' : 'text-[var(--cc-text-muted)]'
                  )}
                >
                  <Calendar className="h-3 w-3" />
                  {task.due}
                </span>
              </div>
            </div>
            <span className={cn('h-2 w-2 rounded-full shrink-0', priorityColor(task.priority))} />
          </div>
        ))}
      </div>

      {/* Add task */}
      <AnimatePresence>
        {adding ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2"
          >
            <div className="flex items-center gap-2">
              <input
                autoFocus
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addTask();
                  if (e.key === 'Escape') setAdding(false);
                }}
                placeholder="Task name..."
                className="flex-1 bg-[#111111] border border-[var(--cc-border)] rounded-lg px-3 py-2 text-sm text-white placeholder-[var(--cc-text-muted)] outline-none focus:border-white/30"
              />
              <button
                onClick={addTask}
                className="px-3 py-2 rounded-lg bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors"
              >
                Add
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setAdding(true)}
            className="mt-2 flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Task
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
