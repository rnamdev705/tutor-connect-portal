import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

type NavItem = "browse" | "tutors" | "cases";

type PortalHeaderProps = {
  active?: NavItem;
  userImage?: string;
};

const navLinks: { key: NavItem; label: string; href: string }[] = [
  { key: "browse", label: "Browse Cases", href: "/dashboard" },
  { key: "tutors", label: "Tutor Directory", href: "/tutors" },
  { key: "cases", label: "My Cases", href: "/cases/82910" },
];

export function PortalHeader({
  active = "tutors",
  userImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuBNI7Ca5bDtEU3mpKdPv6nVhquQT43gEqPjVpXIY29tNrplgWwRNucXIfpO7dDFLgqdQsYPOLY8Gs10DKUmUOfKqUJeTnW-QYrxP_WykegP2VoYnb5yjtgD1aXL7DVbIDIdRSD3F1r2q3lKQ4JcXsNSzcHaevHX0VAk72QLUyUKix873dkTEDsigJogRu9I4qo8dqJqInHsU4gY_AjudaTLU6K6pLHdHU8i-WcTcgnVeOsiGH_g9AyHzzq8KRtEEud_7kTSRROqscM",
}: PortalHeaderProps) {
  return (
    <header className="bg-surface border-b border-outline-variant shadow-sm sticky top-0 z-50">
      <nav className="flex justify-between items-center w-full px-6 max-w-7xl mx-auto h-16">
        <div className="flex items-center gap-10">
          <Link href="/dashboard" className="font-headline-md text-headline-md font-bold text-primary">
            EduMatch
          </Link>
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={
                  active === link.key
                    ? "font-label-md text-label-md text-secondary border-b-2 border-secondary pb-1"
                    : "font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
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
            <input
              className="bg-transparent border-none focus:ring-0 text-body-sm p-0 w-48 outline-none"
              placeholder="Quick search..."
              type="text"
            />
          </div>
          <button
            type="button"
            className="hidden sm:block font-label-md text-label-md text-primary uppercase border border-primary px-6 py-1 rounded hover:bg-primary hover:text-on-primary transition-all"
          >
            Switch Role
          </button>
          <Icon name="notifications" className="text-on-surface-variant cursor-pointer hover:text-primary" />
          <Icon name="settings" className="text-on-surface-variant cursor-pointer hover:text-primary" />
          <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden relative">
            <Image src={userImage} alt="User profile" fill className="object-cover" />
          </div>
        </div>
      </nav>
    </header>
  );
}
