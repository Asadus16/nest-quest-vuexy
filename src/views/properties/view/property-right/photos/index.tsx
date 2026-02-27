'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

// Type Imports
import type { PropertyDetailType } from '@/types/apps/propertyTypes'

const PropertyImage = ({ url, alt }: { url: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div
        className='rounded-lg bg-actionHover flex items-center justify-center w-full'
        style={{ aspectRatio: '4/3' }}
      >
        <i className='tabler-photo-off text-3xl text-textDisabled' />
      </div>
    )
  }

  return (
    <>
      {!loaded && <Skeleton variant='rounded' width='100%' sx={{ aspectRatio: '4/3' }} />}
      <img
        src={url}
        alt={alt}
        className='rounded-lg object-cover w-full'
        style={{ aspectRatio: '4/3', display: loaded ? 'block' : 'none' }}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
      />
    </>
  )
}

const PhotosTab = ({ property }: { property: PropertyDetailType }) => {
  if (!property.photos?.length) {
    return (
      <Card>
        <CardHeader title='Photos' />
        <CardContent>
          <Typography color='text.secondary'>No photos uploaded for this property.</Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader title={`Photos (${property.photos.length})`} />
      <CardContent>
        <Grid container spacing={4}>
          {property.photos.map(photo => (
            <Grid key={photo.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <PropertyImage url={photo.url} alt={`Property photo ${photo.sort_order + 1}`} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PhotosTab
