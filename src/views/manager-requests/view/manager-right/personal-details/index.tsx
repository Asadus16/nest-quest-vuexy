// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Type Imports
import type { ManagerInvitationType } from '../../../index'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'

const DetailRow = ({ icon, label, value }: { icon: string; label: string; value: string | null | undefined }) => (
  <div className='flex items-center gap-3'>
    <CustomAvatar variant='rounded' skin='light' color='secondary' size={30}>
      <i className={`${icon} text-base`} />
    </CustomAvatar>
    <div className='flex flex-col'>
      <Typography variant='body2' color='text.secondary'>
        {label}
      </Typography>
      <Typography className='font-medium' color='text.primary'>
        {value || '-'}
      </Typography>
    </div>
  </div>
)

const PersonalDetailsTab = ({ invitation }: { invitation: ManagerInvitationType }) => {
  const pm = invitation.property_manager
  const name = pm?.full_name || invitation.email.split('@')[0]
  const email = pm?.user?.email || invitation.email
  const phone = pm?.user?.phone || pm?.phone

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Manager Information'
            avatar={
              <CustomAvatar variant='rounded' color='info' skin='light' size={34}>
                <i className='tabler-user-check text-lg' />
              </CustomAvatar>
            }
          />
          <CardContent>
            <div className='flex items-center gap-4 mbe-6'>
              <CustomAvatar skin='light' color='primary' size={60}>
                <Typography variant='h5'>{getInitials(name)}</Typography>
              </CustomAvatar>
              <div className='flex flex-col gap-1'>
                <Typography variant='h6'>{name}</Typography>
                <div className='flex items-center gap-1.5'>
                  <i className='tabler-mail text-textSecondary text-base' />
                  <Typography variant='body2' color='text.secondary'>
                    {email}
                  </Typography>
                </div>
                <div className='flex items-center gap-1.5'>
                  <i className='tabler-phone text-textSecondary text-base' />
                  <Typography variant='body2' color='text.secondary'>
                    {phone || '-'}
                  </Typography>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Personal Information'
            avatar={
              <CustomAvatar variant='rounded' color='primary' skin='light' size={34}>
                <i className='tabler-list-details text-lg' />
              </CustomAvatar>
            }
          />
          <CardContent>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DetailRow icon='tabler-user' label='Full Name' value={pm?.full_name} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DetailRow icon='tabler-mail' label='Email' value={email} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DetailRow icon='tabler-phone' label='Phone' value={phone} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DetailRow
                  icon='tabler-calendar'
                  label='Date of Birth'
                  value={pm?.dob ? new Date(pm.dob).toLocaleDateString() : null}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DetailRow icon='tabler-flag' label='Nationality' value={pm?.nationality} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PersonalDetailsTab
