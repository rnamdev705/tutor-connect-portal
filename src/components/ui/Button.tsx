import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

const variantStyles = {
  primary:
    "bg-primary text-on-primary hover:opacity-90 active:scale-[0.98]",
  secondary:
    "bg-secondary text-on-secondary hover:bg-secondary-container active:scale-[0.98] shadow-lg shadow-secondary/20",
  outline:
    "border border-secondary text-secondary hover:bg-secondary-container hover:text-on-secondary-container",
  "outline-neutral":
    "border border-outline-variant text-on-surface hover:bg-surface-container-low",
  ghost: "text-on-surface-variant hover:bg-surface-variant hover:text-on-surface",
  success:
    "bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary-fixed",
} as const;

const sizeStyles = {
  sm: "h-9 px-4 text-label-sm",
  md: "h-12 px-6 text-label-md",
  lg: "h-14 px-6 text-label-md",
  icon: "h-10 w-10 p-0",
} as const;

const shapeStyles = {
  default: "rounded-lg",
  xl: "rounded-xl",
  pill: "rounded-full",
  none: "rounded-none",
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;
export type ButtonShape = keyof typeof shapeStyles;

export type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
  uppercase?: boolean;
  className?: string;
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleProps;

export function buttonClassName({
  variant = "secondary",
  size = "md",
  shape = "default",
  fullWidth = false,
  uppercase = false,
  className,
}: ButtonStyleProps) {
  return cn(
    "inline-flex items-center justify-center gap-2 font-medium transition-all disabled:opacity-70 disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    shapeStyles[shape],
    fullWidth && "w-full",
    uppercase && "uppercase tracking-widest",
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "secondary",
      size = "md",
      shape = "default",
      fullWidth = false,
      uppercase = false,
      type = "button",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={buttonClassName({ variant, size, shape, fullWidth, uppercase, className })}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
