'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Service Imports
import { getPropertyStats } from '@/services/properties'

// Type Imports
import type { PropertyStatsType } from '@/types/apps/propertyTypes'

type DataType = {
  title: string
  value: number
  icon: string
  desc: string
}

const buildCardData = (stats: PropertyStatsType): DataType[] => {
  const occupiedPct = stats.total > 0 ? Math.round((stats.occupied / stats.total) * 100) : 0
  const vacantPct = stats.total > 0 ? Math.round((stats.vacant / stats.total) * 100) : 0
  const maintenancePct = stats.total > 0 ? Math.round((stats.under_maintenance / stats.total) * 100) : 0

  return [
    {
      title: 'Total Properties',
      value: stats.total,
      icon: 'tabler-building',
      desc: 'All properties'
    },
    {
      title: 'Occupied',
      value: stats.occupied,
      icon: 'tabler-home-check',
      desc: `${occupiedPct}% of total`
    },
    {
      title: 'Vacant',
      value: stats.vacant,
      icon: 'tabler-home-search',
      desc: `${vacantPct}% of total`
    },
    {
      title: 'Under Maintenance',
      value: stats.under_maintenance,
      icon: 'tabler-tool',
      desc: `${maintenancePct}% of total`
    }
  ]
}

const PropertyCard = () => {
  const [stats, setStats] = useState<PropertyStatsType | null>(null)
  const [loading, setLoading] = useState(true)

  const isBelowMdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  useEffect(() => {
    getPropertyStats()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const data = stats ? buildCardData(stats) : []

  return (
    <Card>
      <CardContent>
        {loading ? (
          <div className='flex items-center justify-center p-4'>
            <CircularProgress size={24} />
          </div>
        ) : (
          <Grid container spacing={6}>
            {data.map((item, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 3 }}
                key={index}
                className={classnames({
                  '[&:nth-of-type(odd)>div]:pie-6 [&:nth-of-type(odd)>div]:border-ie': isBelowMdScreen && !isSmallScreen,
                  '[&:not(:last-child)>div]:pie-6 [&:not(:last-child)>div]:border-ie': !isBelowMdScreen
                })}
              >
                <div className='flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <div className='flex flex-col gap-1'>
                      <Typography>{item.title}</Typography>
                      <Typography variant='h4'>{item.value}</Typography>
                    </div>
                    <CustomAvatar variant='rounded' size={44}>
                      <i className={classnames(item.icon, 'text-[28px]')} />
                    </CustomAvatar>
                  </div>
                  <Typography>{item.desc}</Typography>
                </div>
                {isBelowMdScreen && !isSmallScreen && index < data.length - 2 && (
                  <Divider
                    className={classnames('mbs-6', {
                      'mie-6': index % 2 === 0
                    })}
                  />
                )}
                {isSmallScreen && index < data.length - 1 && <Divider className='mbs-6' />}
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  )
}

export default PropertyCard
