"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tutorsApi, documentsApi } from "@/lib/api";
import type { UpsertTutorProfileRequest } from "@/lib/api/types";
import { queryKeys } from "@/lib/query/keys";

export function useUpsertMyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpsertTutorProfileRequest) => tutorsApi.upsertMyTutorProfile(input),
    onSuccess: (profile) => {
      queryClient.setQueryData(queryKeys.tutors.me, profile);
      queryClient.invalidateQueries({ queryKey: queryKeys.tutors.me });
      queryClient.invalidateQueries({ queryKey: queryKeys.tutors.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.tutors.detail(profile.id) });
    },
  });
}

export function useUploadProfileDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => tutorsApi.uploadMyProfileDocument(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tutors.me });
      queryClient.invalidateQueries({ queryKey: queryKeys.tutors.all });
    },
  });
}

export function useDownloadDocument() {
  return useMutation({
    mutationFn: ({ id, filename }: { id: string; filename: string }) =>
      documentsApi.downloadDocument(id, filename),
  });
}
