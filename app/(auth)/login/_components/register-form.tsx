import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerValidationSchema } from '../_validations/register' // Impor skema validasi
import { register } from '@/lib/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import React, { useState } from 'react'

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerValidationSchema), // Gunakan skema validasi
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(values: any) {
    try {
      setIsLoading(true)
      await register(values)
      toast.success('Berhasil daftar! Silakan login.')
    } catch (error: any) {
      toast.error(error?.message || 'Gagal daftar')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-3 py-12 lg:flex-none">
      <div className="mx-auto grid w-full max-w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-balance text-muted-foreground">
            Silakan isi detail akun Anda
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konfirmasi Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 space-y-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Daftar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
