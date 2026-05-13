import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ label, value, change, trend, icon, className }: Props) {
  return (
    <div className={cn(
      "rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 hover:border-[rgba(255,255,255,0.10)] transition-all duration-300",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium text-[#71717a] uppercase tracking-wider">{label}</div>
          <div className="text-2xl font-bold text-white mt-1">{value}</div>
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-[rgba(0,212,255,0.08)] flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      {change && (
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={cn(
              "text-xs font-medium",
              trend === "up" && "text-[#00ff88]",
              trend === "down" && "text-red-400",
              trend === "neutral" && "text-[#a1a1aa]"
            )}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {change}
          </span>
          <span className="text-xs text-[#52525b]">vs last month</span>
        </div>
      )}
    </div>
  );
}
