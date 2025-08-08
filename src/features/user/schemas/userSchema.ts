import { z } from 'zod';

export const userProfileSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters')
    .nullable(),
  lastname: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters')
    .nullable(),
  phone: z
    .string()
    .trim()
    .regex(
      /^\+(?:[0-9] ?){6,14}[0-9]$/,
      'Phone number must follow E.164 format (e.g. +33612345678)'
    )
    .nullable(),
  description: z.string().trim().max(500, 'Description must be at most 500 characters').nullable(),
});

export type UserProfileFormValues = z.infer<typeof userProfileSchema>;
