'use client'

// React Imports
import { useState, useEffect, useCallback, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
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
  getSortedRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Type Imports
import type { Locale } from '@configs/i18n'
import type { ContractDetailType } from '@/types/apps/contractTypes'
import type {
  ContractFinancialStatsType,
  FinancialTransactionType,
  LedgerSummaryType,
  LedgerEntryType
} from '@/types/apps/financialTypes'

// Service Imports
import { getTenancy } from '@/services/tenancy'
import { getContractFinancialStats, getContractTransactions, getContractLedger } from '@/services/financial'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import TablePaginationComponent from '@components/TablePaginationComponent'
import TransferDialog from '@views/contracts/view/contract-right/TransferDialog'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// ─── Helpers ────────────────────────────────────────

const categoryLabel = (cat: string): string => {
  const map: Record<string, string> = {
    RENT: 'Rental Income',
    SECURITY_DEPOSIT: 'Security Deposit',
    AGENCY_FEE: 'Agency Fee',
    COMMISSION_PAYOUT: 'Commission Payout',
    MAINTENANCE: 'Maintenance',
    REPAIR: 'Repair',
    UTILITY: 'Utilities',
    INSURANCE: 'Insurance',
    MANAGEMENT_FEE: 'Management Fee',
    TRANSFER: 'Transfer',
    OTHER: 'Other'
  }

  return map[cat] || cat.replace(/_/g, ' ')
}

const txnColumnHelper = createColumnHelper<FinancialTransactionType>()
const ledgerColumnHelper = createColumnHelper<LedgerEntryType>()

// ─── Security Deposits Table ────────────────────────

const SecurityDepositTable = ({ transactions }: { transactions: FinancialTransactionType[] }) => {
  const columns: ColumnDef<FinancialTransactionType, any>[] = [
    txnColumnHelper.accessor('transaction_date', {
      header: 'Date',
      cell: ({ row }) => <Typography>{new Date(row.original.transaction_date).toLocaleDateString()}</Typography>
    }),
    txnColumnHelper.accessor('type', {
      header: 'Type',
      cell: ({ row }) => (
        <Chip
          label={row.original.type === 'INCOME' ? 'Received' : 'Refunded'}
          size='small'
          variant='tonal'
          color={row.original.type === 'INCOME' ? 'success' : 'error'}
        />
      )
    }),
    txnColumnHelper.accessor('received_by', {
      header: 'Received By / Refunded To',
      cell: ({ row }) => <Typography>{row.original.received_by || '-'}</Typography>
    }),
    txnColumnHelper.accessor('amount', {
      header: 'Amount',
      cell: ({ row }) => (
        <Typography className='font-medium' color={row.original.type === 'INCOME' ? 'success.main' : 'error.main'}>
          {row.original.type === 'INCOME' ? '+' : '-'}AED {row.original.amount.toLocaleString()}
        </Typography>
      )
    }),
    txnColumnHelper.accessor('is_settled', {
      header: 'Status',
      cell: ({ row }) => (
        <Chip
          variant='tonal'
          label={row.original.is_settled ? 'Settled' : 'Unsettled'}
          size='small'
          color={row.original.is_settled ? 'success' : 'warning'}
        />
      )
    })
  ]

  const table = useReactTable({
    data: transactions,
    columns,
    filterFns: {} as any,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  })

  return (
    <Card>
      <CardHeader title='Security Deposit Transactions' />
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
                  No security deposit transactions
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
      {transactions.length > 5 && (
        <TablePagination
          component={() => <TablePaginationComponent table={table as any} />}
          count={transactions.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
        />
      )}
    </Card>
  )
}

// ─── Transaction Table (read-only) ──────────────────

const TransactionTable = ({
  title,
  transactions,
  type
}: {
  title: string
  transactions: FinancialTransactionType[]
  type: 'INCOME' | 'EXPENSE'
}) => {
  const columns: ColumnDef<FinancialTransactionType, any>[] = [
    txnColumnHelper.accessor('transaction_date', {
      header: 'Date',
      cell: ({ row }) => <Typography>{new Date(row.original.transaction_date).toLocaleDateString()}</Typography>
    }),
    txnColumnHelper.accessor('category', {
      header: 'Category',
      cell: ({ row }) => (
        <Chip label={categoryLabel(row.original.category)} size='small' variant='tonal' color='primary' />
      )
    }),
    txnColumnHelper.accessor(type === 'INCOME' ? 'received_by' : 'paid_by', {
      header: type === 'INCOME' ? 'Received By' : 'Paid By',
      cell: ({ row }) => (
        <Typography>{(type === 'INCOME' ? row.original.received_by : row.original.paid_by) || '-'}</Typography>
      )
    }),
    ...(type === 'EXPENSE'
      ? [
          txnColumnHelper.accessor('responsibility', {
            header: 'Responsibility',
            cell: ({ row }: any) => (
              <Typography className='capitalize'>{row.original.responsibility || '-'}</Typography>
            )
          })
        ]
      : []),
    txnColumnHelper.accessor('amount', {
      header: 'Amount',
      cell: ({ row }) => (
        <Typography className='font-medium' color={type === 'INCOME' ? 'success.main' : 'error.main'}>
          {type === 'INCOME' ? '+' : '-'}AED {row.original.amount.toLocaleString()}
        </Typography>
      )
    }),
    txnColumnHelper.accessor('is_settled', {
      header: 'Status',
      cell: ({ row }) => (
        <Chip
          variant='tonal'
          label={row.original.is_settled ? 'Settled' : 'Unsettled'}
          size='small'
          color={row.original.is_settled ? 'success' : 'warning'}
        />
      )
    })
  ]

  const table = useReactTable({
    data: transactions,
    columns,
    filterFns: {} as any,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  })

  return (
    <Card>
      <CardHeader title={title} />
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
                  No {type.toLowerCase()} transactions
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
      {transactions.length > 10 && (
        <TablePagination
          component={() => <TablePaginationComponent table={table as any} />}
          count={transactions.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
        />
      )}
    </Card>
  )
}

// ─── Ledger Section ─────────────────────────────────

const LedgerSection = ({
  ledger,
  entries,
  contract,
  onRefresh
}: {
  ledger: LedgerSummaryType | null
  entries: LedgerEntryType[]
  contract: ContractDetailType
  onRefresh: () => void
}) => {
  const [transferOpen, setTransferOpen] = useState(false)

  const columns: ColumnDef<LedgerEntryType, any>[] = [
    ledgerColumnHelper.accessor('date', {
      header: 'Date',
      cell: ({ row }) => <Typography>{new Date(row.original.date).toLocaleDateString()}</Typography>
    }),
    ledgerColumnHelper.accessor('category', {
      header: 'Category',
      cell: ({ row }) => <Chip label={row.original.category} size='small' variant='tonal' color='primary' />
    }),
    ledgerColumnHelper.accessor('direction', {
      header: 'Who Owes',
      cell: ({ row }) => (
        <Chip
          label={row.original.direction === 'PM_TO_PO' ? 'PM → PO' : 'PO → PM'}
          size='small'
          variant='tonal'
          color={row.original.direction === 'PM_TO_PO' ? 'error' : 'info'}
        />
      )
    }),
    ledgerColumnHelper.accessor('amount', {
      header: 'Amount',
      cell: ({ row }) => (
        <Typography className='font-medium'>AED {row.original.amount.toLocaleString()}</Typography>
      )
    }),
    ledgerColumnHelper.accessor('is_settled', {
      header: 'Status',
      cell: ({ row }) => (
        <Chip
          variant='tonal'
          label={row.original.is_settled ? 'Settled' : 'Unsettled'}
          size='small'
          color={row.original.is_settled ? 'success' : 'warning'}
        />
      )
    }),
    ledgerColumnHelper.display({
      id: 'action',
      header: 'Action',
      cell: () => (
        <Button
          variant='tonal'
          size='small'
          startIcon={<i className='tabler-transfer text-base' />}
          onClick={() => setTransferOpen(true)}
        >
          Transfer
        </Button>
      )
    })
  ]

  const table = useReactTable({
    data: entries,
    columns,
    filterFns: {} as any,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  })

  const agreementLabel = ledger?.agreement_type
    ? ledger.agreement_type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : '-'

  return (
    <>
      {/* Balance Cards */}
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card>
            <CardContent className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' color='error' skin='light' size={42}>
                <i className='tabler-arrow-right text-[26px]' />
              </CustomAvatar>
              <div className='flex flex-col'>
                <Typography variant='h5'>
                  AED {ledger ? ledger.manager_owes_owner.toLocaleString() : '-'}
                </Typography>
                <Typography variant='body2'>PM Owes PO</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card>
            <CardContent className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' color='info' skin='light' size={42}>
                <i className='tabler-arrow-left text-[26px]' />
              </CustomAvatar>
              <div className='flex flex-col'>
                <Typography variant='h5'>
                  AED {ledger ? ledger.owner_owes_manager.toLocaleString() : '-'}
                </Typography>
                <Typography variant='body2'>PO Owes PM</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card>
            <CardContent className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' color='primary' skin='light' size={42}>
                <i className='tabler-scale text-[26px]' />
              </CustomAvatar>
              <div className='flex flex-col'>
                <Typography variant='h5'>
                  {ledger
                    ? `${ledger.net_balance >= 0 ? 'PM owes PO' : 'PO owes PM'} AED ${Math.abs(ledger.net_balance).toLocaleString()}`
                    : '-'}
                </Typography>
                <Typography variant='body2'>Net Balance</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Settlement Breakdown */}
      {ledger && (
        <Card>
          <CardContent>
            <div className='flex items-center gap-2 mbe-4'>
              <CustomAvatar variant='rounded' color='warning' skin='light' size={34}>
                <i className='tabler-calculator text-lg' />
              </CustomAvatar>
              <div>
                <Typography variant='h6'>Settlement Breakdown</Typography>
                <Typography variant='body2' color='text.secondary'>
                  Agreement: {agreementLabel}
                </Typography>
              </div>
            </div>
            <div className='flex flex-col gap-3 plb-2'>
              <div className='flex justify-between items-center'>
                <Typography color='text.secondary'>Total Collected by PM</Typography>
                <Typography className='font-medium'>AED {ledger.total_collected.toLocaleString()}</Typography>
              </div>
              <div className='flex justify-between items-center'>
                <Typography color='text.secondary'>
                  PM Commission{ledger.total_commission > ledger.commission ? ' (capped at collected)' : ''}
                </Typography>
                <Typography className='font-medium' color='warning.main'>
                  - AED {ledger.commission.toLocaleString()}
                  {ledger.total_commission > ledger.commission && (
                    <Typography component='span' variant='body2' color='text.disabled'>
                      {' '}/ {ledger.total_commission.toLocaleString()}
                    </Typography>
                  )}
                </Typography>
              </div>
              <div className='flex justify-between items-center'>
                <Typography color='text.secondary'>Transferred to Owner</Typography>
                <Typography className='font-medium' color='success.main'>
                  - AED {ledger.transfers_to_owner.toLocaleString()}
                </Typography>
              </div>
              <hr className='border-divider' />
              <div className='flex justify-between items-center'>
                <Typography className='font-medium'>Outstanding to Owner</Typography>
                <Typography
                  className='font-medium'
                  color={ledger.manager_owes_owner > 0 ? 'error.main' : 'success.main'}
                >
                  AED {ledger.manager_owes_owner.toLocaleString()}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <div className='flex justify-between items-center p-6'>
          <CardHeader title='Ledger' className='p-0' />
          <Button
            variant='contained'
            size='small'
            startIcon={<i className='tabler-arrows-exchange' />}
            onClick={() => setTransferOpen(true)}
          >
            New Transfer
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
            {entries.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={columns.length} className='text-center'>
                    No ledger entries
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
        {entries.length > 10 && (
          <TablePagination
            component={() => <TablePaginationComponent table={table as any} />}
            count={entries.length}
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
        onSuccess={onRefresh}
      />
    </>
  )
}

// ─── Main Page ──────────────────────────────────────

const ContractFinancialsPage = () => {
  const { id, lang: locale } = useParams()
  const [contract, setContract] = useState<ContractDetailType | null>(null)
  const [stats, setStats] = useState<ContractFinancialStatsType | null>(null)
  const [income, setIncome] = useState<FinancialTransactionType[]>([])
  const [expenses, setExpenses] = useState<FinancialTransactionType[]>([])
  const [securityDeposits, setSecurityDeposits] = useState<FinancialTransactionType[]>([])
  const [ledger, setLedger] = useState<LedgerSummaryType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const contractId = Number(id)

      if (isNaN(contractId)) {
        setError('Invalid contract ID')
        setLoading(false)

        return
      }

      const [contractData, statsData, incomeData, expenseData, securityData, ledgerData] = await Promise.all([
        getTenancy(contractId),
        getContractFinancialStats(contractId),
        getContractTransactions(contractId, { type: 'INCOME' }),
        getContractTransactions(contractId, { type: 'EXPENSE' }),
        getContractTransactions(contractId, { category: 'SECURITY_DEPOSIT' }),
        getContractLedger(contractId)
      ])

      setContract(contractData)
      setStats(statsData)
      setIncome(incomeData)
      setExpenses(expenseData)
      setSecurityDeposits(securityData)
      setLedger(ledgerData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load financial data')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Filter income to exclude security deposits (shown separately)
  const incomeFiltered = useMemo(() => income.filter(t => t.category !== 'SECURITY_DEPOSIT'), [income])

  // Filter expenses to exclude internal transfer records
  const expensesFiltered = useMemo(() => expenses.filter(t => t.category !== 'TRANSFER'), [expenses])

  // Ledger entries come from the backend (already sorted by date desc)
  const ledgerEntries = useMemo<LedgerEntryType[]>(
    () => (ledger?.entries || []).map(e => ({ ...e, category: categoryLabel(e.category) })),
    [ledger]
  )

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <CircularProgress />
      </div>
    )
  }

  if (error || !contract) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[400px] gap-2'>
        <Typography color='error'>{error || 'Contract not found'}</Typography>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Security in Hand',
      value: stats ? `AED ${stats.security_in_hand.toLocaleString()}` : '-',
      icon: 'tabler-shield-lock',
      color: 'warning' as const
    },
    {
      title: 'Total Income',
      value: stats ? `AED ${stats.total_income.toLocaleString()}` : '-',
      icon: 'tabler-cash',
      color: 'success' as const
    },
    {
      title: 'Total Expense',
      value: stats ? `AED ${stats.total_expense.toLocaleString()}` : '-',
      icon: 'tabler-receipt',
      color: 'error' as const
    },
    {
      title: 'Net Income',
      value: stats ? `AED ${stats.net_income.toLocaleString()}` : '-',
      icon: 'tabler-trending-up',
      color: 'primary' as const
    }
  ]

  return (
    <Grid container spacing={6}>
      {/* Header */}
      <Grid size={{ xs: 12 }}>
        <div className='flex items-center justify-between'>
          <div>
            <Typography variant='h4'>Contract Financials</Typography>
            <Typography variant='body2' color='text.secondary'>
              {contract.property?.public_name} — {contract.tenant?.full_name || 'No tenant'}
            </Typography>
          </div>
          <Button
            variant='tonal'
            component={Link}
            href={getLocalizedUrl(`/view-contract/${contract.id}`, locale as Locale)}
            startIcon={<i className='tabler-arrow-left' />}
          >
            Back to Contract
          </Button>
        </div>
      </Grid>

      {/* Financial Stats */}
      {statCards.map((card, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
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

      {/* Security Deposits */}
      <Grid size={{ xs: 12 }}>
        <SecurityDepositTable transactions={securityDeposits} />
      </Grid>

      {/* Income (excluding security deposits) */}
      <Grid size={{ xs: 12 }}>
        <TransactionTable title='Income Transactions' transactions={incomeFiltered} type='INCOME' />
      </Grid>

      {/* Expenses (excluding internal transfers) */}
      <Grid size={{ xs: 12 }}>
        <TransactionTable title='Expense Transactions' transactions={expensesFiltered} type='EXPENSE' />
      </Grid>

      {/* Ledger */}
      <Grid size={{ xs: 12 }}>
        <LedgerSection ledger={ledger} entries={ledgerEntries} contract={contract} onRefresh={fetchData} />
      </Grid>
    </Grid>
  )
}

export default ContractFinancialsPage
