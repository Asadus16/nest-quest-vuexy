// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { UserDataType } from '@components/card-statistics/HorizontalWithSubtitle'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'

// Vars
const data: UserDataType[] = [
  {
    title: 'Total Contracts',
    stats: '12',
    avatarIcon: 'tabler-file-text',
    avatarColor: 'primary',
    trend: 'positive',
    trendNumber: '10%',
    subtitle: 'All contracts'
  },
  {
    title: 'Active',
    stats: '9',
    avatarIcon: 'tabler-circle-check',
    avatarColor: 'success',
    trend: 'positive',
    trendNumber: '6%',
    subtitle: 'Currently active'
  },
  {
    title: 'Expired',
    stats: '2',
    avatarIcon: 'tabler-clock-off',
    avatarColor: 'error',
    trend: 'negative',
    trendNumber: '4%',
    subtitle: 'Need renewal'
  },
  {
    title: 'Draft',
    stats: '1',
    avatarIcon: 'tabler-file-pencil',
    avatarColor: 'warning',
    trend: 'positive',
    trendNumber: '2%',
    subtitle: 'Pending completion'
  }
]

const ContractListCards = () => {
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
