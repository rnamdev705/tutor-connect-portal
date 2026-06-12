"use client";

import { useQuery } from "@tanstack/react-query";
import { casesApi, documentsApi } from "@/lib/api";
import type { CaseListQuery } from "@/lib/api/types";
import { mapCaseDetail } from "@/lib/mappers/case";
import { queryKeys } from "@/lib/query/keys";

export function useCases(query: CaseListQuery = {}) {
  return useQuery({
    queryKey: queryKeys.cases.list(query),
    queryFn: () => casesApi.listCases(query),
  });
}

export function useCaseDetail(caseId: string) {
  return useQuery({
    queryKey: queryKeys.cases.detail(caseId),
    queryFn: async () => {
      const [detail, documents] = await Promise.all([
        casesApi.getCase(caseId),
        documentsApi.listCaseDocuments(caseId),
      ]);
      return mapCaseDetail(detail, documents.data);
    },
    enabled: Boolean(caseId),
  });
}
