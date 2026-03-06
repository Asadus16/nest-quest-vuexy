'use client'

// React Imports
import { useState, useEffect, useCallback, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Type Imports
import type { FinancialTransactionType, OwnerPropertyType } from '@/types/apps/financialTypes'

// Service Imports
import { getOwnerTransactions } from '@/services/financial'
import { getOwnerProperties } from '@/services/properties'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import OwnerAddTransactionDrawer from './OwnerAddTransactionDrawer'
import TransactionDetailDrawer from './TransactionDetailDrawer'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const statusColorMap: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
  COMPLETED: 'success',
  PENDING: 'warning',
  CANCELLED: 'error'
}

const columnHelper = createColumnHelper<FinancialTransactionType>()

const OwnerTransactionsList = () => {
  const [transactions, setTransactions] = useState<FinancialTransactionType[]>([])
  const [properties, setProperties] = useState<OwnerPropertyType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters
  const [filterProperty, setFilterProperty] = useState<string>('')
  const [filterType, setFilterType] = useState<string>('')

  // Drawers
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [addDrawerType, setAddDrawerType] = useState<'INCOME' | 'EXPENSE'>('INCOME')
  const [detailTransaction, setDetailTransaction] = useState<FinancialTransactionType | null>(null)

  // Fetch properties once on mount
  useEffect(() => {
    getOwnerProperties()
      .then((data: any[]) =>
        setProperties(
          data.map(p => ({
            id: p.id,
            public_name: p.public_name,
            property_type: p.property_type,
            unit_number: p.unit_number ?? null,
            building_name: p.building_name ?? null,
            city: p.city ?? null,
            area: p.area ?? null,
            status: p.status,
            active_tenancy_id: p.active_tenancy_id ?? null
          }))
        )
      )
      .catch(() => {})
  }, [])

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)

    const params: { property_id?: number; type?: string } = {}

    if (filterProperty) params.property_id = Number(filterProperty)
    if (filterType) params.type = filterType

    getOwnerTransactions(params)
      .then(txns => {
        setTransactions(txns)
        setDetailTransaction(prev => (prev ? txns.find(t => t.id === prev.id) || null : null))
      })
      .catch(() => setError('Failed to load transactions.'))
      .finally(() => setLoading(false))
  }, [filterProperty, filterType])

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
      columnHelper.accessor('type', {
        header: 'Type',
        cell: ({ row }) => (
          <Chip
            label={row.original.type}
            size='small'
            variant='tonal'
            color={row.original.type === 'INCOME' ? 'success' : 'error'}
          />
        )
      }),
      columnHelper.accessor('amount', {
        header: 'Amount',
        cell: ({ row }) => (
          <Typography
            className='font-medium'
            color={row.original.type === 'INCOME' ? 'success.main' : 'error.main'}
          >
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
      }),
      columnHelper.accessor('is_settled', {
        header: 'Settled',
        cell: ({ row }) => (
          <Chip
            variant='tonal'
            label={row.original.is_settled ? 'Yes' : 'No'}
            size='small'
            color={row.original.is_settled ? 'success' : 'warning'}
          />
        )
      }),
      {
        id: 'action',
        header: '',
        enableSorting: false,
        cell: ({ row }: any) => (
          <Button size='small' variant='text' onClick={() => setDetailTransaction(row.original)}>
            View
          </Button>
        )
      }
    ],
    []
  )

  const table = useReactTable({
    data: transactions,
    columns,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterFns: {} as any,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 }
    }
  })

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <CircularProgress />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[400px] gap-4'>
        <Typography color='text.secondary'>{error}</Typography>
        <Button variant='tonal' onClick={fetchData}>
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={4} alignItems='center'>
            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                select
                fullWidth
                label='Property'
                value={filterProperty}
                onChange={e => setFilterProperty(e.target.value)}
              >
                <MenuItem value=''>All Properties</MenuItem>
                {properties.map(p => (
                  <MenuItem key={p.id} value={String(p.id)}>
                    {p.public_name}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <CustomTextField
                select
                fullWidth
                label='Type'
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
              >
                <MenuItem value=''>All Types</MenuItem>
                <MenuItem value='INCOME'>Income</MenuItem>
                <MenuItem value='EXPENSE'>Expense</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <div className='flex gap-2 justify-end'>
                <Button
                  variant='contained'
                  color='success'
                  startIcon={<i className='tabler-plus' />}
                  onClick={() => {
                    setAddDrawerType('INCOME')
                    setAddDrawerOpen(true)
                  }}
                >
                  Add Income
                </Button>
                <Button
                  variant='contained'
                  color='error'
                  startIcon={<i className='tabler-plus' />}
                  onClick={() => {
                    setAddDrawerType('EXPENSE')
                    setAddDrawerOpen(true)
                  }}
                >
                  Add Expense
                </Button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
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
                    No transactions found
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className='cursor-pointer' onClick={() => setDetailTransaction(row.original)}>
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
            count={table.getFilteredRowModel().rows.length}
            rowsPerPage={table.getState().pagination.pageSize}
            page={table.getState().pagination.pageIndex}
            onPageChange={(_, page) => table.setPageIndex(page)}
          />
        )}
      </Card>
      <OwnerAddTransactionDrawer
        open={addDrawerOpen}
        handleClose={() => setAddDrawerOpen(false)}
        defaultType={addDrawerType}
        onSuccess={fetchData}
      />
      <TransactionDetailDrawer
        open={!!detailTransaction}
        handleClose={() => setDetailTransaction(null)}
        transaction={detailTransaction}
        onUpdate={fetchData}
      />
    </>
  )
}

export default OwnerTransactionsList
