'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import IconButton from '@mui/material/IconButton'

// Type Imports
import type { InventoryStatsType } from '@/types/apps/inventoryTypes'
import type { UserDataType } from '@components/card-statistics/HorizontalWithSubtitle'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'
import CustomAvatar from '@core/components/mui/Avatar'

const conditionItems = [
  { key: 'condition_new' as const, label: 'New', color: 'success' as const },
  { key: 'condition_good' as const, label: 'Good', color: 'info' as const },
  { key: 'condition_fair' as const, label: 'Fair', color: 'warning' as const },
  { key: 'condition_poor' as const, label: 'Poor', color: 'error' as const },
  { key: 'condition_damaged' as const, label: 'Damaged', color: 'secondary' as const }
]

const InventoryListCards = ({ stats }: { stats: InventoryStatsType }) => {
  const [conditionIndex, setConditionIndex] = useState(0)

  const data: UserDataType[] = [
    {
      title: 'Total Assets',
      stats: String(stats.total_items),
      avatarIcon: 'tabler-packages',
      avatarColor: 'primary',
      subtitle: 'All inventory items'
    },
    {
      title: 'Total Worth',
      stats: `AED ${stats.total_worth.toLocaleString()}`,
      avatarIcon: 'tabler-currency-dirham',
      avatarColor: 'success',
      subtitle: 'Combined asset value'
    },
    {
      title: 'PM Owned',
      stats: String(stats.pm_owned),
      avatarIcon: 'tabler-user-shield',
      avatarColor: 'info',
      subtitle: 'Property Manager owned'
    },
    {
      title: 'PO Owned',
      stats: String(stats.po_owned),
      avatarIcon: 'tabler-home-hand',
      avatarColor: 'warning',
      subtitle: 'Property Owner owned'
    }
  ]

  const total = stats.total_items || 1
  const current = conditionItems[conditionIndex]
  const count = stats[current.key]
  const pct = Math.round((count / total) * 100)

  const handlePrev = () => {
    setConditionIndex(prev => (prev === 0 ? conditionItems.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setConditionIndex(prev => (prev === conditionItems.length - 1 ? 0 : prev + 1))
  }

  return (
    <Grid container spacing={6}>
      {data.map((item, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card className='h-full'>
          <CardContent className='flex flex-col justify-between h-full gap-2'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <CustomAvatar variant='rounded' skin='light' color={current.color} size={40}>
                  <i className='tabler-clipboard-check text-[22px]' />
                </CustomAvatar>
                <div>
                  <Typography variant='h5'>{count}</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {current.label}
                  </Typography>
                </div>
              </div>
              <div className='flex items-center'>
                <IconButton size='small' onClick={handlePrev}>
                  <i className='tabler-chevron-left text-xl' />
                </IconButton>
                <IconButton size='small' onClick={handleNext}>
                  <i className='tabler-chevron-right text-xl' />
                </IconButton>
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between mbe-1'>
                <Typography variant='caption' color='text.secondary'>
                  {pct}% of total
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {conditionIndex + 1}/{conditionItems.length}
                </Typography>
              </div>
              <LinearProgress variant='determinate' value={pct} color={current.color} />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default InventoryListCards
