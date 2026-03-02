'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'
import type { ReactElement } from 'react'

// Next Imports
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

// Type Imports
import type { ContractDetailType } from '@/types/apps/contractTypes'

// Hook Imports
import { useRole } from '@/contexts/roleContext'

// Service Imports
import { getTenancy, getTenantTenancy, getOwnerTenancy } from '@/services/tenancy'

// Component Imports
import ContractLeftOverview from '@views/contracts/view/contract-left-overview'
import ContractRight from '@views/contracts/view/contract-right'

const OverviewTab = dynamic(() => import('@views/contracts/view/contract-right/overview'))
const DocumentsTab = dynamic(() => import('@views/contracts/view/contract-right/documents'))
const PhotosTab = dynamic(() => import('@views/contracts/view/contract-right/photos'))
const PaymentScheduleTab = dynamic(() => import('@views/contracts/view/contract-right/payment-schedule'))
const ActivityTab = dynamic(() => import('@views/contracts/view/contract-right/activity'))
const NoticesTab = dynamic(() => import('@views/contracts/view/contract-right/notices'))

const ViewContractPage = () => {
  const { id } = useParams()
  const { role } = useRole()
  const [contract, setContract] = useState<ContractDetailType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContract = useCallback(async () => {
    try {
      const contractId = Number(id)

      if (isNaN(contractId)) {
        setError('Invalid contract ID')
        setLoading(false)

        return
      }

      let data: ContractDetailType

      if (role === 'tenant') {
        data = await getTenantTenancy(contractId)
      } else if (role === 'property-owner') {
        data = await getOwnerTenancy(contractId)
      } else {
        data = await getTenancy(contractId)
      }

      setContract(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load contract')
    } finally {
      setLoading(false)
    }
  }, [id, role])

  useEffect(() => {
    fetchContract()
  }, [fetchContract])

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <CircularProgress />
      </div>
    )
  }

  if (error || !contract) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[400px] gap-2'>
        <Typography color='error'>{error || 'Contract not found'}</Typography>
      </div>
    )
  }

  const tabContentList = (): { [key: string]: ReactElement } => ({
    overview: <OverviewTab contract={contract} />,
    documents: <DocumentsTab contract={contract} />,
    photos: <PhotosTab contract={contract} />,
    'payment-schedule': <PaymentScheduleTab contract={contract} onRefresh={fetchContract} />,
    notices: <NoticesTab contract={contract} onRefresh={fetchContract} />,
    activity: <ActivityTab contract={contract} />
  })

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, lg: 4, md: 5 }}>
        <ContractLeftOverview contract={contract} />
      </Grid>
      <Grid size={{ xs: 12, lg: 8, md: 7 }}>
        <ContractRight
          tabContentList={tabContentList()}
          unreadNotices={(contract.notices || []).filter(n => !n.is_read).length}
        />
      </Grid>
    </Grid>
  )
}

export default ViewContractPage
