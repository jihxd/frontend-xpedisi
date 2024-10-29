import { z } from 'zod'

export const loginValidationSchema = z.object({
  username: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export type LoginFormData = z.infer<typeof loginValidationSchema>
