// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

// Type Imports
import type { ContractDetailType } from '@/types/apps/contractTypes'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const docTypeConfig: Record<string, { label: string; icon: string; color: 'error' | 'success' | 'info' | 'warning' | 'primary' }> = {
  TENANCY_CONTRACT: { label: 'Contract PDF', icon: 'tabler-file-text', color: 'error' },
  EJARI: { label: 'Ejari Certificate', icon: 'tabler-certificate', color: 'success' },
  DCPM: { label: 'DCPM Letter', icon: 'tabler-file-description', color: 'info' },
  EMIRATES_ID: { label: 'Emirates ID', icon: 'tabler-id', color: 'info' },
  PASSPORT: { label: 'Passport', icon: 'tabler-id-badge-2', color: 'warning' },
  OTHER: { label: 'Other', icon: 'tabler-file', color: 'primary' }
}

const formatFileSize = (bytes: number | null): string => {
  if (!bytes) return '-'

  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const DocumentsTab = ({ contract }: { contract: ContractDetailType }) => {
  const documents = contract.documents || []

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
      {documents.length > 0 ? (
        documents.map(doc => {
          const config = docTypeConfig[doc.doc_type] || docTypeConfig.OTHER

          return (
            <Grid key={doc.id} size={{ xs: 12, sm: 6 }}>
              <Card>
                <CardContent className='flex items-start gap-4'>
                  <CustomAvatar variant='rounded' skin='light' color={config.color} size={50}>
                    <i className={`${config.icon} text-[26px]`} />
                  </CustomAvatar>
                  <div className='flex-1 flex flex-col gap-1 overflow-hidden'>
                    <Typography className='font-medium truncate' color='text.primary'>
                      {doc.file_name || config.label}
                    </Typography>
                    <div className='flex items-center gap-2'>
                      <Chip label={config.label} size='small' variant='tonal' color={config.color} />
                      <Typography variant='caption' color='text.disabled'>
                        {formatFileSize(doc.file_size)}
                      </Typography>
                    </div>
                    <Typography variant='caption' color='text.secondary'>
                      <i className='tabler-calendar text-xs mie-1 align-text-bottom' />
                      Uploaded: {doc.created_at ? new Date(doc.created_at).toLocaleDateString() : '-'}
                    </Typography>
                  </div>
                  <Button
                    variant='tonal'
                    color='primary'
                    size='small'
                    startIcon={<i className='tabler-download' />}
                    href={doc.file_url}
                    target='_blank'
                    component='a'
                  >
                    Download
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )
        })
      ) : (
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant='body2' color='text.secondary' className='text-center'>
                No documents uploaded
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}

      {contract.ejari_number && (
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
                      Ejari Number: {contract.ejari_number}
                    </Typography>
                  </div>
                </div>
                <Chip label='Registered' color='success' size='small' variant='tonal' icon={<i className='tabler-check' />} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default DocumentsTab
