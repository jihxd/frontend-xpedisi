// register-page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { register } from '@/lib/actions/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerValidationSchema } from '../_validations/register'

// Sesuaikan tipe data form untuk mencakup `confirmPassword`
type RegisterFormData = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerValidationSchema),
  })

  const handleRegister = async (data: RegisterFormData) => {
    setError('')
    setSuccess(false)

    try {
      await register(data)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        router.push('/login')
      }, 2000)
    } catch (err: any) {
      setError(
        'Registrasi gagal: ' + (err.response?.data?.message || err.message),
      )
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Register
        </h1>
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          <input
            type="text"
            {...formRegister('username')}
            placeholder="Username"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <input
            type="email"
            {...formRegister('email')}
            placeholder="Email"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            type="password"
            {...formRegister('password')}
            placeholder="Password"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <input
            type="password"
            {...formRegister('confirmPassword')}
            placeholder="Konfirmasi Password"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        {success && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-white p-6 text-center shadow-lg">
              <p className="text-lg font-semibold text-green-600">
                Registrasi berhasil!
              </p>
            </div>
          </div>
        )}
        <p className="mt-4 text-center text-gray-600">
          Sudah punya akun?{' '}
          <a
            onClick={() => router.push('/login')}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Login di sini
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register
