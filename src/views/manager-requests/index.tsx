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
import type { OwnerInvitationType } from '@/types/apps/propertyOwnerTypes'

// Service Imports
import { getOwnerInvitations } from '@/services/ownerManagerRequests'

// Component Imports
import ManagerRequestTable from './ManagerRequestTable'
import ManagerRequestCards from './ManagerRequestCards'

const ManagerRequestList = () => {
  const [activeTab, setActiveTab] = useState('invites')
  const [loading, setLoading] = useState(true)
  const [invitations, setInvitations] = useState<OwnerInvitationType[]>([])

  const fetchData = useCallback(async () => {
    try {
      const data = await getOwnerInvitations()

      setInvitations(data)
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
        <ManagerRequestCards invitations={invitations} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TabContext value={activeTab}>
          <TabList onChange={handleTabChange} className='mbe-4'>
            <Tab
              label='Invites'
              value='invites'
              icon={<i className='tabler-mail' />}
              iconPosition='start'
            />
            <Tab
              label='Linked'
              value='linked'
              icon={<i className='tabler-link' />}
              iconPosition='start'
            />
          </TabList>
          <TabPanel value='invites' className='p-0'>
            <ManagerRequestTable invitations={invitations} activeTab='invites' onRefresh={fetchData} />
          </TabPanel>
          <TabPanel value='linked' className='p-0'>
            <ManagerRequestTable invitations={invitations} activeTab='linked' onRefresh={fetchData} />
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default ManagerRequestList
