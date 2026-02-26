// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { OwnerInvitationType } from '@/types/apps/propertyOwnerTypes'

// Component Imports
import OwnerProfile from './OwnerProfile'
import InvitationDetails from './InvitationDetails'

const OwnerLeftOverview = ({ invitation }: { invitation: OwnerInvitationType }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <OwnerProfile invitation={invitation} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InvitationDetails invitation={invitation} />
      </Grid>
    </Grid>
  )
}

export default OwnerLeftOverview
