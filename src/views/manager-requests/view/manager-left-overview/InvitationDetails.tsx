// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Type Imports
import type { OwnerInvitationType } from '@/types/apps/propertyOwnerTypes'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const InvitationDetails = ({ invitation }: { invitation: OwnerInvitationType }) => {
  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <div>
          <div className='flex items-center gap-2 mbe-2'>
            <CustomAvatar variant='rounded' color='primary' skin='light' size={32}>
              <i className='tabler-mail text-lg' />
            </CustomAvatar>
            <Typography variant='h5'>Invitation Details</Typography>
          </div>
          <Divider className='mbe-4' />
          <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <i className='tabler-calendar-event text-textSecondary' />
                <Typography color='text.primary'>Received On</Typography>
              </div>
              <Typography className='font-medium'>
                {invitation.created_at ? new Date(invitation.created_at).toLocaleDateString() : '-'}
              </Typography>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <i className='tabler-calendar-check text-textSecondary' />
                <Typography color='text.primary'>Responded On</Typography>
              </div>
              <Typography className='font-medium'>
                {invitation.responded_at ? new Date(invitation.responded_at).toLocaleDateString() : '-'}
              </Typography>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <i className='tabler-calendar-off text-textSecondary' />
                <Typography color='text.primary'>Expires On</Typography>
              </div>
              <Typography className='font-medium'>
                {invitation.expires_at ? new Date(invitation.expires_at).toLocaleDateString() : '-'}
              </Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InvitationDetails
