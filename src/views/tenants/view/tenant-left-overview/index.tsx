// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { TenantInvitationType } from '@/types/apps/tenantTypes'

// Component Imports
import TenantProfile from './TenantProfile'
import InvitationDetails from './InvitationDetails'

const TenantLeftOverview = ({ invitation }: { invitation: TenantInvitationType }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <TenantProfile invitation={invitation} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InvitationDetails invitation={invitation} />
      </Grid>
    </Grid>
  )
}

export default TenantLeftOverview
