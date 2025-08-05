import { z } from 'zod';

// Schema pour l'étape 1
export const stepOneSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Le nom ne peut contenir que des lettres et des espaces'),
});

// Schema pour l'étape 2
export const stepTwoSchema = z.object({
  choice: z
    .string()
    .min(1, 'Veuillez sélectionner une option')
    .refine((val) => ['A', 'B'].includes(val), {
      message: 'Option invalide',
    }),
});

// Schema complet du formulaire
export const sellFormSchema = z.object({
  name: stepOneSchema.shape.name,
  choice: stepTwoSchema.shape.choice,
});

// Types générés automatiquement
export type StepOneFormData = z.infer<typeof stepOneSchema>;
export type StepTwoFormData = z.infer<typeof stepTwoSchema>;
export type SellFormData = z.infer<typeof sellFormSchema>;
