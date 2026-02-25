'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Context Imports
import { useAuth } from '@/contexts/authContext'

// Service Imports
import { ApiError } from '@/services/auth'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Type Imports
import type { Locale } from '@configs/i18n'
import { roleNames } from '@/types/userTypes'
import type { UserRole } from '@/types/userTypes'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Styled Component Imports
import AuthIllustrationWrapper from '@views/login/AuthIllustrationWrapper'

const Register = ({ role }: { role: string }) => {
  const { register: authRegister } = useAuth()
  const { lang: locale } = useParams()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [agreed, setAgreed] = useState(false)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const roleName = roleNames[role as UserRole] || role

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!fullName.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.')
      return
    }
    if (!agreed) {
      setError('Please agree to the privacy policy and terms.')
      return
    }
    setLoading(true)
    try {
      await authRegister({
        email: email.trim(),
        password,
        password_confirmation: password,
        role,
        full_name: fullName.trim()
      })
      window.location.href = getLocalizedUrl('/dashboards/analytics', locale as Locale)
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Registration failed. Please try again.'
      setError(typeof message === 'string' ? message : JSON.stringify(message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthIllustrationWrapper>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='sm:!p-12'>
          <Link href={getLocalizedUrl('/', locale as Locale)} className='flex justify-center mbe-6'>
            <Logo />
          </Link>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>{`Sign up as ${roleName}`}</Typography>
            <Typography>{`Create your ${themeConfig.templateName} account to get started`}</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-6'>
            {error && (
              <Typography color='error' variant='body2'>
                {error}
              </Typography>
            )}
            <CustomTextField
              autoFocus
              fullWidth
              label='Full Name'
              placeholder='Enter your full name'
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
            />
            <CustomTextField
              fullWidth
              label='Email'
              placeholder='Enter your email'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <CustomTextField
              fullWidth
              label='Password'
              placeholder='············'
              type={isPasswordShown ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                        <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
            <FormControlLabel
              control={<Checkbox checked={agreed} onChange={e => setAgreed(e.target.checked)} />}
              label={
                <span>
                  I agree to{' '}
                  <Typography component='span' color='primary.main'>
                    privacy policy & terms
                  </Typography>
                </span>
              }
            />
            <Button fullWidth variant='contained' type='submit' disabled={loading}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>Already have an account?</Typography>
              <Typography
                component={Link}
                href={getLocalizedUrl(`/login?role=${role}`, locale as Locale)}
                color='primary.main'
              >
                Sign in instead
              </Typography>
            </div>
            <Divider className='gap-2 text-textPrimary'>or</Divider>
            <div className='flex justify-center items-center gap-1.5'>
              <IconButton className='text-facebook' size='small'>
                <i className='tabler-brand-facebook-filled' />
              </IconButton>
              <IconButton className='text-twitter' size='small'>
                <i className='tabler-brand-twitter-filled' />
              </IconButton>
              <IconButton className='text-textPrimary' size='small'>
                <i className='tabler-brand-github-filled' />
              </IconButton>
              <IconButton className='text-error' size='small'>
                <i className='tabler-brand-google-filled' />
              </IconButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  )
}

export default Register
