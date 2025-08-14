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

export const StepCardInformationSchema = z.object({
  condition: z
    .string()
    .min(1, 'Please select a condition')
    .refine(
      (val) =>
        ['mint', 'near_mint', 'excellent', 'good', 'light_played', 'played', 'poor'].includes(val),
      {
        message: 'Invalid condition',
      }
    ),
  finish: z
    .string()
    .min(1, 'Please select a finish')
    .refine(
      (val) =>
        ['regular', 'foil', 'etched', 'borderless', 'extended_art', 'showcase'].includes(val),
      {
        message: 'Invalid finish',
      }
    ),
});

export const stepPriceSchema = z.object({
  price: z
    .string()
    .min(1, 'Price is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Price is not valid (ex: 10.50)')
    .refine((val) => parseFloat(val) > 0, 'Price should be up to 0'),
});

export const sellFormSchema = z.object({
  rectoImage: stepPhotoSchema.shape.rectoImage,
  versoImage: stepPhotoSchema.shape.versoImage,
  name: stepOneSchema.shape.name,
  condition: StepCardInformationSchema.shape.condition,
  finish: StepCardInformationSchema.shape.finish,
  price: stepPriceSchema.shape.price,
});

export type StepPhotoFormData = z.infer<typeof stepPhotoSchema>;
export type StepOneFormData = z.infer<typeof stepOneSchema>;
export type StepCardInformationFormData = z.infer<typeof StepCardInformationSchema>;
export type StepPriceFormData = z.infer<typeof stepPriceSchema>;
export type SellFormData = z.infer<typeof sellFormSchema>;
