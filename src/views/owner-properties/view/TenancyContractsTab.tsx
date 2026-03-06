'use client'

// React Imports
import { useMemo } from 'react'

// Next Imports
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
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
import type { PropertyTenancyType } from '@/types/apps/financialTypes'
import type { Locale } from '@configs/i18n'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const statusColorMap: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
  ACTIVE: 'success',
  DRAFT: 'warning',
  EXPIRED: 'error',
  CANCELLED: 'default'
}

const columnHelper = createColumnHelper<PropertyTenancyType>()

const TenancyContractsTab = ({ tenancies }: { tenancies: PropertyTenancyType[] }) => {
  const router = useRouter()
  const { lang: locale } = useParams()

  const columns = useMemo<ColumnDef<PropertyTenancyType, any>[]>(
    () => [
      columnHelper.accessor('id', {
        header: 'Contract ID',
        cell: ({ row }) => <Typography className='font-medium'>#{row.original.id}</Typography>
      }),
      columnHelper.accessor('tenant_name', {
        header: 'Tenant',
        cell: ({ row }) => <Typography>{row.original.tenant_name || '-'}</Typography>
      }),
      columnHelper.accessor('contract_start_date', {
        header: 'Start Date',
        cell: ({ row }) => (
          <Typography>
            {row.original.contract_start_date
              ? new Date(row.original.contract_start_date).toLocaleDateString()
              : '-'}
          </Typography>
        )
      }),
      columnHelper.accessor('contract_end_date', {
        header: 'End Date',
        cell: ({ row }) => (
          <Typography>
            {row.original.contract_end_date
              ? new Date(row.original.contract_end_date).toLocaleDateString()
              : '-'}
          </Typography>
        )
      }),
      columnHelper.accessor('rent_amount_total', {
        header: 'Rent',
        cell: ({ row }) => (
          <Typography className='font-medium'>AED {row.original.rent_amount_total.toLocaleString()}</Typography>
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
      {
        id: 'action',
        header: 'Action',
        cell: ({ row }) => (
          <IconButton
            onClick={() =>
              router.push(getLocalizedUrl(`/view-contract/${row.original.id}`, locale as Locale))
            }
          >
            <i className='tabler-eye text-textSecondary' />
          </IconButton>
        ),
        enableSorting: false
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, locale]
  )

  const table = useReactTable({
    data: tenancies,
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
          {tenancies.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={columns.length} className='text-center'>
                  No contracts found
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
        count={tenancies.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      />
    </Card>
  )
}

export default TenancyContractsTab
