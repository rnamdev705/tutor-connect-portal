"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Icon, IconButton, Input } from "@/components/ui";
import { useAuth } from "@/lib/auth/AuthProvider";
import { BRAND_NAME, DEFAULT_USER_AVATAR, ROUTES } from "@/lib/constants";

type NavItem = "browse" | "tutors" | "cases" | "profile";

type PortalHeaderProps = {
  active?: NavItem;
  casesHref?: string;
  userImage?: string;
};

export function PortalHeader({
  active = "tutors",
  casesHref,
  userImage = DEFAULT_USER_AVATAR,
}: PortalHeaderProps) {
  const { user, logout } = useAuth();
  const isParent = user?.role === "PARENT";
  const isTutor = user?.role === "TUTOR";

  const navLinks: { key: NavItem; label: string; href: string; show: boolean }[] = [
    { key: "browse", label: "Browse Cases", href: ROUTES.dashboard, show: true },
    { key: "tutors", label: "Tutor Directory", href: ROUTES.tutors, show: isParent },
    { key: "profile", label: "My Profile", href: ROUTES.profile, show: isTutor },
    {
      key: "cases",
      label: "My Cases",
      href: casesHref ?? ROUTES.dashboard,
      show: true,
    },
  ];

  return (
    <header className="bg-surface border-b border-outline-variant shadow-sm sticky top-0 z-50">
      <nav
        className="flex justify-between items-center w-full px-6 max-w-7xl mx-auto h-16"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-10">
          <Link href={ROUTES.dashboard} className="text-headline-md font-bold text-primary">
            {BRAND_NAME}
          </Link>
          <div className="hidden md:flex gap-6">
            {navLinks
              .filter((link) => link.show)
              .map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={
                    active === link.key
                      ? "text-label-md text-secondary border-b-2 border-secondary pb-1"
                      : "text-label-md text-on-surface-variant hover:text-primary transition-colors"
                  }
                >
                  {link.label}
                </Link>
              ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-surface-container-low px-3 py-1 rounded-full border border-outline-variant">
            <Icon name="search" className="text-on-surface-variant mr-1" />
            <Input
              aria-label="Quick search"
              inputClassName="border-none bg-transparent h-8 p-0 w-48 shadow-none focus:ring-0"
              placeholder="Quick search..."
              type="search"
            />
          </div>
          <span className="hidden sm:inline text-label-sm text-on-surface-variant uppercase">
            {user?.role ?? ""}
          </span>
          <IconButton icon="notifications" label="Notifications" />
          <button
            type="button"
            onClick={() => logout()}
            className="hidden sm:inline-flex"
          >
            <Button type="button" variant="outline" size="sm" uppercase>
              Sign out
            </Button>
          </button>
          <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden relative">
            <Image src={userImage} alt="User profile" fill className="object-cover" />
          </div>
        </div>
      </nav>
    </header>
  );
}
