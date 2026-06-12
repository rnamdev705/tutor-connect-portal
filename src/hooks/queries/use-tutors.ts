"use client";

import { useQuery } from "@tanstack/react-query";
import { tutorsApi } from "@/lib/api";
import type { TutorListQuery } from "@/lib/api/types";
import { mapTutorProfile, mapTutorProfileSummary } from "@/lib/mappers/tutor";
import { queryKeys } from "@/lib/query/keys";

export function useTutors(query: TutorListQuery & { enabled?: boolean } = {}) {
  const { enabled = true, ...listQuery } = query;

  return useQuery({
    queryKey: queryKeys.tutors.list(listQuery),
    queryFn: async () => {
      const response = await tutorsApi.listTutors(listQuery);
      return {
        ...response,
        data: response.data.map(mapTutorProfileSummary),
      };
    },
    enabled,
  });
}

export function useTutorProfile(profileId: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.tutors.detail(profileId),
    queryFn: async () => {
      const [profile, documents] = await Promise.all([
        tutorsApi.getTutorProfile(profileId),
        tutorsApi.listTutorProfileDocuments(profileId),
      ]);
      return mapTutorProfile(profile, documents.data);
    },
    enabled: Boolean(profileId) && enabled,
  });
}

export function useMyTutorProfile() {
  return useQuery({
    queryKey: queryKeys.tutors.me,
    queryFn: () => tutorsApi.getMyTutorProfile(),
    retry: false,
  });
}
