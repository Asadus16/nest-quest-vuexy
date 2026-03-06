'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Type Imports
import type { LedgerPoSummaryType } from '@/types/apps/financialTypes'

// Service Imports
import { getLedgerPoSummary } from '@/services/financial'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const LedgerPo = () => {
  const [data, setData] = useState<LedgerPoSummaryType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)

    getLedgerPoSummary()
      .then(setData)
      .catch(() => setError('Failed to load owner ledger.'))
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

  if (error || !data) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[400px] gap-4'>
        <Typography color='text.secondary'>{error || 'No data available.'}</Typography>
        <Button variant='tonal' onClick={fetchData}>
          Try Again
        </Button>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Credits',
      value: `AED ${data.total_credits.toLocaleString()}`,
      icon: 'tabler-arrow-down-circle',
      color: 'success' as const
    },
    {
      title: 'Total Debits',
      value: `AED ${data.total_debits.toLocaleString()}`,
      icon: 'tabler-arrow-up-circle',
      color: 'error' as const
    },
    {
      title: 'Current Balance',
      value: `AED ${data.current_balance.toLocaleString()}`,
      icon: 'tabler-wallet',
      color: 'primary' as const
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h4'>Owner Ledger</Typography>
        <Typography variant='body2' color='text.secondary'>
          Financial position of each property owner.
        </Typography>
      </Grid>

      {/* Stat Cards */}
      {statCards.map((card, index) => (
        <Grid key={index} size={{ xs: 12, sm: 4 }}>
          <Card>
            <CardContent className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' color={card.color} skin='light' size={48}>
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

      {/* Per-Owner Breakdown */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Owner Breakdown'
            avatar={
              <CustomAvatar variant='rounded' color='primary' skin='light' size={34}>
                <i className='tabler-users text-lg' />
              </CustomAvatar>
            }
            subheader={`${data.owners.length} owners`}
          />
          {data.owners.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Owner</th>
                    <th>Total Credits</th>
                    <th>Total Debits</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {data.owners.map((row, index) => (
                    <tr key={row.owner_id}>
                      <td>
                        <Typography>{index + 1}</Typography>
                      </td>
                      <td>
                        <Typography className='font-medium' color='text.primary'>
                          {row.owner_name}
                        </Typography>
                      </td>
                      <td>
                        <Typography color='success.main'>
                          AED {row.total_credits.toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography color='error.main'>
                          AED {row.total_debits.toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          className='font-medium'
                          color={row.balance >= 0 ? 'success.main' : 'error.main'}
                        >
                          AED {row.balance.toLocaleString()}
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
                No owners found
              </Typography>
            </CardContent>
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default LedgerPo
