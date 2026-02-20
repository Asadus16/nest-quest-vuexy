// React Imports
import type { ReactElement } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ContractLeftOverview from '@views/contracts/view/contract-left-overview'
import ContractRight from '@views/contracts/view/contract-right'

const OverviewTab = dynamic(() => import('@views/contracts/view/contract-right/overview'))
const DocumentsTab = dynamic(() => import('@views/contracts/view/contract-right/documents'))
const PhotosTab = dynamic(() => import('@views/contracts/view/contract-right/photos'))
const PaymentScheduleTab = dynamic(() => import('@views/contracts/view/contract-right/payment-schedule'))

const tabContentList = (): { [key: string]: ReactElement } => ({
  overview: <OverviewTab />,
  documents: <DocumentsTab />,
  photos: <PhotosTab />,
  'payment-schedule': <PaymentScheduleTab />
})

const ViewContractPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, lg: 4, md: 5 }}>
        <ContractLeftOverview />
      </Grid>
      <Grid size={{ xs: 12, lg: 8, md: 7 }}>
        <ContractRight tabContentList={tabContentList()} />
      </Grid>
    </Grid>
  )
}

export default ViewContractPage
