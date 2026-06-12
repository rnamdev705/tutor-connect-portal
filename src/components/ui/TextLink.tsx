import Link from "next/link";
import { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type TextLinkProps = ComponentProps<typeof Link> & {
  className?: string;
};

export function TextLink({ className, children, ...props }: TextLinkProps) {
  return (
    <Link className={cn("text-secondary font-bold hover:underline", className)} {...props}>
      {children}
    </Link>
  );
}
