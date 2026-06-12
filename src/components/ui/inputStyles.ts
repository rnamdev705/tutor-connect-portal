export const baseInputStyles =
  "w-full border border-outline-variant bg-surface text-body-md text-on-surface placeholder:text-on-surface-variant/30 transition-all outline-none disabled:opacity-60 form-input-focus";

export const inputVariantStyles = {
  default: "h-12 rounded-lg",
  auth: "py-3 bg-surface-container-lowest rounded-xl input-focus-ring",
} as const;

export type InputVariant = keyof typeof inputVariantStyles;

export function getInputPadding({
  leftIcon,
  hasRightSlot,
}: {
  leftIcon?: string;
  hasRightSlot: boolean;
}) {
  if (leftIcon && hasRightSlot) return "pl-12 pr-12";
  if (leftIcon) return "pl-12 pr-4";
  if (hasRightSlot) return "pl-4 pr-12";
  return "px-4";
}
