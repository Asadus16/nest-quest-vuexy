'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useSearchParams, useRouter } from 'next/navigation'

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
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

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
import AuthIllustrationWrapper from './AuthIllustrationWrapper'

const Login = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [loginMethod, setLoginMethod] = useState('email')
  const [phone, setPhone] = useState('')

  // Hooks
  const router = useRouter()
  const { lang: locale } = useParams()
  const searchParams = useSearchParams()

  const role = searchParams.get('role') as UserRole | null
  const roleName = role ? roleNames[role] : null

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Save role to cookie
    if (role) {
      document.cookie = `user-role=${role}; path=/; max-age=${60 * 60 * 24 * 30}` // 30 days
    }

    // Full page navigation so the server re-reads the role cookie
    window.location.href = getLocalizedUrl('/dashboards/analytics', locale as Locale)
  }

  // Build register URL - if role is present, go to role-specific register
  const registerUrl = role
    ? getLocalizedUrl(`/register/${role}`, locale as Locale)
    : getLocalizedUrl('/select-role', locale as Locale)

  return (
    <AuthIllustrationWrapper>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='sm:!p-12'>
          <Link href={getLocalizedUrl('/', locale as Locale)} className='flex justify-center mbe-6'>
            <Logo />
          </Link>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>
              {roleName ? `Sign in as ${roleName}` : `Welcome to ${themeConfig.templateName}!`}
            </Typography>
            <Typography>Please sign-in to your account and start the adventure</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={handleLogin} className='flex flex-col gap-6'>
            <TabContext value={loginMethod}>
              <TabList
                onChange={(_, value) => setLoginMethod(value)}
                variant='fullWidth'
                className='mbe-2'
              >
                <Tab
                  label='Email'
                  value='email'
                  icon={<i className='tabler-mail text-lg' />}
                  iconPosition='start'
                />
                <Tab
                  label='Phone'
                  value='phone'
                  icon={<i className='tabler-phone text-lg' />}
                  iconPosition='start'
                />
              </TabList>
              <TabPanel value='email' className='p-0'>
                <CustomTextField
                  autoFocus
                  fullWidth
                  label='Email'
                  placeholder='Enter your email'
                  type='email'
                />
              </TabPanel>
              <TabPanel value='phone' className='p-0'>
                <CustomTextField
                  autoFocus
                  fullWidth
                  label='Phone Number'
                  placeholder='Enter your phone number'
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                  slotProps={{ htmlInput: { inputMode: 'numeric' } }}
                />
              </TabPanel>
            </TabContext>
            <CustomTextField
              fullWidth
              label='Password'
              placeholder='············'
              id='outlined-adornment-password'
              type={isPasswordShown ? 'text' : 'password'}
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
            <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
              <FormControlLabel control={<Checkbox />} label='Remember me' />
              <Typography
                className='text-end'
                color='primary.main'
                component={Link}
                href={getLocalizedUrl('/forgot-password', locale as Locale)}
              >
                Forgot password?
              </Typography>
            </div>
            <Button fullWidth variant='contained' type='submit'>
              Login
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>New on our platform?</Typography>
              <Typography
                component={Link}
                href={registerUrl}
                color='primary.main'
              >
                Create an account
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

export default Login
