import { cn } from '@/lib/utils';

interface SkillBadgeProps {
  name: string;
  className?: string;
}

export function SkillBadge({ name, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium',
        'bg-[rgba(99,102,241,0.10)] text-[#818CF8] border border-[rgba(99,102,241,0.15)]',
        className
      )}
    >
      {name}
    </span>
  );
}
