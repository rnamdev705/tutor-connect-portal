import { cn } from "@/lib/cn";

/** Self-hosted via @fontsource-variable/material-symbols-outlined (see layout.tsx). */
const ICON_FONT =
  '"Material Symbols Outlined Variable", "Material Symbols Outlined", sans-serif';

/** Material Symbols Outlined — use lowercase names with underscores (e.g. arrow_forward). */
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
  const style = {
    fontFamily: ICON_FONT,
    fontSize: size ? `${size}px` : undefined,
    fontVariationSettings: filled
      ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
      : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
  };

  return (
    <span
      className={cn("material-symbols-outlined normal-case", className)}
      style={style}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
      role={decorative ? undefined : "img"}
    >
      {name}
    </span>
  );
}
