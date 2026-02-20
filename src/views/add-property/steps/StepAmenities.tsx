'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'

// Type Imports
import type { StepProps, PropertyFormData } from '../types'

const generalAmenities = [
  'Central A/C',
  'Balcony',
  'Built-in Wardrobes',
  'Swimming Pool',
  'Gym / Fitness Center',
  'Concierge',
  'Children\'s Play Area',
  'Landscaped Gardens',
  'BBQ Area',
  'Jacuzzi',
  'Sauna / Steam Room',
  'Lobby',
  'Elevator',
  'Reception / Waiting Area',
  'Maintenance Staff',
  'Security',
  'CCTV',
  'Intercom',
  'Satellite / Cable TV',
  'Internet / Wi-Fi',
  'Shared Roof Terrace',
  'Maid\'s Room',
  'Storage Room',
  'Study / Office',
  'Laundry Room',
  'Private Garden',
  'Private Pool',
  'View of Water',
  'View of Landmark',
  'Pet Friendly'
]

const kitchenAmenities = [
  'Built-in Kitchen Appliances',
  'Refrigerator',
  'Gas Cooking',
  'Electric Cooking',
  'Dishwasher',
  'Microwave',
  'Oven',
  'Washing Machine',
  'Dryer',
  'Water Purifier',
  'Garbage Disposal'
]

const essentialAmenities = [
  'Electricity Backup',
  'Water Tank',
  'Central Gas',
  'District Cooling',
  'Water Heater',
  'Broadband Ready',
  'Satellite Dish'
]

const safetyAmenities = [
  'Fire Alarm',
  'Fire Extinguisher',
  'Smoke Detector',
  'Emergency Exit',
  'First Aid Kit',
  'Sprinkler System',
  'Fire Hose',
  'Security Alarm',
  'Video Door Phone'
]

type AmenityCategory = 'amenitiesGeneral' | 'amenitiesKitchen' | 'amenitiesEssentials' | 'amenitiesSafety'

const StepAmenities = ({ activeStep, handleNext, handlePrev, formData, setFormData }: StepProps) => {
  const toggleAmenity = (category: AmenityCategory, amenity: string) => {
    const current = formData[category]
    const updated = current.includes(amenity) ? current.filter(a => a !== amenity) : [...current, amenity]

    setFormData({ ...formData, [category]: updated })
  }

  const renderCheckboxGroup = (title: string, items: string[], category: AmenityCategory) => (
    <>
      <Grid size={{ xs: 12 }}>
        <Typography variant='subtitle1' className='font-medium'>
          {title}
        </Typography>
      </Grid>
      {items.map(item => (
        <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData[category].includes(item)}
                onChange={() => toggleAmenity(category, item)}
              />
            }
            label={item}
          />
        </Grid>
      ))}
    </>
  )

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>Amenities</Typography>
        <Typography variant='body2' color='text.secondary'>
          Select all amenities available in the property
        </Typography>
      </Grid>

      {renderCheckboxGroup('General', generalAmenities, 'amenitiesGeneral')}

      <Grid size={{ xs: 12 }}>
        <Divider />
      </Grid>
      {renderCheckboxGroup('Kitchen', kitchenAmenities, 'amenitiesKitchen')}

      <Grid size={{ xs: 12 }}>
        <Divider />
      </Grid>
      {renderCheckboxGroup('Essentials', essentialAmenities, 'amenitiesEssentials')}

      <Grid size={{ xs: 12 }}>
        <Divider />
      </Grid>
      {renderCheckboxGroup('Safety', safetyAmenities, 'amenitiesSafety')}

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

export default StepAmenities
