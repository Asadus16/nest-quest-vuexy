'use server'

// Data Imports
import { db as profileData } from '@/fake-db/pages/userProfile'
import { db as contractData } from '@/fake-db/apps/contracts'

export const getProfileData = async () => {
  return profileData
}

export const getContractData = async () => {
  return contractData
}
