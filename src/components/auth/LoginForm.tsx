"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Checkbox,
  Divider,
  Field,
  Icon,
  Input,
  SegmentedControl,
  TextLink,
} from "@/components/ui";
import { AuthBrandingSidebar } from "./AuthBrandingSidebar";

type Role = "parent" | "tutor";

const roleOptions = [
  { value: "parent" as const, label: "Parent" },
  { value: "tutor" as const, label: "Tutor" },
];

export function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("parent");

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
            <SegmentedControl
              options={roleOptions}
              value={role}
              onChange={setRole}
              shape="pill"
              className="mb-10"
            />
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Field label="Email Address" htmlFor="email" labelUppercase labelSize="sm">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  variant="auth"
                  leftIcon="mail"
                  placeholder={role === "parent" ? "sarah@example.com" : "dr.smith@edumatch.edu"}
                />
              </Field>
              <Field
                label="Password"
                htmlFor="password"
                labelUppercase
                labelSize="sm"
                action={
                  <a className="text-label-sm text-secondary hover:underline" href="#">
                    Forgot password?
                  </a>
                }
              >
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  variant="auth"
                  leftIcon="lock"
                  placeholder="••••••••"
                />
              </Field>
              <Checkbox id="remember" name="remember" label="Remember me for 30 days" />
              <Button type="submit" variant="secondary" size="lg" shape="xl" fullWidth uppercase>
                Sign In as {role === "parent" ? "Parent" : "Tutor"}
                <Icon name="arrow_forward" className="text-sm" />
              </Button>
            </form>
            <div className="mt-10">
              <Divider label="Or continue with" className="mb-10" />
              <div className="grid grid-cols-2 gap-6">
                <Button variant="outline-neutral" shape="xl" fullWidth>
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6GyKwKvkkjtuPpVMX6HeTWEf6fAmyuMEJNATfFfFAFuKQ58WNblXELmJwwJxFIINbHwzB5l-7-cSbP_lQrlHD3zjpcUDVSRnV2dK3ndFRqwpUBmuGVFQR6pQcOX74ayH9NlFl7Zqsi3--Dzi3RJzUsGJfZ3xbYEcbEs5JBdZ8qbCsGr_n6ZW8flmRxld6AVPc18EcyzlCvbS88ZCK7_kl_M8rwRB-XiozDKyFF59C1BrtD3UO7nLFh-vBH-nOSixXfLsaoGZoJxo"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  Google
                </Button>
                <Button variant="outline-neutral" shape="xl" fullWidth>
                  <Icon name="apps" className="text-primary" />
                  Apple
                </Button>
              </div>
            </div>
            <p className="mt-16 text-center text-body-sm text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <TextLink href="/register">Create an EduMatch account</TextLink>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
