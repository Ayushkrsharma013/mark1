'use client';

import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <div className="h-12 w-12 rounded-full bg-[rgba(255,255,255,0.04)] flex items-center justify-center mb-4">
        <Icon className="h-5 w-5 text-[#475569]" />
      </div>
      <h3 className="text-sm font-semibold text-[#94A3B8] mb-1">{title}</h3>
      <p className="text-xs text-[#475569] max-w-[240px] mb-4">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="text-xs font-medium text-[#6366F1] hover:text-[#818CF8] transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
