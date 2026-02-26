// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

// Type Imports
import type { OwnerInvitationType } from '@/types/apps/propertyOwnerTypes'

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

const BankingDetailsTab = ({ invitation }: { invitation: OwnerInvitationType }) => {
  const owner = invitation.owner

  const hasBankDetails = owner?.bank_name || owner?.account_number || owner?.iban

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Banking Information'
            avatar={
              <CustomAvatar variant='rounded' color='primary' skin='light' size={34}>
                <i className='tabler-building-bank text-lg' />
              </CustomAvatar>
            }
            subheader='Bank account details for payments'
          />
          <CardContent>
            {hasBankDetails ? (
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DetailRow icon='tabler-building-bank' label='Bank Name' value={owner?.bank_name} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DetailRow icon='tabler-map-pin' label='Bank Branch' value={owner?.bank_branch} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DetailRow icon='tabler-credit-card' label='Account Number' value={owner?.account_number} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DetailRow icon='tabler-receipt' label='IBAN' value={owner?.iban} />
                </Grid>
              </Grid>
            ) : (
              <div className='text-center py-8'>
                <CustomAvatar variant='rounded' skin='light' color='secondary' size={50} className='mbe-4 mli-auto'>
                  <i className='tabler-building-bank-off text-[26px]' />
                </CustomAvatar>
                <Typography color='text.secondary'>No banking details have been provided yet.</Typography>
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default BankingDetailsTab
