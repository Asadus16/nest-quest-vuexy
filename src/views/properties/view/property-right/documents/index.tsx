// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

// Type Imports
import type { PropertyDetailType } from '@/types/apps/propertyTypes'

const ACQUISITION = {
  RENTED: 'Rented',
  BOUGHT_CASH: 'Bought (Cash)',
  FINANCED: 'Financed'
} as const

type DocLink = {
  label: string
  url: string | null
}

const getDocuments = (property: PropertyDetailType): DocLink[] => {
  switch (property.acquisition_method) {
    case ACQUISITION.RENTED:
      return [
        { label: 'Tenancy Agreement', url: property.tenancy_agreement_url },
        { label: 'Ejari Certificate', url: property.ejari_certificate_url },
        { label: 'DCPM Letter', url: property.dcpm_letter_url }
      ]
    case ACQUISITION.BOUGHT_CASH:
      return [
        { label: 'Sale Purchase Agreement (SPA)', url: property.spa_url },
        { label: 'Payment Proof', url: property.payment_proof_url }
      ]
    case ACQUISITION.FINANCED:
      return [{ label: 'Sale Purchase Agreement (SPA)', url: property.spa_url }]
    default:
      return []
  }
}

const DocumentsTab = ({ property }: { property: PropertyDetailType }) => {
  const docs = getDocuments(property)
  const financeItems = property.finance_items ?? []
  const hasFinanceItems = property.acquisition_method === ACQUISITION.FINANCED && financeItems.length > 0

  return (
    <Grid container spacing={6}>
      {/* Agreement Documents */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader title='Agreement Documents' />
          <CardContent>
            {!property.acquisition_method ? (
              <Typography color='text.secondary'>No acquisition method set for this property.</Typography>
            ) : docs.length === 0 ? (
              <Typography color='text.secondary'>No documents available.</Typography>
            ) : (
              <div className='flex flex-col gap-3'>
                {docs.map(doc => (
                  <div key={doc.label} className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <i className='tabler-file-text text-xl text-textSecondary' />
                      <Typography>{doc.label}</Typography>
                    </div>
                    {doc.url ? (
                      <Button
                        variant='tonal'
                        size='small'
                        href={doc.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        startIcon={<i className='tabler-download' />}
                      >
                        Download
                      </Button>
                    ) : (
                      <Chip label='Not Uploaded' size='small' variant='tonal' color='warning' />
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Finance Items */}
      {hasFinanceItems && (
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardHeader title='Finance Schedule' />
            <CardContent>
              <div className='flex flex-col gap-3'>
                {financeItems.map(item => (
                  <div key={`${item.label}-${item.due_date}`}>
                    <div className='flex items-center justify-between'>
                      <div>
                        <Typography className='font-medium' color='text.primary'>
                          {item.label}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          Due: {item.due_date} - AED {Number(item.amount).toLocaleString()}
                        </Typography>
                      </div>
                      <Chip
                        label={item.status}
                        size='small'
                        variant='tonal'
                        color={item.status === 'Paid' ? 'success' : 'warning'}
                      />
                    </div>
                    {financeItems.indexOf(item) < financeItems.length - 1 && <Divider className='mbs-3' />}
                  </div>
                ))}
                <Divider />
                <div className='flex justify-between'>
                  <Typography className='font-medium'>Total Amount:</Typography>
                  <Typography className='font-medium'>
                    AED {financeItems.reduce((sum, item) => sum + Number(item.amount), 0).toLocaleString()}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default DocumentsTab
