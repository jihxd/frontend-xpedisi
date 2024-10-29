import { z } from 'zod'

export const userValidationSchema = z.object({
  sender: z.string().min(3).max(20),
  receiver: z.string().min(3).max(20),
  address: z.string().min(3).max(100),
  date: z.date(),
  content: z.string().min(3).max(50),
})

export type UserFormData = z.infer<typeof userValidationSchema>
