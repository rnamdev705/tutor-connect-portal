"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Tutor } from "@/lib/data";

export function TutorCard({ tutor }: { tutor: Tutor }) {
  const [invited, setInvited] = useState(false);

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 card-shadow transition-all group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary" />
      <div className="flex gap-6">
        <div className="shrink-0">
          <div className="w-24 h-24 rounded-full border-2 border-surface-container overflow-hidden relative">
            <Image src={tutor.image} alt={tutor.name} fill className="object-cover" />
          </div>
          <div className="mt-3 flex justify-center">
            {tutor.verified ? (
              <span className="bg-tertiary-fixed text-on-tertiary-fixed text-label-sm px-3 py-1 rounded-full font-bold flex items-center gap-1">
                <Icon name="verified" size={14} filled />
                Verified
              </span>
            ) : (
              <span className="bg-outline-variant text-on-surface-variant text-label-sm px-3 py-1 rounded-full font-bold flex items-center gap-1">
                <Icon name="pending" size={14} />
                Reviewing
              </span>
            )}
          </div>
        </div>
        <div className="grow">
          <div className="flex justify-between items-start">
            <h3 className="text-headline-sm text-primary">{tutor.name}</h3>
            <div className="text-right">
              <p className="text-label-md text-secondary">{tutor.rate}</p>
              <div className="flex items-center text-on-surface-variant">
                <Icon name="star" size={16} className="text-amber-500" filled />
                <span className="text-label-sm ml-1">
                  {tutor.rating} ({tutor.reviews})
                </span>
              </div>
            </div>
          </div>
          <p className="text-body-sm text-on-surface mt-1">{tutor.title}</p>
          <div className="flex items-center gap-1 mt-3 text-on-surface-variant">
            <Icon name="history" size={18} />
            <span className="text-body-sm">{tutor.experience}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-1">
            {tutor.subjects.map((s) => (
              <span
                key={s}
                className="bg-surface-container-low px-3 py-1 rounded text-label-sm text-on-surface-variant"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 flex gap-3 border-t border-outline-variant pt-6">
        <Link
          href={`/tutors/${tutor.id}`}
          className="grow bg-primary text-on-primary text-label-md py-3 rounded uppercase hover:opacity-90 transition-opacity text-center"
        >
          View Profile
        </Link>
        <button
          type="button"
          onClick={() => setInvited(true)}
          className={`px-6 border text-label-md rounded uppercase transition-colors flex items-center gap-1 ${
            invited
              ? "bg-tertiary-fixed text-on-tertiary-fixed border-tertiary-fixed"
              : "border-secondary text-secondary hover:bg-secondary-container hover:text-on-secondary-container"
          }`}
        >
          <Icon name={invited ? "check" : "send"} size={20} />
          {invited ? "Sent" : "Invite"}
        </button>
      </div>
    </div>
  );
}
