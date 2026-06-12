import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Label } from "@/components/ui/Label";

export type FieldProps = {
  label?: string;
  htmlFor?: string;
  labelUppercase?: boolean;
  labelSize?: "sm" | "md";
  hint?: ReactNode;
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
  action,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {(label || action) && (
        <div className={cn("flex items-center", action ? "justify-between px-1" : "")}>
          {label && (
            <Label htmlFor={htmlFor} uppercase={labelUppercase} size={labelSize} className="ml-1">
              {label}
            </Label>
          )}
          {action}
        </div>
      )}
      {children}
      {hint}
    </div>
  );
}
