'use server'

// Data Imports
import { db as profileData } from '@/fake-db/pages/userProfile'
import { db as propertyOwnerData } from '@/fake-db/apps/propertyOwners'
import { db as propertyListData } from '@/fake-db/apps/properties'
import { db as inventoryData } from '@/fake-db/apps/inventory'
import { db as contractData } from '@/fake-db/apps/contracts'

export const getProfileData = async () => {
  return profileData
}

export const getPropertyOwnerData = async () => {
  return propertyOwnerData
}

export const getPropertyListData = async () => {
  return propertyListData
}

export const getInventoryData = async () => {
  return inventoryData
}

export const getContractData = async () => {
  return contractData
}
