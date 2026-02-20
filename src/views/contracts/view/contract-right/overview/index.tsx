// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Static inventory data for this property
const inventoryItems = [
  { item: 'Samsung Smart TV 65"', type: 'Electronics', condition: 'Good', room: 'Living Room', qty: 1, icon: 'tabler-device-tv' },
  { item: 'Split AC Unit 2 Ton', type: 'HVAC', condition: 'Good', room: 'Master Bedroom', qty: 1, icon: 'tabler-air-conditioning' },
  { item: 'Water Heater 80L', type: 'Plumbing', condition: 'Good', room: 'Bathroom', qty: 1, icon: 'tabler-droplet-filled' }
]

// Static activity timeline
const activityTimeline = [
  {
    color: 'success' as const,
    icon: 'tabler-file-check',
    title: 'Contract Created',
    description: 'Contract was created and signed by both parties',
    date: '01 Jan 2025'
  },
  {
    color: 'primary' as const,
    icon: 'tabler-shield-lock',
    title: 'Security Deposit Received',
    description: 'AED 5,000 security deposit collected from tenant',
    date: '02 Jan 2025'
  },
  {
    color: 'info' as const,
    icon: 'tabler-certificate',
    title: 'Ejari Registration',
    description: 'Contract registered with Ejari (No. 2847593016)',
    date: '05 Jan 2025'
  },
  {
    color: 'warning' as const,
    icon: 'tabler-cash',
    title: 'Q1 Rent Payment',
    description: 'First quarterly payment of AED 23,750 received',
    date: '10 Jan 2025'
  },
  {
    color: 'primary' as const,
    icon: 'tabler-cash',
    title: 'Q2 Rent Payment',
    description: 'Second quarterly payment of AED 23,750 received',
    date: '01 Apr 2025'
  }
]

const OverviewTab = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Property Inventory'
            avatar={
              <CustomAvatar variant='rounded' color='primary' skin='light' size={34}>
                <i className='tabler-packages text-lg' />
              </CustomAvatar>
            }
            subheader={`${inventoryItems.length} items assigned`}
          />
          <div className='overflow-x-auto'>
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Type</th>
                  <th>Condition</th>
                  <th>Room</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((inv, i) => (
                  <tr key={i}>
                    <td>
                      <div className='flex items-center gap-3'>
                        <CustomAvatar variant='rounded' skin='light' color='secondary' size={30}>
                          <i className={`${inv.icon} text-base`} />
                        </CustomAvatar>
                        <Typography className='font-medium' color='text.primary'>
                          {inv.item}
                        </Typography>
                      </div>
                    </td>
                    <td>
                      <Chip label={inv.type} size='small' variant='tonal' color='secondary' />
                    </td>
                    <td>
                      <Chip
                        label={inv.condition}
                        size='small'
                        variant='tonal'
                        color={inv.condition === 'Excellent' ? 'success' : 'primary'}
                      />
                    </td>
                    <td><Typography>{inv.room}</Typography></td>
                    <td><Typography>{inv.qty}</Typography></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Contract Activity'
            avatar={
              <CustomAvatar variant='rounded' color='warning' skin='light' size={34}>
                <i className='tabler-activity text-lg' />
              </CustomAvatar>
            }
          />
          <CardContent>
            <Timeline>
              {activityTimeline.map((activity, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color={activity.color} variant='outlined'>
                      <i className={`${activity.icon} text-base`} />
                    </TimelineDot>
                    {index < activityTimeline.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <div className='flex flex-col gap-0.5 mbe-4'>
                      <Typography className='font-medium' color='text.primary'>
                        {activity.title}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {activity.description}
                      </Typography>
                      <Typography variant='caption' color='text.disabled'>
                        {activity.date}
                      </Typography>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Tenant Information'
            avatar={
              <CustomAvatar variant='rounded' color='info' skin='light' size={34}>
                <i className='tabler-user-check text-lg' />
              </CustomAvatar>
            }
          />
          <CardContent>
            <div className='flex items-center gap-4'>
              <CustomAvatar alt='Rashid Al Mualla' src='/images/avatars/1.png' size={60} />
              <div className='flex flex-col gap-1'>
                <Typography variant='h6'>Rashid Al Mualla</Typography>
                <div className='flex items-center gap-1.5'>
                  <i className='tabler-mail text-textSecondary text-base' />
                  <Typography variant='body2' color='text.secondary'>rashid.almualla@email.com</Typography>
                </div>
                <div className='flex items-center gap-1.5'>
                  <i className='tabler-phone text-textSecondary text-base' />
                  <Typography variant='body2' color='text.secondary'>+971 50 123 4567</Typography>
                </div>
                <div className='flex items-center gap-1.5'>
                  <i className='tabler-id text-textSecondary text-base' />
                  <Typography variant='body2' color='text.secondary'>Emirates ID: 784-XXXX-XXXXXXX-X</Typography>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default OverviewTab
