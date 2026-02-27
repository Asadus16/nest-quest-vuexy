'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import CircularProgress from '@mui/material/CircularProgress'

// Type Imports
import type { OwnerInvitationType, InvitationStatsType } from '@/types/apps/propertyOwnerTypes'

// Service Imports
import { getInvitations, getInvitationStats } from '@/services/ownerInvitations'

// Component Imports
import PropertyOwnerTable from './PropertyOwnerTable'
import PropertyOwnerCards from './PropertyOwnerCards'

const PropertyOwnerList = () => {
  const [activeTab, setActiveTab] = useState('linked')
  const [loading, setLoading] = useState(true)
  const [invitations, setInvitations] = useState<OwnerInvitationType[]>([])
  const [stats, setStats] = useState<InvitationStatsType>({
    total_linked: 0,
    invites_sent: 0,
    properties_managed: 0,
    linked_this_month: 0
  })

  const fetchData = useCallback(async () => {
    try {
      const [invitationsData, statsData] = await Promise.all([getInvitations(), getInvitationStats()])

      setInvitations(invitationsData)
      setStats(statsData)
    } catch {
      // API errors handled silently — cards show zeros, table shows empty
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <CircularProgress />
      </div>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <PropertyOwnerCards stats={stats} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TabContext value={activeTab}>
          <TabList onChange={handleTabChange} className='mbe-4'>
            <Tab
              label='Linked'
              value='linked'
              icon={<i className='tabler-link' />}
              iconPosition='start'
            />
            <Tab
              label='Pending Invites'
              value='all-invites'
              icon={<i className='tabler-mail' />}
              iconPosition='start'
            />
          </TabList>
          <TabPanel value='linked' className='p-0'>
            <PropertyOwnerTable invitations={invitations} activeTab='linked' onRefresh={fetchData} />
          </TabPanel>
          <TabPanel value='all-invites' className='p-0'>
            <PropertyOwnerTable invitations={invitations} activeTab='all-invites' onRefresh={fetchData} />
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default PropertyOwnerList
