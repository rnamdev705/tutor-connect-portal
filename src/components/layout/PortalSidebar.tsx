"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Icon } from "@/components/ui";
import { useAuth } from "@/lib/auth/AuthProvider";
import { BRAND_NAME, DEFAULT_USER_AVATAR, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/cn";

type SidebarItem = "dashboard" | "cases" | "profile" | "documents";

type PortalSidebarProps = {
  active?: SidebarItem;
  casesHref?: string;
  userImage?: string;
  onPostCase?: () => void;
};

export function PortalSidebar({
  active = "dashboard",
  casesHref = ROUTES.dashboard,
  userImage = DEFAULT_USER_AVATAR,
  onPostCase,
}: PortalSidebarProps) {
  const { user, logout } = useAuth();
  const isParent = user?.role === "PARENT";

  const navItems: { key: SidebarItem; label: string; icon: string; href: string; show: boolean }[] = [
    { key: "dashboard", label: "Dashboard", icon: "dashboard", href: ROUTES.dashboard, show: true },
    { key: "cases", label: "Cases", icon: "assignment", href: casesHref, show: true },
    {
      key: "profile",
      label: "Profile",
      icon: "person",
      href: isParent ? ROUTES.tutors : ROUTES.profile,
      show: true,
    },
    { key: "documents", label: "Documents", icon: "description", href: casesHref, show: true },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 p-2 bg-surface-container-low border-r border-outline-variant shrink-0">
      <div className="mb-10 px-2">
        <Link href={ROUTES.dashboard} className="text-headline-sm text-primary mb-1 block font-semibold">
          {BRAND_NAME}
        </Link>
        <div className="flex items-center gap-3 py-3">
          <div className="w-10 h-10 rounded-full border border-outline-variant relative overflow-hidden">
            <Image src={userImage} alt="User avatar" fill className="object-cover" />
          </div>
          <div>
            <p className="text-label-md text-on-surface truncate max-w-[140px]">
              {user?.email ?? "Welcome back"}
            </p>
            <p className="text-body-sm text-on-surface-variant">{user?.role ?? "Member"}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1" aria-label="Sidebar">
        {navItems.filter((item) => item.show).map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
              active === item.key
                ? "bg-secondary-container text-on-secondary-container font-bold active:scale-95"
                : "text-on-surface-variant hover:bg-surface-variant",
            )}
          >
            <Icon name={item.icon} />
            <span className="text-label-md">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto space-y-1">
        {isParent && (
          <Button shape="pill" fullWidth className="mb-2" onClick={onPostCase}>
            Post a Case
          </Button>
        )}
        <span className="flex items-center gap-3 p-3 text-on-surface-variant rounded-xl">
          <Icon name="help" />
          <span className="text-label-md">Help Center</span>
        </span>
        <button
          type="button"
          onClick={() => logout()}
          className="flex w-full items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-all"
        >
          <Icon name="logout" />
          <span className="text-label-md">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
