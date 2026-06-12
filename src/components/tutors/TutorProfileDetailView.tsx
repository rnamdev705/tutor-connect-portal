"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QueryState } from "@/components/common/QueryState";
import { PortalShell } from "@/components/layout/PortalShell";
import { InviteToCaseDialog } from "@/components/tutors/InviteToCaseDialog";
import { Badge, Button, Card, Icon, Tag } from "@/components/ui";
import { useDownloadDocument } from "@/hooks/mutations/use-tutor-mutations";
import { useTutorProfile } from "@/hooks/queries/use-tutors";
import { useAuth } from "@/lib/auth/AuthProvider";
import { ROUTES } from "@/lib/constants";

type TutorProfileDetailViewProps = {
  profileId: string;
};

export function TutorProfileDetailView({ profileId }: TutorProfileDetailViewProps) {
  const { user } = useAuth();
  const router = useRouter();
  const canView = user?.role === "PARENT";
  const { data: tutor, isLoading, isError, error, refetch } = useTutorProfile(profileId, canView);
  const download = useDownloadDocument();
  const [inviteOpen, setInviteOpen] = useState(false);

  const isParent = user?.role === "PARENT";
  const credentials = tutor?.credentials ?? [];

  useEffect(() => {
    if (user?.role === "TUTOR") {
      router.replace(ROUTES.profile);
    }
  }, [user, router]);

  return (
    <PortalShell active="tutors">
      <Link
        href={ROUTES.tutors}
        className="inline-flex items-center gap-1 text-label-md text-secondary hover:underline mb-6"
      >
        <Icon name="arrow_back" size={18} />
        Back to directory
      </Link>

      <QueryState
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
      >
        {tutor && (
          <>
            <Card
              variant="profile"
              padding="lg"
              className="mb-6 flex flex-col md:flex-row items-start md:items-center gap-8"
            >
              <div className="relative shrink-0">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-surface shadow-sm relative">
                  <Image src={tutor.image} alt={tutor.name} fill className="object-cover" priority />
                </div>
                {tutor.verified && (
                  <Badge
                    variant="verified"
                    icon="verified"
                    filledIcon
                    className="absolute bottom-2 right-2 p-1 border-2 border-surface"
                    aria-label="Verified professional"
                  />
                )}
              </div>
              <div className="flex-1 space-y-2 min-w-0">
                <h1 className="text-headline-lg text-on-surface">{tutor.name}</h1>
                <p className="text-body-md text-on-surface-variant">{tutor.title}</p>
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <Icon name="history" className="text-secondary" />
                  <span className="text-label-md">{tutor.experience}</span>
                </div>
              </div>
              {isParent && (
                <Button
                  variant="secondary"
                  uppercase
                  className="shrink-0"
                  onClick={() => setInviteOpen(true)}
                >
                  <Icon name="send" />
                  Invite to case
                </Button>
              )}
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card variant="profile" padding="lg">
                  <h2 className="text-headline-sm text-on-surface mb-4">Qualifications</h2>
                  <ul className="space-y-2 text-body-md text-on-surface-variant mb-8">
                    {(tutor.qualifications ?? []).map((q) => (
                      <li key={q}>• {q}</li>
                    ))}
                  </ul>
                  <h2 className="text-headline-sm text-on-surface mb-4">Experience</h2>
                  <ul className="space-y-2 text-body-md text-on-surface-variant mb-6">
                    {(tutor.experiences ?? []).map((e) => (
                      <li key={e}>• {e}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1">
                    {tutor.subjects.map((s) => (
                      <Tag key={s} className="bg-surface-container-lowest border border-outline-variant">
                        {s}
                      </Tag>
                    ))}
                  </div>
                </Card>

                {credentials.length > 0 && (
                  <Card variant="profile" padding="lg">
                    <h2 className="text-headline-sm text-on-surface mb-4">Supporting documents</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {credentials.map((doc) => (
                        <button
                          key={doc.title}
                          type="button"
                          className="flex items-center p-4 border border-outline-variant rounded-xl hover:border-secondary transition-all bg-surface-container-lowest text-left"
                          onClick={() => {
                            if (doc.documentId) {
                              download.mutate({ id: doc.documentId, filename: doc.title });
                            }
                          }}
                          disabled={!doc.documentId || download.isPending}
                        >
                          <Icon name={doc.icon} className="text-secondary mr-3" />
                          <div className="flex-1 min-w-0">
                            <p className="text-label-md text-on-surface truncate">{doc.title}</p>
                            <p className="text-label-sm text-on-surface-variant">{doc.meta}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>

            {isParent && (
              <InviteToCaseDialog
                open={inviteOpen}
                tutorUserId={tutor.tutorUserId}
                tutorName={tutor.name}
                onClose={() => setInviteOpen(false)}
              />
            )}
          </>
        )}
      </QueryState>
    </PortalShell>
  );
}
