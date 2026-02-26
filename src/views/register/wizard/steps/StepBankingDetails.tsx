'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'

// Context Imports
import { useRegistration } from '@/contexts/registrationContext'

// Type Imports
import type { StepProps } from '../types'

const StepBankingDetails = ({ activeStep, handleNext, handlePrev, steps }: StepProps) => {
  const { formData, updateForm } = useRegistration()

  const bankName = formData.bank_name || ''
  const bankBranch = formData.bank_branch || ''
  const accountNumber = formData.account_number || ''
  const iban = formData.iban || ''

  const isValid = bankName.trim() && bankBranch.trim() && accountNumber.trim() && iban.trim()

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>Banking Details</Typography>
        <Typography variant='body2' color='text.secondary'>
          Add your banking details for payments
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          label='Bank Name'
          placeholder='Enter bank name'
          value={bankName}
          onChange={e => updateForm({ bank_name: e.target.value })}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          label='Bank Branch'
          placeholder='Enter branch name'
          value={bankBranch}
          onChange={e => updateForm({ bank_branch: e.target.value })}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          fullWidth
          label='Bank Account Number'
          placeholder='Enter account number'
          value={accountNumber}
          onChange={e => updateForm({ account_number: e.target.value.replace(/\D/g, '') })}
          slotProps={{ htmlInput: { inputMode: 'numeric' } }}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          fullWidth
          label='IBAN'
          placeholder='AE00 0000 0000 0000 0000 000'
          value={iban}
          onChange={e => updateForm({ iban: e.target.value })}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <div className='flex items-center justify-between'>
          <Button
            variant='tonal'
            color='secondary'
            disabled={activeStep === 0}
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
          >
            Previous
          </Button>
          <Button
            variant='contained'
            disabled={!isValid}
            onClick={handleNext}
            endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />}
          >
            Next
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepBankingDetails
