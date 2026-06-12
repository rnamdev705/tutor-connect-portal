import { apiRequest, apiRequestBlob } from "./client";
import type { DocumentListResponse, DocumentMeta } from "./types";

export function listCaseDocuments(caseId: string) {
  return apiRequest<DocumentListResponse>(`/cases/${caseId}/documents`);
}

export function uploadCaseDocument(caseId: string, file: File) {
  const form = new FormData();
  form.append("file", file);
  return apiRequest<DocumentMeta>(`/cases/${caseId}/documents`, {
    method: "POST",
    body: form,
  });
}

export async function downloadDocument(documentId: string, filename: string) {
  const blob = await apiRequestBlob(`/documents/${documentId}/download`);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
