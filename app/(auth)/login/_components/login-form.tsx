'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
import { LoginFormData, loginValidationSchema } from '../_validations/login'
import { login } from '@/lib/actions/auth'
import { toast } from 'sonner'

export default function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(values: LoginFormData) {
    try {
      setIsLoading(true)
      await login(values)
    } catch (error: any) {
      toast.error(error?.message || 'Failed to login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-3 py-12 lg:flex-none">
      <div className="mx-auto grid w-full max-w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Welcome back, please enter your details
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

            <div className="mt-4 space-y-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
