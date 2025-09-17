import z from 'zod';

export const buyerAddress = z.object({
  address: z.string().min(1, 'Address is required'),
  additionalInfo: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  country: z.string().min(1, 'Country is required'),
  countryCode: z.string().min(1, 'Country code is required'),
});
export type BuyerAddressFormValues = z.infer<typeof buyerAddress>;
