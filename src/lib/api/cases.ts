import { apiRequest } from "./client";
import type {
  Case,
  CaseDetail,
  CaseListQuery,
  CaseListResponse,
  CreateCaseRequest,
  InviteTutorRequest,
} from "./types";

export function listCases(query: CaseListQuery = {}) {
  return apiRequest<CaseListResponse>("/cases", { query: query as Record<string, string | number> });
}

export function getCase(id: string) {
  return apiRequest<CaseDetail>(`/cases/${id}`);
}

export function createCase(input: CreateCaseRequest) {
  return apiRequest<Case>("/cases", { method: "POST", body: input });
}

export function inviteTutor(caseId: string, input: InviteTutorRequest) {
  return apiRequest(`/cases/${caseId}/invitations`, { method: "POST", body: input });
}

export function revokeInvitation(caseId: string, tutorId: string) {
  return apiRequest<void>(`/cases/${caseId}/invitations/${tutorId}`, { method: "DELETE" });
}
