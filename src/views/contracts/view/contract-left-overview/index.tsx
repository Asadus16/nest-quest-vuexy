// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { ContractDetailType } from '@/types/apps/contractTypes'

// Component Imports
import ContractDetails from './ContractDetails'
import ContractFinancials from './ContractFinancials'

const ContractLeftOverview = ({ contract }: { contract: ContractDetailType }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ContractDetails contract={contract} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <ContractFinancials contract={contract} />
      </Grid>
    </Grid>
  )
}

export default ContractLeftOverview
