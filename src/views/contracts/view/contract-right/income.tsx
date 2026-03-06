'use client'

// React Imports
import { useState, useEffect, useCallback, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
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
import type { ContractDetailType } from '@/types/apps/contractTypes'

// Service Imports
import { getContractTransactions } from '@/services/financial'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import AddTransactionDrawer from './AddTransactionDrawer'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const statusColorMap: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
  COMPLETED: 'success',
  PENDING: 'warning',
  CANCELLED: 'error'
}

const columnHelper = createColumnHelper<FinancialTransactionType>()

const IncomeTab = ({ contract }: { contract: ContractDetailType }) => {
  const [transactions, setTransactions] = useState<FinancialTransactionType[]>([])
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const data = await getContractTransactions(contract.id, { type: 'INCOME' })

      setTransactions(data)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [contract.id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

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
      columnHelper.accessor('received_by', {
        header: 'Received By',
        cell: ({ row }) => <Typography>{row.original.received_by || '-'}</Typography>
      }),
      columnHelper.accessor('amount', {
        header: 'Amount',
        cell: ({ row }) => (
          <Typography className='font-medium' color='success.main'>
            AED {row.original.amount.toLocaleString()}
          </Typography>
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
    data: transactions,
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

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[200px]'>
        <CircularProgress size={32} />
      </div>
    )
  }

  return (
    <>
      <Card>
        <div className='flex justify-between items-center p-6 border-bs'>
          <Typography variant='h6'>Income Transactions</Typography>
          <Button variant='contained' startIcon={<i className='tabler-plus' />} onClick={() => setDrawerOpen(true)}>
            Add Income
          </Button>
        </div>
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
            {transactions.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={columns.length} className='text-center'>
                    No income transactions
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
        {transactions.length > 0 && (
          <TablePagination
            component={() => <TablePaginationComponent table={table as any} />}
            count={transactions.length}
            rowsPerPage={table.getState().pagination.pageSize}
            page={table.getState().pagination.pageIndex}
            onPageChange={(_, page) => table.setPageIndex(page)}
          />
        )}
      </Card>
      <AddTransactionDrawer
        open={drawerOpen}
        handleClose={() => setDrawerOpen(false)}
        contract={contract}
        defaultType='INCOME'
        onSuccess={fetchData}
      />
    </>
  )
}

export default IncomeTab
