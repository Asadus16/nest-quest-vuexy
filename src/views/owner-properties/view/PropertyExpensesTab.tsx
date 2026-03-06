'use client'

// React Imports
import { useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import TablePagination from '@mui/material/TablePagination'

// Third-party Imports
import classnames from 'classnames'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Type Imports
import type { FinancialTransactionType } from '@/types/apps/financialTypes'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const statusColorMap: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
  COMPLETED: 'success',
  PENDING: 'warning',
  CANCELLED: 'error'
}

const columnHelper = createColumnHelper<FinancialTransactionType>()

const PropertyExpensesTab = ({ transactions }: { transactions: FinancialTransactionType[] }) => {
  const expenses = useMemo(() => transactions.filter(t => t.type === 'EXPENSE'), [transactions])

  const columns = useMemo<ColumnDef<FinancialTransactionType, any>[]>(
    () => [
      columnHelper.accessor('transaction_date', {
        header: 'Date',
        cell: ({ row }) => (
          <Typography>{new Date(row.original.transaction_date).toLocaleDateString()}</Typography>
        )
      }),
      columnHelper.accessor('category', {
        header: 'Category',
        cell: ({ row }) => (
          <Chip
            label={row.original.category.replace(/_/g, ' ')}
            size='small'
            variant='tonal'
            color='primary'
            className='capitalize'
          />
        )
      }),
      columnHelper.accessor('paid_by', {
        header: 'Paid By',
        cell: ({ row }) => <Typography>{row.original.paid_by || '-'}</Typography>
      }),
      columnHelper.accessor('responsibility', {
        header: 'Responsibility',
        cell: ({ row }) => <Typography className='capitalize'>{row.original.responsibility || '-'}</Typography>
      }),
      columnHelper.accessor('amount', {
        header: 'Amount',
        cell: ({ row }) => (
          <Typography className='font-medium'>AED {row.original.amount.toLocaleString()}</Typography>
        )
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            variant='tonal'
            label={row.original.status}
            size='small'
            color={statusColorMap[row.original.status] || 'default'}
          />
        )
      })
    ],
    []
  )

  const table = useReactTable({
    data: expenses,
    columns,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterFns: {} as any,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 }
    }
  })

  return (
    <Card>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classnames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <i className='tabler-chevron-up text-xl' />,
                          desc: <i className='tabler-chevron-down text-xl' />
                        }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {expenses.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={columns.length} className='text-center'>
                  No expenses found
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        component={() => <TablePaginationComponent table={table as any} />}
        count={expenses.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      />
    </Card>
  )
}

export default PropertyExpensesTab
