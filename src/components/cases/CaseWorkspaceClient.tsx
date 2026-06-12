"use client";

import { useMemo, useRef } from "react";
import { QueryState } from "@/components/common/QueryState";
import { CaseWorkspaceView } from "@/components/cases/CaseWorkspaceView";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { PortalSidebar } from "@/components/layout/PortalSidebar";
import { useDownloadDocument, useUploadCaseDocument } from "@/hooks/mutations/use-case-mutations";
import { useCaseDetail } from "@/hooks/queries/use-cases";
import { useTutors } from "@/hooks/queries/use-tutors";
import { useAuth } from "@/lib/auth/AuthProvider";
import { ROUTES } from "@/lib/constants";

type CaseWorkspaceClientProps = {
  caseId: string;
};

export function CaseWorkspaceClient({ caseId }: CaseWorkspaceClientProps) {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: tutorsData } = useTutors({ limit: 100 });
  const { data, isLoading, isError, error, refetch } = useCaseDetail(caseId);
  const upload = useUploadCaseDocument(caseId);
  const download = useDownloadDocument();

  const profileIdByUserId = useMemo(
    () => new Map((tutorsData?.data ?? []).map((t) => [t.tutorUserId, t.id])),
    [tutorsData],
  );

  const caseDetail = useMemo(() => {
    if (!data) return null;
    return {
      ...data,
      invitedTutors: data.invitedTutors.map((t) => ({
        ...t,
        profileId: profileIdByUserId.get(t.id),
      })),
    };
  }, [data, profileIdByUserId]);

  const isParent = user?.role === "PARENT";

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <PortalHeader active="cases" casesHref={ROUTES.case(caseId)} />
      <div className="flex max-w-7xl mx-auto">
        <PortalSidebar active="cases" casesHref={ROUTES.case(caseId)} />
        <main className="flex-1 p-6 md:p-10 min-w-0">
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
                  canUpload
                  canInvite={isParent}
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
        </main>
      </div>
    </div>
  );
}
