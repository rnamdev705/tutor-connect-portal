/** View models used by UI components (mapped from API responses). */

export type CaseStatus = "Open" | "Matched" | "Closed";

export type Tutor = {
  id: string;
  tutorUserId: string;
  name: string;
  title: string;
  rate: string;
  rating: number;
  reviews: number;
  experience: string;
  subjects: string[];
  image: string;
  verified: boolean;
  location?: string;
  degree?: string;
  bio?: string;
  qualifications?: string[];
  experiences?: string[];
  credentials?: {
    icon: string;
    title: string;
    meta: string;
    documentId?: string;
  }[];
  languages?: string[];
  quickDetails?: { label: string; value: string }[];
};

export type CaseItem = {
  id: string;
  title: string;
  status: CaseStatus;
  caseId: string;
  level: string;
  subject: string;
  location: string;
  rate: string;
  accent: string;
  closed?: boolean;
};

export type CaseDocument = {
  id: string;
  name: string;
  icon: string;
  size: string;
  uploader: string;
  initials?: string;
  image?: string;
};

export type InvitedTutor = {
  id: string;
  profileId?: string;
  name: string;
  status: "MATCHED" | "Pending" | "Declined";
  subtitle: string;
  image: string;
  active?: boolean;
  grayscale?: boolean;
};

export type CaseDetail = CaseItem & {
  createdAgo: string;
  subjectLevel: string;
  budgetRange: string;
  schedule: string;
  requirementNotes: string;
  documents: CaseDocument[];
  invitedTutors: InvitedTutor[];
};

export type DashboardStat = {
  icon: string;
  value: string;
  label: string;
};
