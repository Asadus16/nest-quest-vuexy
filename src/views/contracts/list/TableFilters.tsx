'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Type Imports
import type { ContractType } from '@/types/apps/contractTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({
  setData,
  tableData
}: {
  setData: (data: ContractType[]) => void
  tableData?: ContractType[]
}) => {
  // States
  const [status, setStatus] = useState('')
  const [frequency, setFrequency] = useState('')
  const [property, setProperty] = useState('')

  useEffect(() => {
    const filteredData = tableData?.filter(item => {
      if (status && item.status !== status) return false
      if (frequency && item.rent_frequency !== frequency) return false
      if (property && item.property?.public_name !== property) return false

      return true
    })

    setData(filteredData || [])
  }, [status, frequency, property, tableData, setData])

  const properties = [...new Set(tableData?.map(item => item.property?.public_name).filter(Boolean))].sort()

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='status-filter'
            value={status}
            onChange={e => setStatus(e.target.value)}
            label='Status'
          >
            <MenuItem value=''>All Statuses</MenuItem>
            <MenuItem value='ACTIVE'>Active</MenuItem>
            <MenuItem value='EXPIRED'>Expired</MenuItem>
            <MenuItem value='DRAFT'>Draft</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='frequency-filter'
            value={frequency}
            onChange={e => setFrequency(e.target.value)}
            label='Frequency'
          >
            <MenuItem value=''>All Frequencies</MenuItem>
            <MenuItem value='MONTHLY'>Monthly</MenuItem>
            <MenuItem value='QUARTERLY'>Quarterly</MenuItem>
            <MenuItem value='SEMI_ANNUALLY'>Semi-Annually</MenuItem>
            <MenuItem value='ANNUALLY'>Annually</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='property-filter'
            value={property}
            onChange={e => setProperty(e.target.value)}
            label='Property'
          >
            <MenuItem value=''>All Properties</MenuItem>
            {properties.map(p => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
