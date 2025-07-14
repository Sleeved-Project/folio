import { z } from 'zod';

export const signupSchema = z
  .object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be at most 64 characters')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,64}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
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
