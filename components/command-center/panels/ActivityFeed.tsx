'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, Activity, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useActivityFeed } from '@/hooks/useActivityFeed';
import { LiveDot } from '../shared/LiveDot';
import type { ActivityStatus } from '@/lib/types/activity';

const STATUS_ICONS: Record<ActivityStatus, React.ReactNode> = {
  success: <CheckCircle2 className="h-3.5 w-3.5 text-white/70" />,
  error: <XCircle className="h-3.5 w-3.5 text-[var(--cc-text-muted)]" />,
  running: <Loader2 className="h-3.5 w-3.5 text-white/70 animate-spin" />,
};

export function ActivityFeed() {
  const { data, isLoading, error, clear } = useActivityFeed();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [data, autoScroll]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const nearBottom = scrollHeight - scrollTop - clientHeight < 40;
    setAutoScroll(nearBottom);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.32 }}
      className="rounded-[14px] border border-[var(--cc-border)] bg-[#0A0A0A] p-6 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-white">Live Activity</h3>
          <LiveDot status="active" size={6} />
          {error && (
            <span className="text-[10px] text-white/70 bg-[rgba(255,255,255,0.04)] rounded-full px-2 py-0.5">
              Offline
            </span>
          )}
        </div>
        <button
          onClick={clear}
          className="p-1.5 rounded-md text-[var(--cc-text-muted)] hover:text-white/70 hover:bg-[rgba(255,255,255,0.04)] transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto space-y-1 pr-1"
        style={{ maxHeight: 320 }}
      >
        {isLoading && data.length === 0 ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 rounded-lg bg-[rgba(255,255,255,0.03)] animate-pulse" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Activity className="h-8 w-8 text-[var(--cc-text-muted)] mb-3" />
            <p className="text-sm text-[var(--cc-text-secondary)]">No activity yet</p>
            <p className="text-xs text-[var(--cc-text-muted)] mt-1">Agents will log executions here.</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {data.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2.5 px-2 py-2 rounded-lg hover:bg-[#111111] transition-colors"
              >
                <div className="mt-0.5 shrink-0">{STATUS_ICONS[item.status]}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">
                    <span className="font-medium">{item.agent_name}</span>{' '}
                    <span className="text-[var(--cc-text-secondary)]">{item.action}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-[var(--cc-text-muted)]" title={item.timestamp}>
                      {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                    </span>
                    {item.duration_ms && (
                      <span className="text-[10px] text-[var(--cc-text-muted)] bg-[rgba(255,255,255,0.04)] rounded px-1.5 py-0">
                        {(item.duration_ms / 1000).toFixed(1)}s
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
