'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

// Type Imports
import type { PropertyOwnerType } from '@/types/apps/propertyOwnerTypes'

// Component Imports
import PropertyOwnerTable from './PropertyOwnerTable'
import PropertyOwnerCards from './PropertyOwnerCards'

const PropertyOwnerList = ({ ownerData }: { ownerData?: PropertyOwnerType[] }) => {
  const [activeTab, setActiveTab] = useState('linked')

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <PropertyOwnerCards />
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
              label='All Invites'
              value='all-invites'
              icon={<i className='tabler-mail' />}
              iconPosition='start'
            />
          </TabList>
          <TabPanel value='linked' className='p-0'>
            <PropertyOwnerTable tableData={ownerData} activeTab='linked' />
          </TabPanel>
          <TabPanel value='all-invites' className='p-0'>
            <PropertyOwnerTable tableData={ownerData} activeTab='all-invites' />
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default PropertyOwnerList
