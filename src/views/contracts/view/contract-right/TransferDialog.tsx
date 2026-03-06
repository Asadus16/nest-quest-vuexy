'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Type Imports
import type { ContractDetailType } from '@/types/apps/contractTypes'

// Service Imports
import { createTransfer } from '@/services/financial'

type TransferDialogProps = {
  open: boolean
  handleClose: () => void
  contract: ContractDetailType
  netBalance?: number
  onSuccess: () => void
}

const TransferDialog = ({ open, handleClose, contract, netBalance, onSuccess }: TransferDialogProps) => {
  const [amount, setAmount] = useState(netBalance ? String(Math.abs(netBalance)) : '')
  const [transferDate, setTransferDate] = useState(new Date().toISOString().split('T')[0])
  const [proof, setProof] = useState<File | null>(null)
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!amount || !transferDate) return

    setSubmitting(true)
    setError(null)

    try {
      const formData = new FormData()

      formData.append('amount', amount)
      formData.append('transfer_date', transferDate)
      formData.append('owner_id', String(contract.owner?.id || ''))
      formData.append('direction', 'MANAGER_TO_OWNER')

      if (contract.property?.id) {
        formData.append('property_id', String(contract.property.id))
      }

      formData.append('tenancy_id', String(contract.id))

      if (notes) formData.append('notes', notes)
      if (proof) formData.append('proof', proof)

      await createTransfer(formData)
      onSuccess()
      handleClose()
      setAmount('')
      setNotes('')
      setProof(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create transfer')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle>Record Transfer</DialogTitle>
      <DialogContent className='flex flex-col gap-4 pt-2'>
        <Typography variant='body2' color='text.secondary' className='mbe-2'>
          Record a payment transfer between manager and owner.
        </Typography>
        <CustomTextField
          fullWidth
          label='Amount (AED)'
          type='number'
          value={amount}
          onChange={e => setAmount(e.target.value)}
          inputProps={{ min: 0.01, step: 0.01 }}
        />
        <CustomTextField
          fullWidth
          label='Transfer Date'
          type='date'
          value={transferDate}
          onChange={e => setTransferDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <CustomTextField
          fullWidth
          label='Notes (Optional)'
          value={notes}
          onChange={e => setNotes(e.target.value)}
          multiline
          rows={2}
        />
        <div>
          <Typography variant='body2' className='mbe-1'>
            Proof of Transfer (Optional)
          </Typography>
          <input
            type='file'
            accept='.jpg,.jpeg,.png,.pdf'
            onChange={e => setProof(e.target.files?.[0] || null)}
          />
        </div>
        {error && (
          <Typography color='error' variant='body2'>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={submitting || !amount || !transferDate}
          startIcon={submitting ? <CircularProgress size={16} /> : null}
        >
          {submitting ? 'Transferring...' : 'Transfer'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TransferDialog
