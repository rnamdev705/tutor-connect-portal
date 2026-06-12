import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full border border-outline-variant rounded-lg px-3 py-2 text-body-sm bg-surface-container-lowest text-on-surface",
          "focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = "Select";
