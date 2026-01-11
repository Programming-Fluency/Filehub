import { z } from "zod";

export const onboardingFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be at most 50 characters"),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Username is required")
    .max(50, "Username must be at most 50 characters")
    .regex(
      /^[a-z0-9_-]+$/,
      "Username can only contain lowercase letters, numbers, hyphens, and underscores"
    ),
  email: z.email({ pattern: z.regexes.email }),
});

export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;
