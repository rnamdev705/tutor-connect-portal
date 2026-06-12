"use client";

import { useQuery } from "@tanstack/react-query";
import { tutorsApi } from "@/lib/api";
import type { TutorListQuery } from "@/lib/api/types";
import { mapTutorProfile, mapTutorProfileSummary } from "@/lib/mappers/tutor";
import { queryKeys } from "@/lib/query/keys";

export function useTutors(query: TutorListQuery = {}) {
  return useQuery({
    queryKey: queryKeys.tutors.list(query),
    queryFn: async () => {
      const response = await tutorsApi.listTutors(query);
      return {
        ...response,
        data: response.data.map(mapTutorProfileSummary),
      };
    },
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
