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
import type { OwnerFinancialAnalyticsType } from '@/types/apps/financialTypes'

// Service Imports
import { getOwnerFinancialAnalytics } from '@/services/financial'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

type Period = 'this_month' | 'last_3_months' | 'last_12_months' | 'all_time'

const getDateRange = (period: Period): { from?: string; to?: string } => {
  const now = new Date()

  switch (period) {
    case 'this_month':
      return {
        from: new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0],
        to: new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]
      }
    case 'last_3_months': {
      const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1)

      return {
        from: threeMonthsAgo.toISOString().split('T')[0],
        to: now.toISOString().split('T')[0]
      }
    }
    case 'last_12_months': {
      const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1)

      return {
        from: twelveMonthsAgo.toISOString().split('T')[0],
        to: now.toISOString().split('T')[0]
      }
    }
    case 'all_time':
    default:
      return {}
  }
}

const periodLabels: Record<Period, string> = {
  this_month: 'This Month',
  last_3_months: 'Last 3 Months',
  last_12_months: 'Last 12 Months',
  all_time: 'All Time'
}

const OwnerFinancialAnalytics = () => {
  const [data, setData] = useState<OwnerFinancialAnalyticsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [period, setPeriod] = useState<Period>('this_month')

  const fetchData = useCallback(
    (p: Period) => {
      setLoading(true)
      setError(null)

      const range = getDateRange(p)

      getOwnerFinancialAnalytics(range)
        .then(setData)
        .catch(() => setError('Failed to load financial analytics.'))
        .finally(() => setLoading(false))
    },
    []
  )

  useEffect(() => {
    fetchData(period)
  }, [period, fetchData])

  const handlePeriodChange = (newPeriod: Period) => {
    setPeriod(newPeriod)
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <CircularProgress />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[400px] gap-4'>
        <Typography color='text.secondary'>{error || 'No data available.'}</Typography>
        <Button variant='tonal' onClick={() => fetchData(period)}>
          Try Again
        </Button>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Property Value',
      value: `AED ${data.property_value.toLocaleString()}`,
      icon: 'tabler-home-dollar',
      color: 'primary' as const
    },
    {
      title: 'Amount Invested',
      value: `AED ${data.amount_invested.toLocaleString()}`,
      icon: 'tabler-coins',
      color: 'info' as const
    },
    {
      title: 'Remaining to Pay',
      value: `AED ${data.remaining_to_pay.toLocaleString()}`,
      icon: 'tabler-clock-dollar',
      color: 'warning' as const
    },
    {
      title: 'Rental Profit',
      value: `AED ${data.rental_profit.toLocaleString()}`,
      icon: 'tabler-trending-up',
      color: data.rental_profit >= 0 ? ('success' as const) : ('error' as const)
    }
  ]

  return (
    <Grid container spacing={6}>
      {/* Date Filter Strip */}
      <Grid size={{ xs: 12 }}>
        <div className='flex flex-wrap gap-2'>
          {(Object.keys(periodLabels) as Period[]).map(p => (
            <Chip
              key={p}
              label={periodLabels[p]}
              variant={period === p ? 'filled' : 'outlined'}
              color={period === p ? 'primary' : 'default'}
              onClick={() => handlePeriodChange(p)}
              clickable
            />
          ))}
        </div>
      </Grid>

      {/* Stat Cards */}
      {statCards.map((card, index) => (
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

      {/* My Properties Section */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='My Properties'
            avatar={
              <CustomAvatar variant='rounded' color='primary' skin='light' size={34}>
                <i className='tabler-building text-lg' />
              </CustomAvatar>
            }
            subheader={`${data.properties.length} properties`}
          />
          {data.properties.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Purchase Price</th>
                    <th>Managed By</th>
                    <th>Amount Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {data.properties.map((property, index) => (
                    <tr key={property.id}>
                      <td>
                        <Typography>{index + 1}</Typography>
                      </td>
                      <td>
                        <Typography className='font-medium' color='text.primary'>
                          {property.public_name}
                        </Typography>
                      </td>
                      <td>
                        <Chip
                          label={property.property_type?.replace('_', ' ') || '-'}
                          size='small'
                          variant='tonal'
                          color='secondary'
                        />
                      </td>
                      <td>
                        <Typography className='font-medium'>
                          {property.purchase_price ? `AED ${property.purchase_price.toLocaleString()}` : '-'}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant='body2' color='text.secondary'>
                          {property.manager_name}
                        </Typography>
                      </td>
                      <td>
                        <Typography className='font-medium' color='success.main'>
                          AED {property.amount_paid.toLocaleString()}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <CardContent>
              <Typography variant='body2' color='text.secondary' className='text-center'>
                No properties found
              </Typography>
            </CardContent>
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default OwnerFinancialAnalytics
