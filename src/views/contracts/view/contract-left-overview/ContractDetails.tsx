// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

// Type Imports
import type { Locale } from '@configs/i18n'
import type { ContractDetailType } from '@/types/apps/contractTypes'

// Hook Imports
import { useRole } from '@/contexts/roleContext'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const statusColor: Record<string, 'success' | 'error' | 'warning' | 'secondary'> = {
  ACTIVE: 'success',
  EXPIRED: 'error',
  DRAFT: 'warning',
  CANCELLED: 'secondary'
}

const statusLabels: Record<string, string> = {
  ACTIVE: 'Active',
  EXPIRED: 'Expired',
  DRAFT: 'Draft',
  CANCELLED: 'Cancelled'
}

const frequencyLabels: Record<string, string> = {
  MONTHLY: 'Monthly',
  QUARTERLY: 'Quarterly',
  SEMI_ANNUALLY: 'Semi-Annually',
  ANNUALLY: 'Annually'
}

const ContractDetails = ({ contract }: { contract: ContractDetailType }) => {
  const { role } = useRole()
  const { lang: locale } = useParams()

  return (
    <Card>
      <CardContent className='flex flex-col pbs-12 gap-6'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center justify-center flex-col gap-4'>
            <CustomAvatar variant='rounded' skin='light' color='primary' size={120}>
              <i className='tabler-home-check text-[60px]' />
            </CustomAvatar>
            <div className='flex flex-col items-center gap-1'>
              <Typography variant='h5'>{contract.property?.public_name || '-'}</Typography>
              <Typography variant='body2' color='text.secondary'>
                Long-term Residential
              </Typography>
            </div>
            <Chip
              label={statusLabels[contract.status] || contract.status}
              color={statusColor[contract.status] || 'default'}
              size='small'
              variant='tonal'
            />
          </div>
          <div className='flex items-center justify-around flex-wrap gap-4'>
            <div className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' color='success' skin='light'>
                <i className='tabler-currency-dirham' />
              </CustomAvatar>
              <div>
                <Typography variant='h5'>AED {contract.rent_amount_total.toLocaleString()}</Typography>
                <Typography variant='body2' color='text.secondary'>Rent / Year</Typography>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' color='info' skin='light'>
                <i className='tabler-calendar-repeat' />
              </CustomAvatar>
              <div>
                <Typography variant='h5'>{frequencyLabels[contract.rent_frequency] || contract.rent_frequency}</Typography>
                <Typography variant='body2' color='text.secondary'>Payments</Typography>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Typography variant='h5'>Details</Typography>
          <Divider className='mlb-4' />
          <div className='flex flex-col gap-2'>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                <i className='tabler-user text-base mie-1 align-text-bottom' />
                Tenant:
              </Typography>
              <Typography>{contract.tenant?.full_name || '-'}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                <i className='tabler-building text-base mie-1 align-text-bottom' />
                Property:
              </Typography>
              <Typography>{contract.property?.public_name || '-'}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                <i className='tabler-calendar-event text-base mie-1 align-text-bottom' />
                Start Date:
              </Typography>
              <Typography>{contract.contract_start_date}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                <i className='tabler-calendar-off text-base mie-1 align-text-bottom' />
                End Date:
              </Typography>
              <Typography>{contract.contract_end_date}</Typography>
            </div>
            {contract.furnishing_status && (
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  <i className='tabler-armchair text-base mie-1 align-text-bottom' />
                  Furnishing:
                </Typography>
                <Typography>{contract.furnishing_status}</Typography>
              </div>
            )}
            {contract.ejari_number && (
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  <i className='tabler-certificate text-base mie-1 align-text-bottom' />
                  Ejari No:
                </Typography>
                <Typography>{contract.ejari_number}</Typography>
              </div>
            )}
          </div>
        </div>
        {role === 'property-manager' && (
          <Button
            variant='contained'
            color='info'
            component={Link}
            href={getLocalizedUrl(`/contract-financials/${contract.id}`, locale as Locale)}
            startIcon={<i className='tabler-report-money' />}
            fullWidth
          >
            View Financials
          </Button>
        )}
        <div className='flex gap-4 justify-center'>
          <Button variant='contained' color='primary' startIcon={<i className='tabler-edit' />}>
            Edit
          </Button>
          <Button variant='tonal' color='error' startIcon={<i className='tabler-ban' />}>
            Terminate
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ContractDetails
