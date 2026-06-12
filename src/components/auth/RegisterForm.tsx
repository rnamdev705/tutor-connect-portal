"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { getAuthErrorMessage, useAuth } from "@/lib/auth/AuthProvider";
import type { Role } from "@/lib/api/types";
import { BRAND_NAME, ROLE_OPTIONS, ROUTES, type AuthRole } from "@/lib/constants";
import { registerSchema, type RegisterFormValues } from "@/lib/validations/register";
import { RegisterBrandingPanel } from "./RegisterBrandingPanel";

function toApiRole(role: AuthRole): Role {
  return role === "parent" ? "PARENT" : "TUTOR";
}

export function RegisterForm() {
  const { register: registerUser } = useAuth();
  const [role, setRole] = useState<AuthRole>("parent");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const termsAccepted = watch("terms");

  const registerMutation = useMutation({
    mutationFn: (values: RegisterFormValues) =>
      registerUser({
        email: values.email.trim().toLowerCase(),
        password: values.password,
        role: toApiRole(role),
        displayName: values.displayName.trim(),
      }),
  });

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
          <form
            className="space-y-6"
            onSubmit={handleSubmit((values) => registerMutation.mutate(values))}
            noValidate
          >
            {registerMutation.isError && (
              <p className="text-body-sm text-error bg-error-container px-4 py-3 rounded-lg" role="alert">
                {getAuthErrorMessage(registerMutation.error)}
              </p>
            )}
            <Field label="Full Name" htmlFor="displayName" error={errors.displayName?.message}>
              <Input
                id="displayName"
                autoComplete="name"
                type="text"
                placeholder="Enter your full name"
                {...register("displayName")}
              />
            </Field>
            <Field label="Email Address" htmlFor="email" error={errors.email?.message}>
              <Input
                id="email"
                autoComplete="email"
                type="email"
                placeholder="name@example.com"
                {...register("email")}
              />
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Password" htmlFor="password" error={errors.password?.message}>
                <PasswordInput
                  id="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  {...register("password")}
                />
              </Field>
              <Field label="Confirm Password" htmlFor="confirm_password" error={errors.confirmPassword?.message}>
                <PasswordInput
                  id="confirm_password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                />
              </Field>
            </div>
            <Field error={errors.terms?.message}>
              <Checkbox
                id="terms"
                labelClassName="leading-relaxed"
                label="I agree to the Terms of Service and Privacy Policy."
                checked={termsAccepted}
                onChange={(e) => setValue("terms", e.target.checked, { shouldValidate: true })}
              />
            </Field>
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              fullWidth
              uppercase
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Creating account…" : "Create Account"}
            </Button>
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
