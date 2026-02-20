// MUI Imports
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

// Type Imports
import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n'

// Config Imports
import { i18n } from '@configs/i18n'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

// Component Imports
import Providers from '@components/Providers'

// Style Imports
import '@/app/globals.css'
import '@/assets/iconify-icons/generated-icons.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

export const metadata = {
  title: 'Nest Quest - Find Your Perfect Home',
  description: 'Nest Quest - Property management and rental platform'
}

const RootLayout = async (props: ChildrenType & { params: Promise<{ lang: string }> }) => {
  const params = await props.params
  const { children } = props

  const lang: Locale = i18n.locales.includes(params.lang as Locale) ? (params.lang as Locale) : i18n.defaultLocale
  const direction = i18n.langDirection[lang]
  const systemMode = await getSystemMode()

  return (
    <html id='__next' lang={lang} dir={direction} suppressHydrationWarning>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <InitColorSchemeScript attribute='data' defaultMode={systemMode} />
        <Providers direction={direction}>
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
