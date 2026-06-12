import type { DocumentMeta, TutorProfile, TutorProfileSummary } from "@/lib/api/types";
import { DEFAULT_USER_AVATAR } from "@/lib/constants";
import type { Tutor } from "@/lib/types/domain";

function inferSubjects(profile: TutorProfileSummary): string[] {
  const fromExperience = profile.experiences
    .flatMap((line) => line.split(/[,·]/))
    .map((s) => s.trim())
    .filter((s) => s.length > 2 && s.length < 40);

  return fromExperience.length > 0 ? fromExperience.slice(0, 4) : ["General tuition"];
}

export function mapTutorProfileSummary(profile: TutorProfileSummary): Tutor {
  return {
    id: profile.id,
    tutorUserId: profile.tutorId,
    name: profile.displayName,
    title: profile.qualifications[0] ?? "Tutor",
    rate: "See profile",
    rating: 5,
    reviews: 0,
    experience: profile.experiences.join(" · "),
    subjects: inferSubjects(profile),
    image: DEFAULT_USER_AVATAR,
    verified: true,
    bio: profile.experiences.join("\n"),
    qualifications: profile.qualifications,
    experiences: profile.experiences,
  };
}

export function mapTutorProfile(
  profile: TutorProfile,
  documents: DocumentMeta[] = [],
): Tutor {
  const base = mapTutorProfileSummary(profile);

  return {
    ...base,
    credentials: documents.map((doc) => ({
      icon: doc.mimeType.includes("pdf") ? "description" : "badge",
      title: doc.originalName,
      meta: `Uploaded ${new Date(doc.createdAt).toLocaleDateString()}`,
      documentId: doc.id,
    })),
  };
}
