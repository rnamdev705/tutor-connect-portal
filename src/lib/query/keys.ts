import type { CaseListQuery, TutorListQuery } from "@/lib/api/types";

export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  cases: {
    all: ["cases"] as const,
    list: (query: CaseListQuery) => ["cases", "list", query] as const,
    detail: (id: string) => ["cases", "detail", id] as const,
    documents: (caseId: string) => ["cases", caseId, "documents"] as const,
  },
  tutors: {
    all: ["tutors"] as const,
    list: (query: TutorListQuery) => ["tutors", "list", query] as const,
    detail: (id: string) => ["tutors", "detail", id] as const,
    me: ["tutors", "me"] as const,
    documents: (profileId: string) => ["tutors", profileId, "documents"] as const,
  },
};
