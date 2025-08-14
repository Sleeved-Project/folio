import { z } from 'zod';

export const stepPhotoSchema = z.object({
  rectoImage: z.string().min(1, 'Recto image is required'),
  versoImage: z.string().min(1, 'Verso image is required'),
});

export const stepOneSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name cannot exceed 50 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Name can only contain letters and spaces'),
});

export const stepTwoSchema = z.object({
  choice: z
    .string()
    .min(1, 'Please select an option')
    .refine((val) => ['A', 'B'].includes(val), {
      message: 'Invalid option',
    }),
});

export const sellFormSchema = z.object({
  rectoImage: stepPhotoSchema.shape.rectoImage,
  versoImage: stepPhotoSchema.shape.versoImage,
  name: stepOneSchema.shape.name,
  choice: stepTwoSchema.shape.choice,
});

export type StepPhotoFormData = z.infer<typeof stepPhotoSchema>;
export type StepOneFormData = z.infer<typeof stepOneSchema>;
export type StepTwoFormData = z.infer<typeof stepTwoSchema>;
export type SellFormData = z.infer<typeof sellFormSchema>;
