import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6",
        hover && "hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.03)] transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
