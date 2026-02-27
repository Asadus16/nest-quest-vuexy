'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'
import type { ReactElement } from 'react'

// Next Imports
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

// Type Imports
import type { PropertyDetailType } from '@/types/apps/propertyTypes'

// Hook Imports
import { useRole } from '@/contexts/roleContext'

// Service Imports
import { getProperty, getOwnerProperty } from '@/services/properties'

// Component Imports
import PropertyLeftOverview from './property-left-overview'
import PropertyRight from './property-right'

const OverviewTab = dynamic(() => import('./property-right/overview'))
const PhotosTab = dynamic(() => import('./property-right/photos'))
const DocumentsTab = dynamic(() => import('./property-right/documents'))
const InventoryTab = dynamic(() => import('./property-right/inventory'))

const ViewPropertyPage = () => {
  const params = useParams()
  const { role } = useRole()
  const id = Number(params.id)

  const [loading, setLoading] = useState(true)
  const [property, setProperty] = useState<PropertyDetailType | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      const data = role === 'property-owner' ? await getOwnerProperty(id) : await getProperty(id)

      setProperty(data)
    } catch {
      setError('Unable to load property details. The property may not exist or you may not have access.')
    } finally {
      setLoading(false)
    }
  }, [id, role])

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

  if (error || !property) {
    return (
      <div className='flex flex-col justify-center items-center min-h-[400px] gap-4'>
        <Typography color='text.secondary'>{error ?? 'Property not found.'}</Typography>
        <Button variant='tonal' onClick={() => { setLoading(true); fetchData() }}>
          Try Again
        </Button>
      </div>
    )
  }

  const tabContentList: { [key: string]: ReactElement } = {
    overview: <OverviewTab property={property} />,
    photos: <PhotosTab property={property} />,
    documents: <DocumentsTab property={property} />,
    inventory: <InventoryTab propertyId={property.id} />
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, lg: 4, md: 5 }}>
        <PropertyLeftOverview property={property} />
      </Grid>
      <Grid size={{ xs: 12, lg: 8, md: 7 }}>
        <PropertyRight tabContentList={tabContentList} />
      </Grid>
    </Grid>
  )
}

export default ViewPropertyPage
