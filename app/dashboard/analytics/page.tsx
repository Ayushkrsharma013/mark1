import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { StatCard } from "@/components/dashboard/StatCard";
import { TrendingUp, Users, Zap, Eye, ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Analytics</h1>
        <p className="text-[#71717a] mt-1">
          Performance metrics across all your systems.
        </p>
      </div>

      {/* Date range selector */}
      <div className="flex items-center gap-2 mb-8">
        {["7d", "30d", "90d", "All time"].map((range) => (
          <button
            key={range}
            className={`text-sm px-4 py-2 rounded-full border transition-all ${
              range === "30d"
                ? "border-[#00d4ff] bg-[rgba(0,212,255,0.08)] text-[#00d4ff]"
                : "border-[rgba(255,255,255,0.06)] text-[#71717a] hover:text-white hover:border-[rgba(255,255,255,0.12)]"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard label="Total Visitors" value="24.8K" change="+12%" trend="up" icon={<Eye className="h-5 w-5 text-[#00d4ff]" />} />
        <StatCard label="Conversion Rate" value="3.2%" change="+0.5%" trend="up" icon={<TrendingUp className="h-5 w-5 text-[#00ff88]" />} />
        <StatCard label="Active Users" value="847" change="+8%" trend="up" icon={<Users className="h-5 w-5 text-[#7c3aed]" />} />
        <StatCard label="API Calls" value="142K" change="-2%" trend="down" icon={<Zap className="h-5 w-5 text-[#ff6b35]" />} />
      </div>

      {/* Charts placeholder */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Traffic Overview</h3>
          <p className="text-xs text-[#52525b] mb-6">Last 30 days</p>
          <div className="h-64 flex items-end gap-3 px-2">
            {[40, 55, 35, 70, 60, 80, 45, 65, 50, 75, 85, 60, 70, 55].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-[rgba(0,212,255,0.3)] to-[rgba(0,212,255,0.6)] hover:from-[rgba(0,212,255,0.5)] hover:to-[rgba(0,212,255,0.8)] transition-all cursor-pointer"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-[10px] text-[#52525b]">
            {["Jun 1", "Jun 5", "Jun 10", "Jun 15", "Jun 20", "Jun 25", "Jun 30"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Top Sources</h3>
          <p className="text-xs text-[#52525b] mb-6">Where your traffic comes from</p>
          <div className="space-y-4">
            {[
              { name: "Direct", pct: 42, color: "bg-[#00d4ff]" },
              { name: "Organic Search", pct: 28, color: "bg-[#00ff88]" },
              { name: "Referral", pct: 18, color: "bg-[#7c3aed]" },
              { name: "Social", pct: 12, color: "bg-[#ff6b35]" },
            ].map((source) => (
              <div key={source.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-[#a1a1aa]">{source.name}</span>
                  <span className="text-white font-medium">{source.pct}%</span>
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
