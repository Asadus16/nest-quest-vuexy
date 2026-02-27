// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

// Type Imports
import type { ManagerInvitationType } from '../../../index'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const DocumentCard = ({
  icon,
  color,
  title,
  fields
}: {
  icon: string
  color: 'primary' | 'info' | 'warning' | 'error' | 'success'
  title: string
  fields: { label: string; value: string | null | undefined }[]
}) => (
  <Card>
    <CardContent className='flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <CustomAvatar variant='rounded' skin='light' color={color} size={50}>
          <i className={`${icon} text-[26px]`} />
        </CustomAvatar>
        <Typography variant='h6'>{title}</Typography>
      </div>
      <div className='flex flex-col gap-3'>
        {fields.map((field, i) => (
          <div key={i} className='flex items-center justify-between'>
            <Typography variant='body2' color='text.secondary'>
              {field.label}
            </Typography>
            <Typography className='font-medium' color='text.primary'>
              {field.value || '-'}
            </Typography>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

const LegalDocumentsTab = ({ invitation }: { invitation: ManagerInvitationType }) => {
  const pm = invitation.property_manager

  const hasEmiratesId = pm?.emirates_id_number || pm?.emirates_id_front_url
  const hasPassport = pm?.passport_number || pm?.passport_copy_url

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Legal Documents'
            avatar={
              <CustomAvatar variant='rounded' color='primary' skin='light' size={34}>
                <i className='tabler-folders text-lg' />
              </CustomAvatar>
            }
            subheader='Identity and legal verification documents'
          />
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <DocumentCard
          icon='tabler-id'
          color='info'
          title='Emirates ID'
          fields={[
            { label: 'ID Number', value: pm?.emirates_id_number },
            {
              label: 'Expiry Date',
              value: pm?.emirates_id_expiry ? new Date(pm.emirates_id_expiry).toLocaleDateString() : null
            }
          ]}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <DocumentCard
          icon='tabler-passport'
          color='warning'
          title='Passport'
          fields={[
            { label: 'Passport Number', value: pm?.passport_number },
            {
              label: 'Expiry Date',
              value: pm?.passport_expiry ? new Date(pm.passport_expiry).toLocaleDateString() : null
            }
          ]}
        />
      </Grid>

      {pm?.emirates_id_front_url && (
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card>
            <CardContent className='flex items-start gap-4'>
              <CustomAvatar variant='rounded' skin='light' color='info' size={50}>
                <i className='tabler-file-text text-[26px]' />
              </CustomAvatar>
              <div className='flex-1 flex flex-col gap-1 overflow-hidden'>
                <Typography className='font-medium truncate' color='text.primary'>
                  Emirates ID Copy
                </Typography>
                <Chip label='Emirates ID' size='small' variant='tonal' color='info' />
              </div>
            </CardContent>
          </Card>
        </Grid>
      )}

      {pm?.passport_copy_url && (
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card>
            <CardContent className='flex items-start gap-4'>
              <CustomAvatar variant='rounded' skin='light' color='warning' size={50}>
                <i className='tabler-file-text text-[26px]' />
              </CustomAvatar>
              <div className='flex-1 flex flex-col gap-1 overflow-hidden'>
                <Typography className='font-medium truncate' color='text.primary'>
                  Passport Copy
                </Typography>
                <Chip label='Passport' size='small' variant='tonal' color='warning' />
              </div>
            </CardContent>
          </Card>
        </Grid>
      )}

      {!hasEmiratesId && !hasPassport && (
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent className='text-center py-8'>
              <CustomAvatar variant='rounded' skin='light' color='secondary' size={50} className='mbe-4 mli-auto'>
                <i className='tabler-file-off text-[26px]' />
              </CustomAvatar>
              <Typography color='text.secondary'>No legal documents have been uploaded yet.</Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default LegalDocumentsTab
