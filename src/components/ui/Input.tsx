"use client";

import { InputHTMLAttributes, ReactNode, forwardRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

const inputStyles =
  "w-full border border-outline-variant bg-surface text-body-md text-on-surface placeholder:text-on-surface-variant/30 transition-all outline-none disabled:opacity-60";

const variantStyles = {
  default: "h-12 px-6 rounded-lg form-input-focus",
  auth: "py-3 bg-surface-container-lowest rounded-xl input-focus-ring",
} as const;

export type InputVariant = keyof typeof variantStyles;

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  variant?: InputVariant;
  leftIcon?: string;
  rightElement?: ReactNode;
  inputClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      leftIcon,
      rightElement,
      inputClassName,
      type = "text",
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const resolvedType = isPassword && showPassword ? "text" : type;

    const paddingLeft = leftIcon ? "pl-12" : variant === "auth" ? "pl-4" : "px-6";
    const paddingRight =
      isPassword || rightElement ? "pr-12" : variant === "auth" ? "pr-4" : "px-6";

    return (
      <div className={cn("relative", className)}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none"
          />
        )}
        <input
          ref={ref}
          type={resolvedType}
          className={cn(inputStyles, variantStyles[variant], paddingLeft, paddingRight, inputClassName)}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-primary transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon name={showPassword ? "visibility_off" : "visibility"} size={20} />
          </button>
        )}
        {!isPassword && rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
