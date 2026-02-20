// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import PropertyListTable from '@/views/properties/list/PropertyListTable'
import PropertyCard from '@/views/properties/list/PropertyCard'

// Data Imports
import { getPropertyListData } from '@/app/server/actions'

const PropertiesListPage = async () => {
  const data = await getPropertyListData()

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <PropertyCard />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <PropertyListTable propertyData={data} />
      </Grid>
    </Grid>
  )
}

export default PropertiesListPage
