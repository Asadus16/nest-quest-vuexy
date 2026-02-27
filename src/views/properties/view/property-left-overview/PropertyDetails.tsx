// React Imports
import type { ReactNode } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Type Imports
import type { PropertyDetailType } from '@/types/apps/propertyTypes'

const STATUS_CONFIG: Record<string, { label: string; color: 'success' | 'warning' | 'error' }> = {
  OCCUPIED: { label: 'Occupied', color: 'success' },
  VACANT: { label: 'Vacant', color: 'warning' },
  UNDER_MAINTENANCE: { label: 'Maintenance', color: 'error' }
}

const DetailItem = ({ icon, label, children }: { icon: string; label: string; children: ReactNode }) => (
  <div className='flex items-center flex-wrap gap-x-1.5'>
    <Typography className='font-medium' color='text.primary'>
      <i className={`${icon} text-base mie-1 align-text-bottom`} />
      {label}:
    </Typography>
    <Typography>{children}</Typography>
  </div>
)

const PropertyDetails = ({ property }: { property: PropertyDetailType }) => {
  const status = STATUS_CONFIG[property.status]

  return (
    <Card>
      <CardContent className='flex flex-col pbs-12 gap-6'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center justify-center flex-col gap-4'>
            <CustomAvatar variant='rounded' skin='light' color='primary' size={120}>
              <i className='tabler-building text-[60px]' />
            </CustomAvatar>
            <div className='flex flex-col items-center gap-1'>
              <Typography variant='h5'>{property.public_name}</Typography>
              <Typography variant='body2' color='text.secondary'>
                {property.property_type}
              </Typography>
            </div>
            <Chip
              label={status?.label ?? property.status}
              color={status?.color ?? 'primary'}
              size='small'
              variant='tonal'
            />
          </div>
          <div className='flex items-center justify-around flex-wrap gap-4'>
            <div className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' color='info' skin='light'>
                <i className='tabler-bed' />
              </CustomAvatar>
              <div>
                <Typography variant='h5'>{property.bedrooms === 0 ? 'Studio' : property.bedrooms}</Typography>
                <Typography variant='body2' color='text.secondary'>
                  Bedrooms
                </Typography>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' color='warning' skin='light'>
                <i className='tabler-bath' />
              </CustomAvatar>
              <div>
                <Typography variant='h5'>{property.bathrooms}</Typography>
                <Typography variant='body2' color='text.secondary'>
                  Bathrooms
                </Typography>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' color='success' skin='light'>
                <i className='tabler-ruler-2' />
              </CustomAvatar>
              <div>
                <Typography variant='h5'>{Number(property.area_sqft).toLocaleString()}</Typography>
                <Typography variant='body2' color='text.secondary'>
                  Sq Ft
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Typography variant='h5'>Details</Typography>
          <Divider className='mlb-4' />
          <div className='flex flex-col gap-2'>
            {property.building_name && (
              <DetailItem icon='tabler-building' label='Building'>
                {property.building_name}
              </DetailItem>
            )}
            {property.unit_number && (
              <DetailItem icon='tabler-door' label='Unit'>
                {property.unit_number}
              </DetailItem>
            )}
            {property.floor_number && (
              <DetailItem icon='tabler-stairs' label='Floor'>
                {property.floor_number}
              </DetailItem>
            )}
            {property.city && (
              <DetailItem icon='tabler-map-pin' label='City'>
                {property.city}
              </DetailItem>
            )}
            {property.area && (
              <DetailItem icon='tabler-map-2' label='Area'>
                {property.area}
              </DetailItem>
            )}
            {property.furnished_status && (
              <DetailItem icon='tabler-armchair' label='Furnishing'>
                {property.furnished_status}
              </DetailItem>
            )}
            {property.view && (
              <DetailItem icon='tabler-eye' label='View'>
                {property.view}
              </DetailItem>
            )}
            {property.owner && (
              <DetailItem icon='tabler-user' label='Owner'>
                {property.owner.full_name}
              </DetailItem>
            )}
          </div>
        </div>
        {property.property_manager && (
          <div>
            <Typography variant='h5'>Property Manager</Typography>
            <Divider className='mlb-4' />
            <div className='flex flex-col gap-2'>
              <DetailItem icon='tabler-user-star' label='Name'>
                {property.property_manager.full_name}
              </DetailItem>
              {property.property_manager.email && (
                <DetailItem icon='tabler-mail' label='Email'>
                  {property.property_manager.email}
                </DetailItem>
              )}
              {property.property_manager.phone && (
                <DetailItem icon='tabler-phone' label='Phone'>
                  {property.property_manager.phone}
                </DetailItem>
              )}
              {property.property_manager.company_name && (
                <DetailItem icon='tabler-briefcase' label='Company'>
                  {property.property_manager.company_name}
                </DetailItem>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default PropertyDetails
