'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Type Imports
import type { InventoryType } from '@/types/apps/inventoryTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({
  setData,
  tableData
}: {
  setData: (data: InventoryType[]) => void
  tableData?: InventoryType[]
}) => {
  // States
  const [type, setType] = useState('')
  const [room, setRoom] = useState('')
  const [property, setProperty] = useState('')

  useEffect(() => {
    const filteredData = tableData?.filter(item => {
      if (type && item.type !== type) return false
      if (room && item.roomAssigned !== room) return false
      if (property && item.propertyAssigned !== property) return false

      return true
    })

    setData(filteredData || [])
  }, [type, room, property, tableData, setData])

  const types = [...new Set(tableData?.map(item => item.type))].sort()
  const rooms = [...new Set(tableData?.map(item => item.roomAssigned))].sort()
  const properties = [...new Set(tableData?.map(item => item.propertyAssigned))].sort()

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='type-filter'
            value={type}
            onChange={e => setType(e.target.value)}
            label='Type'
          >
            <MenuItem value=''>All Types</MenuItem>
            {types.map(t => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='room-filter'
            value={room}
            onChange={e => setRoom(e.target.value)}
            label='Room Assigned'
          >
            <MenuItem value=''>All Rooms</MenuItem>
            {rooms.map(r => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
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
