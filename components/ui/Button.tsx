import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

const variants = {
  primary:
    "bg-white text-black hover:bg-[#e4e4e7]",
  secondary:
    "border border-[rgba(255,255,255,0.15)] text-white hover:bg-[rgba(255,255,255,0.05)]",
  ghost:
    "text-[#a1a1aa] hover:text-white",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

export function Button({ href, variant = "primary", size = "md", className, children, onClick, type }: Props) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type || "button"} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
