// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { PropertyDetailType } from '@/types/apps/propertyTypes'

// Component Imports
import PropertyDetails from './PropertyDetails'
import PropertyFinancials from './PropertyFinancials'

const PropertyLeftOverview = ({ property }: { property: PropertyDetailType }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <PropertyDetails property={property} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <PropertyFinancials property={property} />
      </Grid>
    </Grid>
  )
}

export default PropertyLeftOverview
