'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/actions/auth'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false) // State for success message
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('') // Reset error setiap kali login
    setSuccess(false) // Reset success setiap kali login

    try {
      await login({ username, password })
      setSuccess(true) // Hanya set ke true jika login berhasil
      setTimeout(() => {
        setSuccess(false)
        router.push('/login') // Ganti ke halaman dashboard atau sesuai tujuan setelah login berhasil
      }, 2000)
    } catch (err: any) {
      setSuccess(false) // Pastikan success direset
      setError('Username atau password salah') // Pesan error untuk kesalahan login
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        {success && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-white p-6 text-center shadow-lg">
              <p className="text-lg font-semibold text-green-600">
                Login berhasil!
              </p>
            </div>
          </div>
        )}
        <p className="mt-4 text-center text-gray-600">
          Tidak punya akun?{' '}
          <a
            onClick={() => router.push('/login/register')}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Registrasi di sini
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
