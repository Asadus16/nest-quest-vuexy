// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Static payment schedule data
const paymentSchedule = [
  {
    id: 1,
    transactionType: 'Security Deposit',
    amount: 5000,
    paymentDate: '02 Jan 2025',
    status: 'Paid',
    icon: 'tabler-shield-lock'
  },
  {
    id: 2,
    transactionType: 'Agency Fee',
    amount: 5000,
    paymentDate: '02 Jan 2025',
    status: 'Paid',
    icon: 'tabler-building-bank'
  },
  {
    id: 3,
    transactionType: 'Rent - Q1',
    amount: 23750,
    paymentDate: '10 Jan 2025',
    status: 'Paid',
    icon: 'tabler-cash'
  },
  {
    id: 4,
    transactionType: 'Rent - Q2',
    amount: 23750,
    paymentDate: '01 Apr 2025',
    status: 'Paid',
    icon: 'tabler-cash'
  },
  {
    id: 5,
    transactionType: 'Rent - Q3',
    amount: 23750,
    paymentDate: '01 Jul 2025',
    status: 'Upcoming',
    icon: 'tabler-cash'
  },
  {
    id: 6,
    transactionType: 'Rent - Q4',
    amount: 23750,
    paymentDate: '01 Oct 2025',
    status: 'Upcoming',
    icon: 'tabler-cash'
  }
]

const statusColor: Record<string, 'success' | 'warning' | 'error'> = {
  Paid: 'success',
  Upcoming: 'warning',
  Overdue: 'error'
}

const statusIcon: Record<string, string> = {
  Paid: 'tabler-circle-check',
  Upcoming: 'tabler-clock',
  Overdue: 'tabler-alert-circle'
}

const totalAmount = paymentSchedule.reduce((sum, row) => sum + row.amount, 0)
const totalPaid = paymentSchedule.filter(r => r.status === 'Paid').reduce((sum, row) => sum + row.amount, 0)
const totalUpcoming = paymentSchedule.filter(r => r.status === 'Upcoming').reduce((sum, row) => sum + row.amount, 0)

const PaymentScheduleTab = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Card>
          <CardContent className='flex items-center gap-4'>
            <CustomAvatar variant='rounded' color='primary' skin='light' size={48}>
              <i className='tabler-report-money text-[26px]' />
            </CustomAvatar>
            <div>
              <Typography variant='body2' color='text.secondary'>Total</Typography>
              <Typography variant='h5'>AED {totalAmount.toLocaleString()}</Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Card>
          <CardContent className='flex items-center gap-4'>
            <CustomAvatar variant='rounded' color='success' skin='light' size={48}>
              <i className='tabler-circle-check text-[26px]' />
            </CustomAvatar>
            <div>
              <Typography variant='body2' color='text.secondary'>Paid</Typography>
              <Typography variant='h5' color='success.main'>AED {totalPaid.toLocaleString()}</Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Card>
          <CardContent className='flex items-center gap-4'>
            <CustomAvatar variant='rounded' color='warning' skin='light' size={48}>
              <i className='tabler-clock text-[26px]' />
            </CustomAvatar>
            <div>
              <Typography variant='body2' color='text.secondary'>Upcoming</Typography>
              <Typography variant='h5' color='warning.main'>AED {totalUpcoming.toLocaleString()}</Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Payment Schedule'
            avatar={
              <CustomAvatar variant='rounded' color='primary' skin='light' size={34}>
                <i className='tabler-calendar-dollar text-lg' />
              </CustomAvatar>
            }
            subheader={`${paymentSchedule.length} transactions`}
          />
          <div className='overflow-x-auto'>
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Transaction</th>
                  <th>Amount</th>
                  <th>Payment Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentSchedule.map((row, index) => (
                  <tr key={row.id}>
                    <td><Typography>{index + 1}</Typography></td>
                    <td>
                      <div className='flex items-center gap-3'>
                        <CustomAvatar variant='rounded' skin='light' color={statusColor[row.status]} size={30}>
                          <i className={`${row.icon} text-base`} />
                        </CustomAvatar>
                        <Typography className='font-medium' color='text.primary'>
                          {row.transactionType}
                        </Typography>
                      </div>
                    </td>
                    <td><Typography className='font-medium'>AED {row.amount.toLocaleString()}</Typography></td>
                    <td>
                      <Typography variant='body2' color='text.secondary'>
                        <i className='tabler-calendar text-base mie-1 align-text-bottom' />
                        {row.paymentDate}
                      </Typography>
                    </td>
                    <td>
                      <Chip
                        label={row.status}
                        size='small'
                        variant='tonal'
                        color={statusColor[row.status]}
                        icon={<i className={statusIcon[row.status]} />}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PaymentScheduleTab
