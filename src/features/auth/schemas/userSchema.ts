import { z } from 'zod';

export const signupSchema = z
  .object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    verifyPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "Passwords don't match",
    path: ['verifyPassword'],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type SigninFormValues = z.infer<typeof signinSchema>;
