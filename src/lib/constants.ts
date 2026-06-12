export const BRAND_NAME = "EduMatch";

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  tutors: "/tutors",
  profile: "/profile",
  tutor: (id: string) => `/tutors/${id}`,
  case: (id: string) => `/cases/${id}`,
} as const;

export const CASE_SUBJECTS = ["Math", "English", "Chinese", "Physics", "Chemistry", "Biology"] as const;

export const CASE_LEVELS = [
  "P1",
  "P2",
  "P3",
  "P4",
  "P5",
  "P6",
  "S1",
  "S2",
  "S3",
  "S4",
  "S5",
  "JC1",
  "JC2",
] as const;

export const DEFAULT_USER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuACyNmVm-MlVU4ymLQoabDtnpMXjPeh7DOhldWI3nk1hsppE4IcikIKBcC32FLe95FmIonzq-Zp5TVWPt6r7MD4j_vlISHPTgmdQGNPWmtWFI6jD0d0jiybG4Os1An2DNHgdFHazSQd10hYe-P2Q6KZDkkfWu8PPOzaW99zfSeiSeeNXfGc5X8om6cMk-TQCNHZooz3VSkLxlGz7kruksLGNZlk2Rr2z0zHg8osGaNumsNTtritSGu_lvLz-lA1NmoUGybXoCYNt74";

export const OAUTH_GOOGLE_ICON =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD6GyKwKvkkjtuPpVMX6HeTWEf6fAmyuMEJNATfFfFAFuKQ58WNblXELmJwwJxFIINbHwzB5l-7-cSbP_lQrlHD3zjpcUDVSRnV2dK3ndFRqwpUBmuGVFQR6pQcOX74ayH9NlFl7Zqsi3--Dzi3RJzUsGJfZ3xbYEcbEs5JBdZ8qbCsGr_n6ZW8flmRxld6AVPc18EcyzlCvbS88ZCK7_kl_M8rwRB-XiozDKyFF59C1BrtD3UO7nLFh-vBH-nOSixXfLsaoGZoJxo";

export const AUTH_ROLES = ["parent", "tutor"] as const;
export type AuthRole = (typeof AUTH_ROLES)[number];

export const ROLE_OPTIONS: { value: AuthRole; label: string }[] = [
  { value: "parent", label: "Parent" },
  { value: "tutor", label: "Tutor" },
];
