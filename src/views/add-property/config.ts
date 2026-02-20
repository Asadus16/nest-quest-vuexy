import type { WizardStep } from './types'

// Step Imports
import StepPropertyDetails from './steps/StepPropertyDetails'
import StepDescription from './steps/StepDescription'
import StepPhotos from './steps/StepPhotos'
import StepAmenities from './steps/StepAmenities'
import StepUsage from './steps/StepUsage'
import StepPolicies from './steps/StepPolicies'
import StepPropertyOwner from './steps/StepPropertyOwner'
import StepAgreement from './steps/StepAgreement'
import StepPreview from './steps/StepPreview'

export const addPropertySteps: WizardStep[] = [
  {
    icon: 'tabler-home-2',
    title: 'Property Details',
    subtitle: 'Basic Info & Address',
    component: StepPropertyDetails
  },
  {
    icon: 'tabler-file-text',
    title: 'Description',
    subtitle: 'Title & Details',
    component: StepDescription
  },
  {
    icon: 'tabler-photo',
    title: 'Photos',
    subtitle: 'Upload Images',
    component: StepPhotos
  },
  {
    icon: 'tabler-star',
    title: 'Amenities',
    subtitle: 'Features & Facilities',
    component: StepAmenities
  },
  {
    icon: 'tabler-currency-dirham',
    title: 'Usage',
    subtitle: 'Rent & Pricing',
    component: StepUsage
  },
  {
    icon: 'tabler-gavel',
    title: 'Policies',
    subtitle: 'House Rules',
    component: StepPolicies
  },
  {
    icon: 'tabler-user-check',
    title: 'Property Owner',
    subtitle: 'Select Owner',
    component: StepPropertyOwner
  },
  {
    icon: 'tabler-file-certificate',
    title: 'Agreement',
    subtitle: 'Contract & Utilities',
    component: StepAgreement
  },
  {
    icon: 'tabler-eye',
    title: 'Preview',
    subtitle: 'Review & Submit',
    component: StepPreview
  }
]
