// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'

// Type Imports
import type { OwnerInvitationType } from '@/types/apps/propertyOwnerTypes'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { invitationStatusColors, invitationStatusLabels } from '@/utils/invitationStatusMap'

const OwnerProfile = ({ invitation }: { invitation: OwnerInvitationType }) => {
  const owner = invitation.owner
  const name = owner?.full_name || invitation.email.split('@')[0]
  const email = owner?.user?.email || invitation.email
  const phone = owner?.user?.phone || invitation.phone

  return (
    <Card>
      <CardContent className='flex flex-col pbs-12 gap-6'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center justify-center flex-col gap-4'>
            <CustomAvatar variant='rounded' skin='light' color='primary' size={120}>
              <Typography variant='h3'>{getInitials(name)}</Typography>
            </CustomAvatar>
            <div className='flex flex-col items-center gap-1'>
              <Typography variant='h5'>{name}</Typography>
              <Typography variant='body2' color='text.secondary'>
                Property Owner
              </Typography>
            </div>
            <Chip
              label={invitationStatusLabels[invitation.status] || invitation.status}
              color={invitationStatusColors[invitation.status] || 'default'}
              size='small'
              variant='tonal'
            />
          </div>
        </div>
        <div>
          <Typography variant='h5'>Contact</Typography>
          <Divider className='mlb-4' />
          <div className='flex flex-col gap-2'>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                <i className='tabler-mail text-base mie-1 align-text-bottom' />
                Email:
              </Typography>
              <Typography>{email}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                <i className='tabler-phone text-base mie-1 align-text-bottom' />
                Phone:
              </Typography>
              <Typography>{phone || '-'}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                <i className='tabler-flag text-base mie-1 align-text-bottom' />
                Nationality:
              </Typography>
              <Typography>{owner?.nationality || '-'}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                <i className='tabler-calendar text-base mie-1 align-text-bottom' />
                Date of Birth:
              </Typography>
              <Typography>{owner?.dob ? new Date(owner.dob).toLocaleDateString() : '-'}</Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default OwnerProfile
