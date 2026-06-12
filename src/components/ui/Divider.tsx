import { cn } from "@/lib/cn";

export type DividerProps = {
  label?: string;
  className?: string;
};

export function Divider({ label, className }: DividerProps) {
  if (!label) {
    return <hr className={cn("border-outline-variant", className)} />;
  }

  return (
    <div className={cn("relative flex items-center", className)}>
      <div className="grow border-t border-outline-variant" />
      <span className="shrink mx-4 text-label-sm text-on-surface-variant/50 uppercase tracking-widest">
        {label}
      </span>
      <div className="grow border-t border-outline-variant" />
    </div>
  );
}
