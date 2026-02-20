'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'

// Type Imports
import type { StepProps } from '../types'

const StepDescription = ({ activeStep, handleNext, handlePrev, formData, setFormData }: StepProps) => {
  const isValid = formData.publicName.trim() && formData.shortDescription.trim() && formData.longDescription.trim()

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>Description</Typography>
        <Typography variant='body2' color='text.secondary'>
          Write a compelling description for your property listing
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          fullWidth
          label='Public Name'
          placeholder='e.g. Spacious 2BR Apartment with Marina Views'
          value={formData.publicName}
          onChange={e => updateField('publicName', e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          fullWidth
          multiline
          minRows={2}
          label='Short Description'
          placeholder='A brief summary of the property...'
          value={formData.shortDescription}
          onChange={e => updateField('shortDescription', e.target.value)}
          helperText={`${formData.shortDescription.length}/300 characters`}
          slotProps={{ htmlInput: { maxLength: 300 } }}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          fullWidth
          multiline
          minRows={5}
          label='Long Description'
          placeholder='Describe the property in detail — include highlights, nearby amenities, views, and any unique features...'
          value={formData.longDescription}
          onChange={e => updateField('longDescription', e.target.value)}
          helperText={`${formData.longDescription.length}/2000 characters`}
          slotProps={{ htmlInput: { maxLength: 2000 } }}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          fullWidth
          multiline
          minRows={3}
          label='Internal Notes'
          placeholder='Notes visible only to your team (not shown on listing)...'
          value={formData.internalNotes}
          onChange={e => updateField('internalNotes', e.target.value)}
          helperText='Optional — for internal use only'
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

export default StepDescription
