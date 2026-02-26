'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useSearchParams, useRouter } from 'next/navigation'

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
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'

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

type CountryCode = { code: string }

const defaultCountry: CountryCode = { code: '+971' }

const Login = () => {
  const { login: authLogin } = useAuth()

  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [loginMethod, setLoginMethod] = useState('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([defaultCountry])
  const [countryCode, setCountryCode] = useState<CountryCode>(defaultCountry)

  // Fetch country codes from REST Countries API
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=idd')
      .then(res => res.json())
      .then((data: { idd: { root: string; suffixes?: string[] } }[]) => {
        const codes: CountryCode[] = []

        data.forEach(country => {
          const root = country.idd.root

          if (!root) return

          const suffixes = country.idd.suffixes

          if (suffixes && suffixes.length === 1) {
            codes.push({ code: `${root}${suffixes[0]}` })
          } else if (suffixes && suffixes.length > 1) {
            codes.push({ code: root })
          } else {
            codes.push({ code: root })
          }
        })

        const sorted = codes.sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }))

        setCountryCodes(sorted)

        // Keep UAE as default
        const uae = sorted.find(c => c.code === '+971')

        if (uae) setCountryCode(uae)
      })
      .catch(() => {
        // Fallback already set via defaultCountry
      })
  }, [])

  // Hooks
  const router = useRouter()
  const { lang: locale } = useParams()
  const searchParams = useSearchParams()

  const role = searchParams.get('role') as UserRole | null
  const roleName = role ? roleNames[role] : null

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (loginMethod === 'phone') {
      setError('Phone login is not yet supported. Please use email.')
      return
    }

    if (!email.trim() || !password) {
      setError('Please enter email and password.')
      return
    }

    setLoading(true)

    try {
      await authLogin(email.trim(), password)
      if (role) {
        document.cookie = `user-role=${role}; path=/; max-age=${60 * 60 * 24 * 30}`
      }
      window.location.href = getLocalizedUrl('/dashboards/analytics', locale as Locale)
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Login failed. Please try again.'
      setError(typeof message === 'string' ? message : JSON.stringify(message))
    } finally {
      setLoading(false)
    }
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
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </TabPanel>
              <TabPanel value='phone' className='p-0'>
                <div className='flex gap-2'>
                  <Autocomplete
                    value={countryCode}
                    onChange={(_, newValue) => newValue && setCountryCode(newValue)}
                    options={countryCodes}
                    getOptionLabel={option => option.code}
                    renderOption={(props, option) => (
                      <Box component='li' {...props} key={option.code}>
                        {option.code}
                      </Box>
                    )}
                    disableClearable
                    className='is-[100px] shrink-0'
                    renderInput={params => <CustomTextField {...params} size='small' label='Code' />}
                  />
                  <CustomTextField
                    autoFocus
                    fullWidth
                    size='small'
                    label='Phone Number'
                    placeholder='50 123 4567'
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                    slotProps={{ htmlInput: { inputMode: 'numeric' } }}
                  />
                </div>
              </TabPanel>
            </TabContext>
            <CustomTextField
              fullWidth
              label='Password'
              placeholder='············'
              id='outlined-adornment-password'
              type={isPasswordShown ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
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
            <Typography color='error.main' variant='body2' className='min-h-[20px]'>
              {error || '\u00A0'}
            </Typography>
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
            <Button fullWidth variant='contained' type='submit' disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
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
