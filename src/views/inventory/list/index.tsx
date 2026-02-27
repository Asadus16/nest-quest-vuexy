'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

// Type Imports
import type { InventoryType, InventoryStatsType } from '@/types/apps/inventoryTypes'

// Service Imports
import { getInventories, getInventoryStats } from '@/services/inventory'

// Component Imports
import InventoryListTable from './InventoryListTable'
import InventoryListCards from './InventoryListCards'

const InventoryList = () => {
  const [loading, setLoading] = useState(true)
  const [inventoryData, setInventoryData] = useState<InventoryType[]>([])
  const [stats, setStats] = useState<InventoryStatsType>({
    total_items: 0,
    total_worth: 0,
    under_warranty: 0,
    warranty_expired: 0
  })

  const fetchData = useCallback(async () => {
    try {
      const [items, statsData] = await Promise.all([getInventories(), getInventoryStats()])

      setInventoryData(items)
      setStats(statsData)
    } catch {
      // API errors handled silently — cards show zeros, table shows empty
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <CircularProgress />
      </div>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <InventoryListCards stats={stats} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InventoryListTable tableData={inventoryData} onRefresh={fetchData} />
      </Grid>
    </Grid>
  )
}

export default InventoryList
