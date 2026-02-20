'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'

// Type Imports
import type { StepProps } from '../types'

const propertyTypes = [
  'Apartment',
  'Villa',
  'Townhouse',
  'Penthouse',
  'Studio',
  'Duplex',
  'Loft',
  'Office',
  'Retail',
  'Warehouse'
]

const viewOptions = [
  'Sea View',
  'Marina View',
  'City View',
  'Garden View',
  'Pool View',
  'Landmark View',
  'Canal View',
  'Golf View',
  'Park View',
  'Community View',
  'Street View',
  'No View'
]

const furnishedOptions = ['Furnished', 'Semi-Furnished', 'Unfurnished']

const parkingTypes = ['Covered', 'Uncovered', 'Basement', 'Valet', 'None']

const countries = [
  'United Arab Emirates',
  'Saudi Arabia',
  'Oman',
  'Bahrain',
  'Kuwait',
  'Qatar'
]

const uaeStates = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain'
]

const StepPropertyDetails = ({ activeStep, handleNext, handlePrev, formData, setFormData }: StepProps) => {
  const updateField = <K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) => {
    setFormData({ ...formData, [field]: value })
  }

  const isValid =
    formData.propertyType &&
    formData.buildingName.trim() &&
    formData.areaSqFt &&
    formData.addressLine1.trim() &&
    formData.country &&
    formData.city

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>Property Details</Typography>
        <Typography variant='body2' color='text.secondary'>
          Enter the basic property information, address, and parking details
        </Typography>
      </Grid>

      {/* ── Basic Information ── */}
      <Grid size={{ xs: 12 }}>
        <Typography variant='subtitle1' className='font-medium'>
          Basic Information
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          select
          fullWidth
          label='Property Type'
          value={formData.propertyType}
          onChange={e => updateField('propertyType', e.target.value)}
        >
          <MenuItem value=''>Select Type</MenuItem>
          {propertyTypes.map(type => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </CustomTextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          label='Unit Number'
          placeholder='e.g. 1205'
          value={formData.unitNumber}
          onChange={e => updateField('unitNumber', e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          label='Floor Number'
          placeholder='e.g. 12'
          value={formData.floorNumber}
          onChange={e => updateField('floorNumber', e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          label='Building Name'
          placeholder='e.g. Burj Vista Tower 1'
          value={formData.buildingName}
          onChange={e => updateField('buildingName', e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          label='Area (Sq Ft)'
          placeholder='e.g. 1200'
          value={formData.areaSqFt}
          onChange={e => updateField('areaSqFt', e.target.value.replace(/\D/g, ''))}
          slotProps={{ htmlInput: { inputMode: 'numeric' } }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          label='Ceiling Height (ft)'
          placeholder='e.g. 10'
          value={formData.ceilingHeight}
          onChange={e => updateField('ceilingHeight', e.target.value)}
        />
      </Grid>

      {/* Counters: Bedrooms, Bathrooms, Max Guests */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant='body2' color='text.secondary' className='mbe-1'>
          Bedrooms
        </Typography>
        <div className='flex items-center gap-3'>
          <IconButton
            size='small'
            color='primary'
            disabled={formData.bedrooms <= 0}
            onClick={() => updateField('bedrooms', formData.bedrooms - 1)}
          >
            <i className='tabler-minus text-lg' />
          </IconButton>
          <Typography variant='h6' className='min-is-[30px] text-center'>
            {formData.bedrooms}
          </Typography>
          <IconButton size='small' color='primary' onClick={() => updateField('bedrooms', formData.bedrooms + 1)}>
            <i className='tabler-plus text-lg' />
          </IconButton>
        </div>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant='body2' color='text.secondary' className='mbe-1'>
          Bathrooms
        </Typography>
        <div className='flex items-center gap-3'>
          <IconButton
            size='small'
            color='primary'
            disabled={formData.bathrooms <= 0}
            onClick={() => updateField('bathrooms', formData.bathrooms - 1)}
          >
            <i className='tabler-minus text-lg' />
          </IconButton>
          <Typography variant='h6' className='min-is-[30px] text-center'>
            {formData.bathrooms}
          </Typography>
          <IconButton size='small' color='primary' onClick={() => updateField('bathrooms', formData.bathrooms + 1)}>
            <i className='tabler-plus text-lg' />
          </IconButton>
        </div>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant='body2' color='text.secondary' className='mbe-1'>
          Max Guests
        </Typography>
        <div className='flex items-center gap-3'>
          <IconButton
            size='small'
            color='primary'
            disabled={formData.maxGuests <= 0}
            onClick={() => updateField('maxGuests', formData.maxGuests - 1)}
          >
            <i className='tabler-minus text-lg' />
          </IconButton>
          <Typography variant='h6' className='min-is-[30px] text-center'>
            {formData.maxGuests}
          </Typography>
          <IconButton size='small' color='primary' onClick={() => updateField('maxGuests', formData.maxGuests + 1)}>
            <i className='tabler-plus text-lg' />
          </IconButton>
        </div>
      </Grid>

      {/* Toggle switches */}
      <Grid size={{ xs: 12, md: 4 }}>
        <FormControlLabel
          control={<Switch checked={formData.maidRoom} onChange={e => updateField('maidRoom', e.target.checked)} />}
          label='Maid Room'
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <FormControlLabel
          control={<Switch checked={formData.balcony} onChange={e => updateField('balcony', e.target.checked)} />}
          label='Balcony'
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <FormControlLabel
          control={<Switch checked={formData.smartHome} onChange={e => updateField('smartHome', e.target.checked)} />}
          label='Smart Home'
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          select
          fullWidth
          label='View'
          value={formData.view}
          onChange={e => updateField('view', e.target.value)}
        >
          <MenuItem value=''>Select View</MenuItem>
          {viewOptions.map(v => (
            <MenuItem key={v} value={v}>
              {v}
            </MenuItem>
          ))}
        </CustomTextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          select
          fullWidth
          label='Furnished Status'
          value={formData.furnishedStatus}
          onChange={e => updateField('furnishedStatus', e.target.value)}
        >
          <MenuItem value=''>Select</MenuItem>
          {furnishedOptions.map(opt => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </CustomTextField>
      </Grid>

      {/* ── Address ── */}
      <Grid size={{ xs: 12 }}>
        <Divider />
        <Typography variant='subtitle1' className='font-medium mbs-4'>
          Address
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          fullWidth
          label='Address Line 1'
          placeholder='Street address, P.O. box'
          value={formData.addressLine1}
          onChange={e => updateField('addressLine1', e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          fullWidth
          label='Address Line 2'
          placeholder='Apartment, suite, unit, building, floor, etc.'
          value={formData.addressLine2}
          onChange={e => updateField('addressLine2', e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          select
          fullWidth
          label='Country'
          value={formData.country}
          onChange={e => updateField('country', e.target.value)}
        >
          <MenuItem value=''>Select Country</MenuItem>
          {countries.map(c => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </CustomTextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          select
          fullWidth
          label='State'
          value={formData.state}
          onChange={e => updateField('state', e.target.value)}
        >
          <MenuItem value=''>Select State</MenuItem>
          {uaeStates.map(s => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </CustomTextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          label='City'
          placeholder='e.g. Dubai'
          value={formData.city}
          onChange={e => updateField('city', e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          label='Zip Code'
          placeholder='e.g. 00000'
          value={formData.zipCode}
          onChange={e => updateField('zipCode', e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomTextField
          fullWidth
          label='Area'
          placeholder='e.g. Downtown Dubai'
          value={formData.area}
          onChange={e => updateField('area', e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomTextField
          fullWidth
          label='Latitude'
          placeholder='e.g. 25.2048'
          value={formData.latitude}
          onChange={e => updateField('latitude', e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomTextField
          fullWidth
          label='Longitude'
          placeholder='e.g. 55.2708'
          value={formData.longitude}
          onChange={e => updateField('longitude', e.target.value)}
        />
      </Grid>

      {/* ── Parking ── */}
      <Grid size={{ xs: 12 }}>
        <Divider />
        <Typography variant='subtitle1' className='font-medium mbs-4'>
          Parking
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          label='Parking Spaces'
          placeholder='e.g. 2'
          value={formData.parkingSpaces}
          onChange={e => updateField('parkingSpaces', e.target.value.replace(/\D/g, ''))}
          slotProps={{ htmlInput: { inputMode: 'numeric' } }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          select
          fullWidth
          label='Parking Type'
          value={formData.parkingType}
          onChange={e => updateField('parkingType', e.target.value)}
        >
          <MenuItem value=''>Select</MenuItem>
          {parkingTypes.map(type => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </CustomTextField>
      </Grid>

      {/* Navigation */}
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

export default StepPropertyDetails
