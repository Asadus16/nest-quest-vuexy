// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { ContractType } from '@/types/apps/contractTypes'

// Component Imports
import ContractListTable from './ContractListTable'
import ContractListCards from './ContractListCards'

const ContractList = ({ contractData }: { contractData?: ContractType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ContractListCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <ContractListTable tableData={contractData} />
      </Grid>
    </Grid>
  )
}

export default ContractList
