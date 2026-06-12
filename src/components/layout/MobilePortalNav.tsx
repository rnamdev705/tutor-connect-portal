"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthProvider";
import { BRAND_NAME, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/cn";
import type { SidebarItem } from "./PortalSidebar";

type MobilePortalNavProps = {
  active: SidebarItem;
};

export function MobilePortalNav({ active }: MobilePortalNavProps) {
  const { user } = useAuth();
  const isParent = user?.role === "PARENT";

  const items: { key: SidebarItem; label: string; href: string; show: boolean }[] = [
    { key: "dashboard", label: "Dashboard", href: ROUTES.dashboard, show: true },
    {
      key: "cases",
      label: isParent ? "Create" : "Cases",
      href: isParent ? ROUTES.cases : ROUTES.dashboard,
      show: true,
    },
    { key: "tutors", label: "Tutors", href: ROUTES.tutors, show: isParent },
    { key: "profile", label: "Profile", href: ROUTES.profile, show: true },
  ];

  return (
    <div className="md:hidden border-b border-outline-variant bg-surface sticky top-0 z-40">
      <div className="px-4 py-3 font-semibold text-primary">{BRAND_NAME}</div>
      <nav className="flex gap-1 overflow-x-auto px-2 pb-2" aria-label="Mobile navigation">
        {items
          .filter((i) => i.show)
          .map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "shrink-0 px-4 py-2 rounded-full text-label-sm",
                active === item.key
                  ? "bg-secondary text-on-secondary font-semibold"
                  : "bg-surface-container-low text-on-surface-variant",
              )}
            >
              {item.label}
            </Link>
          ))}
      </nav>
    </div>
  );
}
