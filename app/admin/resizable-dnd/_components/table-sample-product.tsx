import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'

const TableSampleProduct = () => {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'id',
      header: 'Product ID',
      size: 150,
    },
    {
      header: 'Product Name',
      size: 300,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      size: 300,
    },
    {
      accessorKey: 'qty',
      header: 'Quantity',
      size: 300,
    },
  ]

  return (
    <div className="p-2">
      <h3 className="mb-4">Table Sample Product</h3>

      <DataTable columns={columns} data={[]} />
    </div>
  )
}

export default TableSampleProduct
