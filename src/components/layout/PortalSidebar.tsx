import Image from "next/image";
import Link from "next/link";
import { Button, Icon } from "@/components/ui";
import { cn } from "@/lib/cn";

type SidebarItem = "dashboard" | "cases" | "profile" | "documents";

type PortalSidebarProps = {
  active?: SidebarItem;
  userImage?: string;
};

const navItems: { key: SidebarItem; label: string; icon: string; href: string }[] = [
  { key: "dashboard", label: "Dashboard", icon: "dashboard", href: "/dashboard" },
  { key: "cases", label: "Cases", icon: "assignment", href: "/cases/82910" },
  { key: "profile", label: "Profile", icon: "person", href: "#" },
  { key: "documents", label: "Documents", icon: "description", href: "#" },
];

export function PortalSidebar({
  active = "dashboard",
  userImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuACyNmVm-MlVU4ymLQoabDtnpMXjPeh7DOhldWI3nk1hsppE4IcikIKBcC32FLe95FmIonzq-Zp5TVWPt6r7MD4j_vlISHPTgmdQGNPWmtWFI6jD0d0jiybG4Os1An2DNHgdFHazSQd10hYe-P2Q6KZDkkfWu8PPOzaW99zfSeiSeeNXfGc5X8om6cMk-TQCNHZooz3VSkLxlGz7kruksLGNZlk2Rr2z0zHg8osGaNumsNTtritSGu_lvLz-lA1NmoUGybXoCYNt74",
}: PortalSidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 p-2 bg-surface-container-low border-r border-outline-variant shrink-0">
      <div className="mb-10 px-2">
        <Link href="/dashboard" className="text-headline-sm text-primary mb-1 block font-semibold">
          EduMatch
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
      <nav className="flex-1 space-y-1">
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
        <a
          href="#"
          className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-all"
        >
          <Icon name="help" />
          <span className="text-label-md">Help Center</span>
        </a>
        <Link
          href="/login"
          className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-all"
        >
          <Icon name="logout" />
          <span className="text-label-md">Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
