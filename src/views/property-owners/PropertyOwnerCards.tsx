// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { UserDataType } from '@components/card-statistics/HorizontalWithSubtitle'
import type { InvitationStatsType } from '@/types/apps/propertyOwnerTypes'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'

const PropertyOwnerCards = ({ stats }: { stats: InvitationStatsType }) => {
  const data: UserDataType[] = [
    {
      title: 'Total Linked',
      stats: String(stats.total_linked),
      avatarIcon: 'tabler-user-check',
      avatarColor: 'primary',
      subtitle: 'Property Owners Linked'
    },
    {
      title: 'Invites Sent',
      stats: String(stats.invites_sent),
      avatarIcon: 'tabler-send',
      avatarColor: 'error',
      subtitle: 'Total invitations sent'
    },
    {
      title: 'Properties Managed',
      stats: String(stats.properties_managed),
      avatarIcon: 'tabler-building',
      avatarColor: 'success',
      subtitle: 'Total Properties Managed'
    },
    {
      title: 'Linked This Month',
      stats: String(stats.linked_this_month),
      avatarIcon: 'tabler-calendar-check',
      avatarColor: 'warning',
      subtitle: 'New links this month'
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

export default PropertyOwnerCards
