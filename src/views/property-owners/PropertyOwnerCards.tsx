// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { UserDataType } from '@components/card-statistics/HorizontalWithSubtitle'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'

// Vars
const data: UserDataType[] = [
  {
    title: 'Total Linked',
    stats: '12',
    avatarIcon: 'tabler-user-check',
    avatarColor: 'primary',
    trend: 'positive',
    trendNumber: '29%',
    subtitle: 'Property Owners Linked'
  },
  {
    title: 'Invites Sent',
    stats: '20',
    avatarIcon: 'tabler-send',
    avatarColor: 'error',
    trend: 'positive',
    trendNumber: '18%',
    subtitle: 'Total invitations sent'
  },
  {
    title: 'Properties Managed',
    stats: '76',
    avatarIcon: 'tabler-building',
    avatarColor: 'success',
    trend: 'positive',
    trendNumber: '14%',
    subtitle: 'Total Properties Managed'
  },
  {
    title: 'Linked This Month',
    stats: '2',
    avatarIcon: 'tabler-calendar-check',
    avatarColor: 'warning',
    trend: 'positive',
    trendNumber: '42%',
    subtitle: 'New links this month'
  }
]

const PropertyOwnerCards = () => {
  return (
    <Grid container spacing={6}>
      {data.map((item, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default PropertyOwnerCards
