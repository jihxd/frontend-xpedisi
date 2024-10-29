'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { UserFormData, userValidationSchema } from '../_validations/users'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createPaket } from '@/services/users/service'
import { usePathname } from 'next/navigation'
import { DatePicker } from '@/components/ui/date-picker'
import { DropdownMenu } from '@/components/ui/dropdown-menu'

interface Props {
  onClose: () => void
}

export default function UsersAddForm({ onClose }: Props) {
  const pathname = usePathname()

  const form = useForm<UserFormData>({
    resolver: zodResolver(userValidationSchema),
    defaultValues: {
      sender: '',
      receiver: '',
      address: '',
      date: new Date(),
      content: '',
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  function onSubmit(values: UserFormData) {
    doAddUser(values)
  }

  const doAddUser = async (payload: UserFormData) => {
    setIsLoading(true)

    try {
      const newPayload = {
        ...payload,
        date: (payload.date as Date).toISOString(),
        status: 'dikirim', // Add the status field with default value
      }
      await createPaket(newPayload, pathname)
      toast.success('Paket added successfully')
      onClose()
    } catch (error) {
      console.log('error', error)
      toast.error('Failed to add user')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="sender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sender Name</FormLabel>
              <FormControl>
                <Input placeholder="Sender Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="receiver"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receiver Name</FormLabel>
              <FormControl>
                <Input placeholder="Receiver Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker placeholder="select date" {...field} />
                {/* <Input placeholder="Date" {...field} /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input placeholder="Content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="!mt-8 gap-2">
          <Button variant="outline" disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
