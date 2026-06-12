"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { casesApi, documentsApi } from "@/lib/api";
import type { CreateCaseRequest, InviteTutorRequest, UpdateCaseRequest } from "@/lib/api/types";
import { queryKeys } from "@/lib/query/keys";

export function useCreateCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateCaseRequest) => casesApi.createCase(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.all });
    },
  });
}

export function useUpdateCase(caseId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateCaseRequest }) =>
      casesApi.updateCase(id, input),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.detail(variables.id) });
      if (caseId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.cases.detail(caseId) });
      }
    },
  });
}

export function useInviteTutor(caseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: InviteTutorRequest) => casesApi.inviteTutor(caseId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.detail(caseId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.all });
    },
  });
}

export function useUploadCaseDocument(caseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => documentsApi.uploadCaseDocument(caseId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.detail(caseId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.documents(caseId) });
    },
  });
}

export function useDownloadDocument() {
  return useMutation({
    mutationFn: ({ id, filename }: { id: string; filename: string }) =>
      documentsApi.downloadDocument(id, filename),
  });
}
