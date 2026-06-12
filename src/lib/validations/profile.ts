import { z } from "zod";

export const tutorProfileSchema = z.object({
  displayName: z.string().min(1, "Display name is required").max(100),
  qualifications: z.string().min(1, "Add at least one qualification"),
  experiences: z.string().min(1, "Add at least one experience"),
});

export type TutorProfileFormValues = z.infer<typeof tutorProfileSchema>;
