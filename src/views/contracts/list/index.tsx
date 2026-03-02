'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

// Type Imports
import type { ContractType, ContractStatsType } from '@/types/apps/contractTypes'

// Hook Imports
import { useRole } from '@/contexts/roleContext'

// Service Imports
import { getTenancies, getTenancyStats } from '@/services/tenancy'
import { getTenantTenancies } from '@/services/tenancy'
import { getOwnerTenancies } from '@/services/tenancy'

// Component Imports
import ContractListTable from './ContractListTable'
import ContractListCards from './ContractListCards'

const ContractList = () => {
  const { role } = useRole()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<ContractType[]>([])
  const [stats, setStats] = useState<ContractStatsType | null>(null)

  const fetchData = useCallback(async () => {
    try {
      let data: ContractType[]

      if (role === 'tenant') {
        data = await getTenantTenancies()
      } else if (role === 'property-owner') {
        data = await getOwnerTenancies()
      } else {
        data = await getTenancies()

        const statsData = await getTenancyStats()

        setStats(statsData)
      }

      setItems(data)
    } catch {
      // silently handle
    } finally {
      setLoading(false)
    }
  }, [role])

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
      {stats && (
        <Grid size={{ xs: 12 }}>
          <ContractListCards stats={stats} />
        </Grid>
      )}
      <Grid size={{ xs: 12 }}>
        <ContractListTable tableData={items} onRefresh={fetchData} />
      </Grid>
    </Grid>
  )
}

export default ContractList
