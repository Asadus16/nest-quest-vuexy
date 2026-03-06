// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

// Type Imports
import type { ManagerInvitationType } from '../../../index'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

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

const CompanyInfoTab = ({ invitation }: { invitation: ManagerInvitationType }) => {
  const pm = invitation.property_manager

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Company Information'
            avatar={
              <CustomAvatar variant='rounded' color='info' skin='light' size={34}>
                <i className='tabler-building text-lg' />
              </CustomAvatar>
            }
          />
          <CardContent>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DetailRow icon='tabler-building' label='Company Name' value={pm?.company_name} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DetailRow icon='tabler-mail' label='Company Email' value={pm?.company_email} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DetailRow icon='tabler-map-pin' label='Address' value={pm?.company_address} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DetailRow icon='tabler-building-community' label='City' value={pm?.company_city} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DetailRow icon='tabler-map-2' label='Area' value={pm?.company_area} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Trade License'
            avatar={
              <CustomAvatar variant='rounded' color='warning' skin='light' size={34}>
                <i className='tabler-certificate text-lg' />
              </CustomAvatar>
            }
          />
          <CardContent>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DetailRow icon='tabler-hash' label='License Number' value={pm?.trade_license_number} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DetailRow
                  icon='tabler-calendar'
                  label='Expiry Date'
                  value={pm?.trade_license_expiry ? new Date(pm.trade_license_expiry).toLocaleDateString() : null}
                />
              </Grid>
              {pm?.trade_license_url && (
                <Grid size={{ xs: 12 }}>
                  <a href={pm.trade_license_url} target='_blank' rel='noopener noreferrer'>
                    <Chip label='View Trade License' variant='tonal' color='warning' className='cursor-pointer' />
                  </a>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CompanyInfoTab
