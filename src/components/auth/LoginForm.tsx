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
  PasswordInput,
  SegmentedControl,
  TextLink,
} from "@/components/ui";
import { AuthBrandingSidebar } from "./AuthBrandingSidebar";
import { BRAND_NAME, OAUTH_GOOGLE_ICON, ROLE_OPTIONS, ROUTES, type AuthRole } from "@/lib/constants";

export function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<AuthRole>("parent");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(ROUTES.dashboard);
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-surface-container-lowest rounded-xl overflow-hidden auth-card min-h-[600px] shadow-sm">
        <AuthBrandingSidebar />
        <section className="flex-1 min-w-0 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="flex items-center gap-2 mb-10 md:hidden">
              <Icon name="school" className="text-secondary text-3xl" />
              <h1 className="text-headline-sm font-bold text-primary">{BRAND_NAME}</h1>
            </div>
            <div className="mb-10">
              <h2 className="text-headline-lg text-on-surface mb-1">Welcome back</h2>
              <p className="text-body-md text-on-surface-variant">
                Please enter your details to sign in.
              </p>
            </div>
            <SegmentedControl
              name="login-role"
              options={ROLE_OPTIONS}
              value={role}
              onChange={setRole}
              shape="pill"
              className="mb-10"
            />
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <Field label="Email Address" htmlFor="email" labelUppercase labelSize="sm">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
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
                  <span className="text-label-sm text-secondary">Forgot password?</span>
                }
              >
                <PasswordInput
                  id="password"
                  name="password"
                  required
                  autoComplete="current-password"
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
                <Button type="button" variant="outline-neutral" shape="xl" fullWidth disabled>
                  <Image src={OAUTH_GOOGLE_ICON} alt="" width={20} height={20} />
                  Google
                </Button>
                <Button type="button" variant="outline-neutral" shape="xl" fullWidth disabled>
                  <Icon name="apps" className="text-primary" />
                  Apple
                </Button>
              </div>
            </div>
            <p className="mt-16 text-center text-body-sm text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <TextLink href={ROUTES.register}>Create a {BRAND_NAME} account</TextLink>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
