'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'

// Type Imports
import type { StepProps, PolicyItem } from '../types'

const StepPolicies = ({ activeStep, handleNext, handlePrev, formData, setFormData }: StepProps) => {
  const [newPolicyName, setNewPolicyName] = useState('')
  const [newPolicyDescription, setNewPolicyDescription] = useState('')
  const [showForm, setShowForm] = useState(false)

  const addPolicy = () => {
    if (!newPolicyName.trim()) return

    const newPolicy: PolicyItem = {
      name: newPolicyName.trim(),
      description: newPolicyDescription.trim()
    }

    setFormData({ ...formData, policies: [...formData.policies, newPolicy] })
    setNewPolicyName('')
    setNewPolicyDescription('')
    setShowForm(false)
  }

  const removePolicy = (index: number) => {
    const updated = formData.policies.filter((_, i) => i !== index)

    setFormData({ ...formData, policies: updated })
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>Policies</Typography>
        <Typography variant='body2' color='text.secondary'>
          Add custom policies and rules for the property
        </Typography>
      </Grid>

      {/* Property Policies */}
      <Grid size={{ xs: 12 }}>
        <Typography variant='subtitle1' className='font-medium'>
          Property Policies
        </Typography>
      </Grid>

      {/* Existing policies list */}
      {formData.policies.length > 0 && (
        <Grid size={{ xs: 12 }}>
          <div className='flex flex-col gap-3'>
            {formData.policies.map((policy, index) => (
              <div
                key={index}
                className='flex items-start gap-3 p-4 rounded border'
                style={{ borderColor: 'var(--mui-palette-divider)' }}
              >
                <i className='tabler-gavel text-xl text-textSecondary mbs-0.5' />
                <div className='flex-1'>
                  <Typography variant='body1' className='font-medium'>
                    {policy.name}
                  </Typography>
                  {policy.description && (
                    <Typography variant='body2' color='text.secondary'>
                      {policy.description}
                    </Typography>
                  )}
                </div>
                <IconButton size='small' color='error' onClick={() => removePolicy(index)}>
                  <i className='tabler-trash text-lg' />
                </IconButton>
              </div>
            ))}
          </div>
        </Grid>
      )}

      {/* Add policy form */}
      {showForm && (
        <Grid size={{ xs: 12 }}>
          <div
            className='flex flex-col gap-4 p-4 rounded border'
            style={{ borderColor: 'var(--mui-palette-primary-main)', backgroundColor: 'var(--mui-palette-primary-lightOpacity)' }}
          >
            <CustomTextField
              fullWidth
              label='Policy Name'
              placeholder='e.g. No Smoking'
              value={newPolicyName}
              onChange={e => setNewPolicyName(e.target.value)}
            />
            <CustomTextField
              fullWidth
              multiline
              minRows={2}
              label='Policy Description'
              placeholder='Describe the policy in detail...'
              value={newPolicyDescription}
              onChange={e => setNewPolicyDescription(e.target.value)}
            />
            <div className='flex items-center gap-3'>
              <Button variant='contained' size='small' disabled={!newPolicyName.trim()} onClick={addPolicy}>
                Save Policy
              </Button>
              <Button
                variant='tonal'
                color='secondary'
                size='small'
                onClick={() => {
                  setShowForm(false)
                  setNewPolicyName('')
                  setNewPolicyDescription('')
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Grid>
      )}

      {/* Add policy button */}
      {!showForm && (
        <Grid size={{ xs: 12 }}>
          <Button variant='tonal' startIcon={<i className='tabler-plus' />} onClick={() => setShowForm(true)}>
            Add Policy
          </Button>
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

export default StepPolicies
