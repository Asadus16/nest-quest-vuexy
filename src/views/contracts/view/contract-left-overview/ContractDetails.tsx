// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Static contract data
const contractData = {
  tenant: 'Rashid Al Mualla',
  property: 'Marina Heights 2BR',
  status: 'Active',
  startDate: '01 Jan 2025',
  endDate: '31 Dec 2025',
  rentAmount: 95000,
  frequency: 'Quarterly',
  furnishingStatus: 'Furnished',
  ejariNumber: '2847593016',
  contractType: 'Long-term Residential'
}

const statusColor: Record<string, 'success' | 'error' | 'warning'> = {
  Active: 'success',
  Expired: 'error',
  Draft: 'warning'
}

const ContractDetails = () => {
  return (
    <Card>
      <CardContent className='flex flex-col pbs-12 gap-6'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center justify-center flex-col gap-4'>
            <CustomAvatar variant='rounded' skin='light' color='primary' size={120}>
              <i className='tabler-home-check text-[60px]' />
            </CustomAvatar>
            <div className='flex flex-col items-center gap-1'>
              <Typography variant='h5'>{contractData.property}</Typography>
              <Typography variant='body2' color='text.secondary'>
                {contractData.contractType}
              </Typography>
            </div>
            <Chip
              label={contractData.status}
              color={statusColor[contractData.status]}
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
                <Typography variant='h5'>AED {contractData.rentAmount.toLocaleString()}</Typography>
                <Typography variant='body2' color='text.secondary'>Rent / Year</Typography>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' color='info' skin='light'>
                <i className='tabler-calendar-repeat' />
              </CustomAvatar>
              <div>
                <Typography variant='h5'>{contractData.frequency}</Typography>
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
              <Typography>{contractData.tenant}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                <i className='tabler-building text-base mie-1 align-text-bottom' />
                Property:
              </Typography>
              <Typography>{contractData.property}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                <i className='tabler-calendar-event text-base mie-1 align-text-bottom' />
                Start Date:
              </Typography>
              <Typography>{contractData.startDate}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                <i className='tabler-calendar-off text-base mie-1 align-text-bottom' />
                End Date:
              </Typography>
              <Typography>{contractData.endDate}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                <i className='tabler-armchair text-base mie-1 align-text-bottom' />
                Furnishing:
              </Typography>
              <Typography>{contractData.furnishingStatus}</Typography>
            </div>
            <div className='flex items-center flex-wrap gap-x-1.5'>
              <Typography className='font-medium' color='text.primary'>
                <i className='tabler-certificate text-base mie-1 align-text-bottom' />
                Ejari No:
              </Typography>
              <Typography>{contractData.ejariNumber}</Typography>
            </div>
          </div>
        </div>
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
