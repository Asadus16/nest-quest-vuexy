'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent, ReactElement } from 'react'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Grid from '@mui/material/Grid'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'

const ManagerRight = ({ tabContentList }: { tabContentList: { [key: string]: ReactElement } }) => {
  const [activeTab, setActiveTab] = useState('personal-details')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
            <Tab
              icon={<i className='tabler-user' />}
              value='personal-details'
              label='Personal Details'
              iconPosition='start'
            />
            <Tab
              icon={<i className='tabler-building' />}
              value='company-info'
              label='Company'
              iconPosition='start'
            />
            <Tab
              icon={<i className='tabler-building-bank' />}
              value='banking-details'
              label='Banking'
              iconPosition='start'
            />
            <Tab
              icon={<i className='tabler-file-text' />}
              value='legal-documents'
              label='Legal Documents'
              iconPosition='start'
            />
          </CustomTabList>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TabPanel value={activeTab} className='p-0'>
            {tabContentList[activeTab]}
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  )
}

export default ManagerRight
