"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { RegisterBrandingPanel } from "./RegisterBrandingPanel";

type Role = "parent" | "tutor";

export function RegisterForm() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("parent");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      router.push("/dashboard");
    }, 800);
  }

  return (
    <div className="bg-background text-on-surface min-h-screen flex overflow-hidden">
      <RegisterBrandingPanel />
      <main className="w-full lg:w-1/2 bg-surface flex flex-col justify-center items-center p-6 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-[480px]">
          <div className="lg:hidden mb-10">
            <h1 className="text-headline-md text-primary font-bold">EduMatch</h1>
          </div>
          <header className="mb-10">
            <h2 className="text-headline-lg text-on-surface mb-1">Create Account</h2>
            <p className="text-body-md text-on-surface-variant">
              Join our community of learners and educators today.
            </p>
          </header>
          <div className="bg-surface-container-low p-2 rounded-xl mb-10 flex gap-2">
            {(["parent", "tutor"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-3 px-6 rounded-lg text-label-md transition-all ${
                  role === r
                    ? "bg-secondary-container text-on-secondary-container shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                {r === "parent" ? "Parent" : "Tutor"}
              </button>
            ))}
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label htmlFor="full_name" className="text-label-md text-on-surface-variant">
                Full Name
              </label>
              <input
                id="full_name"
                required
                type="text"
                placeholder="Enter your full name"
                className="w-full h-12 px-6 rounded-lg border border-outline-variant bg-surface text-body-md form-input-focus"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="text-label-md text-on-surface-variant">
                Email Address
              </label>
              <input
                id="email"
                required
                type="email"
                placeholder="name@example.com"
                className="w-full h-12 px-6 rounded-lg border border-outline-variant bg-surface text-body-md form-input-focus"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label htmlFor="password" className="text-label-md text-on-surface-variant">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full h-12 px-6 rounded-lg border border-outline-variant bg-surface text-body-md form-input-focus"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                  >
                    <Icon name={showPassword ? "visibility_off" : "visibility"} size={20} />
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="confirm_password" className="text-label-md text-on-surface-variant">
                  Confirm Password
                </label>
                <input
                  id="confirm_password"
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-12 px-6 rounded-lg border border-outline-variant bg-surface text-body-md form-input-focus"
                />
              </div>
            </div>
            <div className="flex items-start gap-3 py-1">
              <input
                id="terms"
                required
                type="checkbox"
                className="mt-1 w-5 h-5 rounded text-secondary border-outline-variant focus:ring-secondary cursor-pointer"
              />
              <label htmlFor="terms" className="text-body-sm text-on-surface-variant leading-relaxed">
                I agree to the{" "}
                <a className="text-secondary font-bold hover:underline" href="#">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a className="text-secondary font-bold hover:underline" href="#">
                  Privacy Policy
                </a>
                .
              </label>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-14 bg-secondary text-on-secondary text-label-md uppercase tracking-widest rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-secondary/20 disabled:opacity-70"
            >
              {submitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          <footer className="mt-16 text-center space-y-6">
            <p className="text-body-md text-on-surface-variant">
              Already have an account?{" "}
              <Link href="/login" className="text-secondary font-bold hover:underline ml-1">
                Sign In
              </Link>
            </p>
            <div className="pt-10 border-t border-outline-variant flex items-center justify-center gap-3 opacity-60">
              <Icon name="verified" size={18} />
              <span className="text-label-sm uppercase tracking-tighter">
                AES-256 Bit Encryption Active
              </span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
