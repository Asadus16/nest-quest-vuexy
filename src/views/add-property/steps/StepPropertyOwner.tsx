'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'

// Service Imports
import { getLinkedOwners } from '@/services/properties'

// Type Imports
import type { StepProps } from '../types'
import type { LinkedOwnerType } from '@/types/apps/propertyTypes'

const StepPropertyOwner = ({ activeStep, handleNext, handlePrev, formData, setFormData }: StepProps) => {
  const [owners, setOwners] = useState<LinkedOwnerType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getLinkedOwners()
      .then(setOwners)
      .catch(() => setError('Failed to load property owners.'))
      .finally(() => setLoading(false))
  }, [])

  const isValid = formData.propertyOwner !== ''

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>Property Owner</Typography>
        <Typography variant='body2' color='text.secondary'>
          Select the property owner for this listing
        </Typography>
      </Grid>

      {error && (
        <Grid size={{ xs: 12 }}>
          <Alert severity='error'>{error}</Alert>
        </Grid>
      )}

      <Grid size={{ xs: 12 }}>
        {loading ? (
          <div className='flex items-center gap-2'>
            <CircularProgress size={20} />
            <Typography variant='body2' color='text.secondary'>Loading owners...</Typography>
          </div>
        ) : (
          <CustomTextField
            select
            fullWidth
            label='Property Owner'
            value={formData.propertyOwner}
            onChange={e => setFormData({ ...formData, propertyOwner: e.target.value })}
          >
            <MenuItem value=''>Select Owner</MenuItem>
            {owners.map(owner => (
              <MenuItem key={owner.id} value={String(owner.id)}>
                {owner.full_name} — {owner.email}
              </MenuItem>
            ))}
            {owners.length === 0 && (
              <MenuItem disabled>No linked owners found. Invite an owner first.</MenuItem>
            )}
          </CustomTextField>
        )}
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
