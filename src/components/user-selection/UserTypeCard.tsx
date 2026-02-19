'use client'

// Next Imports
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { UserType } from '@/types/userTypes'
import type { Locale } from '@configs/i18n'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

type Props = {
  data: UserType
}

const UserTypeCard = ({ data }: Props) => {
  const router = useRouter()
  const { lang: locale } = useParams()

  const handleRoleSelect = () => {
    router.push(getLocalizedUrl(`/login?role=${data.role}`, locale as Locale))
  }

  return (
    <CardContent
      className={classnames('relative border rounded pli-5 pbs-[3.75rem] flex flex-col gap-5 h-full', {
        'border-primary': data.recommended
      })}
    >
      {data.recommended && (
        <Chip
          color='primary'
          label='Recommended'
          size='small'
          className='absolute block-start-4 inline-end-5'
          variant='tonal'
        />
      )}
      <div className='flex justify-center'>
        <img src={data.imgSrc} height={120} alt={`${data.title.toLowerCase().replace(' ', '-')}-img`} className='object-contain' />
      </div>
      <div className='text-center flex flex-col gap-1'>
        <Typography variant='h4'>{data.title}</Typography>
        <Typography>{data.subtitle}</Typography>
      </div>
      <div className='flex flex-col gap-4 grow'>
        {data.features.map((feature, index) => (
          <div key={index} className='flex items-center gap-2'>
            <span className='inline-flex'>
              <i className='tabler-circle-filled text-[8px]' />
            </span>
            <Typography>{feature}</Typography>
          </div>
        ))}
      </div>
      <Button
        fullWidth
        variant={data.recommended ? 'contained' : 'tonal'}
        color='primary'
        className='mt-auto'
        onClick={handleRoleSelect}
      >
        {data.title}
      </Button>
    </CardContent>
  )
}

export default UserTypeCard
