// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { InventoryStatsType } from '@/types/apps/inventoryTypes'
import type { UserDataType } from '@components/card-statistics/HorizontalWithSubtitle'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'

const InventoryListCards = ({ stats }: { stats: InventoryStatsType }) => {
  const data: UserDataType[] = [
    {
      title: 'Total Items',
      stats: String(stats.total_items),
      avatarIcon: 'tabler-packages',
      avatarColor: 'primary',
      subtitle: 'All inventory items'
    },
    {
      title: 'Total Worth',
      stats: `AED ${stats.total_worth.toLocaleString()}`,
      avatarIcon: 'tabler-currency-dirham',
      avatarColor: 'success',
      subtitle: 'Combined asset value'
    },
    {
      title: 'Under Warranty',
      stats: String(stats.under_warranty),
      avatarIcon: 'tabler-shield-check',
      avatarColor: 'info',
      subtitle: 'Active warranties'
    },
    {
      title: 'Warranty Expired',
      stats: String(stats.warranty_expired),
      avatarIcon: 'tabler-shield-x',
      avatarColor: 'warning',
      subtitle: 'Need renewal'
    }
  ]

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
