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
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Type Imports
import type { OwnerPropertyType } from '@/types/apps/financialTypes'
import type { Locale } from '@configs/i18n'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const statusColorMap: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
  VACANT: 'warning',
  OCCUPIED: 'success',
  UNDER_MAINTENANCE: 'error'
}

const columnHelper = createColumnHelper<OwnerPropertyType>()

const OwnerPropertyTable = ({ properties, ownerId }: { properties: OwnerPropertyType[]; ownerId: string }) => {
  const router = useRouter()
  const { lang: locale } = useParams()

  const columns = useMemo<ColumnDef<OwnerPropertyType, any>[]>(
    () => [
      columnHelper.accessor('public_name', {
        header: 'Property',
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {row.original.public_name}
            </Typography>
            {row.original.building_name && (
              <Typography variant='body2'>{row.original.building_name}</Typography>
            )}
          </div>
        )
      }),
      columnHelper.accessor('property_type', {
        header: 'Type',
        cell: ({ row }) => <Typography className='capitalize'>{row.original.property_type || '-'}</Typography>
      }),
      columnHelper.accessor('unit_number', {
        header: 'Unit',
        cell: ({ row }) => <Typography>{row.original.unit_number || '-'}</Typography>
      }),
      columnHelper.accessor('city', {
        header: 'Location',
        cell: ({ row }) => (
          <Typography>
            {[row.original.area, row.original.city].filter(Boolean).join(', ') || '-'}
          </Typography>
        )
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            variant='tonal'
            label={row.original.status.replace('_', ' ')}
            size='small'
            color={statusColorMap[row.original.status] || 'default'}
            className='capitalize'
          />
        )
      }),
      {
        id: 'action',
        header: 'Action',
        cell: ({ row }) => (
          <IconButton
            onClick={() =>
              router.push(
                getLocalizedUrl(`/owner-properties/${ownerId}/view/${row.original.id}`, locale as Locale)
              )
            }
          >
            <i className='tabler-eye text-textSecondary' />
          </IconButton>
        ),
        enableSorting: false
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, locale, ownerId]
  )

  const table = useReactTable({
    data: properties,
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
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No properties found
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map(row => (
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
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      />
    </Card>
  )
}

export default OwnerPropertyTable
