import { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: ReactNode;
  labelClassName?: string;
};

export function Checkbox({ label, labelClassName, className, id, ...props }: CheckboxProps) {
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        className={cn(
          "mt-1 rounded text-secondary border-outline-variant focus:ring-secondary cursor-pointer w-4 h-4",
          className,
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn("text-body-sm text-on-surface-variant cursor-pointer select-none", labelClassName)}
      >
        {label}
      </label>
    </div>
  );
}
