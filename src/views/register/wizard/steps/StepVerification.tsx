'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'

// Type Imports
import type { StepProps } from '../types'

const StepVerification = ({ activeStep, handleNext, handlePrev, steps }: StepProps) => {
  const [codeSent, setCodeSent] = useState(false)
  const [code, setCode] = useState('')

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>Phone Verification</Typography>
        <Typography variant='body2' color='text.secondary'>
          Verify your phone number to secure your account
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <div className='flex flex-col items-center gap-4 pbs-6 pbe-6'>
          <div className='flex justify-center'>
            <i className='tabler-device-mobile-message text-[64px] text-primary' />
          </div>
          <Typography variant='body1' className='text-center max-is-[400px]'>
            {codeSent
              ? 'A verification code has been sent to your phone number. Please enter it below.'
              : 'We will send a verification code to your registered phone number. Please make sure you have access to your phone.'}
          </Typography>
          <Typography variant='h6' className='text-center'>
            +971 ** *** **48
          </Typography>
          {!codeSent ? (
            <Button variant='contained' startIcon={<i className='tabler-send' />} onClick={() => setCodeSent(true)}>
              Send Verification Code
            </Button>
          ) : (
            <div className='flex flex-col items-center gap-4 is-full max-is-[320px]'>
              <CustomTextField
                fullWidth
                label='Verification Code'
                placeholder='Enter 6-digit code'
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 6 } }}
              />
              <div className='flex items-center gap-2'>
                <Button variant='contained' disabled={code.length !== 6} onClick={handleNext}>
                  Verify & Continue
                </Button>
                <Button variant='tonal' color='secondary' onClick={() => setCodeSent(true)}>
                  Resend Code
                </Button>
              </div>
            </div>
          )}
        </div>
      </Grid>
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
          {codeSent ? null : (
            <Button
              variant='contained'
              disabled
              endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />}
            >
              Next
            </Button>
          )}
        </div>
      </Grid>
    </Grid>
  )
}

export default StepVerification
