import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type TagProps = HTMLAttributes<HTMLSpanElement>;

export function Tag({ className, children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center bg-surface-container-low px-3 py-1 rounded text-label-sm text-on-surface-variant",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
