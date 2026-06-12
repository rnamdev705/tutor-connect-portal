import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string;
  label: string;
  filled?: boolean;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, filled, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={cn(
          "inline-flex items-center justify-center rounded-full p-2 text-on-surface-variant",
          "hover:text-primary hover:bg-surface-variant transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30",
          className,
        )}
        {...props}
      >
        <Icon name={icon} filled={filled} decorative />
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
