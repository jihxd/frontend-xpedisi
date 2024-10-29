import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { IUserItem } from '../_interfaces/user'
import { Button } from '@/components/ui/button'
import { format, isToday, parseISO } from 'date-fns'
import {
  deletePaket,
  updatePaket,
  markPaketAsDone,
} from '@/services/users/service'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { string } from 'zod'

// ActionsCell component for handling actions
const ActionsCell = ({ row }: { row: IUserItem }) => {
  const [formData, setFormData] = useState<IUserItem>(row)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleEditSubmit = async () => {
    try {
      await updatePaket(row.id, formData, window.location.pathname)
      console.log('Data updated successfully')
      setIsSheetOpen(false)
    } catch (error) {
      console.error('Failed to update data:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const isDone = row.status === 'selesai'

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button onClick={() => setIsSheetOpen(true)} disabled={isDone}>
            Edit
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Information</SheetTitle>
            <SheetDescription>Make changes to the data below.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="sender">Sender</Label>
              <Input
                id="sender"
                name="sender"
                value={formData.sender}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="receiver">Receiver</Label>
              <Input
                id="receiver"
                name="receiver"
                value={formData.receiver}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="content">Content</Label>
              <Input
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
              />
            </div>
            <Button onClick={handleEditSubmit} style={{ marginTop: '20px' }}>
              Save Changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <Button
        onClick={() => handleDoneButtonClick(row.id)}
        style={{
          backgroundColor: isDone ? 'grey' : 'green',
          color: 'white',
        }}
        disabled={isDone} // Nonaktifkan tombol jika statusnya 'selesai'
      >
        {isDone ? 'Selesai' : 'Selesai'}
      </Button>
    </div>
  )
}

export const getTableColumns = (): ColumnDef<IUserItem>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 150,
  },
  {
    accessorKey: 'sender',
    header: 'Sender Name',
    size: 300,
  },
  {
    accessorKey: 'receiver',
    header: 'Receiver Name',
    size: 300,
  },
  {
    accessorKey: 'address',
    header: 'Address',
    size: 300,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ getValue }) => {
      const date = parseISO(getValue<string>())
      return isToday(date)
        ? format(date, 'eee, dd MMM yyyy HH:mm')
        : format(date, 'eee, dd MMM yyyy')
    },
    size: 300,
  },
  {
    accessorKey: 'arrival',
    header: 'Arrival Date',
    cell: ({ getValue }) => {
      const date = getValue<string>()
      return date ? format(parseISO(date), 'eee, dd MMM yyyy HH:mm') : '-'
    },
    size: 300,
  },
  {
    accessorKey: 'content',
    header: 'Content',
    size: 300,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 150,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ActionsCell row={row.original} />,
    size: 200,
  },
]

const handleDoneButtonClick = async (id: number) => {
  try {
    await markPaketAsDone(id, '/api/paket/done') // Gantilah dengan path yang sesuai
    toast.success('Paket status updated to "Selesai"')
  } catch (error) {
    toast.error('Failed to update paket status')
  }
}

export default getTableColumns
