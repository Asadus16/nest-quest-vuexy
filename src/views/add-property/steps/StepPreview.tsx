'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'

// Service Imports
import { createProperty, getLinkedOwners } from '@/services/properties'
import { ApiError } from '@/lib/api'

// Type Imports
import type { StepProps } from '../types'
import type { LinkedOwnerType } from '@/types/apps/propertyTypes'

// Hook Imports
import { useParams } from 'next/navigation'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import type { Locale } from '@configs/i18n'

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

const StepPreview = ({ activeStep, handlePrev, formData }: StepProps) => {
  const { lang: locale } = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [owners, setOwners] = useState<LinkedOwnerType[]>([])

  useEffect(() => {
    getLinkedOwners().then(setOwners).catch(() => {})
  }, [])

  const selectedOwner = owners.find(o => String(o.id) === formData.propertyOwner)

  const allAmenities = [
    ...formData.amenitiesGeneral,
    ...formData.amenitiesKitchen,
    ...formData.amenitiesEssentials,
    ...formData.amenitiesSafety
  ]

  const handleSubmit = async () => {
    setError(null)
    setLoading(true)

    try {
      const fd = new FormData()

      // Basic Information
      fd.append('property_type', formData.propertyType)
      if (formData.unitNumber) fd.append('unit_number', formData.unitNumber)
      if (formData.floorNumber) fd.append('floor_number', formData.floorNumber)
      fd.append('building_name', formData.buildingName)
      fd.append('area_sqft', formData.areaSqFt)
      fd.append('bedrooms', String(formData.bedrooms))
      fd.append('bathrooms', String(formData.bathrooms))
      fd.append('max_guests', String(formData.maxGuests))
      fd.append('maid_room', formData.maidRoom ? '1' : '0')
      fd.append('balcony', formData.balcony ? '1' : '0')
      fd.append('smart_home', formData.smartHome ? '1' : '0')
      if (formData.view) fd.append('view', formData.view)
      if (formData.furnishedStatus) fd.append('furnished_status', formData.furnishedStatus)
      if (formData.ceilingHeight) fd.append('ceiling_height', formData.ceilingHeight)

      // Address
      fd.append('address_line_1', formData.addressLine1)
      if (formData.addressLine2) fd.append('address_line_2', formData.addressLine2)
      fd.append('country', formData.country)
      if (formData.state) fd.append('state', formData.state)
      fd.append('city', formData.city)
      if (formData.zipCode) fd.append('zip_code', formData.zipCode)
      if (formData.area) fd.append('area', formData.area)
      if (formData.latitude) fd.append('latitude', formData.latitude)
      if (formData.longitude) fd.append('longitude', formData.longitude)

      // Parking
      if (formData.parkingSpaces) fd.append('parking_spaces', formData.parkingSpaces)
      if (formData.parkingType) fd.append('parking_type', formData.parkingType)

      // Description
      fd.append('public_name', formData.publicName)
      if (formData.shortDescription) fd.append('short_description', formData.shortDescription)
      if (formData.longDescription) fd.append('long_description', formData.longDescription)
      if (formData.internalNotes) fd.append('internal_notes', formData.internalNotes)

      // Amenities (as JSON strings)
      if (formData.amenitiesGeneral.length) fd.append('amenities_general', JSON.stringify(formData.amenitiesGeneral))
      if (formData.amenitiesKitchen.length) fd.append('amenities_kitchen', JSON.stringify(formData.amenitiesKitchen))
      if (formData.amenitiesEssentials.length) fd.append('amenities_essentials', JSON.stringify(formData.amenitiesEssentials))
      if (formData.amenitiesSafety.length) fd.append('amenities_safety', JSON.stringify(formData.amenitiesSafety))

      // Usage
      if (formData.usageType) fd.append('usage_type', formData.usageType)
      if (formData.monthlyRent) fd.append('monthly_rent', formData.monthlyRent)
      fd.append('security_deposit_required', formData.securityDepositRequired ? '1' : '0')
      if (formData.securityDepositAmount) fd.append('security_deposit_amount', formData.securityDepositAmount)

      // Policies (as JSON string)
      if (formData.policies.length) fd.append('policies', JSON.stringify(formData.policies))

      // Owner
      if (formData.propertyOwner) fd.append('owner_id', formData.propertyOwner)

      // Agreement - common
      if (formData.acquisitionMethod) fd.append('acquisition_method', formData.acquisitionMethod)

      // Agreement - Rented specific
      if (formData.acquisitionMethod === 'Rented') {
        if (formData.rentAmount) fd.append('rent_amount', formData.rentAmount)
        if (formData.rentFrequency) fd.append('rent_frequency', formData.rentFrequency)
        if (formData.paymentMethod) fd.append('payment_method', formData.paymentMethod)
        if (formData.tenancyStartDate) fd.append('tenancy_start_date', formData.tenancyStartDate)
        if (formData.tenancyEndDate) fd.append('tenancy_end_date', formData.tenancyEndDate)
        if (formData.tenancyAgreement) fd.append('tenancy_agreement', formData.tenancyAgreement)
        if (formData.ejariCertificate) fd.append('ejari_certificate', formData.ejariCertificate)
        if (formData.dcpmLetter) fd.append('dcpm_letter', formData.dcpmLetter)
      }

      // Agreement - Bought (Cash) specific
      if (formData.acquisitionMethod === 'Bought (Cash)') {
        if (formData.purchasePrice) fd.append('purchase_price', formData.purchasePrice)
        if (formData.purchaseDate) fd.append('purchase_date', formData.purchaseDate)
        if (formData.spa) fd.append('spa', formData.spa)
        if (formData.paymentProof) fd.append('payment_proof', formData.paymentProof)
      }

      // Agreement - Financed specific
      if (formData.acquisitionMethod === 'Financed') {
        if (formData.purchasePrice) fd.append('purchase_price', formData.purchasePrice)
        if (formData.financeItems.length) fd.append('finance_items', JSON.stringify(formData.financeItems))
        if (formData.spa) fd.append('spa', formData.spa)
      }

      // Agreement - Common utilities
      if (formData.dewaNumber) fd.append('dewa_number', formData.dewaNumber)
      if (formData.internetAccountNumber) fd.append('internet_account_number', formData.internetAccountNumber)
      if (formData.gasNumber) fd.append('gas_number', formData.gasNumber)

      // File uploads - Photos
      formData.photos.forEach(photo => fd.append('photos[]', photo))

      await createProperty(fd)
      window.location.href = getLocalizedUrl('/properties/list', locale as Locale)
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Failed to create property. Please try again.'
      setError(typeof message === 'string' ? message : JSON.stringify(message))
    } finally {
      setLoading(false)
    }
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
        {formData.latitude && formData.longitude && (
          <InfoRow label='Location' value={`${formData.latitude}, ${formData.longitude}`} />
        )}
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
        <InfoRow label='Owner' value={selectedOwner ? `${selectedOwner.full_name} — ${selectedOwner.email}` : ''} />
      </Grid>

      {/* Agreement */}
      <Grid size={{ xs: 12 }}>
        <Divider />
        <SectionTitle>Agreement</SectionTitle>
        <InfoRow label='Acquisition Method' value={formData.acquisitionMethod} />

        {/* Rented preview */}
        {formData.acquisitionMethod === 'Rented' && (
          <>
            <InfoRow label='Rent Amount' value={formData.rentAmount ? `AED ${Number(formData.rentAmount).toLocaleString()}` : ''} />
            <InfoRow label='Rent Frequency' value={formData.rentFrequency} />
            <InfoRow label='Payment Method' value={formData.paymentMethod} />
            <InfoRow label='Tenancy Period' value={formData.tenancyStartDate && formData.tenancyEndDate ? `${formData.tenancyStartDate} to ${formData.tenancyEndDate}` : ''} />
            <InfoRow label='Tenancy Agreement' value={formData.tenancyAgreement?.name || 'Not uploaded'} />
            <InfoRow label='Ejari Certificate' value={formData.ejariCertificate?.name || 'Not uploaded'} />
            <InfoRow label='DCPM Letter' value={formData.dcpmLetter?.name || 'Not uploaded'} />
          </>
        )}

        {/* Bought (Cash) preview */}
        {formData.acquisitionMethod === 'Bought (Cash)' && (
          <>
            <InfoRow label='Purchase Price' value={formData.purchasePrice ? `AED ${Number(formData.purchasePrice).toLocaleString()}` : ''} />
            <InfoRow label='Purchase Date' value={formData.purchaseDate} />
            <InfoRow label='Sale Purchase Agreement' value={formData.spa?.name || 'Not uploaded'} />
            <InfoRow label='Payment Proof' value={formData.paymentProof?.name || 'Not uploaded'} />
          </>
        )}

        {/* Financed preview */}
        {formData.acquisitionMethod === 'Financed' && (
          <>
            <InfoRow label='Purchase Price' value={formData.purchasePrice ? `AED ${Number(formData.purchasePrice).toLocaleString()}` : ''} />
            {formData.financeItems.length > 0 && (
              <div className='mbs-2'>
                <Typography variant='body2' color='text.secondary' className='font-medium mbe-1'>Finance Items:</Typography>
                {formData.financeItems.map((item, i) => (
                  <div key={i} className='flex gap-4 mbe-1 items-center'>
                    <Typography variant='body2'>{item.label}</Typography>
                    <Typography variant='body2'>AED {Number(item.amount).toLocaleString()}</Typography>
                    <Typography variant='body2'>{item.dueDate}</Typography>
                    <Chip label={item.status} size='small' variant='tonal' color={item.status === 'Paid' ? 'success' : 'warning'} />
                  </div>
                ))}
                <Divider className='mbs-2 mbe-1' />
                <InfoRow label='Total Amount' value={`AED ${formData.financeItems.reduce((s, i) => s + (Number(i.amount) || 0), 0).toLocaleString()}`} />
                <InfoRow label='Total Paid' value={`AED ${formData.financeItems.filter(i => i.status === 'Paid').reduce((s, i) => s + (Number(i.amount) || 0), 0).toLocaleString()}`} />
              </div>
            )}
            <InfoRow label='Sale Purchase Agreement' value={formData.spa?.name || 'Not uploaded'} />
          </>
        )}

        {/* Common utilities */}
        <InfoRow label='DEWA Number' value={formData.dewaNumber} />
        <InfoRow label='Internet Account' value={formData.internetAccountNumber} />
        <InfoRow label='Gas Number' value={formData.gasNumber} />
      </Grid>

      {error && (
        <Grid size={{ xs: 12 }}>
          <Alert severity='error'>{error}</Alert>
        </Grid>
      )}

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
            disabled={loading}
            startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
          >
            Previous
          </Button>
          <Button
            variant='contained'
            color='success'
            onClick={handleSubmit}
            disabled={loading}
            endIcon={loading ? <CircularProgress size={18} color='inherit' /> : <i className='tabler-check' />}
          >
            {loading ? 'Submitting...' : 'Submit Property'}
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepPreview
