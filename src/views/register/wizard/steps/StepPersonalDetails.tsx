'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import DirectionalIcon from '@components/DirectionalIcon'

// Hook Imports
import useCountries from '@/hooks/useCountries'
import type { Country } from '@/hooks/useCountries'

// Context Imports
import { useRegistration } from '@/contexts/registrationContext'

// Type Imports
import type { StepProps } from '../types'

const StepPersonalDetails = ({ activeStep, handleNext, handlePrev, steps }: StepProps) => {
  const { countries, loading } = useCountries()
  const { formData, updateForm } = useRegistration()

  const [fullName, setFullName] = useState(formData.full_name ?? '')
  const [dob, setDob] = useState(formData.dob ?? '')
  const [nationality, setNationality] = useState<Country | null>(null)
  const [country, setCountry] = useState<Country | null>(null)
  const [address, setAddress] = useState(formData.address ?? '')

  const isValid = fullName.trim() && dob && nationality && country && address.trim()

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>Personal Details</Typography>
        <Typography variant='body2' color='text.secondary'>
          Fill in your basic personal information
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          fullWidth
          label='Full Name'
          placeholder='John Doe'
          value={fullName}
          onChange={e => {
          const v = e.target.value
          setFullName(v)
          updateForm({ full_name: v })
        }}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          fullWidth
          type='date'
          label='Date of Birth'
          value={dob}
          onChange={e => {
          const v = e.target.value
          setDob(v)
          updateForm({ dob: v })
        }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomAutocomplete
          fullWidth
          loading={loading}
          options={countries}
          value={nationality}
          onChange={(_, val) => {
          setNationality(val)
          updateForm({ nationality: val?.label })
        }}
          getOptionLabel={option => (typeof option === 'string' ? option : option.label)}
          renderInput={params => <CustomTextField {...params} label='Nationality' placeholder='Select nationality' />}
          isOptionEqualToValue={(option, value) => option.code === value.code}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomAutocomplete
          fullWidth
          loading={loading}
          options={countries}
          value={country}
          onChange={(_, val) => setCountry(val)}
          getOptionLabel={option => (typeof option === 'string' ? option : option.label)}
          renderInput={params => (
            <CustomTextField {...params} label='Country of Residence' placeholder='Select country' />
          )}
          isOptionEqualToValue={(option, value) => option.code === value.code}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          fullWidth
          multiline
          minRows={2}
          label='Resident Address'
          placeholder='Enter your address'
          value={address}
          onChange={e => {
          const v = e.target.value
          setAddress(v)
          updateForm({ address: v })
        }}
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

export default StepPersonalDetails
