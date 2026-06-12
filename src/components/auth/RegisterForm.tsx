"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Checkbox,
  Field,
  Icon,
  Input,
  SegmentedControl,
  TextLink,
} from "@/components/ui";
import { RegisterBrandingPanel } from "./RegisterBrandingPanel";

type Role = "parent" | "tutor";

const roleOptions = [
  { value: "parent" as const, label: "Parent" },
  { value: "tutor" as const, label: "Tutor" },
];

export function RegisterForm() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("parent");
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
          <SegmentedControl
            options={roleOptions}
            value={role}
            onChange={setRole}
            shape="rounded"
            activeVariant="secondary-container"
            className="mb-10"
          />
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Field label="Full Name" htmlFor="full_name">
              <Input id="full_name" required type="text" placeholder="Enter your full name" />
            </Field>
            <Field label="Email Address" htmlFor="email">
              <Input id="email" required type="email" placeholder="name@example.com" />
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Password" htmlFor="password">
                <Input id="password" required type="password" placeholder="••••••••" />
              </Field>
              <Field label="Confirm Password" htmlFor="confirm_password">
                <Input id="confirm_password" required type="password" placeholder="••••••••" />
              </Field>
            </div>
            <Checkbox
              id="terms"
              required
              labelClassName="leading-relaxed"
              label={
                <>
                  I agree to the <TextLink href="#">Terms of Service</TextLink> and{" "}
                  <TextLink href="#">Privacy Policy</TextLink>.
                </>
              }
            />
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              fullWidth
              uppercase
              disabled={submitting}
            >
              {submitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <footer className="mt-16 text-center space-y-6">
            <p className="text-body-md text-on-surface-variant">
              Already have an account? <TextLink href="/login">Sign In</TextLink>
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
