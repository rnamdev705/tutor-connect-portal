import type { Case, CaseDetail as ApiCaseDetail, CaseStatus as ApiCaseStatus, DocumentMeta } from "@/lib/api/types";
import { DEFAULT_USER_AVATAR } from "@/lib/constants";
import type { CaseDetail, CaseDocument, CaseItem, CaseStatus, InvitedTutor } from "@/lib/types/domain";

const ACCENT_COLORS = ["bg-secondary", "bg-tertiary-fixed", "bg-primary-container"] as const;

const STATUS_LABEL: Record<ApiCaseStatus, CaseStatus> = {
  OPEN: "Open",
  MATCHED: "Matched",
  CLOSED: "Closed",
};

function formatRate(budgetPerHour: number) {
  return `$${budgetPerHour}/hr`;
}

function shortCaseId(id: string) {
  return id.replace(/-/g, "").slice(0, 5).toUpperCase();
}

function formatRelativeDate(iso: string) {
  const date = new Date(iso);
  const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function mimeToIcon(mime: string) {
  if (mime.includes("pdf")) return "picture_as_pdf";
  if (mime.includes("image")) return "image";
  if (mime.includes("word") || mime.includes("document")) return "description";
  return "attach_file";
}

export function mapCaseToListItem(item: Case, index = 0): CaseItem {
  return {
    id: item.id,
    caseId: shortCaseId(item.id),
    title: item.title,
    status: STATUS_LABEL[item.status],
    level: item.level,
    subject: item.subject,
    location: item.location,
    rate: formatRate(item.budgetPerHour),
    accent: ACCENT_COLORS[index % ACCENT_COLORS.length],
    closed: item.status === "CLOSED",
  };
}

function mapDocument(doc: DocumentMeta): CaseDocument {
  return {
    id: doc.id,
    name: doc.originalName,
    icon: mimeToIcon(doc.mimeType),
    size: formatFileSize(doc.sizeBytes),
    uploader: "Case member",
  };
}

function mapInvitation(inv: ApiCaseDetail["invitations"][number]): InvitedTutor {
  return {
    id: inv.tutorId,
    profileId: inv.tutor.profileId ?? undefined,
    name: inv.tutor.displayName ?? inv.tutor.email,
    status: "Pending",
    subtitle: inv.tutor.email,
    image: DEFAULT_USER_AVATAR,
    active: true,
  };
}

export function mapCaseDetail(
  detail: ApiCaseDetail,
  documents: DocumentMeta[],
  index = 0,
): CaseDetail {
  const base = mapCaseToListItem(detail, index);

  return {
    ...base,
    createdAgo: formatRelativeDate(detail.createdAt),
    subjectLevel: `${detail.level} · ${detail.subject}`,
    budgetRange: formatRate(detail.budgetPerHour),
    schedule: "Flexible — to be arranged with tutor",
    requirementNotes: `Tuition case for ${detail.subject} at ${detail.level} level.`,
    documents: documents.map(mapDocument),
    invitedTutors: detail.invitations.map(mapInvitation),
  };
}
