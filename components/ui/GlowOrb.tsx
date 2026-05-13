import { cn } from "@/lib/utils";

interface Props {
  color?: "blue" | "green" | "purple";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const colorMap = {
  blue: "from-[rgba(0,212,255,0.18)] to-transparent",
  green: "from-[rgba(0,255,136,0.14)] to-transparent",
  purple: "from-[rgba(124,58,237,0.16)] to-transparent",
};

const sizeMap = {
  sm: "w-64 h-64",
  md: "w-96 h-96",
  lg: "w-[600px] h-[600px]",
};

export function GlowOrb({ color = "blue", size = "md", className }: Props) {
  return (
    <div
      className={cn(
        "absolute rounded-full blur-3xl pointer-events-none",
        "bg-gradient-to-b",
        colorMap[color],
        sizeMap[size],
        className
      )}
      style={{ transform: "translate(-50%, -50%)" }}
    />
  );
}
