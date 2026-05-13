interface SectionLabelProps {
  text: string;
  className?: string;
}

export function SectionLabel({ text, className }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${className || ""}`}>
      <div className="w-8 h-0.5 bg-[#6366F1] rounded-full" />
      <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#818CF8]">
        {text}
      </span>
    </div>
  );
}
