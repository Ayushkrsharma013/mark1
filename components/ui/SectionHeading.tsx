import { cn } from "@/lib/utils";

interface Props {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
}

export function SectionHeading({ label, title, description, className, align = "center" }: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#00d4ff] mb-4">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-[#a1a1aa] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
