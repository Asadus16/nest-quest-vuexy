'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'

// Type Imports
import type { StepProps } from '../types'

// Static property owners list
const propertyOwners = [
  { value: '1', label: 'Ahmed Al Maktoum', email: 'ahmed.maktoum@gmail.com' },
  { value: '2', label: 'Fatima Al Nahyan', email: 'fatima.nahyan@outlook.com' },
  { value: '3', label: 'Mohammed Al Qasimi', email: 'mohammed.qasimi@yahoo.com' },
  { value: '4', label: 'Sara Al Falasi', email: 'sara.falasi@gmail.com' },
  { value: '5', label: 'Khalid Al Habtoor', email: 'khalid.habtoor@hotmail.com' },
  { value: '6', label: 'Noura Al Ketbi', email: 'noura.ketbi@gmail.com' },
  { value: '7', label: 'Omar Al Mansoori', email: 'omar.mansoori@outlook.com' },
  { value: '8', label: 'Layla Al Zaabi', email: 'layla.zaabi@gmail.com' }
]

const StepPropertyOwner = ({ activeStep, handleNext, handlePrev, formData, setFormData }: StepProps) => {
  const isValid = formData.propertyOwner !== ''

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>Property Owner</Typography>
        <Typography variant='body2' color='text.secondary'>
          Select the property owner for this listing
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          select
          fullWidth
          label='Property Owner'
          value={formData.propertyOwner}
          onChange={e => setFormData({ ...formData, propertyOwner: e.target.value })}
        >
          <MenuItem value=''>Select Owner</MenuItem>
          {propertyOwners.map(owner => (
            <MenuItem key={owner.value} value={owner.value}>
              {owner.label} — {owner.email}
            </MenuItem>
          ))}
        </CustomTextField>
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

export default StepPropertyOwner
