'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'
import type { SyntheticEvent } from 'react'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

// Type Imports
import type { PropertyFinancialStatsType, FinancialTransactionType, PropertyTenancyType } from '@/types/apps/financialTypes'

// Service Imports
import { getPropertyFinancialStats, getPropertyTransactions, getPropertyTenancies } from '@/services/financial'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'
import PropertyFinancialCards from './PropertyFinancialCards'
import TenancyContractsTab from './TenancyContractsTab'
import PropertyExpensesTab from './PropertyExpensesTab'

const OwnerPropertyDetailPage = () => {
  const { propertyId } = useParams()
  const [stats, setStats] = useState<PropertyFinancialStatsType | null>(null)
  const [transactions, setTransactions] = useState<FinancialTransactionType[]>([])
  const [tenancies, setTenancies] = useState<PropertyTenancyType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('contracts')

  const fetchData = useCallback(async () => {
    try {
      const propId = Number(propertyId)

      if (isNaN(propId)) {
        setError('Invalid property ID')
        setLoading(false)

        return
      }

      const [statsData, transactionsData, tenanciesData] = await Promise.all([
        getPropertyFinancialStats(propId),
        getPropertyTransactions(propId),
        getPropertyTenancies(propId)
      ])

      setStats(statsData)
      setTransactions(transactionsData)
      setTenancies(tenanciesData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [propertyId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleTabChange = (_event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

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
        <PropertyFinancialCards stats={stats} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TabContext value={activeTab}>
          <CustomTabList onChange={handleTabChange} variant='scrollable' pill='true'>
            <Tab
              icon={<i className='tabler-file-text' />}
              value='contracts'
              label='Tenancy Contracts'
              iconPosition='start'
            />
            <Tab
              icon={<i className='tabler-receipt' />}
              value='expenses'
              label='Property Expenses'
              iconPosition='start'
            />
          </CustomTabList>
          <TabPanel value='contracts' className='p-0 pt-6'>
            <TenancyContractsTab tenancies={tenancies} />
          </TabPanel>
          <TabPanel value='expenses' className='p-0 pt-6'>
            <PropertyExpensesTab transactions={transactions} />
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default OwnerPropertyDetailPage
