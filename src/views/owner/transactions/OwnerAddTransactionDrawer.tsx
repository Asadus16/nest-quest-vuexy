'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Type Imports
import type { OwnerPropertyType } from '@/types/apps/financialTypes'

// Service Imports
import { createOwnerTransaction } from '@/services/financial'
import { getOwnerProperties } from '@/services/properties'

const categories = [
  { value: 'RENT', label: 'Rent' },
  { value: 'SECURITY_DEPOSIT', label: 'Security Deposit' },
  { value: 'AGENCY_FEE', label: 'Agency Fee' },
  { value: 'COMMISSION_PAYOUT', label: 'Commission Payout' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'REPAIR', label: 'Repair' },
  { value: 'UTILITY', label: 'Utility' },
  { value: 'INSURANCE', label: 'Insurance' },
  { value: 'MANAGEMENT_FEE', label: 'Management Fee' },
  { value: 'OTHER', label: 'Other' }
]

type OwnerAddTransactionDrawerProps = {
  open: boolean
  handleClose: () => void
  defaultType: 'INCOME' | 'EXPENSE'
  onSuccess: () => void
}

const OwnerAddTransactionDrawer = ({ open, handleClose, defaultType, onSuccess }: OwnerAddTransactionDrawerProps) => {
  const [properties, setProperties] = useState<OwnerPropertyType[]>([])
  const [propertyId, setPropertyId] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [paidBy, setPaidBy] = useState('')
  const [receivedBy, setReceivedBy] = useState('')
  const [responsibility, setResponsibility] = useState('')
  const [status, setStatus] = useState('COMPLETED')
  const [transactionDate, setTransactionDate] = useState(new Date().toISOString().split('T')[0])
  const [proof, setProof] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      getOwnerProperties()
        .then((data: any[]) => {
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
        })
        .catch(() => {})
    }
  }, [open])

  const resetForm = () => {
    setPropertyId('')
    setCategory('')
    setAmount('')
    setDescription('')
    setPaidBy('')
    setReceivedBy('')
    setResponsibility('')
    setStatus('COMPLETED')
    setTransactionDate(new Date().toISOString().split('T')[0])
    setProof(null)
    setError(null)
  }

  const handleSubmit = async () => {
    if (!propertyId || !category || !amount || !transactionDate) return

    setSubmitting(true)
    setError(null)

    try {
      const formData = new FormData()

      formData.append('type', defaultType)
      formData.append('category', category)
      formData.append('amount', amount)
      formData.append('status', status)
      formData.append('transaction_date', transactionDate)
      formData.append('property_id', propertyId)

      if (description) formData.append('description', description)
      if (paidBy) formData.append('paid_by', paidBy)
      if (receivedBy) formData.append('received_by', receivedBy)
      if (responsibility) formData.append('responsibility', responsibility)
      if (proof) formData.append('proof', proof)

      await createOwnerTransaction(formData)
      onSuccess()
      handleClose()
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create transaction')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between pli-6 plb-5'>
        <Typography variant='h5'>Add {defaultType === 'INCOME' ? 'Income' : 'Expense'}</Typography>
        <IconButton onClick={handleClose}>
          <i className='tabler-x text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div className='flex flex-col gap-5 p-6'>
        <CustomTextField
          select
          fullWidth
          label='Property'
          value={propertyId}
          onChange={e => setPropertyId(e.target.value)}
        >
          {properties.map(p => (
            <MenuItem key={p.id} value={String(p.id)}>
              {p.public_name}
            </MenuItem>
          ))}
        </CustomTextField>
        <CustomTextField select fullWidth label='Category' value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(cat => (
            <MenuItem key={cat.value} value={cat.value}>
              {cat.label}
            </MenuItem>
          ))}
        </CustomTextField>
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
          label='Description (Optional)'
          value={description}
          onChange={e => setDescription(e.target.value)}
          multiline
          rows={2}
        />
        {defaultType === 'INCOME' ? (
          <CustomTextField
            fullWidth
            label='Received By'
            value={receivedBy}
            onChange={e => setReceivedBy(e.target.value)}
            placeholder='e.g., Manager, Owner'
          />
        ) : (
          <>
            <CustomTextField
              fullWidth
              label='Paid By'
              value={paidBy}
              onChange={e => setPaidBy(e.target.value)}
              placeholder='e.g., Manager, Owner, Tenant'
            />
            <CustomTextField
              select
              fullWidth
              label='Responsibility'
              value={responsibility}
              onChange={e => setResponsibility(e.target.value)}
            >
              <MenuItem value='OWNER'>Owner</MenuItem>
              <MenuItem value='MANAGER'>Manager</MenuItem>
              <MenuItem value='TENANT'>Tenant</MenuItem>
              <MenuItem value='SHARED'>Shared</MenuItem>
            </CustomTextField>
          </>
        )}
        <CustomTextField
          fullWidth
          label='Date'
          type='date'
          value={transactionDate}
          onChange={e => setTransactionDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <CustomTextField select fullWidth label='Status' value={status} onChange={e => setStatus(e.target.value)}>
          <MenuItem value='COMPLETED'>Completed</MenuItem>
          <MenuItem value='PENDING'>Pending</MenuItem>
        </CustomTextField>
        <div>
          <Typography variant='body2' className='mbe-1'>
            Proof (Optional)
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
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={submitting || !propertyId || !category || !amount || !transactionDate}
          startIcon={submitting ? <CircularProgress size={16} /> : null}
          fullWidth
        >
          {submitting ? 'Saving...' : `Add ${defaultType === 'INCOME' ? 'Income' : 'Expense'}`}
        </Button>
      </div>
    </Drawer>
  )
}

export default OwnerAddTransactionDrawer
