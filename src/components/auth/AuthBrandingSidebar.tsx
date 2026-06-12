import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { BRAND_NAME } from "@/lib/constants";

const features = [
  { icon: "verified_user", label: "Identity-Verified Tutors" },
  { icon: "lock", label: "Encrypted Document Vault" },
  { icon: "history_edu", label: "Academic Track Record" },
];

export function AuthBrandingSidebar() {
  return (
    <section className="hidden md:flex flex-col justify-between w-[42%] shrink-0 p-12 lg:p-16 sidebar-gradient text-white relative overflow-hidden">
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
        <div className="flex items-center gap-2 mb-16">
          <Icon name="school" className="text-secondary-fixed text-4xl" />
          <h1 className="text-headline-md font-bold tracking-tight">{BRAND_NAME}</h1>
        </div>
        <h2 className="text-display-lg mb-6 leading-tight">Empowering academic excellence.</h2>
        <p className="text-body-lg text-on-primary-container max-w-sm mb-10">
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
      <div className="z-10 mt-16 p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
        <p className="italic text-body-sm mb-2 opacity-80">
          &ldquo;The matching process was seamless. I found a specialized physics tutor for my
          daughter within 48 hours.&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCht38hsD-I-0ab0p7ob-6UeRJn1lbHUGRX1V41yb9I700aUmvOgb5BQv0ASceXIxegwANsodg15svx7kDVVLe1lmOOHk1kg5dnxIE2RnDXfXkorNJymiYG1vLVLoxlDSWcWXct1fdc1HImYFzobZ4l23DF91UOQfZFjmz1AmJh13VEKcG8bUSCEdLY8btyrleawFf3Ig2QY1x6ugYYFZo3B2rgbxMAf3kUrkdvuZhldTzFnvMpeeDhn-QOpz0hsM8uCKeK-UtLoCA"
              alt="Parent Profile"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-label-sm font-bold">Sarah Jenkins</p>
            <p className="text-[10px] uppercase tracking-wider opacity-60">Verified Parent</p>
          </div>
        </div>
      </div>
    </section>
  );
}
