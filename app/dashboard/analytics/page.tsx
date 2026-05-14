"use client";

import { StatCard } from "@/components/command-center/shared/StatCard";
import { TrendingUp, Users, Zap, Eye } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AnalyticsPage() {

  return (
    <div className="px-6 py-6 lg:px-8 lg:py-8 space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-[#F1F5F9]">Analytics</h1>
        <p className="text-sm text-[#94A3B8] mt-1">
          Performance metrics across all your systems.
        </p>
      </div>

      {/* Date range selector */}
      <div className="flex items-center gap-2">
        {["7d", "30d", "90d", "All time"].map((range) => (
          <button
            key={range}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
              range === "30d"
                ? "border-[#6366F1] bg-[rgba(99,102,241,0.08)] text-[#6366F1]"
                : "border-[rgba(255,255,255,0.06)] text-[#475569] hover:text-[#94A3B8] hover:border-[rgba(255,255,255,0.10)]"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          label="Total Visitors"
          value="24.8K"
          delta={12}
          trend={[20, 25, 22, 30, 28, 35, 32]}
          icon={Eye}
          iconColor="#6366F1"
        />
        <StatCard
          label="Conversion Rate"
          value="3.2%"
          delta={0.5}
          trend={[2.5, 2.7, 2.8, 3.0, 3.1, 3.2, 3.2]}
          icon={TrendingUp}
          iconColor="#10B981"
        />
        <StatCard
          label="Active Users"
          value="847"
          delta={8}
          trend={[700, 720, 750, 780, 800, 830, 847]}
          icon={Users}
          iconColor="#F59E0B"
        />
        <StatCard
          label="API Calls"
          value="142K"
          delta={-2}
          trend={[150, 148, 145, 147, 144, 143, 142]}
          icon={Zap}
          iconColor="#EC4899"
        />
      </div>

      {/* Charts placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#0F1422] p-6">
          <h3 className="text-base font-semibold text-[#F1F5F9] mb-1">Traffic Overview</h3>
          <p className="text-xs text-[#475569] mb-6">Last 30 days</p>
          <div className="h-64 flex items-end gap-3 px-2">
            {[40, 55, 35, 70, 60, 80, 45, 65, 50, 75, 85, 60, 70, 55].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-[rgba(99,102,241,0.3)] to-[rgba(99,102,241,0.6)] hover:from-[rgba(99,102,241,0.5)] hover:to-[rgba(99,102,241,0.8)] transition-all cursor-pointer"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-[10px] text-[#475569]">
            {["Jun 1", "Jun 5", "Jun 10", "Jun 15", "Jun 20", "Jun 25", "Jun 30"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>

        <div className="rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#0F1422] p-6">
          <h3 className="text-base font-semibold text-[#F1F5F9] mb-1">Top Sources</h3>
          <p className="text-xs text-[#475569] mb-6">Where your traffic comes from</p>
          <div className="space-y-4">
            {[
              { name: "Direct", pct: 42, color: "bg-[#6366F1]" },
              { name: "Organic Search", pct: 28, color: "bg-[#10B981]" },
              { name: "Referral", pct: 18, color: "bg-[#8B5CF6]" },
              { name: "Social", pct: 12, color: "bg-[#F59E0B]" },
            ].map((source) => (
              <div key={source.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-[#94A3B8]">{source.name}</span>
                  <span className="text-[#F1F5F9] font-medium">{source.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${source.color} transition-all duration-500`}
                    style={{ width: `${source.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
