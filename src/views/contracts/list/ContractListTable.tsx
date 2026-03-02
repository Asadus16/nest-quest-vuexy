'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import type { ThemeColor } from '@core/types'
import type { ContractType } from '@/types/apps/contractTypes'
import type { Locale } from '@configs/i18n'

// Service Imports
import { deleteTenancy } from '@/services/tenancy'

// Context Imports
import { useToast } from '@/contexts/toastContext'

// Component Imports
import TableFilters from './TableFilters'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type ContractTypeWithAction = ContractType & {
  action?: string
}

type StatusObj = {
  [key: string]: ThemeColor
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({ itemRank })

  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
const statusObj: StatusObj = {
  ACTIVE: 'success',
  EXPIRED: 'error',
  DRAFT: 'warning',
  CANCELLED: 'secondary'
}

const frequencyLabels: Record<string, string> = {
  MONTHLY: 'Monthly',
  QUARTERLY: 'Quarterly',
  SEMI_ANNUALLY: 'Semi-Annually',
  ANNUALLY: 'Annually'
}

const statusLabels: Record<string, string> = {
  ACTIVE: 'Active',
  EXPIRED: 'Expired',
  DRAFT: 'Draft',
  CANCELLED: 'Cancelled'
}

const columnHelper = createColumnHelper<ContractTypeWithAction>()

const ContractListTable = ({
  tableData,
  onRefresh
}: {
  tableData: ContractType[]
  onRefresh: () => void
}) => {
  // Hooks
  const router = useRouter()
  const { lang: locale } = useParams()
  const toast = useToast()

  // States
  const [rowSelection, setRowSelection] = useState({})
  const [filteredData, setFilteredData] = useState(tableData)
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    setFilteredData(tableData)
  }, [tableData])

  const handleDelete = async (id: number) => {
    try {
      await deleteTenancy(id)
      toast.success('Contract deleted successfully')
      onRefresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete contract')
    }
  }

  const columns = useMemo<ColumnDef<ContractTypeWithAction, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('tenant', {
        header: 'Tenant',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.tenant?.full_name || '-'}
          </Typography>
        )
      }),
      columnHelper.accessor('property', {
        header: 'Property',
        cell: ({ row }) => <Typography>{row.original.property?.public_name || '-'}</Typography>
      }),
      columnHelper.accessor('contract_start_date', {
        header: 'Start Date',
        cell: ({ row }) => <Typography>{row.original.contract_start_date}</Typography>
      }),
      columnHelper.accessor('contract_end_date', {
        header: 'End Date',
        cell: ({ row }) => <Typography>{row.original.contract_end_date}</Typography>
      }),
      columnHelper.accessor('rent_amount_total', {
        header: 'Rent',
        cell: ({ row }) => (
          <Typography className='font-medium'>{`AED ${row.original.rent_amount_total.toLocaleString()}`}</Typography>
        )
      }),
      columnHelper.accessor('rent_frequency', {
        header: 'Frequency',
        cell: ({ row }) => (
          <Typography>{frequencyLabels[row.original.rent_frequency] || row.original.rent_frequency}</Typography>
        )
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            variant='tonal'
            label={statusLabels[row.original.status] || row.original.status}
            size='small'
            color={statusObj[row.original.status] || 'default'}
            className='capitalize'
          />
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => router.push(`/${locale}/view-contract/${row.original.id}`)}>
              <i className='tabler-eye text-textSecondary' />
            </IconButton>
            <IconButton onClick={() => handleDelete(row.original.id)}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, locale]
  )

  const table = useReactTable({
    data: filteredData as ContractType[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <TableFilters setData={setFilteredData} tableData={tableData} />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='max-sm:is-full sm:is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search Contracts'
              className='max-sm:is-full'
            />
            <Button
              variant='contained'
              component={Link}
              href={getLocalizedUrl('/add-contract', locale as Locale)}
              startIcon={<i className='tabler-plus' />}
              className='max-sm:is-full'
            >
              Create Contract
            </Button>
          </div>
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
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => (
                    <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
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
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>
    </>
  )
}

export default ContractListTable
