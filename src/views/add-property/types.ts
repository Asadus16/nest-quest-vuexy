import type { ComponentType } from 'react'

export type WizardStepDef = {
  icon: string
  title: string
  subtitle: string
}

export type StepProps = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: WizardStepDef[]
  formData: PropertyFormData
  setFormData: (data: PropertyFormData) => void
}

export type WizardStep = WizardStepDef & {
  component: ComponentType<StepProps>
}

export type PolicyItem = {
  name: string
  description: string
}

export type PropertyFormData = {
  // Step 1: Property Details - Basic Information
  propertyType: string
  unitNumber: string
  floorNumber: string
  buildingName: string
  areaSqFt: string
  bedrooms: number
  bathrooms: number
  maxGuests: number
  maidRoom: boolean
  balcony: boolean
  smartHome: boolean
  view: string
  furnishedStatus: string
  ceilingHeight: string

  // Step 1: Address
  addressLine1: string
  addressLine2: string
  country: string
  state: string
  city: string
  zipCode: string
  area: string
  latitude: string
  longitude: string

  // Step 1: Parking
  parkingSpaces: string
  parkingType: string

  // Step 2: Description
  publicName: string
  shortDescription: string
  longDescription: string
  internalNotes: string

  // Step 3: Photos
  photos: File[]

  // Step 4: Amenities
  amenitiesGeneral: string[]
  amenitiesKitchen: string[]
  amenitiesEssentials: string[]
  amenitiesSafety: string[]

  // Step 5: Usage
  usageType: string
  monthlyRent: string
  securityDepositRequired: boolean
  securityDepositAmount: string

  // Step 6: Policies
  policies: PolicyItem[]

  // Step 7: Property Owner
  propertyOwner: string

  // Step 8: Agreement
  acquisitionMethod: string
  rentAmount: string
  rentFrequency: string
  paymentMethod: string
  tenancyStartDate: string
  tenancyEndDate: string
  tenancyAgreement: File | null
  ejariCertificate: File | null
  dcpmLetter: File | null
  dewaNumber: string
  internetAccountNumber: string
  gasNumber: string
  termsAccepted: boolean
}

export const defaultFormData: PropertyFormData = {
  // Step 1: Basic Information
  propertyType: '',
  unitNumber: '',
  floorNumber: '',
  buildingName: '',
  areaSqFt: '',
  bedrooms: 0,
  bathrooms: 0,
  maxGuests: 0,
  maidRoom: false,
  balcony: false,
  smartHome: false,
  view: '',
  furnishedStatus: '',
  ceilingHeight: '',

  // Step 1: Address
  addressLine1: '',
  addressLine2: '',
  country: '',
  state: '',
  city: '',
  zipCode: '',
  area: '',
  latitude: '',
  longitude: '',

  // Step 1: Parking
  parkingSpaces: '',
  parkingType: '',

  // Step 2: Description
  publicName: '',
  shortDescription: '',
  longDescription: '',
  internalNotes: '',

  // Step 3: Photos
  photos: [],

  // Step 4: Amenities
  amenitiesGeneral: [],
  amenitiesKitchen: [],
  amenitiesEssentials: [],
  amenitiesSafety: [],

  // Step 5: Usage
  usageType: 'long-term',
  monthlyRent: '',
  securityDepositRequired: false,
  securityDepositAmount: '',

  // Step 6: Policies
  policies: [],

  // Step 7: Property Owner
  propertyOwner: '',

  // Step 8: Agreement
  acquisitionMethod: '',
  rentAmount: '',
  rentFrequency: '',
  paymentMethod: '',
  tenancyStartDate: '',
  tenancyEndDate: '',
  tenancyAgreement: null,
  ejariCertificate: null,
  dcpmLetter: null,
  dewaNumber: '',
  internetAccountNumber: '',
  gasNumber: '',
  termsAccepted: false
}
