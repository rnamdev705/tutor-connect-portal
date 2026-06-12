"use client";

import { FormEvent, useState } from "react";
import {
  Button,
  Checkbox,
  Field,
  Icon,
  Input,
  PasswordInput,
  SegmentedControl,
  TextLink,
} from "@/components/ui";
import { RegisterBrandingPanel } from "./RegisterBrandingPanel";
import { BRAND_NAME, ROLE_OPTIONS, ROUTES, type AuthRole } from "@/lib/constants";

export function RegisterForm() {
  const [role, setRole] = useState<AuthRole>("parent");
  const [passwordError, setPasswordError] = useState<string | undefined>();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem("confirm_password") as HTMLInputElement)
      .value;

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordError(undefined);
    // Registration is not available in the demo API — use seeded accounts on the login page.
  }

  return (
    <div className="bg-background text-on-surface min-h-screen flex overflow-hidden">
      <RegisterBrandingPanel />
      <main className="w-full lg:w-1/2 bg-surface flex flex-col justify-center items-center p-6 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-[480px]">
          <div className="lg:hidden mb-10">
            <h1 className="text-headline-md text-primary font-bold">{BRAND_NAME}</h1>
          </div>
          <header className="mb-10">
            <h2 className="text-headline-lg text-on-surface mb-1">Create Account</h2>
            <p className="text-body-md text-on-surface-variant">
              Join our community of learners and educators today.
            </p>
          </header>
          <SegmentedControl
            name="register-role"
            options={ROLE_OPTIONS}
            value={role}
            onChange={setRole}
            shape="rounded"
            activeVariant="secondary-container"
            className="mb-10"
          />
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <Field label="Full Name" htmlFor="full_name">
              <Input
                id="full_name"
                name="full_name"
                required
                autoComplete="name"
                type="text"
                placeholder="Enter your full name"
              />
            </Field>
            <Field label="Email Address" htmlFor="email">
              <Input
                id="email"
                name="email"
                required
                autoComplete="email"
                type="email"
                placeholder="name@example.com"
              />
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Password" htmlFor="password" error={passwordError}>
                <PasswordInput
                  id="password"
                  name="password"
                  required
                  autoComplete="new-password"
                  placeholder="••••••••"
                />
              </Field>
              <Field label="Confirm Password" htmlFor="confirm_password">
                <PasswordInput
                  id="confirm_password"
                  name="confirm_password"
                  required
                  autoComplete="new-password"
                  placeholder="••••••••"
                />
              </Field>
            </div>
            <Checkbox
              id="terms"
              name="terms"
              required
              labelClassName="leading-relaxed"
              label="I agree to the Terms of Service and Privacy Policy."
            />
            <Button type="submit" variant="secondary" size="lg" fullWidth uppercase disabled>
              Create Account
            </Button>
            <p className="text-body-sm text-on-surface-variant text-center">
              Registration is disabled for this demo. Use seeded accounts on the{" "}
              <TextLink href={ROUTES.login}>sign in page</TextLink> (password <strong>Demo1234!</strong>).
            </p>
          </form>
          <footer className="mt-16 text-center space-y-6">
            <p className="text-body-md text-on-surface-variant">
              Already have an account? <TextLink href={ROUTES.login}>Sign In</TextLink>
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
