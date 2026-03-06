'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Type Imports
import type { TenantDashboardStatsType } from '@/types/apps/financialTypes'

// Service Imports
import { getTenantDashboardStats } from '@/services/tenancy'

const TenantDashboardStats = () => {
  const [stats, setStats] = useState<TenantDashboardStatsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)

    getTenantDashboardStats()
      .then(setStats)
      .catch(() => setError('Failed to load dashboard stats.'))
      .finally(() => setLoading(false))
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

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[400px] gap-4'>
        <Typography color='text.secondary'>{error}</Typography>
        <Button variant='tonal' onClick={fetchData}>
          Try Again
        </Button>
      </div>
    )
  }

  if (!stats || stats.days_remaining === null) {
    return (
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent className='flex flex-col items-center justify-center py-12 gap-4'>
              <CustomAvatar skin='light' color='primary' size={80}>
                <i className='tabler-home text-[40px]' />
              </CustomAvatar>
              <Typography variant='h6' color='text.secondary'>
                No active contract
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Your dashboard will show contract details once you have an active tenancy.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }

  const cards = [
    {
      title: 'Days Remaining',
      value: String(stats.days_remaining),
      icon: 'tabler-hourglass',
      color: (stats.days_remaining <= 30 ? 'error' : stats.days_remaining <= 60 ? 'warning' : 'success') as 'error' | 'warning' | 'success'
    },
    {
      title: 'Contract Ends',
      value: stats.contract_end_date ? new Date(stats.contract_end_date).toLocaleDateString() : '-',
      icon: 'tabler-calendar-event',
      color: 'primary' as const
    },
    {
      title: 'Next Due Date',
      value: stats.next_due_date ? new Date(stats.next_due_date).toLocaleDateString() : 'None',
      icon: 'tabler-calendar-due',
      color: 'warning' as const
    },
    {
      title: 'Next Due Amount',
      value: stats.next_due_amount ? `AED ${stats.next_due_amount.toLocaleString()}` : '-',
      icon: 'tabler-cash',
      color: 'info' as const
    },
    {
      title: 'Total Paid',
      value: `AED ${stats.total_paid.toLocaleString()}`,
      icon: 'tabler-circle-check',
      color: 'success' as const
    },
    {
      title: 'Total Remaining',
      value: `AED ${stats.total_remaining.toLocaleString()}`,
      icon: 'tabler-clock',
      color: 'error' as const
    }
  ]

  return (
    <Grid container spacing={6}>
      {cards.map((card, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card>
            <CardContent className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' color={card.color} skin='light' size={42}>
                <i className={`${card.icon} text-[26px]`} />
              </CustomAvatar>
              <div className='flex flex-col'>
                <Typography variant='h5'>{card.value}</Typography>
                <Typography variant='body2'>{card.title}</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default TenantDashboardStats
