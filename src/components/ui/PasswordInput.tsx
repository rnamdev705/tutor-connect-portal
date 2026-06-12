"use client";

import { forwardRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { baseInputStyles, getInputPadding, inputVariantStyles } from "./inputStyles";
import type { InputProps } from "./Input";

export type PasswordInputProps = Omit<InputProps, "type" | "rightElement">;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, variant = "default", leftIcon, inputClassName, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

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
          type={showPassword ? "text" : "password"}
          className={cn(
            baseInputStyles,
            inputVariantStyles[variant],
            getInputPadding({ leftIcon, hasRightSlot: true }),
            inputClassName,
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-primary transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <Icon name={showPassword ? "visibility_off" : "visibility"} size={20} />
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
