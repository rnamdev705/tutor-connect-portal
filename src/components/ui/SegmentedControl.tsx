"use client";

import { cn } from "@/lib/cn";

export type SegmentOption<T extends string> = {
  value: T;
  label: string;
};

export type SegmentedControlProps<T extends string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  shape?: "pill" | "rounded";
  activeVariant?: "secondary" | "secondary-container";
  className?: string;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  shape = "pill",
  activeVariant = "secondary",
  className,
}: SegmentedControlProps<T>) {
  const activeStyles =
    activeVariant === "secondary"
      ? "bg-secondary text-on-secondary shadow-sm"
      : "bg-secondary-container text-on-secondary-container shadow-sm";

  return (
    <div
      className={cn(
        "flex bg-surface-container-low p-1 border border-outline-variant",
        shape === "pill" ? "rounded-full" : "rounded-xl gap-2",
        className,
      )}
      role="tablist"
    >
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex-1 py-2 px-6 text-label-md transition-all",
              shape === "pill" ? "rounded-full" : "rounded-lg",
              isActive ? activeStyles : "text-on-surface-variant hover:text-primary hover:bg-surface-variant",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
