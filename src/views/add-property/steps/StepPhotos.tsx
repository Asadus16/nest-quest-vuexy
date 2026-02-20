'use client'

// React Imports
import { useRef } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'

// Type Imports
import type { StepProps } from '../types'

const MAX_PHOTOS = 10
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const DropZone = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(6),
  borderRadius: 'var(--mui-shape-borderRadius)',
  border: '2px dashed var(--mui-palette-divider)',
  cursor: 'pointer',
  transition: theme.transitions.create(['border-color', 'background-color'], {
    duration: theme.transitions.duration.shorter
  }),
  '&:hover': {
    borderColor: 'var(--mui-palette-primary-main)',
    backgroundColor: 'var(--mui-palette-action-hover)'
  }
}))

const PhotoThumbnail = styled('div')(({ theme }) => ({
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
  },
  '& .delete-btn': {
    position: 'absolute',
    insetBlockStart: 4,
    insetInlineEnd: 4,
    backgroundColor: 'var(--mui-palette-background-paper)',
    boxShadow: theme.shadows[2],
    '&:hover': {
      backgroundColor: 'var(--mui-palette-error-lightOpacity)'
    }
  }
}))

const StepPhotos = ({ activeStep, handleNext, handlePrev, formData, setFormData }: StepProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const isValid = formData.photos.length >= 1

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const remaining = MAX_PHOTOS - formData.photos.length
    const validFiles = files
      .filter(f => ALLOWED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE)
      .slice(0, remaining)

    if (validFiles.length > 0) {
      setFormData({ ...formData, photos: [...formData.photos, ...validFiles] })
    }

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const removePhoto = (index: number) => {
    const updated = formData.photos.filter((_, i) => i !== index)

    setFormData({ ...formData, photos: updated })
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>Photos</Typography>
        <Typography variant='body2' color='text.secondary'>
          Upload property photos to showcase the listing
        </Typography>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Alert severity='info' icon={<i className='tabler-info-circle' />}>
          Maximum {MAX_PHOTOS} photos allowed. Accepted formats: JPG, PNG, WebP. Max file size: 5MB per photo.
        </Alert>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <DropZone
          onClick={() => formData.photos.length < MAX_PHOTOS && inputRef.current?.click()}
          style={{ opacity: formData.photos.length >= MAX_PHOTOS ? 0.5 : 1 }}
        >
          <input ref={inputRef} type='file' hidden accept='.jpg,.jpeg,.png,.webp' multiple onChange={handleFileSelect} />
          <i className='tabler-cloud-upload text-[40px] text-textSecondary' />
          <Typography variant='body1' color='text.secondary'>
            {formData.photos.length >= MAX_PHOTOS ? 'Maximum photos reached' : 'Click to upload or drag and drop'}
          </Typography>
          <Typography variant='caption' color='text.disabled'>
            {formData.photos.length} / {MAX_PHOTOS} photos uploaded
          </Typography>
        </DropZone>
      </Grid>

      {formData.photos.length > 0 && (
        <Grid size={{ xs: 12 }}>
          <Grid container spacing={3}>
            {formData.photos.map((photo, index) => (
              <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }}>
                <PhotoThumbnail>
                  <img src={URL.createObjectURL(photo)} alt={`Property photo ${index + 1}`} />
                  <IconButton className='delete-btn' size='small' onClick={() => removePhoto(index)}>
                    <i className='tabler-x text-base' />
                  </IconButton>
                </PhotoThumbnail>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}

      <Grid size={{ xs: 12 }}>
        <div className='flex items-center justify-between'>
          <Button
            variant='tonal'
            color='secondary'
            disabled={activeStep === 0}
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
          >
            Previous
          </Button>
          <Button
            variant='contained'
            disabled={!isValid}
            onClick={handleNext}
            endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />}
          >
            Next
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepPhotos
