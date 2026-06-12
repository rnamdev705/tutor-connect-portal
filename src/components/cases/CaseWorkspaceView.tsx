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
import type { CaseDetail, InvitedTutor } from "@/lib/data";

const inviteStatusVariant: Record<InvitedTutor["status"], BadgeVariant> = {
  MATCHED: "matched",
  Pending: "default",
  Declined: "default",
};

type CaseWorkspaceViewProps = {
  caseDetail: CaseDetail;
};

export function CaseWorkspaceView({ caseDetail }: CaseWorkspaceViewProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Badge variant="parent">PARENT VIEW</Badge>
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
          <Link
            href={ROUTES.tutors}
            className={buttonClassName({
              variant: "primary",
              uppercase: true,
              shape: "none",
              className: "px-10 py-3 tracking-wider shadow-sm",
            })}
          >
            <Icon name="person_add" />
            Invite Tutor
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <Card variant="profile" padding="md">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-outline-variant">
              <Icon name="info" className="text-secondary" />
              <h2 className="text-headline-sm">Case Specification</h2>
            </div>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
            <div className="mt-10 p-6 bg-surface-container-low rounded-lg border border-outline-variant border-dashed">
              <h3 className="text-label-md mb-2">Requirement Notes</h3>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                {caseDetail.requirementNotes}
              </p>
            </div>
          </Card>

          <Card variant="profile" padding="none" className="overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-outline-variant">
              <div className="flex items-center gap-3">
                <Icon name="shield" className="text-secondary" />
                <h2 className="text-headline-sm">Secure Document Vault</h2>
              </div>
              <Badge variant="secure" className="rounded text-label-sm">
                256-BIT ENCRYPTION
              </Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    {["Document Name", "Size", "Uploaded By", "Action"].map((heading, i) => (
                      <th
                        key={heading}
                        scope="col"
                        className={`p-6 text-label-sm text-on-surface-variant ${i === 3 ? "text-right" : ""}`}
                      >
                        {heading.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {caseDetail.documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <Icon name={doc.icon} className="text-on-secondary-fixed-variant" />
                          <span className="text-body-sm font-medium">{doc.name}</span>
                        </div>
                      </td>
                      <td className="p-6 text-body-sm text-on-surface-variant">{doc.size}</td>
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          {doc.initials ? (
                            <div className="w-6 h-6 rounded-full bg-primary text-white text-label-sm flex items-center justify-center font-bold">
                              {doc.initials}
                            </div>
                          ) : (
                            doc.image && (
                              <div className="w-6 h-6 rounded-full relative overflow-hidden">
                                <Image
                                  src={doc.image}
                                  alt={doc.uploader}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )
                          )}
                          <span className="text-body-sm">{doc.uploader}</span>
                        </div>
                      </td>
                      <td className="p-6 text-right">
                        <Button variant="ghost" className="text-secondary h-auto px-0 hover:bg-transparent hover:underline">
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-outline-variant rounded-lg p-16 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer group">
                <Icon
                  name="cloud_upload"
                  className="text-on-surface-variant group-hover:text-secondary transition-colors text-3xl"
                />
                <p className="mt-2 text-label-md text-on-surface">Click to upload or drag and drop</p>
                <p className="text-label-sm text-on-surface-variant mt-1">
                  PDF, JPG, PNG up to 10MB (Encrypted &amp; Secure)
                </p>
              </div>
            </div>
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
              {caseDetail.invitedTutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className={
                    tutor.active
                      ? "p-3 rounded-xl border-2 border-secondary bg-secondary/5"
                      : "p-3 rounded-xl border border-outline-variant hover:border-outline transition-colors"
                  }
                >
                  <div className="flex items-start gap-3">
                    <div className="relative w-12 h-12 rounded-full border border-outline-variant overflow-hidden shrink-0">
                      <Image
                        src={tutor.image}
                        alt={tutor.name}
                        fill
                        className={`object-cover ${tutor.grayscale ? "grayscale" : ""}`}
                      />
                      {tutor.active && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary-fixed border-2 border-surface-container-lowest rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2">
                        <p className="text-label-md text-on-surface truncate">{tutor.name}</p>
                        <Badge variant={inviteStatusVariant[tutor.status]} className="text-label-sm shrink-0">
                          {tutor.status}
                        </Badge>
                      </div>
                      <p className="text-label-sm text-on-surface-variant mb-2">{tutor.subtitle}</p>
                      {tutor.active && (
                        <div className="flex gap-2">
                          <Button size="sm" shape="none" uppercase className="text-label-sm">
                            Chat
                          </Button>
                          <Link
                            href={ROUTES.tutor(tutor.id)}
                            className={buttonClassName({
                              variant: "outline-neutral",
                              size: "sm",
                              shape: "none",
                              uppercase: true,
                              className: "text-label-sm",
                            })}
                          >
                            View Profile
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
