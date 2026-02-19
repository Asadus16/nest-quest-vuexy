'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import FileUpload from '@core/components/FileUpload'
import DirectionalIcon from '@components/DirectionalIcon'

// Data Imports
import { uaeCities, getAreasByCity } from '@/data/uae-locations'

// Type Imports
import type { StepProps } from '../types'

const StepCompanyDetails = ({ activeStep, handleNext, handlePrev, steps }: StepProps) => {
  const [companyName, setCompanyName] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [companyLogo, setCompanyLogo] = useState<File | null>(null)
  const [companyAddress, setCompanyAddress] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedArea, setSelectedArea] = useState('')

  const areas = selectedCity ? getAreasByCity(selectedCity) : []

  const isValid =
    companyName.trim() && companyEmail.trim() && companyLogo && companyAddress.trim() && selectedCity && selectedArea

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>Company Details</Typography>
        <Typography variant='body2' color='text.secondary'>
          Provide your company information
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          label='Company Name'
          placeholder='Enter company name'
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          type='email'
          label='Company Email'
          placeholder='info@company.com'
          value={companyEmail}
          onChange={e => setCompanyEmail(e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FileUpload label='Upload Company Logo' accept='image/*' onChange={f => setCompanyLogo(f)} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          fullWidth
          multiline
          minRows={2}
          label='Company Address'
          placeholder='Enter company address'
          value={companyAddress}
          onChange={e => setCompanyAddress(e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          select
          fullWidth
          label='City'
          value={selectedCity}
          onChange={e => {
            setSelectedCity(e.target.value)
            setSelectedArea('')
          }}
        >
          <MenuItem value=''>Select City</MenuItem>
          {uaeCities.map(city => (
            <MenuItem key={city.value} value={city.value}>
              {city.label}
            </MenuItem>
          ))}
        </CustomTextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          select
          fullWidth
          label='Area'
          disabled={!selectedCity}
          value={selectedArea}
          onChange={e => setSelectedArea(e.target.value)}
        >
          <MenuItem value=''>Select Area</MenuItem>
          {areas.map(area => (
            <MenuItem key={area.value} value={area.value}>
              {area.label}
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

export default StepCompanyDetails
