import { Icon } from "@/components/ui/Icon";
import { BRAND_NAME } from "@/lib/constants";

const features = [
  { icon: "verified_user", label: "Identity-Verified Tutors" },
  { icon: "lock", label: "Encrypted Document Vault" },
  { icon: "history_edu", label: "Academic Track Record" },
];

export function AuthBrandingSidebar() {
  return (
    <section className="hidden md:flex flex-col w-[42%] shrink-0 px-12 py-10 lg:px-16 lg:py-12 sidebar-gradient text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/2 -translate-y-1/4">
        <svg height="400" viewBox="0 0 100 100" width="400">
          <circle cx="50" cy="50" fill="none" r="40" stroke="white" strokeWidth="0.5" />
          <rect
            fill="none"
            height="60"
            stroke="white"
            strokeWidth="0.5"
            transform="rotate(45 50 50)"
            width="60"
            x="20"
            y="20"
          />
        </svg>
      </div>
      <div className="z-10">
        <div className="flex items-center gap-2 mb-10">
          <Icon name="school" className="text-secondary-fixed text-4xl" />
          <h1 className="text-headline-md font-bold tracking-tight">{BRAND_NAME}</h1>
        </div>
        <h2 className="text-display-lg mb-4 leading-tight">Empowering academic excellence.</h2>
        <p className="text-body-lg text-on-primary-container max-w-sm mb-8">
          Join a secure marketplace where elite tutors and dedicated parents connect through
          verified credentials and trusted match-making.
        </p>
        <div className="space-y-6">
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <Icon name={f.icon} className="text-secondary-fixed" />
              </div>
              <span className="text-label-md">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
