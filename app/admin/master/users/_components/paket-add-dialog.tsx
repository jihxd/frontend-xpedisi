'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import UsersAddForm from './paket-add-form'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

export default function UsersAddDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambahkan Paket</DialogTitle>

          <DialogDescription>
            <VisuallyHidden.Root></VisuallyHidden.Root>
          </DialogDescription>
        </DialogHeader>

        <UsersAddForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
