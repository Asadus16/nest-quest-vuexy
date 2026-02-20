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

const ContractRight = ({ tabContentList }: { tabContentList: { [key: string]: ReactElement } }) => {
  const [activeTab, setActiveTab] = useState('overview')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
            <Tab icon={<i className='tabler-list-details' />} value='overview' label='Overview' iconPosition='start' />
            <Tab icon={<i className='tabler-file-text' />} value='documents' label='Documents' iconPosition='start' />
            <Tab icon={<i className='tabler-photo' />} value='photos' label='Entry Photos' iconPosition='start' />
            <Tab
              icon={<i className='tabler-calendar-dollar' />}
              value='payment-schedule'
              label='Payment Schedule'
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

export default ContractRight
