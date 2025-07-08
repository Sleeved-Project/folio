import { z } from 'zod';

export const folioNameSchema = z.object({
  name: z
    .string()
    .min(1, 'Folio name is required')
    .max(30, 'Folio name must be 100 characters or less')
    .trim(),
});

export type FolioNameFormValues = z.infer<typeof folioNameSchema>;
