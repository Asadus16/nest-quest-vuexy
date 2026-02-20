// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Static documents data
const documents = [
  {
    name: 'Tenancy_Contract_Marina_Heights.pdf',
    type: 'Contract PDF',
    uploadedDate: '01 Jan 2025',
    size: '2.4 MB',
    icon: 'tabler-file-text',
    color: 'error' as const
  },
  {
    name: 'Ejari_Certificate_2847593016.pdf',
    type: 'Ejari Certificate',
    uploadedDate: '05 Jan 2025',
    size: '1.1 MB',
    icon: 'tabler-certificate',
    color: 'success' as const
  },
  {
    name: 'Tenant_Emirates_ID.pdf',
    type: 'Tenant ID',
    uploadedDate: '01 Jan 2025',
    size: '850 KB',
    icon: 'tabler-id',
    color: 'info' as const
  },
  {
    name: 'Title_Deed_Marina_Heights.pdf',
    type: 'Title Deed',
    uploadedDate: '01 Jan 2025',
    size: '3.2 MB',
    icon: 'tabler-home-2',
    color: 'warning' as const
  }
]

const DocumentsTab = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Contract Documents'
            avatar={
              <CustomAvatar variant='rounded' color='primary' skin='light' size={34}>
                <i className='tabler-folders text-lg' />
              </CustomAvatar>
            }
            subheader={`${documents.length} documents uploaded`}
          />
        </Card>
      </Grid>
      {documents.map((doc, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6 }}>
          <Card>
            <CardContent className='flex items-start gap-4'>
              <CustomAvatar variant='rounded' skin='light' color={doc.color} size={50}>
                <i className={`${doc.icon} text-[26px]`} />
              </CustomAvatar>
              <div className='flex-1 flex flex-col gap-1 overflow-hidden'>
                <Typography className='font-medium truncate' color='text.primary'>
                  {doc.name}
                </Typography>
                <div className='flex items-center gap-2'>
                  <Chip label={doc.type} size='small' variant='tonal' color={doc.color} />
                  <Typography variant='caption' color='text.disabled'>
                    {doc.size}
                  </Typography>
                </div>
                <Typography variant='caption' color='text.secondary'>
                  <i className='tabler-calendar text-xs mie-1 align-text-bottom' />
                  Uploaded: {doc.uploadedDate}
                </Typography>
              </div>
              <Button variant='tonal' color='primary' size='small' startIcon={<i className='tabler-download' />}>
                Download
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}

      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <CustomAvatar variant='rounded' skin='light' color='success' size={42}>
                  <i className='tabler-rosette-discount-check text-[22px]' />
                </CustomAvatar>
                <div>
                  <Typography variant='h6'>Ejari Registration</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Ejari Number: 2847593016
                  </Typography>
                </div>
              </div>
              <Chip label='Registered' color='success' size='small' variant='tonal' icon={<i className='tabler-check' />} />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DocumentsTab
