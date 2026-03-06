'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Type Imports
import type { OwnerDashboardStatsType } from '@/types/apps/financialTypes'

// Service Imports
import { getOwnerDashboard } from '@/services/financial'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const statusColor: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  PAID: 'success',
  UNPAID: 'warning',
  OVERDUE: 'error',
  PENDING: 'info'
}

const statusLabels: Record<string, string> = {
  PAID: 'Paid',
  UNPAID: 'Upcoming',
  OVERDUE: 'Overdue',
  PENDING: 'Pending'
}

const statusIcon: Record<string, string> = {
  PAID: 'tabler-circle-check',
  UNPAID: 'tabler-clock',
  OVERDUE: 'tabler-alert-circle',
  PENDING: 'tabler-hourglass'
}

const sourceLabels: Record<string, string> = {
  payment_schedule: 'Rent Payment',
  owner_agreement: 'Owner Payout',
  transaction: 'Transaction'
}

const OwnerDashboardStats = () => {
  const [stats, setStats] = useState<OwnerDashboardStatsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)

    getOwnerDashboard()
      .then(setStats)
      .catch(() => setError('Failed to load dashboard.'))
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

  if (error || !stats) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[400px] gap-4'>
        <Typography color='text.secondary'>{error || 'No data available.'}</Typography>
        <Button variant='tonal' onClick={fetchData}>
          Try Again
        </Button>
      </div>
    )
  }

  const overviewCards = [
    {
      title: 'My Properties',
      value: String(stats.properties_count),
      icon: 'tabler-building',
      color: 'primary' as const
    },
    {
      title: 'Active Contracts',
      value: String(stats.active_contracts_count),
      icon: 'tabler-file-text',
      color: 'success' as const
    },
    {
      title: 'Linked Property Managers',
      value: String(stats.linked_pms_count),
      icon: 'tabler-users',
      color: 'info' as const
    }
  ]

  const financialItems = [
    { label: 'Income', value: stats.monthly_income, icon: 'tabler-arrow-down-circle', color: 'success' as const },
    { label: 'Expenses', value: stats.monthly_expenses, icon: 'tabler-arrow-up-circle', color: 'error' as const },
    { label: 'Net Balance', value: stats.monthly_net_balance, icon: 'tabler-scale', color: 'primary' as const },
    { label: 'Held by PM', value: stats.held_by_pm, icon: 'tabler-lock', color: 'warning' as const },
    {
      label: 'Security Deposits',
      value: stats.security_deposits,
      icon: 'tabler-shield-check',
      color: 'info' as const
    }
  ]

  return (
    <Grid container spacing={6}>
      {/* Welcome Heading */}
      <Grid size={{ xs: 12 }}>
        <Typography variant='h4'>Welcome back, {stats.owner_name}</Typography>
        <Typography variant='body2' color='text.secondary'>
          Overview of your properties, finances, and upcoming payments.
        </Typography>
      </Grid>

      {/* Section 1: Overview Stats */}
      {overviewCards.map((card, index) => (
        <Grid key={index} size={{ xs: 12, sm: 4 }}>
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

      {/* Section 2: Financial Overview Strip */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Financial Overview (This Month)'
            avatar={
              <CustomAvatar variant='rounded' color='primary' skin='light' size={34}>
                <i className='tabler-chart-bar text-lg' />
              </CustomAvatar>
            }
          />
          <CardContent>
            <div className='flex flex-wrap justify-between gap-4'>
              {financialItems.map((item, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <CustomAvatar variant='rounded' color={item.color} skin='light' size={42}>
                    <i className={`${item.icon} text-[26px]`} />
                  </CustomAvatar>
                  <div className='flex flex-col'>
                    <Typography variant='h6'>AED {item.value.toLocaleString()}</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {item.label}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Section 3: Upcoming Payment Schedule */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Upcoming Payment Schedule'
            avatar={
              <CustomAvatar variant='rounded' color='warning' skin='light' size={34}>
                <i className='tabler-calendar-dollar text-lg' />
              </CustomAvatar>
            }
            subheader={`${stats.upcoming_payments.length} upcoming items`}
          />
          {stats.upcoming_payments.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.upcoming_payments.map((row, index) => (
                    <tr key={`${row.source}-${row.id}`}>
                      <td>
                        <Typography>{index + 1}</Typography>
                      </td>
                      <td>
                        <Typography className='font-medium' color='text.primary'>
                          {row.label}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant='body2' color='text.secondary'>
                          {row.property_name}
                        </Typography>
                      </td>
                      <td>
                        <Chip
                          label={sourceLabels[row.source] || row.source}
                          size='small'
                          variant='tonal'
                          color='secondary'
                        />
                      </td>
                      <td>
                        <Typography className='font-medium'>AED {row.amount.toLocaleString()}</Typography>
                      </td>
                      <td>
                        <Typography variant='body2' color='text.secondary'>
                          <i className='tabler-calendar text-base mie-1 align-text-bottom' />
                          {row.due_date}
                        </Typography>
                      </td>
                      <td>
                        <Chip
                          label={statusLabels[row.status] || row.status}
                          size='small'
                          variant='tonal'
                          color={statusColor[row.status] || 'default'}
                          icon={<i className={statusIcon[row.status] || 'tabler-clock'} />}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <CardContent>
              <Typography variant='body2' color='text.secondary' className='text-center'>
                No upcoming payments
              </Typography>
            </CardContent>
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default OwnerDashboardStats
