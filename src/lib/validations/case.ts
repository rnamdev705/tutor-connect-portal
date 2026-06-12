import { z } from "zod";

export const createCaseSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  subject: z.string().min(1, "Subject is required").max(100),
  level: z.string().min(1, "Level is required").max(50),
  location: z.string().min(1, "Location is required").max(200),
  budgetPerHour: z.number().positive("Budget must be greater than 0"),
});

export type CreateCaseFormValues = z.infer<typeof createCaseSchema>;
