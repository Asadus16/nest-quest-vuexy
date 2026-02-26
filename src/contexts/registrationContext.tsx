'use client'

// React Imports
import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'

// Type Imports
import type { UserRole } from '@/types/userTypes'
import type { RegisterPayload } from '@/services/auth'

export type RegistrationFormData = {
  full_name?: string
  dob?: string
  nationality?: string
  address?: string
  email?: string
  phone?: string
  password?: string
  company_name?: string
  company_email?: string
  company_address?: string
  company_city?: string
  company_area?: string
  trade_license_number?: string
  trade_license_expiry?: string
  emirates_id_number?: string
  emirates_id_expiry?: string
  passport_number?: string
  passport_expiry?: string
  passport_issued_country?: string
  bank_name?: string
  bank_branch?: string
  account_number?: string
  iban?: string
  [key: string]: string | undefined
}

export type RegistrationFormFiles = {
  company_logo?: File
  passport_copy?: File
  emirates_id_front?: File
  emirates_id_back?: File
  trade_license?: File
}

type RegistrationContextType = {
  role: UserRole
  formData: RegistrationFormData
  formFiles: RegistrationFormFiles
  updateForm: (data: Partial<RegistrationFormData>) => void
  updateFormFile: (key: keyof RegistrationFormFiles, file: File | null) => void
  getRegisterPayload: () => RegisterPayload
  getRegisterFormData: () => FormData
}

const RegistrationContext = createContext<RegistrationContextType | null>(null)

export function RegistrationProvider({
  role,
  children
}: {
  role: UserRole
  children: ReactNode
}) {
  const [formData, setFormData] = useState<RegistrationFormData>({})
  const [formFiles, setFormFiles] = useState<RegistrationFormFiles>({})

  const updateForm = useCallback((data: Partial<RegistrationFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }, [])

  const updateFormFile = useCallback((key: keyof RegistrationFormFiles, file: File | null) => {
    setFormFiles(prev => {
      const next = { ...prev }
      if (file) next[key] = file
      else delete next[key]
      return next
    })
  }, [])

  const getRegisterPayload = useCallback((): RegisterPayload => {
      const d = formData
      const payload: RegisterPayload = {
        email: d.email || '',
        password: d.password || '',
        password_confirmation: d.password || '',
        role,
        full_name: d.full_name,
        phone: d.phone,
        dob: d.dob,
        nationality: typeof d.nationality === 'string' ? d.nationality : undefined,
        emirates_id_number: d.emirates_id_number,
        emirates_id_expiry: d.emirates_id_expiry,
        passport_number: d.passport_number,
        passport_expiry: d.passport_expiry,
        passport_issued_country: d.passport_issued_country
      }
      if (role === 'property-manager') {
        payload.company_name = d.company_name
        payload.company_email = d.company_email
        payload.company_address = d.company_address
        payload.company_city = d.company_city
        payload.company_area = d.company_area
        payload.trade_license_number = d.trade_license_number
        payload.trade_license_expiry = d.trade_license_expiry
      }
      if (role === 'property-owner') {
        payload.bank_name = d.bank_name
        payload.bank_branch = d.bank_branch
        payload.account_number = d.account_number
        payload.iban = d.iban
      }
      return payload
    },
    [formData, role]
  )

  const getRegisterFormData = useCallback((): FormData => {
    const d = formData
    const fd = new FormData()
    const backendRole = role === 'property-manager' ? 'PROPERTY_MANAGER' : role === 'property-owner' ? 'OWNER' : role.toUpperCase()
    fd.append('role', backendRole)
    fd.append('email', d.email || '')
    fd.append('password', d.password || '')
    fd.append('password_confirmation', d.password || '')
    if (d.full_name) fd.append('full_name', d.full_name)
    if (d.phone) fd.append('phone', d.phone)
    if (d.dob) fd.append('dob', d.dob)
    if (d.nationality) fd.append('nationality', d.nationality)
    if (d.emirates_id_number) fd.append('emirates_id_number', d.emirates_id_number)
    if (d.emirates_id_expiry) fd.append('emirates_id_expiry', d.emirates_id_expiry)
    if (d.passport_number) fd.append('passport_number', d.passport_number)
    if (d.passport_expiry) fd.append('passport_expiry', d.passport_expiry)
    if (d.passport_issued_country) fd.append('passport_issued_country', d.passport_issued_country)
    if (d.company_name) fd.append('company_name', d.company_name)
    if (d.company_email) fd.append('company_email', d.company_email)
    if (d.company_address) fd.append('company_address', d.company_address)
    if (d.company_city) fd.append('company_city', d.company_city)
    if (d.company_area) fd.append('company_area', d.company_area)
    if (d.trade_license_number) fd.append('trade_license_number', d.trade_license_number)
    if (d.trade_license_expiry) fd.append('trade_license_expiry', d.trade_license_expiry)
    if (d.bank_name) fd.append('bank_name', d.bank_name)
    if (d.bank_branch) fd.append('bank_branch', d.bank_branch)
    if (d.account_number) fd.append('account_number', d.account_number)
    if (d.iban) fd.append('iban', d.iban)
    if (formFiles.company_logo) fd.append('company_logo', formFiles.company_logo)
    if (formFiles.passport_copy) fd.append('passport_copy', formFiles.passport_copy)
    if (formFiles.emirates_id_front) fd.append('emirates_id_front', formFiles.emirates_id_front)
    if (formFiles.emirates_id_back) fd.append('emirates_id_back', formFiles.emirates_id_back)
    if (formFiles.trade_license) fd.append('trade_license', formFiles.trade_license)
    return fd
  }, [formData, formFiles, role])

  const value: RegistrationContextType = {
    role,
    formData,
    formFiles,
    updateForm,
    updateFormFile,
    getRegisterPayload,
    getRegisterFormData
  }

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  )
}

export function useRegistration() {
  const ctx = useContext(RegistrationContext)
  if (!ctx) throw new Error('useRegistration must be used within RegistrationProvider')
  return ctx
}
