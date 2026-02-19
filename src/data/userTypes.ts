import type { UserType } from '@/types/userTypes'

export const userTypes: UserType[] = [
  {
    role: 'property-manager',
    title: 'Property Manager',
    subtitle: 'Manage multiple properties and tenants',
    imgSrc: '/images/illustrations/characters/4.png',
    recommended: true,
    features: [
      'Manage multiple properties',
      'Tenant screening & onboarding',
      'Maintenance request tracking',
      'Financial reports & analytics',
      'Lease management'
    ]
  },
  {
    role: 'property-owner',
    title: 'Property Owner',
    subtitle: 'List and manage your properties',
    imgSrc: '/images/illustrations/characters/8.png',
    recommended: false,
    features: [
      'List your properties',
      'Track rental income',
      'Manage tenant agreements',
      'Property maintenance logs',
      'Document storage'
    ]
  },
  {
    role: 'tenant',
    title: 'Tenant',
    subtitle: 'Find and manage your rental',
    imgSrc: '/images/illustrations/characters/5.png',
    recommended: false,
    features: [
      'Browse available rentals',
      'Submit maintenance requests',
      'Pay rent online',
      'View lease details',
      'Communication hub'
    ]
  },
  {
    role: 'guest',
    title: 'Guest',
    subtitle: 'Browse available properties',
    imgSrc: '/images/illustrations/characters/2.png',
    recommended: false,
    features: [
      'Browse property listings',
      'Search by location',
      'View property details',
      'Contact property managers',
      'Save favorite listings'
    ]
  }
]
