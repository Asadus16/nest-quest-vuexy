'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Imports
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'

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
import type { ManagerInvitationType } from './index'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { invitationStatusColors, invitationStatusLabels } from '@/utils/invitationStatusMap'

// Hook Imports
import { useRole } from '@/contexts/roleContext'

// Service Imports
import { respondToInvitation } from '@/services/ownerManagerRequests'
import { respondToTenantInvitation } from '@/services/tenantManagerRequests'

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

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({
    itemRank
  })

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

// Column Definitions
const columnHelper = createColumnHelper<ManagerInvitationType>()

const ManagerRequestTable = ({
  invitations,
  activeTab,
  onRefresh
}: {
  invitations: ManagerInvitationType[]
  activeTab: string
  onRefresh: () => void
}) => {
  // Hooks
  const router = useRouter()
  const params = useParams()
  const locale = params.lang as string
  const { role } = useRole()

  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [respondingId, setRespondingId] = useState<number | null>(null)

  const handleRespond = async (invitationId: number, status: 'ACCEPTED' | 'REJECTED') => {
    setRespondingId(invitationId)

    try {
      await (role === 'tenant'
        ? respondToTenantInvitation(invitationId, status)
        : respondToInvitation(invitationId, status))
      onRefresh()
    } catch {
      // Error handled silently
    } finally {
      setRespondingId(null)
    }
  }

  // Filter by tab
  const filteredData = useMemo(() => {
    if (activeTab === 'linked') {
      return invitations.filter(inv => inv.status === 'ACCEPTED')
    }

    if (activeTab === 'invites') {
      return invitations.filter(inv => inv.status === 'PENDING')
    }

    return invitations
  }, [invitations, activeTab])

  const columns = useMemo<ColumnDef<ManagerInvitationType, any>[]>(
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
      columnHelper.accessor('email', {
        header: 'Manager',
        cell: ({ row }) => {
          const name = row.original.property_manager?.full_name || row.original.email.split('@')[0]
          const email = row.original.property_manager?.user?.email || row.original.email

          return (
            <div className='flex items-center gap-4'>
              <CustomAvatar size={34}>{getInitials(name)}</CustomAvatar>
              <div className='flex flex-col'>
                <Typography color='text.primary' className='font-medium'>
                  {name}
                </Typography>
                <Typography variant='body2'>{email}</Typography>
              </div>
            </div>
          )
        }
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            variant='tonal'
            label={invitationStatusLabels[row.original.status] || row.original.status}
            size='small'
            color={invitationStatusColors[row.original.status] || 'default'}
            className='capitalize'
          />
        )
      }),
      columnHelper.accessor('created_at', {
        header: 'Received',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {row.original.created_at ? new Date(row.original.created_at).toLocaleDateString() : '-'}
          </Typography>
        )
      }),
      columnHelper.accessor('responded_at', {
        header: 'Responded',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {row.original.responded_at ? new Date(row.original.responded_at).toLocaleDateString() : '-'}
          </Typography>
        )
      }),
      {
        id: 'action',
        header: 'Action',
        cell: ({ row }) => {
          const isResponding = respondingId === row.original.id

          return (
            <div className='flex items-center gap-1'>
              <Tooltip title='View Details'>
                <IconButton onClick={() => router.push(`/${locale}/view-manager/${row.original.id}`)}>
                  <i className='tabler-eye text-textSecondary' />
                </IconButton>
              </Tooltip>
              {row.original.status === 'PENDING' && (
                <>
                  <Tooltip title='Accept'>
                    <IconButton
                      color='success'
                      disabled={isResponding}
                      onClick={() => handleRespond(row.original.id, 'ACCEPTED')}
                    >
                      <i className='tabler-check text-textSecondary' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='Reject'>
                    <IconButton
                      color='error'
                      disabled={isResponding}
                      onClick={() => handleRespond(row.original.id, 'REJECTED')}
                    >
                      <i className='tabler-x text-textSecondary' />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </div>
          )
        },
        enableSorting: false
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [respondingId, locale]
  )

  const table = useReactTable({
    data: filteredData,
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
    <Card>
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
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          placeholder='Search Manager'
          className='max-sm:is-full'
        />
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
                .map(row => {
                  return (
                    <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  )
                })}
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
  )
}

export default ManagerRequestTable
