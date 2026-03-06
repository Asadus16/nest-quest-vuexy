'use client'

// React Imports
import { useState, useEffect, useCallback, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
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
import type { LedgerTransferType, LedgerSummaryType } from '@/types/apps/financialTypes'
import type { ContractDetailType } from '@/types/apps/contractTypes'

// Service Imports
import { getContractLedger } from '@/services/financial'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import TablePaginationComponent from '@components/TablePaginationComponent'
import TransferDialog from './TransferDialog'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const columnHelper = createColumnHelper<LedgerTransferType>()

const LedgerTab = ({ contract }: { contract: ContractDetailType }) => {
  const [ledger, setLedger] = useState<LedgerSummaryType | null>(null)
  const [loading, setLoading] = useState(true)
  const [transferOpen, setTransferOpen] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const data = await getContractLedger(contract.id)

      setLedger(data)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [contract.id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const columns = useMemo<ColumnDef<LedgerTransferType, any>[]>(
    () => [
      columnHelper.accessor('transfer_date', {
        header: 'Date',
        cell: ({ row }) => (
          <Typography>{new Date(row.original.transfer_date).toLocaleDateString()}</Typography>
        )
      }),
      columnHelper.accessor('direction', {
        header: 'Direction',
        cell: ({ row }) => (
          <Chip
            label={row.original.direction === 'MANAGER_TO_OWNER' ? 'Manager → Owner' : 'Owner → Manager'}
            size='small'
            variant='tonal'
            color={row.original.direction === 'MANAGER_TO_OWNER' ? 'primary' : 'warning'}
          />
        )
      }),
      columnHelper.accessor('amount', {
        header: 'Amount',
        cell: ({ row }) => (
          <Typography className='font-medium'>AED {row.original.amount.toLocaleString()}</Typography>
        )
      }),
      columnHelper.accessor('notes', {
        header: 'Notes',
        cell: ({ row }) => <Typography variant='body2'>{row.original.notes || '-'}</Typography>
      }),
      columnHelper.accessor('proof_url', {
        header: 'Proof',
        cell: ({ row }) =>
          row.original.proof_url ? (
            <a href={row.original.proof_url} target='_blank' rel='noopener noreferrer'>
              <Chip label='View' size='small' variant='tonal' color='info' className='cursor-pointer' />
            </a>
          ) : (
            <Typography variant='body2' color='text.secondary'>
              -
            </Typography>
          )
      })
    ],
    []
  )

  const table = useReactTable({
    data: ledger?.transfers || [],
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

  const statCards = [
    {
      title: 'Manager Owes Owner',
      value: `AED ${(ledger?.manager_owes_owner ?? 0).toLocaleString()}`,
      icon: 'tabler-arrow-up-right',
      color: 'warning' as const
    },
    {
      title: 'Owner Owes Manager',
      value: `AED ${(ledger?.owner_owes_manager ?? 0).toLocaleString()}`,
      icon: 'tabler-arrow-down-left',
      color: 'info' as const
    },
    {
      title: 'Net Balance',
      value: `AED ${(ledger?.net_balance ?? 0).toLocaleString()}`,
      icon: 'tabler-scale',
      color: (ledger?.net_balance ?? 0) >= 0 ? ('success' as const) : ('error' as const)
    }
  ]

  return (
    <div className='flex flex-col gap-6'>
      <Grid container spacing={6}>
        {statCards.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 4 }}>
            <Card>
              <CardContent className='flex items-center gap-4'>
                <CustomAvatar variant='rounded' color={card.color} skin='light' size={42}>
                  <i className={`${card.icon} text-[26px]`} />
                </CustomAvatar>
                <div className='flex flex-col'>
                  <Typography variant='h5'>{card.value}</Typography>
                  <Typography variant='body2'>{card.title}</Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <div className='flex justify-between items-center p-6 border-bs'>
          <Typography variant='h6'>Transfers</Typography>
          <Button
            variant='contained'
            startIcon={<i className='tabler-transfer' />}
            onClick={() => setTransferOpen(true)}
          >
            New Transfer
          </Button>
        </div>
        <Divider />
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
            {(ledger?.transfers || []).length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={columns.length} className='text-center'>
                    No transfers yet
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
        {(ledger?.transfers || []).length > 0 && (
          <TablePagination
            component={() => <TablePaginationComponent table={table as any} />}
            count={(ledger?.transfers || []).length}
            rowsPerPage={table.getState().pagination.pageSize}
            page={table.getState().pagination.pageIndex}
            onPageChange={(_, page) => table.setPageIndex(page)}
          />
        )}
      </Card>

      <TransferDialog
        open={transferOpen}
        handleClose={() => setTransferOpen(false)}
        contract={contract}
        netBalance={ledger?.net_balance}
        onSuccess={fetchData}
      />
    </div>
  )
}

export default LedgerTab
