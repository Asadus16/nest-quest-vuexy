// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ContractDetails from './ContractDetails'
import ContractFinancials from './ContractFinancials'

const ContractLeftOverview = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ContractDetails />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <ContractFinancials />
      </Grid>
    </Grid>
  )
}

export default ContractLeftOverview
