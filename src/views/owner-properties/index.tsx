'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

// Type Imports
import type { OwnerPropertyType, OwnerFinancialStatsType } from '@/types/apps/financialTypes'

// Service Imports
import { getPmOwnerProperties, getOwnerFinancialStats } from '@/services/financial'

// Component Imports
import OwnerPropertyCards from './OwnerPropertyCards'
import OwnerPropertyTable from './OwnerPropertyTable'

const OwnerPropertiesPage = () => {
  const { ownerId } = useParams()
  const [properties, setProperties] = useState<OwnerPropertyType[]>([])
  const [stats, setStats] = useState<OwnerFinancialStatsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const ownerIdNum = Number(ownerId)

      if (isNaN(ownerIdNum)) {
        setError('Invalid owner ID')
        setLoading(false)

        return
      }

      const [propertiesData, statsData] = await Promise.all([
        getPmOwnerProperties(ownerIdNum),
        getOwnerFinancialStats(ownerIdNum)
      ])

      setProperties(propertiesData)
      setStats(statsData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [ownerId])

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

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[400px] gap-2'>
        <Typography color='error'>{error}</Typography>
      </div>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <OwnerPropertyCards stats={stats} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <OwnerPropertyTable properties={properties} ownerId={String(ownerId)} />
      </Grid>
    </Grid>
  )
}

export default OwnerPropertiesPage
