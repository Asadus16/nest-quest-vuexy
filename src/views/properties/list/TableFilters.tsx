// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'

// Type Imports
import type { PropertyType } from '@/types/apps/propertyTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({
  setData,
  propertyData
}: {
  setData: (data: PropertyType[]) => void
  propertyData?: PropertyType[]
}) => {
  // States
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')
  const [city, setCity] = useState('')

  useEffect(
    () => {
      const filteredData = propertyData?.filter(property => {
        if (status && property.status !== status) return false
        if (type && property.type !== type) return false
        if (city && property.city !== city) return false

        return true
      })

      setData(filteredData ?? [])
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status, type, city, propertyData]
  )

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={status}
            onChange={e => setStatus(e.target.value)}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Select Status</MenuItem>
            <MenuItem value='Occupied'>Occupied</MenuItem>
            <MenuItem value='Vacant'>Vacant</MenuItem>
            <MenuItem value='Under Maintenance'>Under Maintenance</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='select-type'
            value={type}
            onChange={e => setType(e.target.value)}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Select Type</MenuItem>
            <MenuItem value='Apartment'>Apartment</MenuItem>
            <MenuItem value='Villa'>Villa</MenuItem>
            <MenuItem value='Studio'>Studio</MenuItem>
            <MenuItem value='Townhouse'>Townhouse</MenuItem>
            <MenuItem value='Penthouse'>Penthouse</MenuItem>
            <MenuItem value='Duplex'>Duplex</MenuItem>
            <MenuItem value='Loft'>Loft</MenuItem>
            <MenuItem value='Office'>Office</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='select-city'
            value={city}
            onChange={e => setCity(e.target.value)}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Select City</MenuItem>
            <MenuItem value='Dubai'>Dubai</MenuItem>
            <MenuItem value='Abu Dhabi'>Abu Dhabi</MenuItem>
            <MenuItem value='Sharjah'>Sharjah</MenuItem>
            <MenuItem value='Ajman'>Ajman</MenuItem>
            <MenuItem value='Ras Al Khaimah'>Ras Al Khaimah</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
