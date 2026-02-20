'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import InputAdornment from '@mui/material/InputAdornment'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'

// Type Imports
import type { StepProps } from '../types'

const StepUsage = ({ activeStep, handleNext, handlePrev, formData, setFormData }: StepProps) => {
  const isValid = formData.monthlyRent.trim()

  const updateField = <K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>Usage</Typography>
        <Typography variant='body2' color='text.secondary'>
          Set the property usage type and rental pricing
        </Typography>
      </Grid>

      {/* Property Usage */}
      <Grid size={{ xs: 12 }}>
        <Typography variant='subtitle1' className='font-medium'>
          Property Usage
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <RadioGroup value={formData.usageType} onChange={e => updateField('usageType', e.target.value)}>
          <FormControlLabel value='long-term' control={<Radio />} label='Long-term Rent' />
        </RadioGroup>
      </Grid>

      {/* Long Term Rent Pricing */}
      <Grid size={{ xs: 12 }}>
        <Typography variant='subtitle1' className='font-medium'>
          Long Term Rent Pricing
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          label='Monthly Rent (AED) *'
          placeholder='e.g. 8000'
          value={formData.monthlyRent}
          onChange={e => updateField('monthlyRent', e.target.value.replace(/\D/g, ''))}
          slotProps={{
            htmlInput: { inputMode: 'numeric' },
            input: {
              startAdornment: <InputAdornment position='start'>AED</InputAdornment>
            }
          }}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.securityDepositRequired}
              onChange={e => {
                setFormData({
                  ...formData,
                  securityDepositRequired: e.target.checked,
                  securityDepositAmount: e.target.checked ? formData.securityDepositAmount : ''
                })
              }}
            />
          }
          label='Security Deposit Required'
        />
      </Grid>

      {formData.securityDepositRequired && (
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label='Security Deposit Amount (AED)'
            placeholder='e.g. 5000'
            value={formData.securityDepositAmount}
            onChange={e => updateField('securityDepositAmount', e.target.value.replace(/\D/g, ''))}
            slotProps={{
              htmlInput: { inputMode: 'numeric' },
              input: {
                startAdornment: <InputAdornment position='start'>AED</InputAdornment>
              }
            }}
          />
        </Grid>
      )}

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

export default StepUsage
