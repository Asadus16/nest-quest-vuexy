'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const PhotoPlaceholder = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingBlockEnd: '75%',
  borderRadius: 'var(--mui-shape-borderRadius)',
  overflow: 'hidden',
  border: `1px solid var(--mui-palette-divider)`,
  backgroundColor: 'var(--mui-palette-action-hover)',
  '& .placeholder-content': {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1)
  }
}))

// Static entry photos data
const entryPhotos = [
  { label: 'Living Room', icon: 'tabler-sofa', color: 'primary' as const, date: '01 Jan 2025' },
  { label: 'Master Bedroom', icon: 'tabler-bed', color: 'info' as const, date: '01 Jan 2025' },
  { label: 'Kitchen', icon: 'tabler-tools-kitchen-2', color: 'warning' as const, date: '01 Jan 2025' },
  { label: 'Bathroom', icon: 'tabler-bath', color: 'error' as const, date: '01 Jan 2025' },
  { label: 'Balcony View', icon: 'tabler-window', color: 'success' as const, date: '01 Jan 2025' },
  { label: 'Entrance Hall', icon: 'tabler-door-enter', color: 'secondary' as const, date: '01 Jan 2025' }
]

const PhotosTab = () => {
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
                {entryPhotos.length} photos
              </Typography>
            }
          />
          <CardContent>
            <Grid container spacing={3}>
              {entryPhotos.map((photo, index) => (
                <Grid key={index} size={{ xs: 6, sm: 4, md: 4 }}>
                  <PhotoPlaceholder>
                    <div className='placeholder-content'>
                      <CustomAvatar variant='rounded' skin='light' color={photo.color} size={48}>
                        <i className={`${photo.icon} text-[24px]`} />
                      </CustomAvatar>
                      <Typography variant='body2' className='font-medium' color='text.primary'>
                        {photo.label}
                      </Typography>
                      <Typography variant='caption' color='text.disabled'>
                        <i className='tabler-calendar text-xs mie-0.5' />
                        {photo.date}
                      </Typography>
                    </div>
                  </PhotoPlaceholder>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PhotosTab
