'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'

// Type Imports
import type { StepProps } from '../types'

const PreviewImage = styled('div')({
  width: '100%',
  paddingBlockEnd: '60%',
  borderRadius: 'var(--mui-shape-borderRadius)',
  overflow: 'hidden',
  position: 'relative',
  '& img': {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
})

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography variant='subtitle1' className='font-semibold mbe-2'>
    {children}
  </Typography>
)

const InfoRow = ({ label, value }: { label: string; value: string | number | boolean }) => {
  if (value === '' || value === false || value === 0) return null

  const displayValue = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)

  return (
    <div className='flex gap-2 mbe-1'>
      <Typography variant='body2' color='text.secondary' className='min-is-[180px]'>
        {label}:
      </Typography>
      <Typography variant='body2'>{displayValue}</Typography>
    </div>
  )
}

// Static owners lookup (same as StepPropertyOwner)
const propertyOwners: Record<string, string> = {
  '1': 'Ahmed Al Maktoum — ahmed.maktoum@gmail.com',
  '2': 'Fatima Al Nahyan — fatima.nahyan@outlook.com',
  '3': 'Mohammed Al Qasimi — mohammed.qasimi@yahoo.com',
  '4': 'Sara Al Falasi — sara.falasi@gmail.com',
  '5': 'Khalid Al Habtoor — khalid.habtoor@hotmail.com',
  '6': 'Noura Al Ketbi — noura.ketbi@gmail.com',
  '7': 'Omar Al Mansoori — omar.mansoori@outlook.com',
  '8': 'Layla Al Zaabi — layla.zaabi@gmail.com'
}

