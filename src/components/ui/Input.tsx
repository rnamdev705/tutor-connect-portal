import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import {
  baseInputStyles,
  getInputPadding,
  inputVariantStyles,
  type InputVariant,
} from "./inputStyles";

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
    const hasRightSlot = Boolean(rightElement);

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
          type={type}
          className={cn(
            baseInputStyles,
            inputVariantStyles[variant],
            getInputPadding({ leftIcon, hasRightSlot }),
            inputClassName,
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
