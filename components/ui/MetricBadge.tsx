interface MetricBadgeProps {
  value: string;
  label: string;
}

export function MetricBadge({ value, label }: MetricBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]">
      <span className="text-sm font-semibold text-white">{value}</span>
      <span className="text-xs text-[#94A3B8]">{label}</span>
    </div>
  );
}
