// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { UserDataType } from '@components/card-statistics/HorizontalWithSubtitle'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'

// Vars
const data: UserDataType[] = [
  {
    title: 'Total Items',
    stats: '20',
    avatarIcon: 'tabler-packages',
    avatarColor: 'primary',
    trend: 'positive',
    trendNumber: '12%',
    subtitle: 'All inventory items'
  },
  {
    title: 'Total Worth',
    stats: 'AED 80,900',
    avatarIcon: 'tabler-currency-dirham',
    avatarColor: 'success',
    trend: 'positive',
    trendNumber: '8%',
    subtitle: 'Combined asset value'
  },
  {
    title: 'Under Warranty',
    stats: '14',
    avatarIcon: 'tabler-shield-check',
    avatarColor: 'info',
    trend: 'positive',
    trendNumber: '5%',
    subtitle: 'Active warranties'
  },
  {
    title: 'Warranty Expired',
    stats: '6',
    avatarIcon: 'tabler-shield-x',
    avatarColor: 'warning',
    trend: 'negative',
    trendNumber: '3%',
    subtitle: 'Need renewal'
  }
]

const InventoryListCards = () => {
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

export default InventoryListCards
