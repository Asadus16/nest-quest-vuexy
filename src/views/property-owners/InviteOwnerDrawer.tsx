// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { MuiTelInput } from 'mui-tel-input'

// Types Imports
import type { PropertyOwnerType } from '@/types/apps/propertyOwnerTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  handleClose: () => void
  ownerData?: PropertyOwnerType[]
  setData: (data: PropertyOwnerType[]) => void
}

type FormValidateType = {
  email: string
}

const InviteOwnerDrawer = (props: Props) => {
  // Props
  const { open, handleClose, ownerData, setData } = props

  // States
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState(false)

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValidateType>({
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = (data: FormValidateType) => {
    if (!phone || phone.length < 5) {
      setPhoneError(true)

      return
    }

    const newOwner: PropertyOwnerType = {
      id: (ownerData?.length && ownerData?.length + 1) || 1,
      avatar: `/images/avatars/${Math.floor(Math.random() * 8) + 1}.png`,
      fullName: data.email.split('@')[0],
      email: data.email,
      contact: phone,
      city: '',
      properties: 0,
      status: 'pending',
      invitedDate: new Date().toISOString().split('T')[0]
    }

    setData([...(ownerData ?? []), newOwner])
    handleClose()
    setPhone('')
    setPhoneError(false)
    resetForm({ email: '' })
  }

  const handleReset = () => {
    handleClose()
    setPhone('')
    setPhoneError(false)
    resetForm({ email: '' })
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Invite Property Owner</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-6 p-6'>
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='email'
                label='Email'
                placeholder='owner@example.com'
                {...(errors.email && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <MuiTelInput
            value={phone}
            onChange={value => {
              setPhone(value)
              setPhoneError(false)
            }}
            defaultCountry='AE'
            label='Phone Number'
            fullWidth
            error={phoneError}
            helperText={phoneError ? 'This field is required.' : ''}
          />
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Send Invite
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={() => handleReset()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default InviteOwnerDrawer
