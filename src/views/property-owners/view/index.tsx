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
import type { OwnerInvitationType } from '@/types/apps/propertyOwnerTypes'

// Service Imports
import { getInvitation } from '@/services/ownerInvitations'

// Component Imports
import OwnerLeftOverview from './owner-left-overview'
import OwnerRight from './owner-right'

const PersonalDetailsTab = dynamic(() => import('./owner-right/personal-details'))
const LegalDocumentsTab = dynamic(() => import('./owner-right/legal-documents'))
const BankingDetailsTab = dynamic(() => import('./owner-right/banking-details'))

const ViewOwnerPage = () => {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)
  const locale = params.lang as string

  const [loading, setLoading] = useState(true)
  const [invitation, setInvitation] = useState<OwnerInvitationType | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const data = await getInvitation(id)

      setInvitation(data)
    } catch {
      router.push(`/${locale}/property-owners`)
    } finally {
      setLoading(false)
    }
  }, [id, locale, router])

  useEffect(() => {
    fetchData()
  }, [fetchData])

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
    'legal-documents': <LegalDocumentsTab invitation={invitation} />,
    'banking-details': <BankingDetailsTab invitation={invitation} />
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, lg: 4, md: 5 }}>
        <OwnerLeftOverview invitation={invitation} />
      </Grid>
      <Grid size={{ xs: 12, lg: 8, md: 7 }}>
        <OwnerRight tabContentList={tabContentList} />
      </Grid>
    </Grid>
  )
}

export default ViewOwnerPage
