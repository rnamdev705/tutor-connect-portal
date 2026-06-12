"use client";

import { ParentAccountView } from "@/components/profile/ParentAccountView";
import { TutorProfileEditView } from "@/components/profile/TutorProfileEditView";
import { useAuth } from "@/lib/auth/AuthProvider";

export function ProfilePageView() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user?.role === "TUTOR") {
    return <TutorProfileEditView />;
  }

  return <ParentAccountView />;
}
