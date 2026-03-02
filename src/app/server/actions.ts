'use server'

// Data Imports
import { db as profileData } from '@/fake-db/pages/userProfile'

export const getProfileData = async () => {
  return profileData
}
