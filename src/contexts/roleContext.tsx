'use client'

// React Imports
import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

// Type Imports
import type { UserRole } from '@/types/userTypes'

type RoleContextType = {
  role: UserRole | null
}

const RoleContext = createContext<RoleContextType>({ role: null })

export const RoleProvider = ({ role, children }: { role: UserRole | null; children: ReactNode }) => {
  return <RoleContext.Provider value={{ role }}>{children}</RoleContext.Provider>
}

export const useRole = () => useContext(RoleContext)
