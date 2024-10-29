import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'

const TableSampleUser = () => {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'id',
      header: 'User ID',
      size: 150,
    },
    {
      accessorKey: 'sendername',
      header: 'Phone Number',
      size: 300,
    },
    {
      accessorKey: 'receivername',
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
      header: 'date',
    },
    {
      accessorKey: 'contents',
      header: 'Contents',
      size: 300,
    },
  ]

  return (
    <div className="p-2">
      <h3 className="mb-4">Table Sample User</h3>

      <DataTable columns={columns} data={[]} />
    </div>
  )
}

export default TableSampleUser
