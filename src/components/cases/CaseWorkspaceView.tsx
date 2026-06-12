import Image from "next/image";
import Link from "next/link";
import {
  Badge,
  Button,
  Card,
  Icon,
  buttonClassName,
} from "@/components/ui";
import type { BadgeVariant } from "@/components/ui/Badge";
import { ROUTES } from "@/lib/constants";
import type { CaseDetail, InvitedTutor } from "@/lib/types/domain";

const inviteStatusVariant: Record<InvitedTutor["status"], BadgeVariant> = {
  MATCHED: "matched",
  Pending: "default",
  Declined: "default",
};

type CaseWorkspaceViewProps = {
  caseDetail: CaseDetail & { invitedTutors: InvitedTutor[] };
  viewLabel?: string;
  canUpload?: boolean;
  canInvite?: boolean;
  canClose?: boolean;
  closePending?: boolean;
  uploadPending?: boolean;
  downloadPending?: boolean;
  onUploadClick?: () => void;
  onDownload?: (documentId: string, filename: string) => void;
  onClose?: () => void;
};

export function CaseWorkspaceView({
  caseDetail,
  viewLabel = "CASE VIEW",
  canUpload = false,
  canInvite = false,
  canClose = false,
  closePending = false,
  uploadPending = false,
  downloadPending = false,
  onUploadClick,
  onDownload,
  onClose,
}: CaseWorkspaceViewProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Badge variant="parent">{viewLabel}</Badge>
            <Badge variant="secure" icon="lock" filledIcon>
              SECURE CASE
            </Badge>
          </div>
          <h1 className="text-headline-lg text-on-surface">{caseDetail.title}</h1>
          <p className="text-on-surface-variant text-body-sm mt-1">
            Case ID: {caseDetail.caseId} • Created {caseDetail.createdAgo}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge status={caseDetail.status} icon="check_circle" filledIcon className="px-6 py-2 text-label-md">
            {caseDetail.status.toUpperCase()}
          </Badge>
          {canInvite && (
            <Link
              href={ROUTES.tutors}
              className={buttonClassName({
                variant: "primary",
                uppercase: true,
                shape: "none",
                className: "px-6 py-3 tracking-wider shadow-sm",
              })}
            >
              <Icon name="person_add" />
              Invite Tutor
            </Link>
          )}
          {canClose && (
            <Button
              variant="outline"
              disabled={closePending}
              onClick={onClose}
            >
              Close case
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <Card variant="profile" padding="md">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-outline-variant">
              <Icon name="info" className="text-secondary" />
              <h2 className="text-headline-sm">Case Specification</h2>
            </div>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <dt className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-1">
                    Subject &amp; Level
                  </dt>
                  <dd className="text-headline-sm text-on-surface">{caseDetail.subjectLevel}</dd>
                </div>
                <div>
                  <dt className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-1">
                    Budget Range
                  </dt>
                  <dd className="text-headline-sm text-secondary">{caseDetail.budgetRange}</dd>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <dt className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-1">
                    Location
                  </dt>
                  <dd className="flex items-start gap-1 text-body-md">
                    <Icon name="location_on" className="text-on-surface-variant" />
                    {caseDetail.location}
                  </dd>
                </div>
                <div>
                  <dt className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-1">
                    Schedule
                  </dt>
                  <dd className="flex items-start gap-1 text-body-md">
                    <Icon name="calendar_today" className="text-on-surface-variant" />
                    {caseDetail.schedule}
                  </dd>
                </div>
              </div>
            </dl>
            <div className="mt-6 p-4 bg-surface-container-low rounded-lg border border-outline-variant border-dashed">
              <h3 className="text-label-md mb-2">Requirement Notes</h3>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                {caseDetail.requirementNotes}
              </p>
            </div>
          </Card>

          <Card variant="profile" padding="md">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-outline-variant">
              <Icon name="attach_file" className="text-secondary" />
              <h2 className="text-headline-sm">Documents</h2>
            </div>
            {caseDetail.documents.length === 0 ? (
              <p className="text-body-sm text-on-surface-variant mb-4">No documents uploaded yet.</p>
            ) : (
              <ul className="space-y-2 mb-4">
                {caseDetail.documents.map((doc) => (
                  <li
                    key={doc.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg border border-outline-variant bg-surface-container-lowest"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon name={doc.icon} className="text-secondary shrink-0" />
                      <div className="min-w-0">
                        <p className="text-body-sm font-medium truncate">{doc.name}</p>
                        <p className="text-label-sm text-on-surface-variant">{doc.size}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-secondary shrink-0"
                      disabled={downloadPending}
                      onClick={() => onDownload?.(doc.id, doc.name)}
                    >
                      Download
                    </Button>
                  </li>
                ))}
              </ul>
            )}
            {canUpload && (
              <button
                type="button"
                disabled={uploadPending}
                onClick={onUploadClick}
                className="w-full border border-dashed border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer group disabled:opacity-60"
              >
                <Icon
                  name={uploadPending ? "progress_activity" : "cloud_upload"}
                  className={`text-on-surface-variant group-hover:text-secondary text-2xl ${uploadPending ? "animate-spin" : ""}`}
                />
                <p className="mt-2 text-label-md text-on-surface">
                  {uploadPending ? "Uploading…" : "Upload document"}
                </p>
                <p className="text-label-sm text-on-surface-variant mt-1">PDF, DOCX, PNG, JPG up to 10MB</p>
              </button>
            )}
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card variant="profile" padding="md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-headline-sm">Tutor List</h2>
              <span className="text-label-sm text-on-surface-variant">
                {caseDetail.invitedTutors.length} INVITED
              </span>
            </div>
            <div className="space-y-6">
              {caseDetail.invitedTutors.length === 0 ? (
                <p className="text-body-sm text-on-surface-variant">No tutors invited yet.</p>
              ) : (
                caseDetail.invitedTutors.map((tutor) => {
                  const row = (
                    <div className="flex items-start gap-3">
                      <div className="relative w-12 h-12 rounded-full border border-outline-variant overflow-hidden shrink-0">
                        <Image
                          src={tutor.image}
                          alt={tutor.name}
                          fill
                          className={`object-cover ${tutor.grayscale ? "grayscale" : ""}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center gap-2">
                          <p className="text-label-md text-on-surface truncate">{tutor.name}</p>
                          <Badge variant={inviteStatusVariant[tutor.status]} className="text-label-sm shrink-0">
                            {tutor.status}
                          </Badge>
                        </div>
                        <p className="text-label-sm text-on-surface-variant">{tutor.subtitle}</p>
                      </div>
                      <Icon name="chevron_right" className="text-on-surface-variant shrink-0" />
                    </div>
                  );

                  return tutor.profileId ? (
                    <Link
                      key={tutor.id}
                      href={ROUTES.tutor(tutor.profileId)}
                      className={
                        tutor.active
                          ? "block p-3 rounded-xl border-2 border-secondary bg-secondary/5 hover:bg-secondary/10 transition-colors"
                          : "block p-3 rounded-xl border border-outline-variant hover:border-secondary transition-colors"
                      }
                    >
                      {row}
                    </Link>
                  ) : (
                    <div
                      key={tutor.id}
                      className="p-3 rounded-xl border border-outline-variant"
                    >
                      {row}
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
