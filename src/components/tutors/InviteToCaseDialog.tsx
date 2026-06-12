"use client";

import { useState } from "react";
import { QueryState } from "@/components/common/QueryState";
import { Button, Select } from "@/components/ui";
import { useInviteTutor } from "@/hooks/mutations/use-case-mutations";
import { useCases } from "@/hooks/queries/use-cases";
import { ApiError } from "@/lib/api/errors";

type InviteToCaseDialogProps = {
  open: boolean;
  tutorUserId: string;
  tutorName: string;
  onClose: () => void;
  onSuccess?: () => void;
};

export function InviteToCaseDialog({
  open,
  tutorUserId,
  tutorName,
  onClose,
  onSuccess,
}: InviteToCaseDialogProps) {
  const { data, isLoading, isError, error, refetch } = useCases({ limit: 50, status: "OPEN" });
  const [caseId, setCaseId] = useState("");
  const invite = useInviteTutor(caseId);

  if (!open) return null;

  const cases = data?.data ?? [];
  const submitError = invite.error instanceof ApiError ? invite.error.message : undefined;

  async function handleInvite() {
    if (!caseId) return;
    try {
      await invite.mutateAsync({ tutorId: tutorUserId });
      onSuccess?.();
      onClose();
    } catch {
      // shown via submitError
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md bg-surface rounded-xl shadow-lg p-8 space-y-6"
      >
        <div>
          <h2 className="text-headline-sm text-on-surface">Invite to case</h2>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Choose an open case to invite <strong>{tutorName}</strong>.
          </p>
        </div>

        <QueryState
          isLoading={isLoading}
          isError={isError}
          error={error}
          isEmpty={!isLoading && cases.length === 0}
          emptyTitle="No open cases"
          emptyMessage="Create a case first, then invite tutors from the directory."
          onRetry={() => refetch()}
        >
          <Select
            aria-label="Select case"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
          >
            <option value="">Select a case…</option>
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </Select>
        </QueryState>

        {submitError && (
          <p className="text-body-sm text-error" role="alert">
            {submitError}
          </p>
        )}

        <div className="flex gap-3">
          <Button type="button" variant="ghost" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            fullWidth
            disabled={!caseId || invite.isPending || cases.length === 0}
            onClick={handleInvite}
          >
            {invite.isPending ? "Sending…" : "Send invite"}
          </Button>
        </div>
      </div>
    </div>
  );
}
