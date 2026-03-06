'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'
import type { ReactElement } from 'react'

// Next Imports
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

// Type Imports
import type { ManagerInvitationType } from '../index'

// Hook Imports
import { useRole } from '@/contexts/roleContext'

// Service Imports
import { getOwnerInvitation, respondToInvitation } from '@/services/ownerManagerRequests'
import { getTenantInvitation, respondToTenantInvitation } from '@/services/tenantManagerRequests'

// Component Imports
import ManagerLeftOverview from './manager-left-overview'
import ManagerRight from './manager-right'

const PersonalDetailsTab = dynamic(() => import('./manager-right/personal-details'))
const LegalDocumentsTab = dynamic(() => import('./manager-right/legal-documents'))
const CompanyInfoTab = dynamic(() => import('./manager-right/company-info'))
const BankingDetailsTab = dynamic(() => import('./manager-right/banking-details'))

const ViewManagerPage = () => {
  const params = useParams()
  const router = useRouter()
  const { role } = useRole()
  const id = Number(params.id)
  const locale = params.lang as string

  const [loading, setLoading] = useState(true)
  const [responding, setResponding] = useState(false)
  const [invitation, setInvitation] = useState<ManagerInvitationType | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const data = role === 'tenant' ? await getTenantInvitation(id) : await getOwnerInvitation(id)

      setInvitation(data)
    } catch {
      // Redirect back if not found or unauthorized
      router.push(`/${locale}/manager-requests`)
    } finally {
      setLoading(false)
    }
  }, [id, locale, router, role])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleRespond = async (status: 'ACCEPTED' | 'REJECTED') => {
    setResponding(true)

    try {
      await (role === 'tenant'
        ? respondToTenantInvitation(id, status)
        : respondToInvitation(id, status))
      await fetchData()
    } catch {
      // Error handled silently
    } finally {
      setResponding(false)
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <CircularProgress />
      </div>
    )
  }

  if (!invitation) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <Typography color='text.secondary'>Invitation not found.</Typography>
      </div>
    )
  }

  const tabContentList: { [key: string]: ReactElement } = {
    'personal-details': <PersonalDetailsTab invitation={invitation} />,
    'company-info': <CompanyInfoTab invitation={invitation} />,
    'banking-details': <BankingDetailsTab invitation={invitation} />,
    'legal-documents': <LegalDocumentsTab invitation={invitation} />
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, lg: 4, md: 5 }}>
        <ManagerLeftOverview invitation={invitation} onRespond={handleRespond} responding={responding} />
      </Grid>
      <Grid size={{ xs: 12, lg: 8, md: 7 }}>
        <ManagerRight tabContentList={tabContentList} />
      </Grid>
    </Grid>
  )
}

export default ViewManagerPage
