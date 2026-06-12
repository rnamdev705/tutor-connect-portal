"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
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
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { AuthBrandingSidebar } from "./AuthBrandingSidebar";

function toApiRole(role: AuthRole): Role {
  return role === "parent" ? "PARENT" : "TUTOR";
}

function safeRedirect(path: string | null): string | undefined {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return undefined;
  if (path === ROUTES.login || path === ROUTES.register) return undefined;
  return path;
}

export function LoginForm() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<AuthRole>("parent");
  const [remember, setRemember] = useState(true);

  const sessionExpired = searchParams.get("session") === "expired";
  const nextPath = safeRedirect(searchParams.get("next"));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const loginMutation = useMutation({
    mutationFn: (values: LoginFormValues) =>
      login(
        {
          email: values.email.trim().toLowerCase(),
          password: values.password,
          role: toApiRole(role),
        },
        { remember, redirectTo: nextPath },
      ),
  });

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-5xl flex flex-col md:flex-row md:items-stretch bg-surface-container-lowest rounded-xl overflow-hidden auth-card min-h-[600px] shadow-sm">
        <AuthBrandingSidebar />
        <section className="flex-1 min-w-0 p-8 md:px-12 md:py-10 lg:px-16 lg:py-12 flex flex-col justify-start">
          <div className="max-w-md mx-auto w-full md:mx-0">
            <div className="flex items-center gap-2 mb-8 md:hidden">
              <Icon name="school" className="text-secondary text-3xl" />
              <h1 className="text-headline-sm font-bold text-primary">{BRAND_NAME}</h1>
            </div>
            <div className="mb-8">
              <h2 className="text-headline-lg text-on-surface mb-1">Welcome back</h2>
              <p className="text-body-md text-on-surface-variant">
                Sign in with the email and password you used when registering.
              </p>
            </div>
            <SegmentedControl
              name="login-role"
              options={ROLE_OPTIONS}
              value={role}
              onChange={setRole}
              shape="pill"
              className="mb-8"
            />
            <form
              className="space-y-6"
              onSubmit={handleSubmit((values) => loginMutation.mutate(values))}
              noValidate
            >
              {sessionExpired && (
                <p className="text-body-sm text-on-surface-variant bg-surface-container-low px-4 py-3 rounded-lg" role="status">
                  Your session expired. Please sign in again.
                </p>
              )}
              {loginMutation.isError && (
                <p className="text-body-sm text-error bg-error-container px-4 py-3 rounded-lg" role="alert">
                  {getAuthErrorMessage(loginMutation.error)}
                </p>
              )}
              <Field label="Email Address" htmlFor="email" labelUppercase labelSize="sm" error={errors.email?.message}>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  variant="auth"
                  leftIcon="mail"
                  placeholder="name@example.com"
                  {...register("email")}
                />
              </Field>
              <Field
                label="Password"
                htmlFor="password"
                labelUppercase
                labelSize="sm"
                error={errors.password?.message}
              >
                <PasswordInput
                  id="password"
                  autoComplete="current-password"
                  variant="auth"
                  leftIcon="lock"
                  placeholder="••••••••"
                  {...register("password")}
                />
              </Field>
              <Checkbox
                id="remember"
                name="remember"
                label="Remember me for 30 days"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                shape="xl"
                fullWidth
                uppercase
                disabled={loginMutation.isPending}
              >
                Sign In as {role === "parent" ? "Parent" : "Tutor"}
                <Icon name="arrow_forward" className="text-sm" />
              </Button>
            </form>
            <p className="mt-10 text-center text-body-sm text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <TextLink href={ROUTES.register}>Create a {BRAND_NAME} account</TextLink>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
