"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  Bot,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
  Activity,
  AlertCircle,
} from "lucide-react";
import { useActivityFeed } from "@/hooks/useActivityFeed";
import type { ActivityStatus } from "@/lib/types/activity";

const STATUS_CONFIG: Record<
  ActivityStatus,
  { icon: typeof CheckCircle2; color: string; bg: string; label: string }
> = {
  success: {
    icon: CheckCircle2,
    color: "text-[#10B981]",
    bg: "bg-[rgba(16,185,129,0.08)]",
    label: "Success",
  },
  error: {
    icon: XCircle,
    color: "text-[#EF4444]",
    bg: "bg-[rgba(239,68,68,0.08)]",
    label: "Error",
  },
  running: {
    icon: Loader2,
    color: "text-[#F59E0B]",
    bg: "bg-[rgba(245,158,11,0.08)]",
    label: "Running",
  },
};

export default function ActivityPage() {
  const { data, isLoading, error, refetch } = useActivityFeed();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [userScrolled, setUserScrolled] = useState(false);

  // Auto-scroll to top when new items arrive (if enabled)
  useEffect(() => {
    if (autoScroll && scrollRef.current && !userScrolled) {
      scrollRef.current.scrollTop = 0;
    }
  }, [data, autoScroll, userScrolled]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop } = scrollRef.current;
    if (scrollTop > 20) {
      setUserScrolled(true);
      setAutoScroll(false);
    }
  };

  const resumeAutoScroll = () => {
    setUserScrolled(false);
    setAutoScroll(true);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="px-6 py-6 lg:px-8 lg:py-8 space-y-6">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
        <div>
          <h1 className="text-2xl font-semibold text-[#F1F5F9]">
            Activity Log
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Real-time events from all your agents and workflows.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!autoScroll && (
            <button
              onClick={resumeAutoScroll}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6366F1] bg-[rgba(99,102,241,0.08)] hover:bg-[rgba(99,102,241,0.12)] px-3 py-1.5 rounded-lg transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              Resume Live
            </button>
          )}
          <button
            onClick={refetch}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#94A3B8] hover:text-[#F1F5F9] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.10)] px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Events",
            value: data.length,
            icon: Activity,
            color: "#6366F1",
          },
          {
            label: "Successful",
            value: data.filter((d) => d.status === "success").length,
            icon: CheckCircle2,
            color: "#10B981",
          },
          {
            label: "Errors",
            value: data.filter((d) => d.status === "error").length,
            icon: XCircle,
            color: "#EF4444",
          },
          {
            label: "Running",
            value: data.filter((d) => d.status === "running").length,
            icon: Loader2,
            color: "#F59E0B",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#0F1422] p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon
                className="h-4 w-4"
                style={{ color: stat.color }}
              />
              <span className="text-xs text-[#94A3B8]">{stat.label}</span>
            </div>
            <p className="text-xl font-semibold text-[#F1F5F9]">
              {isLoading && data.length === 0 ? (
                <span className="inline-block h-5 w-8 animate-pulse bg-[rgba(255,255,255,0.05)] rounded" />
              ) : (
                stat.value
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-[14px] border border-[rgba(239,68,68,0.15)] bg-[rgba(239,68,68,0.04)] p-4 flex items-center gap-3">
          <AlertCircle className="h-4 w-4 text-[#EF4444] shrink-0" />
          <p className="text-sm text-[#F1F5F9]">{error}</p>
        </div>
      )}

      {/* Activity feed */}
      <div className="rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#0F1422] overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="max-h-[calc(100vh-340px)] overflow-y-auto"
        >
          {isLoading && data.length === 0 ? (
            <div className="space-y-0 divide-y divide-[rgba(255,255,255,0.04)]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 px-5 py-4"
                >
                  <div className="h-8 w-8 rounded-lg bg-[rgba(255,255,255,0.03)] animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-3/4 animate-pulse bg-[rgba(255,255,255,0.03)] rounded" />
                    <div className="h-3 w-1/3 animate-pulse bg-[rgba(255,255,255,0.03)] rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <Activity className="h-10 w-10 text-[#475569] mb-4" />
              <h3 className="text-base font-semibold text-[#F1F5F9] mb-1">
                No activity yet
              </h3>
              <p className="text-sm text-[#94A3B8] max-w-sm">
                Events from your agents and workflows will appear here as they
                run.
              </p>
            </div>
          ) : (
            <div className="space-y-0 divide-y divide-[rgba(255,255,255,0.04)]">
              <AnimatePresence initial={false}>
                {data.map((item) => {
                  const config = STATUS_CONFIG[item.status];
                  const StatusIcon = config.icon;
                  const timeAgo = formatDistanceToNow(
                    new Date(item.timestamp),
                    { addSuffix: true }
                  );

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-start gap-4 px-5 py-4 hover:bg-[rgba(255,255,255,0.02)] transition-colors group"
                    >
                      {/* Status icon */}
                      <div
                        className={`h-9 w-9 rounded-lg ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}
                      >
                        <StatusIcon
                          className={`h-4 w-4 ${config.color} ${item.status === "running" ? "animate-spin" : ""}`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm text-[#F1F5F9] font-medium truncate">
                            {item.agent_name}
                          </p>
                          <span
                            className={`shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${config.bg} ${config.color}`}
                          >
                            {config.label}
                          </span>
                        </div>
                        <p className="text-sm text-[#94A3B8]">
                          {item.action}
                        </p>
                        {item.duration_ms && (
                          <p className="text-[11px] text-[#475569] mt-1">
                            Completed in {item.duration_ms}ms
                          </p>
                        )}
                      </div>

                      {/* Time */}
                      <span className="text-[11px] text-[#475569] whitespace-nowrap mt-1 group-hover:text-[#94A3B8] transition-colors">
                        {timeAgo}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
