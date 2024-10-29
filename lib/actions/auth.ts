// Fungsi login dan register
'use server'

import axios from 'axios'
import { LoginFormData } from '@/app/(auth)/login/_validations/login'
import { signIn, signOut } from '@/auth'

// Fungsi login
export async function login(params: LoginFormData) {
  try {
    const result = await signIn('credentials', {
      username: params.username,
      password: params.password,
      redirect: false,
    })

    if (result?.error) {
      throw new Error(result.error)
    }

    return result
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login gagal')
  }
}

// Fungsi logout
export async function logout() {
  try {
    await signOut()
  } catch (error: any) {
    console.error(error)
    throw error
  }
}

// Fungsi register
export interface RegisterFormData {
  username: string
  password: string
  email: string
  confirmPassword: string
}

export async function register(params: RegisterFormData) {
  try {
    const response = await axios.post('http://localhost:8081/api/register', {
      username: params.username,
      email: params.email,

      password: params.password,
    })

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registrasi gagal')
  }
}
