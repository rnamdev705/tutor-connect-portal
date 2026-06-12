"use client";

import { Card, Icon } from "@/components/ui";
import { PortalShell } from "@/components/layout/PortalShell";
import { useAuth } from "@/lib/auth/AuthProvider";

export function ParentAccountView() {
  const { user } = useAuth();

  return (
    <PortalShell active="profile">
      <header className="mb-8">
        <h1 className="text-headline-lg text-on-surface mb-1">My profile</h1>
        <p className="text-body-md text-on-surface-variant">
          Your account details for {user?.email ?? "your account"}.
        </p>
      </header>

      <Card padding="lg" className="max-w-2xl space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-outline-variant">
          <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center">
            <Icon name="family_restroom" className="text-secondary text-2xl" />
          </div>
          <div>
            <p className="text-headline-sm text-on-surface">Parent account</p>
            <p className="text-body-sm text-on-surface-variant">Manage cases and invite tutors</p>
          </div>
        </div>

        <dl className="space-y-5">
          <div>
            <dt className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Email</dt>
            <dd className="text-body-md text-on-surface">{user?.email ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Role</dt>
            <dd className="text-body-md text-on-surface">Parent</dd>
          </div>
          {user?.createdAt && (
            <div>
              <dt className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                Member since
              </dt>
              <dd className="text-body-md text-on-surface">
                {new Date(user.createdAt).toLocaleDateString()}
              </dd>
            </div>
          )}
        </dl>

        <p className="text-body-sm text-on-surface-variant pt-4 border-t border-outline-variant">
          To find tutors, use <strong>Tutor Directory</strong> in the sidebar. Post new tuition requests
          from the <strong>Cases</strong> page in the sidebar.
        </p>
      </Card>
    </PortalShell>
  );
}
