import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import type { CaseStatus } from "@/lib/types/domain";

const statusStyles: Record<CaseStatus, string> = {
  Open: "bg-surface-container text-on-surface-variant",
  Matched: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  Closed: "bg-surface-container-high text-on-surface-variant",
};

const variantStyles = {
  default: "bg-surface-container text-on-surface-variant",
  verified: "bg-tertiary-fixed text-on-tertiary-fixed",
  reviewing: "bg-outline-variant text-on-surface-variant",
  secure: "bg-tertiary-fixed text-on-tertiary-fixed",
  parent: "bg-primary-container text-on-primary-container",
  matched: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
} as const;

export type BadgeVariant = keyof typeof variantStyles;

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  status?: CaseStatus;
  icon?: string;
  filledIcon?: boolean;
};

export function Badge({
  className,
  variant = "default",
  status,
  icon,
  filledIcon = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-label-sm font-medium",
        status ? statusStyles[status] : variantStyles[variant],
        className,
      )}
      {...props}
    >
      {icon && <Icon name={icon} size={14} filled={filledIcon} />}
      {children}
    </span>
  );
}
