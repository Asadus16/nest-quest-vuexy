// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

// Type Imports
import type { PropertyDetailType } from '@/types/apps/propertyTypes'

const amenityCategories = [
  { key: 'amenities_general' as const, label: 'General' },
  { key: 'amenities_kitchen' as const, label: 'Kitchen' },
  { key: 'amenities_essentials' as const, label: 'Essentials' },
  { key: 'amenities_safety' as const, label: 'Safety' }
]

const OverviewTab = ({ property }: { property: PropertyDetailType }) => {
  const hasAmenities = amenityCategories.some(cat => Array.isArray(property[cat.key]) && property[cat.key].length > 0)
  const hasDescription = property.short_description || property.long_description || property.internal_notes

  const features = [
    property.maid_room && { label: 'Maid Room', color: 'primary' as const },
    property.balcony && { label: 'Balcony', color: 'primary' as const },
    property.smart_home && { label: 'Smart Home', color: 'primary' as const },
    property.max_guests > 0 && { label: `Max Guests: ${property.max_guests}`, color: 'info' as const },
    property.ceiling_height && { label: `Ceiling: ${property.ceiling_height}`, color: 'info' as const },
    property.parking_spaces && {
      label: `Parking: ${property.parking_spaces}${property.parking_type ? ` (${property.parking_type})` : ''}`,
      color: 'info' as const
    }
  ].filter(Boolean) as { label: string; color: 'primary' | 'info' }[]

  return (
    <Grid container spacing={6}>
      {/* Description */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader title='Description' />
          <CardContent className='flex flex-col gap-4'>
            {hasDescription ? (
              <>
                {property.short_description && (
                  <div>
                    <Typography variant='subtitle2' color='text.secondary' className='mbe-1'>
                      Short Description
                    </Typography>
                    <Typography>{property.short_description}</Typography>
                  </div>
                )}
                {property.long_description && (
                  <div>
                    <Typography variant='subtitle2' color='text.secondary' className='mbe-1'>
                      Full Description
                    </Typography>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{property.long_description}</Typography>
                  </div>
                )}
                {property.internal_notes && (
                  <div>
                    <Typography variant='subtitle2' color='text.secondary' className='mbe-1'>
                      Internal Notes
                    </Typography>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{property.internal_notes}</Typography>
                  </div>
                )}
              </>
            ) : (
              <Typography color='text.secondary'>No description available.</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Property Features */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader title='Property Features' />
          <CardContent>
            <div className='flex flex-wrap gap-3'>
              {features.length > 0 ? (
                features.map(feature => (
                  <Chip key={feature.label} label={feature.label} variant='tonal' color={feature.color} size='small' />
                ))
              ) : (
                <Typography color='text.secondary'>No additional features listed.</Typography>
              )}
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Amenities */}
      {hasAmenities && (
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardHeader title='Amenities' />
            <CardContent className='flex flex-col gap-4'>
              {amenityCategories.map(cat => {
                const items = property[cat.key]

                if (!Array.isArray(items) || items.length === 0) return null

                return (
                  <div key={cat.key}>
                    <Typography variant='subtitle2' color='text.secondary' className='mbe-2'>
                      {cat.label}
                    </Typography>
                    <div className='flex flex-wrap gap-2'>
                      {items.map((amenity: string) => (
                        <Chip key={amenity} label={amenity} variant='outlined' size='small' />
                      ))}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </Grid>
      )}

      {/* Policies */}
      {Array.isArray(property.policies) && property.policies.length > 0 && (
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardHeader title='Policies' />
            <CardContent className='flex flex-col gap-3'>
              {property.policies.map((policy, index) => (
                <div key={`${policy.name}-${index}`}>
                  <Typography className='font-medium' color='text.primary'>
                    {policy.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {policy.description}
                  </Typography>
                  {index < property.policies.length - 1 && <Divider className='mbs-3' />}
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default OverviewTab
