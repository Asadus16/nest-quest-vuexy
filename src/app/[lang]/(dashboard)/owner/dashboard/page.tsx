'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import OwnerFinancialAnalytics from '@views/dashboards/OwnerFinancialAnalytics'

const OwnerFinancialDashboardPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h4'>Financial Analytics</Typography>
        <Typography variant='body2' color='text.secondary'>
          Detailed financial overview of your property portfolio.
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <OwnerFinancialAnalytics />
      </Grid>
    </Grid>
  )
}

export default OwnerFinancialDashboardPage
