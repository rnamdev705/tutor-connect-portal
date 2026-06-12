/** Mirrors TutorConnect API enums and DTOs (see tutorConnect-api Zod schemas). */

export type Role = "PARENT" | "TUTOR";

export type CaseStatus = "OPEN" | "MATCHED" | "CLOSED";

export type ApiErrorBody = {
  error: {
    message: string;
    code?: string;
    details?: Record<string, unknown>;
  };
};

export type User = {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

export type LoginUser = Pick<User, "id" | "email" | "role">;

export type LoginResponse = {
  token: string;
  user: LoginUser;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  role: Role;
  displayName: string;
};

export type Case = {
  id: string;
  title: string;
  subject: string;
  level: string;
  location: string;
  budgetPerHour: number;
  status: CaseStatus;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

export type CaseInvitation = {
  id: string;
  tutorId: string;
  createdAt: string;
  tutor: {
    id: string;
    email: string;
    displayName: string | null;
  };
};

export type CaseDetail = Case & {
  invitations: CaseInvitation[];
};

export type PaginatedMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type CaseListResponse = {
  data: Case[];
  meta: PaginatedMeta;
};

export type CaseListQuery = {
  page?: number;
  limit?: number;
  search?: string;
  subject?: string;
  level?: string;
  status?: CaseStatus;
};

export type CreateCaseRequest = {
  title: string;
  subject: string;
  level: string;
  location: string;
  budgetPerHour: number;
  status?: CaseStatus;
};

export type InviteTutorRequest = {
  tutorId: string;
};

export type DocumentMeta = {
  id: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  uploadedById: string;
  caseId: string | null;
  profileId?: string | null;
  createdAt: string;
};

export type DocumentListResponse = {
  data: DocumentMeta[];
};

export type TutorProfile = {
  id: string;
  tutorId: string;
  displayName: string;
  qualifications: string[];
  experiences: string[];
  createdAt: string;
  updatedAt: string;
};

export type TutorProfileSummary = Pick<
  TutorProfile,
  "id" | "tutorId" | "displayName" | "qualifications" | "experiences"
>;

export type TutorListResponse = {
  data: TutorProfileSummary[];
  meta: PaginatedMeta;
};

export type TutorListQuery = {
  page?: number;
  limit?: number;
  search?: string;
};

export type UpsertTutorProfileRequest = {
  displayName: string;
  qualifications: string[];
  experiences: string[];
};
