// Next Imports
import { redirect } from 'next/navigation'

// Component Imports
import Register from '@views/register'
import RegistrationWizard from '@views/register/wizard'

// Type Imports
import { validRoles } from '@/types/userTypes'
import type { UserRole } from '@/types/userTypes'

// Roles that get the multi-step wizard signup flow
const wizardRoles: UserRole[] = ['property-manager', 'property-owner', 'guest', 'tenant']

type Props = {
  params: Promise<{ lang: string; role: string }>
}

const RegisterPage = async (props: Props) => {
  const params = await props.params
  const { role } = params

  // Redirect to select-role if invalid role
  if (!validRoles.includes(role as UserRole)) {
    redirect(`/${params.lang}/select-role`)
  }

  const isWizardRole = wizardRoles.includes(role as UserRole)

  if (isWizardRole) {
    return (
      <div className='flex justify-center items-center min-bs-dvh p-6'>
        <div className='max-is-[1200px] is-full'>
          <RegistrationWizard role={role as UserRole} />
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col justify-center items-center min-bs-dvh p-6'>
      <Register role={role} />
    </div>
  )
}

export default RegisterPage
