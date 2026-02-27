'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Imports
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
import type { InventoryType } from '@/types/apps/inventoryTypes'

// Service Imports
import { deleteInventory } from '@/services/inventory'

// Component Imports
import TableFilters from './TableFilters'
import AddInventoryDrawer from './AddInventoryDrawer'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

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

type InventoryTypeWithAction = InventoryType & {
  action?: string
}

type TypeObj = {
  [key: string]: { icon: string; color: ThemeColor }
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
const typeObj: TypeObj = {
  Furniture: { icon: 'tabler-armchair', color: 'primary' },
  Electronics: { icon: 'tabler-device-desktop', color: 'info' },
  Decor: { icon: 'tabler-photo', color: 'warning' },
  Appliances: { icon: 'tabler-wash-machine', color: 'success' },
  Lighting: { icon: 'tabler-bulb', color: 'error' },
  Plumbing: { icon: 'tabler-droplet', color: 'primary' },
  HVAC: { icon: 'tabler-air-conditioning', color: 'info' },
  Kitchenware: { icon: 'tabler-tools-kitchen-2', color: 'warning' },
  Linen: { icon: 'tabler-bed', color: 'success' },
  Outdoor: { icon: 'tabler-trees', color: 'error' }
}

const columnHelper = createColumnHelper<InventoryTypeWithAction>()

const InventoryListTable = ({
  tableData,
  onRefresh
}: {
  tableData: InventoryType[]
  onRefresh: () => void
}) => {
  // Hooks
  const router = useRouter()
  const { lang: locale } = useParams()

  // States
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [filteredData, setFilteredData] = useState(tableData)
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    setFilteredData(tableData)
  }, [tableData])

  const getWarrantyStatus = (warrantyEnd: string | null): { label: string; color: ThemeColor } => {
    if (!warrantyEnd) return { label: 'N/A', color: 'secondary' }

    const today = new Date()
    const end = new Date(warrantyEnd)

    if (end < today) return { label: 'Expired', color: 'error' }

    const diffMs = end.getTime() - today.getTime()
    const diffDays = diffMs / (1000 * 60 * 60 * 24)

    if (diffDays <= 90) return { label: 'Expiring Soon', color: 'warning' }

    return { label: 'Active', color: 'success' }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteInventory(id)
      onRefresh()
    } catch {
      // Error handled silently
    }
  }

  const columns = useMemo<ColumnDef<InventoryTypeWithAction, any>[]>(
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
      columnHelper.accessor('name', {
        header: 'Item',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <CustomAvatar
              skin='light'
              color={typeObj[row.original.type]?.color || 'primary'}
              variant='rounded'
              size={34}
            >
              <i className={classnames(typeObj[row.original.type]?.icon || 'tabler-package', 'text-[22px]')} />
            </CustomAvatar>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.name}
              </Typography>
              <Typography variant='body2'>{row.original.brand || '-'}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.type}
          </Typography>
        )
      }),
      columnHelper.accessor('room_assigned', {
        header: 'Room',
        cell: ({ row }) => <Typography>{row.original.room_assigned || '-'}</Typography>
      }),
      columnHelper.accessor('property', {
        header: 'Property',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.property?.public_name || '-'}
          </Typography>
        )
      }),
      columnHelper.accessor('current_worth', {
        header: 'Worth',
        cell: ({ row }) => (
          <Typography>
            {row.original.current_worth ? `AED ${row.original.current_worth.toLocaleString()}` : '-'}
          </Typography>
        )
      }),
      columnHelper.accessor('warranty_end', {
        header: 'Warranty',
        cell: ({ row }) => {
          const status = getWarrantyStatus(row.original.warranty_end)

          return <Chip variant='tonal' label={status.label} size='small' color={status.color} />
        }
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => router.push(`/${locale}/view-inventory/${row.original.id}`)}>
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
    data: filteredData as InventoryType[],
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
              placeholder='Search Inventory'
              className='max-sm:is-full'
            />
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddDrawerOpen(true)}
              className='max-sm:is-full'
            >
              Add Inventory
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
      <AddInventoryDrawer
        open={addDrawerOpen}
        handleClose={() => setAddDrawerOpen(false)}
        onSuccess={onRefresh}
      />
    </>
  )
}

export default InventoryListTable
