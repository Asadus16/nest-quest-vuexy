'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// Type Imports
import type { ContractDetailType } from '@/types/apps/contractTypes'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const PhotoContainer = styled('div')(() => ({
  position: 'relative',
  width: '100%',
  paddingBlockEnd: '75%',
  borderRadius: 'var(--mui-shape-borderRadius)',
  overflow: 'hidden',
  border: `1px solid var(--mui-palette-divider)`,
  '& img': {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}))

const PhotosTab = ({ contract }: { contract: ContractDetailType }) => {
  const photos = contract.entry_photos || []

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            title='Entry Photos'
            subheader='Photos taken at the time of contract entry'
            avatar={
              <CustomAvatar variant='rounded' color='primary' skin='light' size={34}>
                <i className='tabler-camera text-lg' />
              </CustomAvatar>
            }
            action={
              <Typography variant='body2' color='text.secondary'>
                <i className='tabler-photo text-base mie-1 align-text-bottom' />
                {photos.length} photos
              </Typography>
            }
          />
          <CardContent>
            {photos.length > 0 ? (
              <Grid container spacing={3}>
                {photos.map(photo => (
                  <Grid key={photo.id} size={{ xs: 6, sm: 4, md: 4 }}>
                    <PhotoContainer>
                      <img src={photo.url} alt={photo.label || `Entry photo ${photo.sort_order + 1}`} />
                    </PhotoContainer>
                    {photo.label && (
                      <Typography variant='caption' color='text.secondary' className='mbs-1 block text-center'>
                        {photo.label}
                      </Typography>
                    )}
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant='body2' color='text.secondary' className='text-center'>
                No entry photos uploaded
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PhotosTab
