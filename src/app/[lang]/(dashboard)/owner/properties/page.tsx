'use client'

// React Imports
import { useCallback, useEffect, useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Type Imports
import type { Locale } from '@configs/i18n'
import type { PropertyType } from '@/types/apps/propertyTypes'

// Service Imports
import { getOwnerProperties } from '@/services/properties'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const STATUS_CONFIG: Record<string, { label: string; color: 'success' | 'warning' | 'error' }> = {
  OCCUPIED: { label: 'Occupied', color: 'success' },
  VACANT: { label: 'Vacant', color: 'warning' },
  UNDER_MAINTENANCE: { label: 'Maintenance', color: 'error' }
}

const OwnerPropertiesPage = () => {
  const [properties, setProperties] = useState<PropertyType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { lang: locale } = useParams()

  const fetchProperties = useCallback(() => {
    setLoading(true)
    setError(null)

    getOwnerProperties()
      .then(setProperties)
      .catch(() => setError('Failed to load properties. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <CircularProgress />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[400px] gap-4'>
        <Typography color='text.secondary'>{error}</Typography>
        <Button variant='tonal' onClick={fetchProperties}>
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h4'>My Properties</Typography>
        <Typography variant='body2' color='text.secondary'>
          Properties linked to your account by your property manager.
        </Typography>
      </Grid>
      {properties.length === 0 ? (
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent className='flex flex-col items-center justify-center py-12 gap-4'>
              <CustomAvatar skin='light' color='primary' size={80}>
                <i className='tabler-building-skyscraper text-[40px]' />
              </CustomAvatar>
              <Typography variant='h6' color='text.secondary'>
                No properties linked yet
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Your property manager will link properties to your account.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ) : (
        properties.map(property => {
          const status = STATUS_CONFIG[property.status]

          return (
            <Grid key={property.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <CardContent className='flex flex-col gap-4'>
                  <div className='flex items-center gap-4'>
                    {property.image ? (
                      <img
                        src={property.image}
                        width={60}
                        height={60}
                        className='rounded-lg object-cover'
                        alt={property.public_name}
                      />
                    ) : (
                      <CustomAvatar variant='rounded' skin='light' color='primary' size={60}>
                        <i className='tabler-building text-[28px]' />
                      </CustomAvatar>
                    )}
                    <div className='flex-1 min-w-0'>
                      <Typography variant='h6' noWrap>
                        {property.public_name}
                      </Typography>
                      <Typography variant='body2' color='text.secondary' noWrap>
                        {[property.building_name, property.unit_number].filter(Boolean).join(' - ')}
                      </Typography>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Chip
                      label={status?.label ?? property.status}
                      color={status?.color ?? 'primary'}
                      size='small'
                      variant='tonal'
                    />
                    <Typography variant='body2' color='text.secondary'>
                      {property.property_type}
                    </Typography>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Typography variant='body2'>
                      {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} BR`} |{' '}
                      {Number(property.area_sqft).toLocaleString()} sqft
                    </Typography>
                    {property.monthly_rent && (
                      <Typography className='font-medium' color='text.primary'>
                        AED {Number(property.monthly_rent).toLocaleString()}
                      </Typography>
                    )}
                  </div>
                  <Button
                    variant='tonal'
                    component={Link}
                    href={getLocalizedUrl(`/properties/view/${property.id}`, locale as Locale)}
                    startIcon={<i className='tabler-eye' />}
                    fullWidth
                  >
                    View Property
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )
        })
      )}
    </Grid>
  )
}

export default OwnerPropertiesPage
