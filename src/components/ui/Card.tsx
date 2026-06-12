import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const variantStyles = {
  default: "bg-surface-container-lowest border border-outline-variant card-shadow",
  glass: "glass-card",
  profile: "bg-surface-container-lowest profile-card",
  flat: "bg-white border border-slate-200 shadow-[0px_4px_12px_rgba(15,23,42,0.05)]",
} as const;

export type CardVariant = keyof typeof variantStyles;

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  accent?: string;
  padding?: "none" | "sm" | "md" | "lg";
};

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-6",
  lg: "p-10",
};

export function Card({
  className,
  variant = "default",
  accent,
  padding = "md",
  children,
  ...props
}: CardProps) {
  if (accent) {
    return (
      <div
        className={cn(
          variantStyles[variant],
          "rounded-xl overflow-hidden flex",
          className,
        )}
        {...props}
      >
        <div className={cn("w-2 shrink-0", accent)} />
        <div className={cn("flex-1", paddingStyles[padding])}>{children}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(variantStyles[variant], "rounded-xl", paddingStyles[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
}
