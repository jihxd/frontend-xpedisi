import * as z from 'zod'

export const registerValidationSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username harus minimal 3 karakter' }),
    email: z.string().email({ message: 'Email tidak valid' }),
    password: z
      .string()
      .min(6, { message: 'Password harus minimal 6 karakter' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Konfirmasi password harus sama' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password dan konfirmasi password harus sama',
  })
