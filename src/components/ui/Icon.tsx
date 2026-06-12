import { cn } from "@/lib/cn";

type IconProps = {
  name: string;
  className?: string;
  filled?: boolean;
  size?: number;
  /** Set false when icon conveys meaning (e.g. status). Defaults to decorative. */
  decorative?: boolean;
  label?: string;
};

export function Icon({
  name,
  className = "",
  filled = false,
  size,
  decorative = true,
  label,
}: IconProps) {
  const style = filled
    ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }
    : undefined;

  return (
    <span
      className={cn("material-symbols-outlined normal-case", className)}
      style={{ ...style, fontSize: size ? `${size}px` : undefined }}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
      role={decorative ? undefined : "img"}
    >
      {name}
    </span>
  );
}
