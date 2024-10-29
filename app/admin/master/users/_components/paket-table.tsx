'use client'

import { DataTable } from '@/components/ui/data-table'
import { getTableColumns } from './paket-table-columns'
import { IUserItem } from '../_interfaces/user'

interface Props {
  rows: IUserItem[]
  rowCount: number
  pageCount: number
}

const UsersTable = ({ rows, ...restProps }: Props) => {
  const columns = getTableColumns()

  console.log('Rows to display:', rows) // Tambahkan log ini

  return <DataTable columns={columns} data={rows} {...restProps} />
}

export default UsersTable
