// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Static financial data
const financials = {
  totalRent: 95000,
  securityDeposit: 5000,
  agencyFee: 5000,
  totalPaid: 47500,
  totalDue: 47500,
  utilitiesIncluded: true,
  utilities: ['DEWA (Electricity & Water)', 'Internet', 'District Cooling'],
  maintenanceResponsibility: 'Responsibility of Property Manager'
}

const paidPercentage = Math.round((financials.totalPaid / financials.totalRent) * 100)

const ContractFinancials = () => {
  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <div>
          <div className='flex items-center gap-2 mbe-2'>
            <CustomAvatar variant='rounded' color='primary' skin='light' size={32}>
              <i className='tabler-report-money text-lg' />
            </CustomAvatar>
            <Typography variant='h5'>Financial Summary</Typography>
          </div>
          <Divider className='mbe-4' />
          <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <i className='tabler-home-dollar text-textSecondary' />
                <Typography color='text.primary'>Total Rent</Typography>
              </div>
              <Typography className='font-medium'>AED {financials.totalRent.toLocaleString()}</Typography>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <i className='tabler-shield-lock text-textSecondary' />
                <Typography color='text.primary'>Security Deposit</Typography>
              </div>
              <Typography className='font-medium'>AED {financials.securityDeposit.toLocaleString()}</Typography>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <i className='tabler-building-bank text-textSecondary' />
                <Typography color='text.primary'>Agency Fee</Typography>
              </div>
              <Typography className='font-medium'>AED {financials.agencyFee.toLocaleString()}</Typography>
            </div>
          </div>
        </div>
        <div>
          <div className='flex items-center justify-between mbe-1'>
            <Typography variant='body2' className='font-medium' color='text.primary'>
              Payment Progress
            </Typography>
            <Typography variant='body2' className='font-medium' color='text.primary'>
              {paidPercentage}%
            </Typography>
          </div>
          <LinearProgress variant='determinate' value={paidPercentage} color='primary' className='bs-2' />
          <div className='flex items-center justify-between mbs-2'>
            <Typography variant='caption' color='success.main'>
              <i className='tabler-circle-check text-xs mie-1 align-text-bottom' />
              Paid: AED {financials.totalPaid.toLocaleString()}
            </Typography>
            <Typography variant='caption' color='warning.main'>
              <i className='tabler-clock text-xs mie-1 align-text-bottom' />
              Due: AED {financials.totalDue.toLocaleString()}
            </Typography>
          </div>
        </div>
        <div>
          <div className='flex items-center gap-2 mbe-2'>
            <CustomAvatar variant='rounded' color='info' skin='light' size={32}>
              <i className='tabler-bulb text-lg' />
            </CustomAvatar>
            <Typography variant='h5'>Utilities & Maintenance</Typography>
          </div>
          <Divider className='mbe-4' />
          <div className='flex flex-col gap-3'>
            <div>
              <Typography variant='body2' className='font-medium mbe-1.5' color='text.primary'>
                <i className='tabler-plug text-base mie-1 align-text-bottom' />
                Included Utilities
              </Typography>
              <div className='flex flex-wrap gap-1.5'>
                {financials.utilities.map(utility => (
                  <Chip key={utility} label={utility} size='small' variant='tonal' color='info' />
                ))}
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <i className='tabler-tool text-textSecondary' />
              <Typography variant='body2'>{financials.maintenanceResponsibility}</Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ContractFinancials
