'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import CustomTextField from '@core/components/mui/TextField'

// Type Imports
import type { ContractDetailType, TenancyPaymentScheduleType } from '@/types/apps/contractTypes'

// Service Imports
import { markPaymentPaid } from '@/services/tenancy'

// Context Imports
import { useRole } from '@/contexts/roleContext'
import { useToast } from '@/contexts/toastContext'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const statusColor: Record<string, 'success' | 'warning' | 'error'> = {
  PAID: 'success',
  UNPAID: 'warning',
  OVERDUE: 'error'
}

const statusLabels: Record<string, string> = {
  PAID: 'Paid',
  UNPAID: 'Upcoming',
  OVERDUE: 'Overdue'
}

const statusIcon: Record<string, string> = {
  PAID: 'tabler-circle-check',
  UNPAID: 'tabler-clock',
  OVERDUE: 'tabler-alert-circle'
}

const PaymentScheduleTab = ({ contract, onRefresh }: { contract: ContractDetailType; onRefresh?: () => void }) => {
  const { role } = useRole()
  const toast = useToast()
  const isPM = role === 'property-manager'

  const [markPaidOpen, setMarkPaidOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<TenancyPaymentScheduleType | null>(null)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [receivedBy, setReceivedBy] = useState('')
  const [paymentDate, setPaymentDate] = useState('')
  const [notes, setNotes] = useState('')
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const schedules = contract.payment_schedules || []

  const totalAmount = schedules.reduce((sum, row) => sum + row.amount, 0)
  const totalPaid = schedules.filter(r => r.status === 'PAID').reduce((sum, row) => sum + row.amount, 0)
  const totalUpcoming = schedules.filter(r => r.status !== 'PAID').reduce((sum, row) => sum + row.amount, 0)

  const handleOpenMarkPaid = (payment: TenancyPaymentScheduleType) => {
    setSelectedPayment(payment)
    setPaymentMethod('')
    setReceivedBy('Manager')
    setPaymentDate(new Date().toISOString().split('T')[0])
    setNotes('')
    setProofFile(null)
    setMarkPaidOpen(true)
  }

  const handleMarkPaid = async () => {
    if (!selectedPayment) return

    setSubmitting(true)

    try {
      const fd = new FormData()

      if (paymentMethod) fd.append('payment_method', paymentMethod)
      if (receivedBy) fd.append('received_by', receivedBy)
      if (paymentDate) fd.append('payment_date', paymentDate)
      if (notes.trim()) fd.append('notes', notes.trim())
      if (proofFile) fd.append('proof_of_payment', proofFile)

      await markPaymentPaid(selectedPayment.id, fd)
      setMarkPaidOpen(false)
      toast.success('Payment marked as paid')
      onRefresh?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to mark payment as paid')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Card>
          <CardContent className='flex items-center gap-4'>
            <CustomAvatar variant='rounded' color='primary' skin='light' size={48}>
              <i className='tabler-report-money text-[26px]' />
            </CustomAvatar>
            <div>
              <Typography variant='body2' color='text.secondary'>Total</Typography>
              <Typography variant='h5'>AED {totalAmount.toLocaleString()}</Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Card>
          <CardContent className='flex items-center gap-4'>
            <CustomAvatar variant='rounded' color='success' skin='light' size={48}>
              <i className='tabler-circle-check text-[26px]' />
            </CustomAvatar>
            <div>
              <Typography variant='body2' color='text.secondary'>Paid</Typography>
              <Typography variant='h5' color='success.main'>AED {totalPaid.toLocaleString()}</Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Card>
          <CardContent className='flex items-center gap-4'>
            <CustomAvatar variant='rounded' color='warning' skin='light' size={48}>
              <i className='tabler-clock text-[26px]' />
            </CustomAvatar>
            <div>
              <Typography variant='body2' color='text.secondary'>Upcoming</Typography>
              <Typography variant='h5' color='warning.main'>AED {totalUpcoming.toLocaleString()}</Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Payment Schedule'
            avatar={
              <CustomAvatar variant='rounded' color='primary' skin='light' size={34}>
                <i className='tabler-calendar-dollar text-lg' />
              </CustomAvatar>
            }
            subheader={`${schedules.length} transactions`}
          />
          {schedules.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Transaction</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    {isPM && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((row, index) => (
                    <tr key={row.id}>
                      <td><Typography>{index + 1}</Typography></td>
                      <td>
                        <Typography className='font-medium' color='text.primary'>
                          {row.label}
                        </Typography>
                        {row.payment_method && (
                          <Typography variant='caption' color='text.secondary'>
                            via {row.payment_method.replace('_', ' ')}
                          </Typography>
                        )}
                        {row.received_by && (
                          <Typography variant='caption' color='text.secondary' className='block'>
                            Received by: {row.received_by}
                          </Typography>
                        )}
                      </td>
                      <td><Typography className='font-medium'>AED {row.amount.toLocaleString()}</Typography></td>
                      <td>
                        <Typography variant='body2' color='text.secondary'>
                          <i className='tabler-calendar text-base mie-1 align-text-bottom' />
                          {row.due_date}
                        </Typography>
                      </td>
                      <td>
                        <Chip
                          label={statusLabels[row.status] || row.status}
                          size='small'
                          variant='tonal'
                          color={statusColor[row.status] || 'default'}
                          icon={<i className={statusIcon[row.status] || 'tabler-clock'} />}
                        />
                      </td>
                      {isPM && (
                        <td>
                          {row.status !== 'PAID' && (
                            <Button
                              size='small'
                              variant='tonal'
                              color='success'
                              startIcon={<i className='tabler-check' />}
                              onClick={() => handleOpenMarkPaid(row)}
                            >
                              Mark Paid
                            </Button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <CardContent>
              <Typography variant='body2' color='text.secondary' className='text-center'>
                No payment schedules configured
              </Typography>
            </CardContent>
          )}
        </Card>
      </Grid>

      {/* Mark as Paid Dialog */}
      <Dialog open={markPaidOpen} onClose={() => setMarkPaidOpen(false)} maxWidth='xs' fullWidth>
        <DialogTitle>Mark Payment as Paid</DialogTitle>
        <DialogContent className='flex flex-col gap-4 pbs-2'>
          {selectedPayment && (
            <div className='flex items-center justify-between p-3 rounded bg-actionHover'>
              <Typography className='font-medium'>{selectedPayment.label}</Typography>
              <Typography className='font-medium' color='primary'>
                AED {selectedPayment.amount.toLocaleString()}
              </Typography>
            </div>
          )}
          <CustomTextField
            select
            fullWidth
            label='Payment Method'
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
          >
            <MenuItem value='CASH'>Cash</MenuItem>
            <MenuItem value='BANK_TRANSFER'>Bank Transfer</MenuItem>
            <MenuItem value='POSTDATED_CHECK'>Postdated Check</MenuItem>
          </CustomTextField>
          <CustomTextField
            select
            fullWidth
            label='Received By'
            value={receivedBy}
            onChange={e => setReceivedBy(e.target.value)}
          >
            <MenuItem value='Property Owner'>Property Owner</MenuItem>
            <MenuItem value='Manager'>Manager</MenuItem>
          </CustomTextField>
          <CustomTextField
            fullWidth
            type='date'
            label='Payment Date'
            value={paymentDate}
            onChange={e => setPaymentDate(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <CustomTextField
            fullWidth
            multiline
            rows={3}
            label='Notes (optional)'
            placeholder='Add any notes about this payment...'
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
          <div>
            <Typography variant='body2' className='mbe-1'>Proof of Payment (optional)</Typography>
            <input
              type='file'
              accept='image/*,application/pdf'
              onChange={e => setProofFile(e.target.files?.[0] || null)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMarkPaidOpen(false)} color='secondary'>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='success'
            onClick={handleMarkPaid}
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={16} /> : <i className='tabler-check' />}
          >
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default PaymentScheduleTab
