"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { AuthBrandingSidebar } from "./AuthBrandingSidebar";

type Role = "parent" | "tutor";

export function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("parent");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-surface-container-lowest rounded-xl overflow-hidden auth-card min-h-[600px] shadow-sm">
        <AuthBrandingSidebar />
        <section className="flex-1 min-w-0 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="flex items-center gap-2 mb-10 md:hidden">
              <Icon name="school" className="text-secondary text-3xl" />
              <h1 className="text-headline-sm font-bold text-primary">EduMatch</h1>
            </div>
            <div className="mb-10">
              <h2 className="text-headline-lg text-on-surface mb-1">Welcome back</h2>
              <p className="text-body-md text-on-surface-variant">
                Please enter your details to sign in.
              </p>
            </div>
            <div className="flex bg-surface-container-low p-1 rounded-full mb-10 border border-outline-variant">
              {(["parent", "tutor"] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 px-6 rounded-full text-label-md transition-all ${
                    role === r
                      ? "bg-secondary text-on-secondary shadow-sm"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {r === "parent" ? "Parent" : "Tutor"}
                </button>
              ))}
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-label-sm text-on-surface-variant ml-1 uppercase tracking-wider"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Icon
                    name="mail"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={role === "parent" ? "sarah@example.com" : "dr.smith@edumatch.edu"}
                    className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-body-md input-focus-ring transition-all placeholder:text-on-surface-variant/30"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center px-1">
                  <label
                    htmlFor="password"
                    className="block text-label-sm text-on-surface-variant uppercase tracking-wider"
                  >
                    Password
                  </label>
                  <a className="text-label-sm text-secondary hover:underline" href="#">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Icon
                    name="lock"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-body-md input-focus-ring transition-all placeholder:text-on-surface-variant/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-primary transition-colors"
                  >
                    <Icon name={showPassword ? "visibility_off" : "visibility"} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 px-1">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="w-4 h-4 text-secondary border-outline-variant rounded focus:ring-secondary cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-body-sm text-on-surface-variant cursor-pointer select-none"
                >
                  Remember me for 30 days
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-secondary text-on-secondary text-label-md uppercase tracking-widest rounded-xl hover:bg-secondary-container transition-all active:scale-[0.98] shadow-lg shadow-secondary/20 flex items-center justify-center gap-2"
              >
                Sign In as {role === "parent" ? "Parent" : "Tutor"}
                <Icon name="arrow_forward" className="text-sm" />
              </button>
            </form>
            <div className="mt-10">
              <div className="relative flex items-center mb-10">
                <div className="grow border-t border-outline-variant" />
                <span className="shrink mx-4 text-label-sm text-on-surface-variant/50 uppercase tracking-widest">
                  Or continue with
                </span>
                <div className="grow border-t border-outline-variant" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-all"
                >
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6GyKwKvkkjtuPpVMX6HeTWEf6fAmyuMEJNATfFfFAFuKQ58WNblXELmJwwJxFIINbHwzB5l-7-cSbP_lQrlHD3zjpcUDVSRnV2dK3ndFRqwpUBmuGVFQR6pQcOX74ayH9NlFl7Zqsi3--Dzi3RJzUsGJfZ3xbYEcbEs5JBdZ8qbCsGr_n6ZW8flmRxld6AVPc18EcyzlCvbS88ZCK7_kl_M8rwRB-XiozDKyFF59C1BrtD3UO7nLFh-vBH-nOSixXfLsaoGZoJxo"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  <span className="text-label-md text-on-surface">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-all"
                >
                  <Icon name="apps" className="text-primary" />
                  <span className="text-label-md text-on-surface">Apple</span>
                </button>
              </div>
            </div>
            <p className="mt-16 text-center text-body-sm text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-secondary font-bold hover:underline">
                Create an EduMatch account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