const StepPreview = ({ activeStep, handlePrev, formData }: StepProps) => {
  const allAmenities = [
    ...formData.amenitiesGeneral,
    ...formData.amenitiesKitchen,
    ...formData.amenitiesEssentials,
    ...formData.amenitiesSafety
  ]

  const handleSubmit = () => {
    alert('Property listing submitted successfully!')
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>Property Preview</Typography>
        <Typography variant='body2' color='text.secondary'>
          Review all details before submitting your property listing
        </Typography>
      </Grid>

      {/* Photos */}
      {formData.photos.length > 0 && (
        <Grid size={{ xs: 12 }}>
          <Grid container spacing={2}>
            {formData.photos.slice(0, 4).map((photo, index) => (
              <Grid key={index} size={{ xs: 6, md: 3 }}>
                <PreviewImage>
                  <img src={URL.createObjectURL(photo)} alt={`Preview ${index + 1}`} />
                </PreviewImage>
              </Grid>
            ))}
            {formData.photos.length > 4 && (
              <Grid size={{ xs: 12 }}>
                <Typography variant='body2' color='text.secondary'>
                  +{formData.photos.length - 4} more photos
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}

      {/* Basic Information */}
      <Grid size={{ xs: 12 }}>
        <Divider />
        <SectionTitle>Basic Information</SectionTitle>
        <InfoRow label='Property Type' value={formData.propertyType} />
        <InfoRow label='Unit Number' value={formData.unitNumber} />
        <InfoRow label='Floor Number' value={formData.floorNumber} />
        <InfoRow label='Building Name' value={formData.buildingName} />
        <InfoRow label='Area' value={formData.areaSqFt ? `${formData.areaSqFt} Sq Ft` : ''} />
        <InfoRow label='Bedrooms' value={formData.bedrooms} />
        <InfoRow label='Bathrooms' value={formData.bathrooms} />
        <InfoRow label='Max Guests' value={formData.maxGuests} />
        <InfoRow label='Maid Room' value={formData.maidRoom} />
        <InfoRow label='Balcony' value={formData.balcony} />
        <InfoRow label='Smart Home' value={formData.smartHome} />
        <InfoRow label='View' value={formData.view} />
        <InfoRow label='Furnished Status' value={formData.furnishedStatus} />
        <InfoRow label='Ceiling Height' value={formData.ceilingHeight ? `${formData.ceilingHeight} ft` : ''} />
      </Grid>

      {/* Address */}
      <Grid size={{ xs: 12 }}>
        <Divider />
        <SectionTitle>Address</SectionTitle>
        <InfoRow label='Address Line 1' value={formData.addressLine1} />
        <InfoRow label='Address Line 2' value={formData.addressLine2} />
        <InfoRow label='Country' value={formData.country} />
        <InfoRow label='State' value={formData.state} />
        <InfoRow label='City' value={formData.city} />
        <InfoRow label='Zip Code' value={formData.zipCode} />
        <InfoRow label='Area' value={formData.area} />
        <InfoRow label='Latitude' value={formData.latitude} />
        <InfoRow label='Longitude' value={formData.longitude} />
      </Grid>

      {/* Parking */}
      <Grid size={{ xs: 12 }}>
        <Divider />
        <SectionTitle>Parking</SectionTitle>
        <InfoRow label='Parking Spaces' value={formData.parkingSpaces} />
        <InfoRow label='Parking Type' value={formData.parkingType} />
      </Grid>

      {/* Description */}
      <Grid size={{ xs: 12 }}>
        <Divider />
        <SectionTitle>Description</SectionTitle>
        <InfoRow label='Public Name' value={formData.publicName} />
        {formData.shortDescription && (
          <div className='mbe-2'>
            <Typography variant='body2' color='text.secondary'>Short Description:</Typography>
            <Typography variant='body2'>{formData.shortDescription}</Typography>
          </div>
        )}
        {formData.longDescription && (
          <div className='mbe-2'>
            <Typography variant='body2' color='text.secondary'>Long Description:</Typography>
            <Typography variant='body2' className='whitespace-pre-line'>{formData.longDescription}</Typography>
          </div>
        )}
        {formData.internalNotes && (
          <div>
            <Typography variant='body2' color='text.secondary'>Internal Notes:</Typography>
            <Typography variant='body2'>{formData.internalNotes}</Typography>
          </div>
        )}
      </Grid>

      {/* Amenities */}
      {allAmenities.length > 0 && (
        <Grid size={{ xs: 12 }}>
          <Divider />
          <SectionTitle>Amenities ({allAmenities.length})</SectionTitle>
          <div className='flex flex-wrap gap-2'>
            {allAmenities.map(amenity => (
              <Chip key={amenity} label={amenity} size='small' variant='tonal' />
            ))}
          </div>
        </Grid>
      )}

      {/* Usage & Pricing */}
      <Grid size={{ xs: 12 }}>
        <Divider />
        <SectionTitle>Usage & Pricing</SectionTitle>
        <InfoRow label='Usage Type' value='Long-term Rent' />
        <InfoRow label='Monthly Rent' value={formData.monthlyRent ? `AED ${Number(formData.monthlyRent).toLocaleString()}` : ''} />
        <InfoRow label='Security Deposit' value={formData.securityDepositRequired ? (formData.securityDepositAmount ? `AED ${Number(formData.securityDepositAmount).toLocaleString()}` : 'Required') : 'Not Required'} />
      </Grid>

      {/* Policies */}
      {formData.policies.length > 0 && (
        <Grid size={{ xs: 12 }}>
          <Divider />
          <SectionTitle>Policies ({formData.policies.length})</SectionTitle>
          <div className='flex flex-col gap-2'>
            {formData.policies.map((policy, index) => (
              <div key={index}>
                <Typography variant='body2' className='font-medium'>{policy.name}</Typography>
                {policy.description && (
                  <Typography variant='body2' color='text.secondary'>{policy.description}</Typography>
                )}
              </div>
            ))}
          </div>
        </Grid>
      )}

      {/* Property Owner */}
      <Grid size={{ xs: 12 }}>
        <Divider />
        <SectionTitle>Property Owner</SectionTitle>
        <InfoRow label='Owner' value={propertyOwners[formData.propertyOwner] || ''} />
      </Grid>

      {/* Agreement */}
      <Grid size={{ xs: 12 }}>
        <Divider />
        <SectionTitle>Agreement</SectionTitle>
        <InfoRow label='Acquisition Method' value={formData.acquisitionMethod} />
        <InfoRow label='Rent Amount' value={formData.rentAmount ? `AED ${Number(formData.rentAmount).toLocaleString()}` : ''} />
        <InfoRow label='Rent Frequency' value={formData.rentFrequency} />
        <InfoRow label='Payment Method' value={formData.paymentMethod} />
        <InfoRow label='Tenancy Period' value={formData.tenancyStartDate && formData.tenancyEndDate ? `${formData.tenancyStartDate} to ${formData.tenancyEndDate}` : ''} />
        <InfoRow label='Tenancy Agreement' value={formData.tenancyAgreement?.name || 'Not uploaded'} />
        <InfoRow label='Ejari Certificate' value={formData.ejariCertificate?.name || 'Not uploaded'} />
        <InfoRow label='DCPM Letter' value={formData.dcpmLetter?.name || 'Not uploaded'} />
        <InfoRow label='DEWA Number' value={formData.dewaNumber} />
        <InfoRow label='Internet Account' value={formData.internetAccountNumber} />
        <InfoRow label='Gas Number' value={formData.gasNumber} />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Alert severity='info'>
          Please review all the information above before submitting. You can go back to any step to make changes.
        </Alert>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <div className='flex items-center justify-between'>
          <Button
            variant='tonal'
            color='secondary'
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
          >
            Previous
          </Button>
          <Button variant='contained' color='success' onClick={handleSubmit} endIcon={<i className='tabler-check' />}>
            Submit Property
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepPreview
