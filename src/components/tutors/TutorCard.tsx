"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { InviteToCaseDialog } from "@/components/tutors/InviteToCaseDialog";
import { Badge, Button, Card, Icon, Tag, buttonClassName } from "@/components/ui";
import { useAuth } from "@/lib/auth/AuthProvider";
import { ROUTES } from "@/lib/constants";
import type { Tutor } from "@/lib/types/domain";

type TutorCardProps = {
  tutor: Tutor;
  showInvite?: boolean;
};

export function TutorCard({ tutor, showInvite = false }: TutorCardProps) {
  const { user } = useAuth();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [invited, setInvited] = useState(false);
  const canInvite = showInvite && user?.role === "PARENT";

  return (
    <>
      <Card className="group relative overflow-hidden" padding="md">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary" />
        <div className="flex gap-6">
          <div className="shrink-0">
            <div className="w-24 h-24 rounded-full border-2 border-surface-container overflow-hidden relative">
              <Image src={tutor.image} alt={tutor.name} fill className="object-cover" />
            </div>
            <div className="mt-3 flex justify-center">
              <Badge
                variant={tutor.verified ? "verified" : "reviewing"}
                icon={tutor.verified ? "verified" : "pending"}
                filledIcon={tutor.verified}
                className="font-bold"
              >
                {tutor.verified ? "Verified" : "Reviewing"}
              </Badge>
            </div>
          </div>
          <div className="grow">
            <div className="flex justify-between items-start">
              <h3 className="text-headline-sm text-primary">{tutor.name}</h3>
              <p className="text-label-md text-secondary">{tutor.rate}</p>
            </div>
            <p className="text-body-sm text-on-surface mt-1">{tutor.title}</p>
            <div className="flex items-center gap-1 mt-3 text-on-surface-variant">
              <Icon name="history" size={18} />
              <span className="text-body-sm">{tutor.experience}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-1">
              {tutor.subjects.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex gap-3 border-t border-outline-variant pt-6">
          <Link
            href={ROUTES.tutor(tutor.id)}
            className={buttonClassName({ variant: "primary", uppercase: true, className: "grow" })}
          >
            View Profile
          </Link>
          {canInvite && (
            <Button
              variant={invited ? "success" : "outline"}
              uppercase
              onClick={() => setInviteOpen(true)}
            >
              <Icon name={invited ? "check" : "send"} size={20} />
              {invited ? "Sent" : "Invite"}
            </Button>
          )}
        </div>
      </Card>

      {canInvite && (
        <InviteToCaseDialog
          open={inviteOpen}
          tutorUserId={tutor.tutorUserId}
          tutorName={tutor.name}
          onClose={() => setInviteOpen(false)}
          onSuccess={() => setInvited(true)}
        />
      )}
    </>
  );
}
