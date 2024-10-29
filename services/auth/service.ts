import { LoginFormData } from '@/app/(auth)/login/_validations/login'
import $axiosAuth from '@/lib/axios-auth'

export const login = async (payload: LoginFormData) => {
  const res = await $axiosAuth.post('/login', payload)
  return res?.data
}
