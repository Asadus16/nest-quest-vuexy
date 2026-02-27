// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { UserDataType } from '@components/card-statistics/HorizontalWithSubtitle'
import type { ManagerInvitationType } from './index'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'

type ManagerRequestStats = {
  totalInvites: number
  pending: number
  linked: number
  rejected: number
}

const computeStats = (invitations: ManagerInvitationType[]): ManagerRequestStats => ({
  totalInvites: invitations.length,
  pending: invitations.filter(inv => inv.status === 'PENDING').length,
  linked: invitations.filter(inv => inv.status === 'ACCEPTED').length,
  rejected: invitations.filter(inv => inv.status === 'REJECTED').length
})

const ManagerRequestCards = ({ invitations }: { invitations: ManagerInvitationType[] }) => {
  const stats = computeStats(invitations)

  const data: UserDataType[] = [
    {
      title: 'Total Invites',
      stats: String(stats.totalInvites),
      avatarIcon: 'tabler-mail',
      avatarColor: 'primary',
      subtitle: 'All invitations received'
    },
    {
      title: 'Pending',
      stats: String(stats.pending),
      avatarIcon: 'tabler-clock',
      avatarColor: 'warning',
      subtitle: 'Awaiting your response'
    },
    {
      title: 'Linked Managers',
      stats: String(stats.linked),
      avatarIcon: 'tabler-user-check',
      avatarColor: 'success',
      subtitle: 'Managers you accepted'
    },
    {
      title: 'Rejected',
      stats: String(stats.rejected),
      avatarIcon: 'tabler-user-x',
      avatarColor: 'error',
      subtitle: 'Invitations declined'
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

export default ManagerRequestCards
