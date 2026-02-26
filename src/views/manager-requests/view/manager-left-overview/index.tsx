// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { OwnerInvitationType } from '@/types/apps/propertyOwnerTypes'

// Component Imports
import ManagerProfile from './ManagerProfile'
import InvitationDetails from './InvitationDetails'

type Props = {
  invitation: OwnerInvitationType
  onRespond: (status: 'ACCEPTED' | 'REJECTED') => void
  responding: boolean
}

const ManagerLeftOverview = ({ invitation, onRespond, responding }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ManagerProfile invitation={invitation} onRespond={onRespond} responding={responding} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InvitationDetails invitation={invitation} />
      </Grid>
    </Grid>
  )
}

export default ManagerLeftOverview
