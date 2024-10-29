'use client'

import React, { useEffect, useState } from 'react'
import UsersAddDialog from './paket-add-dialog'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { DateRange } from 'react-day-picker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { subDays, format } from 'date-fns'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useQueryString from '@/hooks/useQueryString'

const UsersActions = () => {
  const searchParams = useSearchParams()
  const qs = useQueryString(searchParams)
  const pathname = usePathname()
  const router = useRouter()

  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  useEffect(() => {
    const query = qs.createQueryString({
      startDate: date?.from ? format(date.from, 'dd-MM-yyyy') : '',
      endDate: date?.to ? format(date.to, 'dd-MM-yyyy') : '',
    })

    router.push(`${pathname}?${query}`)
  }, [date, pathname, qs, router])

  return (
    <div className="flex items-center gap-2">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dikirim">Dikirim</SelectItem>
          <SelectItem value="selesai">Selesai</SelectItem>
        </SelectContent>
      </Select>
      <UsersAddDialog />
    </div>
  )
}

export default UsersActions
