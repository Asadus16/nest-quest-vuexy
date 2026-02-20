// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Type Imports
import type { PropertyOwnerType } from '@/types/apps/propertyOwnerTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({
  setData,
  tableData
}: {
  setData: (data: PropertyOwnerType[]) => void
  tableData?: PropertyOwnerType[]
}) => {
  // States
  const [status, setStatus] = useState<PropertyOwnerType['status'] | ''>('')
  const [city, setCity] = useState('')

  useEffect(() => {
    const filteredData = tableData?.filter(owner => {
      if (status && owner.status !== status) return false
      if (city && owner.city !== city) return false

      return true
    })

    setData(filteredData || [])
  }, [status, city, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={status}
            onChange={e => setStatus(e.target.value as PropertyOwnerType['status'] | '')}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Select Status</MenuItem>
            <MenuItem value='linked'>Linked</MenuItem>
            <MenuItem value='pending'>Pending</MenuItem>
            <MenuItem value='rejected'>Rejected</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
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
            <MenuItem value='Fujairah'>Fujairah</MenuItem>
            <MenuItem value='Umm Al Quwain'>Umm Al Quwain</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
