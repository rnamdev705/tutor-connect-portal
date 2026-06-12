"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreateCaseForm } from "@/components/cases/CreateCaseForm";
import { PortalShell } from "@/components/layout/PortalShell";
import { useAuth } from "@/lib/auth/AuthProvider";
import { ROUTES } from "@/lib/constants";

export function CreateCaseView() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role !== "PARENT") {
      router.replace(ROUTES.dashboard);
    }
  }, [loading, user, router]);

  if (loading || user?.role !== "PARENT") {
    return null;
  }

  return (
    <PortalShell active="cases">
      <CreateCaseForm
        onCancel={() => router.push(ROUTES.cases)}
        onCreated={(id) => router.push(ROUTES.case(id))}
      />
    </PortalShell>
  );
}
