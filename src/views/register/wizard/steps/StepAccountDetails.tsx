'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'

// Context Imports
import { useRegistration } from '@/contexts/registrationContext'

// Type Imports
import type { StepProps } from '../types'

const StepAccountDetails = ({ activeStep, handleNext, handlePrev, steps }: StepProps) => {
  const { formData, updateForm } = useRegistration()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [email, setEmail] = useState(formData.email ?? '')
  const [phone, setPhone] = useState(formData.phone ?? '')
  const [password, setPassword] = useState(formData.password ?? '')
  const [confirmPassword, setConfirmPassword] = useState('')

  const passwordsMatch = password === confirmPassword
  const isValid = email.trim() && phone.trim() && password && confirmPassword && passwordsMatch

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h5'>Account Details</Typography>
        <Typography variant='body2' color='text.secondary'>
          Set up your login credentials
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          fullWidth
          type='email'
          label='Email Address'
          placeholder='john@example.com'
          value={email}
          onChange={e => {
            const v = e.target.value
            setEmail(v)
            updateForm({ email: v })
          }}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomTextField
          fullWidth
          label='Phone Number'
          placeholder='Enter your phone number'
          value={phone}
          onChange={e => {
            const v = e.target.value.replace(/\D/g, '')
            setPhone(v)
            updateForm({ phone: v })
          }}
          slotProps={{ htmlInput: { inputMode: 'numeric' } }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          label='Password'
          placeholder='············'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => {
            const v = e.target.value
            setPassword(v)
            updateForm({ password: v })
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={() => setShowPassword(s => !s)} onMouseDown={e => e.preventDefault()}>
                    <i className={showPassword ? 'tabler-eye-off' : 'tabler-eye'} />
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <CustomTextField
          fullWidth
          label='Confirm Password'
          placeholder='············'
          type={showConfirm ? 'text' : 'password'}
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          error={!!confirmPassword && !passwordsMatch}
          helperText={confirmPassword && !passwordsMatch ? 'Passwords do not match' : ''}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={() => setShowConfirm(s => !s)} onMouseDown={e => e.preventDefault()}>
                    <i className={showConfirm ? 'tabler-eye-off' : 'tabler-eye'} />
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
        />
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

export default StepAccountDetails
