"use client";

import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { QueryState } from "@/components/common/QueryState";
import { CaseWorkspaceView } from "@/components/cases/CaseWorkspaceView";
import { PortalShell } from "@/components/layout/PortalShell";
import { Icon } from "@/components/ui";
import {
  useDownloadDocument,
  useUpdateCase,
  useUploadCaseDocument,
} from "@/hooks/mutations/use-case-mutations";
import { useCaseDetail } from "@/hooks/queries/use-cases";
import { useAuth } from "@/lib/auth/AuthProvider";
import { ROUTES } from "@/lib/constants";

type CaseWorkspaceClientProps = {
  caseId: string;
};

export function CaseWorkspaceClient({ caseId }: CaseWorkspaceClientProps) {
  const { user } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isParent = user?.role === "PARENT";
  const { data: caseDetail, isLoading, isError, error, refetch } = useCaseDetail(caseId);
  const upload = useUploadCaseDocument(caseId);
  const download = useDownloadDocument();
  const closeCase = useUpdateCase(caseId);

  const isClosed = caseDetail?.status === "Closed";

  async function handleClose() {
    if (!window.confirm("Close this case? Tutors will no longer be able to respond.")) return;
    await closeCase.mutateAsync({ id: caseId, input: { status: "CLOSED" } });
    router.push(ROUTES.cases);
  }

  return (
    <PortalShell active="cases">
      <Link
        href={isParent ? ROUTES.cases : ROUTES.dashboard}
        className="inline-flex items-center gap-1 text-label-md text-secondary hover:underline mb-6"
      >
        <Icon name="arrow_back" size={18} />
        {isParent ? "Back to cases" : "Back to dashboard"}
      </Link>

      <QueryState
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
      >
        {caseDetail && (
          <>
            <CaseWorkspaceView
              caseDetail={caseDetail}
              viewLabel={isParent ? "PARENT VIEW" : "TUTOR VIEW"}
              canUpload={!isClosed}
              canInvite={isParent && !isClosed}
              canClose={isParent && !isClosed}
              closePending={closeCase.isPending}
              onClose={handleClose}
              uploadPending={upload.isPending}
              onUploadClick={() => fileInputRef.current?.click()}
              onDownload={(docId, filename) => download.mutate({ id: docId, filename })}
              downloadPending={download.isPending}
            />
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  void upload.mutateAsync(file).finally(() => {
                    e.target.value = "";
                  });
                }
              }}
            />
            {upload.error && (
              <p className="mt-4 text-body-sm text-error" role="alert">
                {upload.error instanceof Error ? upload.error.message : "Upload failed"}
              </p>
            )}
          </>
        )}
      </QueryState>
    </PortalShell>
  );
}
