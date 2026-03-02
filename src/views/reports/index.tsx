'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'

// Type Imports
import type { ApexOptions } from 'apexcharts'
import type { DashboardReportsType } from '@/types/apps/reportTypes'

// Service Imports
import { getDashboardReports } from '@/services/reports'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const ReportsDashboard = () => {
  const [data, setData] = useState<DashboardReportsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getDashboardReports()
      .then(d => {
        setData(d)
        setError(null)
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Failed to load reports')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <CircularProgress />
      </div>
    )
  }

  if (error || !data) {
    return (
      <Typography color='error' className='text-center'>
        {error || 'Unable to load reports data'}
      </Typography>
    )
  }

  // Monthly Collection Chart
  const collectionSeries = [{ name: 'Collected', data: data.monthly_collection.map(m => m.amount) }]

  const collectionOptions: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '40%'
      }
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: 'var(--mui-palette-divider)',
      strokeDashArray: 4,
      padding: { top: -10, bottom: -5 }
    },
    xaxis: {
      categories: data.monthly_collection.map(m => m.label),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          fontSize: '12px',
          colors: 'var(--mui-palette-text-disabled)'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          colors: 'var(--mui-palette-text-disabled)'
        },
        formatter: (val: number) => `${(val / 1000).toFixed(0)}K`
      }
    },
    colors: ['var(--mui-palette-primary-main)'],
    tooltip: {
      y: { formatter: (val: number) => `AED ${val.toLocaleString()}` }
    }
  }

  // Status Donut
  const statusSeries = [
    data.contracts_by_status.active,
    data.contracts_by_status.draft,
    data.contracts_by_status.expired,
    data.contracts_by_status.cancelled
  ]

  const statusOptions: ApexOptions = {
    chart: { parentHeightOffset: 0 },
    labels: ['Active', 'Draft', 'Expired', 'Cancelled'],
    colors: [
      'var(--mui-palette-success-main)',
      'var(--mui-palette-warning-main)',
      'var(--mui-palette-error-main)',
      'var(--mui-palette-secondary-main)'
    ],
    dataLabels: { enabled: false },
    legend: {
      position: 'bottom',
      labels: { colors: 'var(--mui-palette-text-secondary)' }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { fontSize: '14px' },
            value: { fontSize: '20px' },
            total: {
              show: true,
              label: 'Total',
              fontSize: '14px',
              color: 'var(--mui-palette-text-secondary)',
              formatter: () => `${data.contracts_by_status.total}`
            }
          }
        }
      }
    }
  }

  return (
    <Grid container spacing={6}>
      {/* KPI Cards */}
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card className='h-full'>
          <CardContent className='flex items-center gap-4 h-full'>
            <CustomAvatar variant='rounded' color='success' skin='light' size={48}>
              <i className='tabler-currency-dirham text-[26px]' />
            </CustomAvatar>
            <div>
              <Typography variant='body2' color='text.secondary'>Total Collected</Typography>
              <Typography variant='h5'>AED {data.financial_summary.total_collected.toLocaleString()}</Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card className='h-full'>
          <CardContent className='flex items-center gap-4 h-full'>
            <CustomAvatar variant='rounded' color='warning' skin='light' size={48}>
              <i className='tabler-clock-dollar text-[26px]' />
            </CustomAvatar>
            <div>
              <Typography variant='body2' color='text.secondary'>Outstanding</Typography>
              <Typography variant='h5' color='warning.main'>
                AED {data.financial_summary.total_outstanding.toLocaleString()}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card className='h-full'>
          <CardContent className='flex items-center gap-4 h-full'>
            <CustomAvatar variant='rounded' color='error' skin='light' size={48}>
              <i className='tabler-alert-circle text-[26px]' />
            </CustomAvatar>
            <div>
              <Typography variant='body2' color='text.secondary'>Pending Payments</Typography>
              <Typography variant='h5' color='error.main'>{data.financial_summary.pending_payments_count}</Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        <Card className='h-full'>
          <CardContent className='flex items-center gap-4 h-full'>
            <CustomAvatar variant='rounded' color='primary' skin='light' size={48}>
              <i className='tabler-file-check text-[26px]' />
            </CustomAvatar>
            <div>
              <Typography variant='body2' color='text.secondary'>Active Contracts</Typography>
              <Typography variant='h5'>{data.contracts_by_status.active}</Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        <Card className='h-full'>
          <CardContent className='flex items-center gap-4 h-full'>
            <CustomAvatar variant='rounded' color='info' skin='light' size={48}>
              <i className='tabler-home-check text-[26px]' />
            </CustomAvatar>
            <div>
              <Typography variant='body2' color='text.secondary'>Occupancy Rate</Typography>
              <Typography variant='h5'>
                {data.occupancy_rate.rate}%
                <Typography component='span' variant='caption' color='text.secondary' className='mis-1'>
                  ({data.occupancy_rate.occupied}/{data.occupancy_rate.total_properties})
                </Typography>
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Monthly Collection Chart */}
      <Grid size={{ xs: 12, lg: 8 }}>
        <Card className='h-full'>
          <CardHeader title='Monthly Rent Collection' subheader='Last 12 months' />
          <CardContent>
            <AppReactApexCharts type='bar' height={300} series={collectionSeries} options={collectionOptions} />
          </CardContent>
        </Card>
      </Grid>

      {/* Contract Status Donut */}
      <Grid size={{ xs: 12, lg: 4 }}>
        <Card className='h-full'>
          <CardHeader title='Contract Status' subheader={`${data.contracts_by_status.total} total contracts`} />
          <CardContent>
            <AppReactApexCharts type='donut' height={300} series={statusSeries} options={statusOptions} />
          </CardContent>
        </Card>
      </Grid>

      {/* Occupancy Progress */}
      <Grid size={{ xs: 12, lg: 4 }}>
        <Card className='h-full'>
          <CardHeader title='Occupancy Overview' />
          <CardContent className='flex flex-col gap-4'>
            <div>
              <div className='flex items-center justify-between mbe-1'>
                <Typography variant='body2' className='font-medium'>Occupancy Rate</Typography>
                <Typography variant='body2' className='font-medium'>{data.occupancy_rate.rate}%</Typography>
              </div>
              <LinearProgress variant='determinate' value={data.occupancy_rate.rate} color='primary' className='bs-2' />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <CustomAvatar variant='rounded' color='success' skin='light' size={32}>
                  <i className='tabler-home-check text-lg' />
                </CustomAvatar>
                <div>
                  <Typography variant='body2' className='font-medium'>Occupied</Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {data.occupancy_rate.occupied} properties
                  </Typography>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <CustomAvatar variant='rounded' color='error' skin='light' size={32}>
                  <i className='tabler-home-x text-lg' />
                </CustomAvatar>
                <div>
                  <Typography variant='body2' className='font-medium'>Vacant</Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {data.occupancy_rate.vacant} properties
                  </Typography>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Top Properties */}
      <Grid size={{ xs: 12, lg: 8 }}>
        <Card className='h-full'>
          <CardHeader
            title='Top Properties by Revenue'
            avatar={
              <CustomAvatar variant='rounded' color='primary' skin='light' size={34}>
                <i className='tabler-trophy text-lg' />
              </CustomAvatar>
            }
          />
          {data.top_properties.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Property</th>
                    <th>Total Rent</th>
                  </tr>
                </thead>
                <tbody>
                  {data.top_properties.map((prop, index) => (
                    <tr key={prop.property_id}>
                      <td><Typography>{index + 1}</Typography></td>
                      <td>
                        <Typography className='font-medium' color='text.primary'>
                          {prop.property_name}
                        </Typography>
                      </td>
                      <td>
                        <Typography className='font-medium'>
                          AED {prop.total_rent.toLocaleString()}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <CardContent>
              <Typography variant='body2' color='text.secondary'>No data available</Typography>
            </CardContent>
          )}
        </Card>
      </Grid>

      {/* Upcoming Payments */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <Card className='h-full'>
          <CardHeader
            title='Upcoming Payments'
            avatar={
              <CustomAvatar variant='rounded' color='warning' skin='light' size={34}>
                <i className='tabler-clock-dollar text-lg' />
              </CustomAvatar>
            }
            subheader='Next due payments'
          />
          {data.upcoming_payments.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <thead>
                  <tr>
                    <th>Tenant</th>
                    <th>Property</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.upcoming_payments.map(payment => (
                    <tr key={payment.id}>
                      <td>
                        <Typography variant='body2' className='font-medium'>
                          {payment.tenant_name}
                        </Typography>
                      </td>
                      <td><Typography variant='body2'>{payment.property_name}</Typography></td>
                      <td><Typography variant='body2'>{payment.label}</Typography></td>
                      <td>
                        <Typography variant='body2' className='font-medium'>
                          AED {payment.amount.toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant='caption' color='text.secondary'>
                          {payment.due_date || '-'}
                        </Typography>
                      </td>
                      <td>
                        <Chip
                          label={payment.status === 'OVERDUE' ? 'Overdue' : 'Upcoming'}
                          size='small'
                          variant='tonal'
                          color={payment.status === 'OVERDUE' ? 'error' : 'warning'}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <CardContent>
              <Typography variant='body2' color='text.secondary'>No upcoming payments</Typography>
            </CardContent>
          )}
        </Card>
      </Grid>

      {/* Recent Payments */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <Card className='h-full'>
          <CardHeader
            title='Recent Payments'
            avatar={
              <CustomAvatar variant='rounded' color='success' skin='light' size={34}>
                <i className='tabler-receipt text-lg' />
              </CustomAvatar>
            }
            subheader='Last 10 payments received'
          />
          {data.recent_payments.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <thead>
                  <tr>
                    <th>Tenant</th>
                    <th>Property</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recent_payments.map(payment => (
                    <tr key={payment.id}>
                      <td>
                        <Typography variant='body2' className='font-medium'>
                          {payment.tenant_name}
                        </Typography>
                      </td>
                      <td><Typography variant='body2'>{payment.property_name}</Typography></td>
                      <td>
                        <Typography variant='body2' className='font-medium' color='success.main'>
                          AED {payment.amount.toLocaleString()}
                        </Typography>
                      </td>
                      <td>
                        {payment.payment_method ? (
                          <Chip
                            label={payment.payment_method.replace('_', ' ')}
                            size='small'
                            variant='tonal'
                            color='secondary'
                          />
                        ) : (
                          <Typography variant='body2'>-</Typography>
                        )}
                      </td>
                      <td>
                        <Typography variant='caption' color='text.secondary'>
                          {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString() : '-'}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <CardContent>
              <Typography variant='body2' color='text.secondary'>No payments received yet</Typography>
            </CardContent>
          )}
        </Card>
      </Grid>

      {/* Expiring Contracts - full width */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Expiring Contracts'
            avatar={
              <CustomAvatar variant='rounded' color='error' skin='light' size={34}>
                <i className='tabler-calendar-exclamation text-lg' />
              </CustomAvatar>
            }
            subheader='Contracts expiring in next 90 days'
          />
          {data.expiring_contracts.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className={tableStyles.table}>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Tenant</th>
                    <th>End Date</th>
                    <th>Days Left</th>
                    <th>Rent</th>
                  </tr>
                </thead>
                <tbody>
                  {data.expiring_contracts.map(contract => (
                    <tr key={contract.id}>
                      <td>
                        <Typography variant='body2' className='font-medium'>
                          {contract.property_name}
                        </Typography>
                      </td>
                      <td><Typography variant='body2'>{contract.tenant_name}</Typography></td>
                      <td>
                        <Typography variant='caption' color='text.secondary'>
                          {contract.end_date}
                        </Typography>
                      </td>
                      <td>
                        <Chip
                          label={`${contract.days_remaining} days`}
                          size='small'
                          variant='tonal'
                          color={contract.days_remaining <= 30 ? 'error' : contract.days_remaining <= 60 ? 'warning' : 'info'}
                        />
                      </td>
                      <td>
                        <Typography variant='body2' className='font-medium'>
                          AED {contract.rent_amount.toLocaleString()}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <CardContent>
              <Typography variant='body2' color='text.secondary'>No contracts expiring soon</Typography>
            </CardContent>
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default ReportsDashboard
