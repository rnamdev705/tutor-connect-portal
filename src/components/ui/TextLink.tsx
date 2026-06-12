import Link from "next/link";
import { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BaseProps = {
  className?: string;
  children: React.ReactNode;
};

type TextLinkAsLink = BaseProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

type TextLinkAsButton = BaseProps & {
  href?: undefined;
  onClick?: () => void;
};

export type TextLinkProps = TextLinkAsLink | TextLinkAsButton;

export function TextLink({ className, children, ...props }: TextLinkProps) {
  const styles = cn("text-secondary font-bold hover:underline", className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={styles} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={styles} onClick={props.onClick}>
      {children}
    </button>
  );
}
