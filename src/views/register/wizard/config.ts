import type { UserRole } from '@/types/userTypes'
import type { WizardStep } from './types'

// Step Imports
import StepPersonalDetails from './steps/StepPersonalDetails'
import StepCompanyDetails from './steps/StepCompanyDetails'
import StepOwnerProfile from './steps/StepOwnerProfile'
import StepAccountDetails from './steps/StepAccountDetails'
import StepKYC from './steps/StepKYC'
import StepBankingDetails from './steps/StepBankingDetails'
import StepVerification from './steps/StepVerification'
import StepComplete from './steps/StepComplete'

export const wizardSteps: Partial<Record<UserRole, WizardStep[]>> = {
  'property-manager': [
    {
      icon: 'tabler-user',
      title: 'Personal Details',
      subtitle: 'Name & Contact',
      component: StepPersonalDetails
    },
    {
      icon: 'tabler-building',
      title: 'Company Details',
      subtitle: 'Company Info',
      component: StepCompanyDetails
    },
    {
      icon: 'tabler-lock',
      title: 'Account Details',
      subtitle: 'Email & Password',
      component: StepAccountDetails
    },
    {
      icon: 'tabler-file-check',
      title: 'KYC',
      subtitle: 'Documents',
      component: StepKYC
    },
    {
      icon: 'tabler-device-mobile',
      title: 'Verification',
      subtitle: 'Phone Verify',
      component: StepVerification
    },
    {
      icon: 'tabler-circle-check',
      title: 'Complete',
      subtitle: 'All Done',
      component: StepComplete
    }
  ],
  'property-owner': [
    {
      icon: 'tabler-user',
      title: 'Personal Details',
      subtitle: 'Name & Contact',
      component: StepPersonalDetails
    },
    {
      icon: 'tabler-home-2',
      title: 'Owner Profile',
      subtitle: 'Ownership Info',
      component: StepOwnerProfile
    },
    {
      icon: 'tabler-lock',
      title: 'Account Details',
      subtitle: 'Email & Password',
      component: StepAccountDetails
    },
    {
      icon: 'tabler-file-check',
      title: 'KYC',
      subtitle: 'Documents',
      component: StepKYC
    },
    {
      icon: 'tabler-credit-card',
      title: 'Banking Details',
      subtitle: 'Bank Info',
      component: StepBankingDetails
    },
    {
      icon: 'tabler-device-mobile',
      title: 'Verification',
      subtitle: 'Phone Verify',
      component: StepVerification
    },
    {
      icon: 'tabler-circle-check',
      title: 'Complete',
      subtitle: 'All Done',
      component: StepComplete
    }
  ],
  guest: [
    {
      icon: 'tabler-user',
      title: 'Personal Details',
      subtitle: 'Name & Contact',
      component: StepPersonalDetails
    },
    {
      icon: 'tabler-lock',
      title: 'Account Details',
      subtitle: 'Email & Password',
      component: StepAccountDetails
    },
    {
      icon: 'tabler-file-check',
      title: 'KYC',
      subtitle: 'Documents',
      component: StepKYC
    },
    {
      icon: 'tabler-device-mobile',
      title: 'Verification',
      subtitle: 'Phone Verify',
      component: StepVerification
    },
    {
      icon: 'tabler-circle-check',
      title: 'Complete',
      subtitle: 'All Done',
      component: StepComplete
    }
  ]
}
