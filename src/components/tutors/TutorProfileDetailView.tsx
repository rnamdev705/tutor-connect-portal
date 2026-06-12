"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QueryState } from "@/components/common/QueryState";
import { PortalHeader } from "@/components/layout/PortalHeader";
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
    <div className="bg-background text-on-surface min-h-screen">
      <PortalHeader active="tutors" />
      <main className="max-w-7xl mx-auto px-6 py-10">
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
                className="mb-10 flex flex-col md:flex-row items-start md:items-center gap-10 relative overflow-hidden"
              >
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-surface shadow-sm relative">
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
                <div className="flex-1 space-y-2">
                  <h1 className="text-headline-lg text-on-surface">{tutor.name}</h1>
                  <p className="text-body-lg text-on-surface-variant max-w-2xl">{tutor.title}</p>
                  <div className="flex flex-wrap gap-6 text-on-surface-variant">
                    <div className="flex items-center gap-1">
                      <Icon name="history" className="text-secondary" />
                      <span className="text-label-md">{tutor.experience}</span>
                    </div>
                  </div>
                </div>
                {isParent && (
                  <div className="flex flex-col gap-3 w-full md:w-auto">
                    <Button
                      variant="secondary"
                      uppercase
                      className="py-6 px-10 shadow-md"
                      onClick={() => setInviteOpen(true)}
                    >
                      <Icon name="send" />
                      INVITE TO CASE
                    </Button>
                  </div>
                )}
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                  <Card variant="profile" padding="lg">
                    <h2 className="text-headline-sm text-on-surface mb-6">Qualifications</h2>
                    <ul className="space-y-2 text-body-md text-on-surface-variant">
                      {(tutor.qualifications ?? []).map((q) => (
                        <li key={q}>• {q}</li>
                      ))}
                    </ul>
                    <h2 className="text-headline-sm text-on-surface mb-4 mt-10">Experience</h2>
                    <ul className="space-y-2 text-body-md text-on-surface-variant">
                      {(tutor.experiences ?? []).map((e) => (
                        <li key={e}>• {e}</li>
                      ))}
                    </ul>
                    <div className="mt-10">
                      <h3 className="text-label-md text-primary mb-2">Subjects</h3>
                      <div className="flex flex-wrap gap-1">
                        {tutor.subjects.map((s) => (
                          <Tag key={s} className="bg-surface-container-lowest border border-outline-variant">
                            {s}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {credentials.length > 0 && (
                    <Card variant="profile" padding="lg">
                      <h2 className="text-headline-sm text-on-surface mb-6">Supporting documents</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {credentials.map((doc) => (
                          <button
                            key={doc.title}
                            type="button"
                            className="flex items-center p-6 border border-outline-variant rounded-xl hover:border-secondary transition-all cursor-pointer bg-surface-container-lowest group text-left"
                            onClick={() => {
                              if (doc.documentId) {
                                download.mutate({ id: doc.documentId, filename: doc.title });
                              }
                            }}
                            disabled={!doc.documentId || download.isPending}
                          >
                            <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center mr-6 shrink-0">
                              <Icon name={doc.icon} className="text-secondary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-label-md text-on-surface">{doc.title}</p>
                              <p className="text-label-sm text-on-surface-variant">{doc.meta}</p>
                            </div>
                            <Icon name="download" className="text-outline-variant group-hover:text-secondary shrink-0" />
                          </button>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>

                <Link
                  href={ROUTES.tutors}
                  className="block text-center text-secondary text-label-md hover:underline h-fit"
                >
                  ← Back to Directory
                </Link>
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
      </main>
    </div>
  );
}
