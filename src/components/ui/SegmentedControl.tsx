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
  name?: string;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  shape = "pill",
  activeVariant = "secondary",
  className,
  name = "segmented-control",
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
      role="radiogroup"
    >
      {options.map((option) => {
        const isActive = value === option.value;
        const inputId = `${name}-${option.value}`;

        return (
          <label
            key={option.value}
            htmlFor={inputId}
            className={cn(
              "flex-1 py-2 px-6 text-label-md transition-all text-center cursor-pointer",
              shape === "pill" ? "rounded-full" : "rounded-lg",
              isActive
                ? activeStyles
                : "text-on-surface-variant hover:text-primary hover:bg-surface-variant",
            )}
          >
            <input
              id={inputId}
              type="radio"
              name={name}
              value={option.value}
              checked={isActive}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
