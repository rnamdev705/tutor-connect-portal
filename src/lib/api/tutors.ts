import { apiRequest } from "./client";
import type {
  DocumentListResponse,
  DocumentMeta,
  TutorListQuery,
  TutorListResponse,
  TutorProfile,
  UpsertTutorProfileRequest,
} from "./types";

export function listTutors(query: TutorListQuery = {}) {
  return apiRequest<TutorListResponse>("/tutors", { query: query as Record<string, string | number> });
}

export function getTutorProfile(profileId: string) {
  return apiRequest<TutorProfile>(`/tutors/${profileId}`);
}

export function getMyTutorProfile() {
  return apiRequest<TutorProfile>("/tutors/me/profile");
}

export function upsertMyTutorProfile(input: UpsertTutorProfileRequest) {
  return apiRequest<TutorProfile>("/tutors/me/profile", { method: "PUT", body: input });
}

export function listTutorProfileDocuments(profileId: string) {
  return apiRequest<DocumentListResponse>(`/tutors/${profileId}/documents`);
}

export function uploadMyProfileDocument(file: File) {
  const form = new FormData();
  form.append("file", file);
  return apiRequest<DocumentMeta>("/tutors/me/profile/documents", {
    method: "POST",
    body: form,
  });
}
