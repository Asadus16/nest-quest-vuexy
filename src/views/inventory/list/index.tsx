// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { InventoryType } from '@/types/apps/inventoryTypes'

// Component Imports
import InventoryListTable from './InventoryListTable'
import InventoryListCards from './InventoryListCards'

const InventoryList = ({ inventoryData }: { inventoryData?: InventoryType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <InventoryListCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InventoryListTable tableData={inventoryData} />
      </Grid>
    </Grid>
  )
}

export default InventoryList
