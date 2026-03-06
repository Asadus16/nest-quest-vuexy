'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Type Imports
import type { OwnerFinancialStatsType } from '@/types/apps/financialTypes'

const OwnerPropertyCards = ({ stats }: { stats: OwnerFinancialStatsType | null }) => {
  const cards = [
    {
      title: 'Total Income',
      value: stats ? `AED ${stats.total_income.toLocaleString()}` : '-',
      icon: 'tabler-cash',
      color: 'success' as const
    },
    {
      title: 'Total Expense',
      value: stats ? `AED ${stats.total_expense.toLocaleString()}` : '-',
      icon: 'tabler-receipt',
      color: 'error' as const
    },
    {
      title: 'Total Investment',
      value: stats ? `AED ${stats.total_investment.toLocaleString()}` : '-',
      icon: 'tabler-chart-bar',
      color: 'info' as const
    },
    {
      title: 'Net Income',
      value: stats ? `AED ${stats.net_income.toLocaleString()}` : '-',
      icon: 'tabler-trending-up',
      color: 'primary' as const
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

export default OwnerPropertyCards
