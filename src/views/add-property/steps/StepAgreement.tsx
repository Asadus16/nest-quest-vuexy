'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputAdornment from '@mui/material/InputAdornment'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import FileUpload from '@core/components/FileUpload'
import DirectionalIcon from '@components/DirectionalIcon'

// Type Imports
import type { StepProps } from '../types'

const acquisitionMethods = [
  'Rented',
  'Owned',
  'Leased',
  'Sub-leased',
  'Power of Attorney',
  'Other'
]

const rentFrequencies = [
  'Weekly',
  'Monthly',
  'Quarterly',
  'Semi-Annually',
  'Annually'
]

const paymentMethods = [
  'Bank Transfer',
  'Cheque',
  'Cash',
  'Credit Card',
  'Online Payment'
]

const StepAgreement = ({ activeStep, handleNext, handlePrev, formData, setFormData }: StepProps) => {
  const isValid =
    formData.acquisitionMethod &&
    formData.rentAmount &&
    formData.rentFrequency &&
    formData.paymentMethod &&
    formData.tenancyStartDate &&
    formData.tenancyEndDate &&
    formData.termsAccepted

  const updateField = <K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>Agreement</Typography>
        <Typography variant='body2' color='text.secondary'>
          Enter contract details, upload documents, and configure utilities
        </Typography>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <CustomTextField
          select
          fullWidth
          label='How did you acquire this property?'
          value={formData.acquisitionMethod}
          onChange={e => updateField('acquisitionMethod', e.target.value)}
        >
          <MenuItem value=''>Select</MenuItem>
          {acquisitionMethods.map(method => (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          ))}
        </CustomTextField>
      </Grid>

      {/* Rented Details */}
      <Grid size={{ xs: 12 }}>
        <Divider />
        <Typography variant='subtitle1' className='font-medium mbs-4'>
          Rented Details
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          label='Rent Amount (AED)'
          placeholder='e.g. 80000'
          value={formData.rentAmount}
          onChange={e => updateField('rentAmount', e.target.value.replace(/\D/g, ''))}
          slotProps={{
            htmlInput: { inputMode: 'numeric' },
            input: {
              startAdornment: <InputAdornment position='start'>AED</InputAdornment>
            }
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          select
          fullWidth
          label='Rent Frequency'
          value={formData.rentFrequency}
          onChange={e => updateField('rentFrequency', e.target.value)}
        >
          <MenuItem value=''>Select</MenuItem>
          {rentFrequencies.map(freq => (
            <MenuItem key={freq} value={freq}>
              {freq}
            </MenuItem>
          ))}
        </CustomTextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          select
          fullWidth
          label='Payment Method'
          value={formData.paymentMethod}
          onChange={e => updateField('paymentMethod', e.target.value)}
        >
          <MenuItem value=''>Select</MenuItem>
          {paymentMethods.map(method => (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          ))}
        </CustomTextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }} />
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          type='date'
          label='Tenancy Start Date'
          value={formData.tenancyStartDate}
          onChange={e => updateField('tenancyStartDate', e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          type='date'
          label='Tenancy End Date'
          value={formData.tenancyEndDate}
          onChange={e => updateField('tenancyEndDate', e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Grid>

      {/* Required Documents */}
      <Grid size={{ xs: 12 }}>
        <Divider />
        <Typography variant='subtitle1' className='font-medium mbs-4'>
          Required Documents
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <FileUpload
          label='Upload Tenancy Agreement'
          accept='.pdf,.jpg,.jpeg,.png'
          onChange={f => updateField('tenancyAgreement', f)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <FileUpload
          label='Upload Ejari Certificate'
          accept='.pdf,.jpg,.jpeg,.png'
          onChange={f => updateField('ejariCertificate', f)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <FileUpload
          label='Upload DCPM Letter'
          accept='.pdf,.jpg,.jpeg,.png'
          onChange={f => updateField('dcpmLetter', f)}
        />
      </Grid>

      {/* Utilities */}
      <Grid size={{ xs: 12 }}>
        <Divider />
        <Typography variant='subtitle1' className='font-medium mbs-4'>
          Utilities
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomTextField
          fullWidth
          label='DEWA Number'
          placeholder='e.g. 123456789'
          value={formData.dewaNumber}
          onChange={e => updateField('dewaNumber', e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomTextField
          fullWidth
          label='Internet Account Number'
          placeholder='e.g. 987654321'
          value={formData.internetAccountNumber}
          onChange={e => updateField('internetAccountNumber', e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomTextField
          fullWidth
          label='Gas Number'
          placeholder='e.g. 456789123'
          value={formData.gasNumber}
          onChange={e => updateField('gasNumber', e.target.value)}
        />
      </Grid>

      {/* Terms & Conditions */}
      <Grid size={{ xs: 12 }}>
        <Divider />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.termsAccepted}
              onChange={e => updateField('termsAccepted', e.target.checked)}
            />
          }
          label='I accept the terms and conditions'
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

export default StepAgreement
