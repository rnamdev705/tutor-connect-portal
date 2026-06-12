import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

const variantStyles = {
  default: "bg-surface-container text-on-surface-variant",
  open: "bg-surface-container text-on-surface-variant",
  matched: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  closed: "bg-surface-container-high text-on-surface-variant",
  verified: "bg-tertiary-fixed text-on-tertiary-fixed",
  reviewing: "bg-outline-variant text-on-surface-variant",
  secure: "bg-emerald-500 text-white",
  parent: "bg-primary text-on-primary",
} as const;

export type BadgeVariant = keyof typeof variantStyles;

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  icon?: string;
  filledIcon?: boolean;
};

export function Badge({
  className,
  variant = "default",
  icon,
  filledIcon = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-label-sm font-medium",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {icon && <Icon name={icon} size={14} filled={filledIcon} />}
      {children}
    </span>
  );
}
