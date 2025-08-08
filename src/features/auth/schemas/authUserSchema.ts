import { z } from 'zod';

const passwordField = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(64, 'Password must be at most 64 characters')
  .regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,64}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  );

export const signupEmailSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
});

export const signupPasswordSchema = z.object({
  password: passwordField,
});

export const signupUsernameSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
});

export type SignupEmailFormValues = z.infer<typeof signupEmailSchema>;
export type SignupPasswordFormValues = z.infer<typeof signupPasswordSchema>;
export type SignupUsernameFormValues = z.infer<typeof signupUsernameSchema>;

export const signinSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});
export type SigninFormValues = z.infer<typeof signinSchema>;
