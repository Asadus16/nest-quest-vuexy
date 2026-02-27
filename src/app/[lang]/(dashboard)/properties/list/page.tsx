'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import PropertyListTable from '@/views/properties/list/PropertyListTable'
import PropertyCard from '@/views/properties/list/PropertyCard'

const PropertiesListPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <PropertyCard />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <PropertyListTable />
      </Grid>
    </Grid>
  )
}

export default PropertiesListPage
