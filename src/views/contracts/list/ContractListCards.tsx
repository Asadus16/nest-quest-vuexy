// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { UserDataType } from '@components/card-statistics/HorizontalWithSubtitle'
import type { ContractStatsType } from '@/types/apps/contractTypes'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'

const ContractListCards = ({ stats }: { stats: ContractStatsType }) => {
  const data: UserDataType[] = [
    {
      title: 'Total Contracts',
      stats: String(stats.total_contracts),
      avatarIcon: 'tabler-file-text',
      avatarColor: 'primary',
      subtitle: 'All contracts'
    },
    {
      title: 'Active',
      stats: String(stats.active),
      avatarIcon: 'tabler-circle-check',
      avatarColor: 'success',
      subtitle: 'Currently active'
    },
    {
      title: 'Expired',
      stats: String(stats.expired),
      avatarIcon: 'tabler-clock-off',
      avatarColor: 'error',
      subtitle: 'Need renewal'
    },
    {
      title: 'Draft',
      stats: String(stats.draft),
      avatarIcon: 'tabler-file-pencil',
      avatarColor: 'warning',
      subtitle: 'Pending completion'
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

export default ContractListCards
