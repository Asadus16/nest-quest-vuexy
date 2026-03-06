// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

// Type Imports
import type { ManagerInvitationType } from '../../index'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { invitationStatusColors, invitationStatusLabels } from '@/utils/invitationStatusMap'

type Props = {
  invitation: ManagerInvitationType
  onRespond: (status: 'ACCEPTED' | 'REJECTED') => void
  responding: boolean
}

const ManagerProfile = ({ invitation, onRespond, responding }: Props) => {
  const pm = invitation.property_manager
  const name = pm?.full_name || invitation.email.split('@')[0]
  const email = pm?.user?.email || invitation.email
  const phone = pm?.user?.phone || pm?.phone

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
                Property Manager
              </Typography>
              {pm?.company_name && (
                <Typography variant='body2' color='text.secondary'>
                  {pm.company_name}
                </Typography>
              )}
            </div>
            <Chip
              label={invitationStatusLabels[invitation.status] || invitation.status}
              color={invitationStatusColors[invitation.status] || 'default'}
              size='small'
              variant='tonal'
            />
          </div>
        </div>
        {pm && (
          <div className='flex justify-around'>
            <div className='flex flex-col items-center'>
              <Typography variant='h5'>{pm.properties_count ?? 0}</Typography>
              <Typography variant='body2' color='text.secondary'>
                Properties
              </Typography>
            </div>
            <div className='flex flex-col items-center'>
              <Typography variant='h5'>{pm.owners_count ?? 0}</Typography>
              <Typography variant='body2' color='text.secondary'>
                Owners
              </Typography>
            </div>
            <div className='flex flex-col items-center'>
              <Typography variant='h5'>{pm.tenancies_count ?? 0}</Typography>
              <Typography variant='body2' color='text.secondary'>
                Contracts
              </Typography>
            </div>
          </div>
        )}
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
              <Typography>{pm?.nationality || '-'}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                <i className='tabler-calendar text-base mie-1 align-text-bottom' />
                Date of Birth:
              </Typography>
              <Typography>{pm?.dob ? new Date(pm.dob).toLocaleDateString() : '-'}</Typography>
            </div>
          </div>
        </div>
        {invitation.status === 'PENDING' && (
          <div className='flex gap-4 justify-center'>
            <Button
              variant='contained'
              color='success'
              startIcon={<i className='tabler-check' />}
              onClick={() => onRespond('ACCEPTED')}
              disabled={responding}
            >
              Accept
            </Button>
            <Button
              variant='tonal'
              color='error'
              startIcon={<i className='tabler-x' />}
              onClick={() => onRespond('REJECTED')}
              disabled={responding}
            >
              Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ManagerProfile
