import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Label } from "@/components/ui/Label";

export type FieldProps = {
  label?: string;
  htmlFor?: string;
  labelUppercase?: boolean;
  labelSize?: "sm" | "md";
  hint?: ReactNode;
  error?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function Field({
  label,
  htmlFor,
  labelUppercase = false,
  labelSize = "md",
  hint,
  error,
  action,
  className,
  children,
}: FieldProps) {
  const hintId = hint || error ? `${htmlFor}-hint` : undefined;

  return (
    <div className={cn("space-y-1", className)}>
      {(label || action) && (
        <div className={cn("flex items-center", action ? "justify-between px-1" : "")}>
          {label && htmlFor && (
            <Label htmlFor={htmlFor} uppercase={labelUppercase} size={labelSize} className="ml-1">
              {label}
            </Label>
          )}
          {label && !htmlFor && (
            <span className="text-label-md text-on-surface-variant ml-1">{label}</span>
          )}
          {action}
        </div>
      )}
      {children}
      {hint && (
        <p id={hintId} className="text-body-sm text-on-surface-variant">
          {hint}
        </p>
      )}
      {error && (
        <p id={hintId} className="text-body-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
