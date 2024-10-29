'use client'

import React, { useEffect, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from './data-table-pagination'
import { ScrollArea, ScrollBar } from './scroll-area'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useQueryString from '@/hooks/useQueryString'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageSizeOptions?: number[]
  pageCount?: number
  rowCount?: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount = 0,
  pageSizeOptions = [10, 20, 50, 100],
  rowCount = 0,
}: DataTableProps<TData, TValue>) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const qs = useQueryString(searchParams)
  const fallbackCurrentPage = Number(searchParams.get('page') || 1)
  const fallbackPageSize = Number(searchParams.get('pageSize') || 10)

  const [pagination, setPagination] = useState({
    pageIndex: fallbackCurrentPage - 1,
    pageSize: fallbackPageSize,
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    rowCount,
    pageCount,
    manualPagination: true,
    onPaginationChange: setPagination,
    state: { pagination },
  })

  useEffect(() => {
    const query = qs.createQueryString({
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    })

    router.push(`${pathname}?${query}`)
  }, [pagination, pathname, qs, router])

  return (
    <div>
      <div className="grid rounded-md border bg-background">
        <ScrollArea>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="py-4">
        <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />
      </div>
    </div>
  )
}
