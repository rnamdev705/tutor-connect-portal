import { DEFAULT_USER_AVATAR } from "./constants";

export type Tutor = {
  id: string;
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
  credentials?: { icon: string; title: string; meta: string }[];
  languages?: string[];
  quickDetails?: { label: string; value: string }[];
};

export type CaseStatus = "Open" | "Matched" | "Closed";

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

export const tutors: Tutor[] = [
  {
    id: "sarah-jenkins",
    name: "Dr. Sarah Jenkins",
    title: "PhD in Pure Mathematics, Oxford",
    rate: "$65/hr",
    rating: 4.9,
    reviews: 124,
    experience: "8 years experience",
    subjects: ["Further Maths", "AP Calculus", "Linear Algebra"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2nlLNe5n8NKJuabpFdMwjvOKLy8hPDohQHqIhs0ySUdR5hCq3pA4ZKgFjQoA5G7zw9iLBYNU4FPlOfXLjlo2d7wvwLEYVJcCxhq5fqUUqXGfTT32L2G3UW5ULFiUyCTA7vrY5fJFyVvETBhJZuhky1oAjQ3WQI3NulTsS1DgOypFksToxxP4Ipf5wKLb29v5x-NIfG1nsER0yQfJITvbq8H_7wJwTo0t3GkvGdDOareaQqXW1WFdiWAMs546seUkZBzFEKXy4z7g",
    verified: true,
    location: "London, UK (Remote Available)",
    degree: "PHD IN MATHEMATICS",
    bio: "With a doctorate from Imperial College London, I have spent the last decade bridging the gap between theoretical mathematics and practical student achievement.",
    languages: ["English (Native)", "French (Professional)"],
    credentials: [
      { icon: "description", title: "Imperial College PhD Certificate", meta: "Verified on Sep 12, 2023" },
      { icon: "verified_user", title: "Enhanced DBS Check", meta: "Valid until Oct 2025" },
      { icon: "workspace_premium", title: "Higher Education Teaching Cert", meta: "Verified Institutional" },
    ],
    quickDetails: [
      { label: "Availability", value: "3 Slots Left" },
      { label: "Response Time", value: "~ 2 hours" },
      { label: "Total Lessons", value: "1,450+" },
      { label: "Education", value: "PhD, Imperial" },
    ],
  },
  {
    id: "marcus-thorne",
    name: "Marcus Thorne",
    title: "BSc Physics, Imperial College London",
    rate: "$50/hr",
    rating: 4.8,
    reviews: 89,
    experience: "5 years experience",
    subjects: ["Quantum Physics", "GCSE Science"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmW109BgLrcK16hmt37Wdj52MU2bWLfUeWECt76yqBwPBS6qcxZ-lhnVtlvbjvd6bI4WjFdZ3ZCKEENx2WZlkbrYgyt7A6ZTDE0agwCPCzcSLvEc3dTiQJ_CNd1CYVu5XuJqVbziyBvvTwp5Gzu79sTcEleJd4uj9umgpidqsMSGflQaJ4m08D4LOZuM4nfK-xMqNPjjr3wOWMSwMFkjGxp5W_vuRTMxhqqzoNfRb3WxwBSk5FAZDi1G7n7327PpF2B2ivQQ62tRY",
    verified: true,
    bio: "Experienced physics tutor specializing in O-Level and A-Level preparation with a focus on mechanics and electromagnetism.",
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    title: "MA Applied Linguistics, Stanford",
    rate: "$45/hr",
    rating: 5.0,
    reviews: 56,
    experience: "6 years experience",
    subjects: ["Spanish", "ESL", "SAT English"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCwgzTQLr39FzTj4-gyOFJNmTPCWEnDJFjd_EMuZ5PExFHmkV4vVboDKIgW53g9ZFIjrUksIoSGIT3YJUfGRQn9mIKf_QTMIs1c6KIOMLFkAkcGQJx1XM4vUQLBqKfExOh1BZiXBKPiIRGLaS8KtrT4WhAme7spi0TG_Xy7B8GG5d3Cpntz4z5MiGUHjgvMWGrLe0ezDhHfXKR8YF-Nfxk4_g4XrseaF6C6zivVlkvsOOlmqos9AqVBDY3aQP9YDLwbBg6XARCim28",
    verified: true,
  },
  {
    id: "simon-wu",
    name: "Simon Wu",
    title: "MSc Computer Science, NUS",
    rate: "$55/hr",
    rating: 4.7,
    reviews: 42,
    experience: "4 years experience",
    subjects: ["Python", "Data Science"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCBWg31csJGDYiAYr8hbKzkqSdVuNtMh3gs7qUU8wL51pvA0pULfonmDVv1t_MAkEax23Z2xXZDQBZF6aSGLaLKOWUgz3FJ0a_SWjhvqXILmhGLSACbAeY6OFNLQ3QS_WkZFP32gTiL_SwdRobzj-zPyeHlwxgSIdUCz72S0VHzrj7mUdk9oFttpJOsdi5DgJTOk5ixKcjqofhZl1J8PdVlTngp7LHHae5WBfDoeCi96w-_gs8ZSGpQ2JQaDpoB4k2KzWnioqE4TtY",
    verified: false,
  },
];

export const cases: CaseItem[] = [
  {
    id: "49281",
    title: "Weekly P5 Math Tuition",
    status: "Open",
    caseId: "#49281",
    level: "Primary 5",
    subject: "Mathematics",
    location: "Jurong East, SG",
    rate: "$45/hr",
    accent: "bg-on-surface-variant",
  },
  {
    id: "48102",
    title: "Intensive O-Level Physics",
    status: "Matched",
    caseId: "#48102",
    level: "Secondary 4",
    subject: "Physics",
    location: "Bishan, SG",
    rate: "$60/hr",
    accent: "bg-tertiary-fixed",
  },
  {
    id: "47993",
    title: "Creative Writing Workshop",
    status: "Closed",
    caseId: "#47993",
    level: "Primary 3-4",
    subject: "English",
    location: "Online",
    rate: "$35/hr",
    accent: "bg-outline-variant",
    closed: true,
  },
];

const caseDetails: Record<string, Omit<CaseDetail, keyof CaseItem>> = {
  "48102": {
    createdAgo: "2 days ago",
    subjectLevel: "Physics (O-Level/Sec 4)",
    budgetRange: "$60 - $85 / hr",
    schedule: "Sundays, 2:00 PM - 4:00 PM",
    requirementNotes:
      "Looking for a tutor specialized in Electromagnetism and Kinetic Theory of Matter. Student is currently scoring B3 and aiming for A1 in the preliminary examinations.",
    documents: [
      {
        id: "doc-1",
        name: "Sec_4_Mock_Results.pdf",
        icon: "picture_as_pdf",
        size: "1.2 MB",
        uploader: "You (Parent)",
        initials: "JD",
      },
      {
        id: "doc-2",
        name: "Tutor_MOE_Certificate.jpg",
        icon: "badge",
        size: "3.4 MB",
        uploader: "Dr. Marcus Lim",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAY11uolYUcer9WYKwvJDppRbs94tdXGmSwGxkq-fWRZbIBimSr5KmTegXUdVtVK8gyPz84QFw-BteIgxJGoDaGWgDGJH5bsoJVgAjWpMj64RKtS4Kz5137OzUyCNmd6E5pmC4hpcRVZp-zlL7BaclApJPXBBvJUKhF1xlKVSu-wxIYb5DRtwldXrKEPTf55ZM_KAKUYJGq87N9WlZ56EtBtwKTO94WI4T7Qc1jNXXwhTmEYAmiuMrobu47i0pe0vazxutpROjolY8",
      },
    ],
    invitedTutors: [
      {
        id: "marcus-thorne",
        name: "Dr. Marcus Lim",
        status: "MATCHED",
        subtitle: "Ex-RI Physics HOD • 12 yrs exp",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBBGVTXs7ki3mW75PeZ551GetGYJRllCwZ0c6AIXUpUD9tKOnOo6r5pUU7K8lMtOp5bM2ZviqC9YyEwB96Pb-f62IPFM9Q9I9ccPEywmaKmrX6Pmf5YL3ElcmJoWFamu3nC9pe0-yV4eTeYkAcOYE2hHPOTIyAm05De1qe4lwkrh20RMiyrGoN_dLwlcxJcHjWG8cTDNDEBajcmtrAWwDRbSNbB55o3OcElR2PkNet7BtHzYm2RPgFXEB2JAx2PkTieug9MfrMv3oI",
        active: true,
      },
      {
        id: "chen-wei",
        name: "Ms. Chen Wei",
        status: "Pending",
        subtitle: "National University of Singapore • BSc Physics",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAJywwDt3IlOozAiysyLFKmZE-umfQk20oPPR34o9KzB5PBz0V9EN4tEr8oBIZCY6t9OdHapX35j0zuOurr7sPqU--k09WZ0OgCjiWCRA0xiamAgcTVaC7QKRa-t44X__0LL7r7D6jfF6dQ3-hw1ECvJufXbZAh8TrfuzoxkfBsIWvS1pkA3cMNx4OzoaVQ4l5pxTj17NfFc1GrBClgll6yQ2T8V3rMcmpXC4YVb9qfwXhCQr81ITj8hqJG86iwqYE17zmrmY8bnPk",
        grayscale: true,
      },
      {
        id: "david-tan",
        name: "Mr. David Tan",
        status: "Declined",
        subtitle: "Full-time Professional Tutor • 8 yrs exp",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCbm8y9B2uNLjXFhmvoiP9oK98xj1tC_VaE8j6P7fgACH-fL8v_mMRQN3ZSXncH3yBk7TAAlzfW2DmXZqaCROj3YQf2TeggY1KmBJWLg-6a7eOnkm4y7t5klApQ5KrUDUqpO_MgJVoG4CWCKyChDbYLsvn2E-5DLAqMtBYTjvs5xF7WJQ7ON3qd8TB_8rqKBFTr5ppVGSIc62-9rCpPmxMiZtgBCUmn1sD39guBHpxeb1szd9D6wquywrU7KoTwjKUXBCMMIyaKSHo",
        grayscale: true,
      },
    ],
  },
};

export function getTutor(id: string): Tutor | undefined {
  return tutors.find((t) => t.id === id);
}

function createDefaultCaseDetail(summary: CaseItem): CaseDetail {
  return {
    ...summary,
    createdAgo: "Recently",
    subjectLevel: `${summary.subject} (${summary.level})`,
    budgetRange: summary.rate,
    schedule: "To be scheduled",
    requirementNotes: `Tuition support for ${summary.subject} at ${summary.level} level in ${summary.location}.`,
    documents: [],
    invitedTutors: [],
  };
}

export function getCase(id: string): CaseDetail | undefined {
  const summary = cases.find((c) => c.id === id);
  if (!summary) return undefined;

  const detail = caseDetails[id];
  return detail ? { ...summary, ...detail } : createDefaultCaseDetail(summary);
}

export function getDashboardStats() {
  const activeCases = cases.filter((c) => c.status === "Open").length;
  return [
    { icon: "pending_actions", value: String(activeCases).padStart(2, "0"), label: "Active Cases" },
    { icon: "person_search", value: "12", label: "Invited Tutors" },
    { icon: "verified_user", value: "02", label: "Pending Documents" },
  ];
}

export { DEFAULT_USER_AVATAR };
