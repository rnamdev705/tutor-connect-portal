import Image from "next/image";
import Link from "next/link";
import { Button, Icon } from "@/components/ui";
import { BRAND_NAME, DEFAULT_CASE_ID, DEFAULT_USER_AVATAR, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/cn";

type SidebarItem = "dashboard" | "cases" | "profile" | "documents";

type PortalSidebarProps = {
  active?: SidebarItem;
  userImage?: string;
};

const navItems: { key: SidebarItem; label: string; icon: string; href: string }[] = [
  { key: "dashboard", label: "Dashboard", icon: "dashboard", href: ROUTES.dashboard },
  { key: "cases", label: "Cases", icon: "assignment", href: ROUTES.case(DEFAULT_CASE_ID) },
  { key: "profile", label: "Profile", icon: "person", href: ROUTES.dashboard },
  { key: "documents", label: "Documents", icon: "description", href: ROUTES.dashboard },
];

export function PortalSidebar({
  active = "dashboard",
  userImage = DEFAULT_USER_AVATAR,
}: PortalSidebarProps) {
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
            <p className="text-label-md text-on-surface">Welcome back</p>
            <p className="text-body-sm text-on-surface-variant">Verified Member</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1" aria-label="Sidebar">
        {navItems.map((item) => (
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
        <Button shape="pill" fullWidth className="mb-2">
          Post a Case
        </Button>
        <span className="flex items-center gap-3 p-3 text-on-surface-variant rounded-xl">
          <Icon name="help" />
          <span className="text-label-md">Help Center</span>
        </span>
        <Link
          href={ROUTES.login}
          className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-all"
        >
          <Icon name="logout" />
          <span className="text-label-md">Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
