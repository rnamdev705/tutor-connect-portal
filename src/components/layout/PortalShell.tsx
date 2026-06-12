"use client";

import type { ReactNode } from "react";
import { MobilePortalNav } from "@/components/layout/MobilePortalNav";
import { PortalSidebar, type SidebarItem } from "@/components/layout/PortalSidebar";
import { cn } from "@/lib/cn";

type PortalShellProps = {
  active: SidebarItem;
  children: ReactNode;
  className?: string;
  mainClassName?: string;
};

export function PortalShell({
  active,
  children,
  className,
  mainClassName,
}: PortalShellProps) {
  return (
    <div className={cn("bg-background text-on-background min-h-screen flex flex-col md:flex-row", className)}>
      <MobilePortalNav active={active} />
      <PortalSidebar active={active} />
      <main className={cn("flex-1 w-full min-w-0 px-4 py-6 sm:px-6 md:px-10 md:py-10", mainClassName)}>
        <div className="max-w-6xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}
