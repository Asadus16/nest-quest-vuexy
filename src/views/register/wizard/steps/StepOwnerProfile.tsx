'use client'

// React Imports
import { useState } from 'react'
import type { ChangeEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { CustomInputVerticalData } from '@core/components/custom-inputs/types'
import type { StepProps } from '../types'

// Component Imports
import CustomInputVertical from '@core/components/custom-inputs/Vertical'
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'

const contactChannels: CustomInputVerticalData[] = [
  {
    title: 'Email',
    value: 'email',
    content: 'Receive updates via email',
    asset: 'tabler-mail',
    isSelected: true
  },
  {
    title: 'Phone',
    value: 'phone',
    content: 'Receive calls & SMS',
    asset: 'tabler-phone'
  },
  {
    title: 'WhatsApp',
    value: 'whatsapp',
    content: 'Chat via WhatsApp',
    asset: 'tabler-brand-whatsapp'
  }
]

const StepOwnerProfile = ({ activeStep, handleNext, handlePrev, steps }: StepProps) => {
  const [ownerType, setOwnerType] = useState('')
  const [selectedChannel, setSelectedChannel] = useState('email')

  const handleChannelChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
    if (typeof prop === 'string') {
      setSelectedChannel(prop)
    } else {
      setSelectedChannel((prop.target as HTMLInputElement).value)
    }
  }

  const isValid = ownerType && selectedChannel

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>Owner Profile</Typography>
        <Typography variant='body2' color='text.secondary'>
          Tell us about your property ownership
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          select
          fullWidth
          label='Owner Type'
          value={ownerType}
          onChange={e => setOwnerType(e.target.value)}
        >
          <MenuItem value=''>Select Owner Type</MenuItem>
          <MenuItem value='individual'>Individual</MenuItem>
          <MenuItem value='company'>Company</MenuItem>
          <MenuItem value='developer'>Developer</MenuItem>
        </CustomTextField>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant='subtitle1' className='mbe-2'>
          Preferred Contact Channel
        </Typography>
      </Grid>
      {contactChannels.map((item, index) => {
        let asset

        if (item.asset && typeof item.asset === 'string') {
          asset = <i className={classnames(item.asset, 'text-[28px]')} />
        }

        return (
          <CustomInputVertical
            type='radio'
            key={index}
            gridProps={{ size: { xs: 12, sm: 4 } }}
            selected={selectedChannel}
            name='contact-channel'
            handleChange={handleChannelChange}
            data={typeof item.asset === 'string' ? { ...item, asset } : item}
          />
        )
      })}
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

export default StepOwnerProfile
