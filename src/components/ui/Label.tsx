import { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  uppercase?: boolean;
  size?: "sm" | "md";
};

export function Label({
  className,
  uppercase = false,
  size = "md",
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        "text-on-surface-variant",
        size === "sm" ? "text-label-sm" : "text-label-md",
        uppercase && "uppercase tracking-wider",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}
