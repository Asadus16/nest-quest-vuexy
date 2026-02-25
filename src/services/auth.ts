import { apiFetch, apiFetchFormData, ApiError } from '@/lib/api'

// Map frontend roles to backend enum values
export const roleToBackend: Record<string, string> = {
  'property-manager': 'PROPERTY_MANAGER',
  'property-owner': 'OWNER',
  tenant: 'TENANT',
  guest: 'GUEST'
}

export const backendToRole: Record<string, string> = {
  PROPERTY_MANAGER: 'property-manager',
  OWNER: 'property-owner',
  TENANT: 'tenant',
  GUEST: 'guest',
  SUPER_ADMIN: 'property-manager',
  VENDOR: 'property-manager'
}

export type AuthUser = {
  id: number
  email: string
  role: string
  phone?: string
  status?: string
  email_verified_at?: string
  created_at?: string
  updated_at?: string
}

export type LoginResponse = {
  data: AuthUser
  token: string
  token_type: string
}

export type RegisterPayload = {
  email: string
  password: string
  password_confirmation: string
  role: string
  full_name?: string
  phone?: string
  dob?: string
  nationality?: string
  emirates_id_number?: string
  emirates_id_expiry?: string
  passport_number?: string
  passport_expiry?: string
  passport_issued_country?: string
  company_name?: string
  company_email?: string
  company_address?: string
  company_city?: string
  company_area?: string
  trade_license_number?: string
  trade_license_expiry?: string
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
}

export async function register(payload: RegisterPayload): Promise<LoginResponse> {
  const backendRole = roleToBackend[payload.role] || payload.role

  return apiFetch<LoginResponse>('/register', {
    method: 'POST',
    body: JSON.stringify({
      ...payload,
      role: backendRole
    })
  })
}

export async function registerWithFormData(formData: FormData): Promise<LoginResponse> {
  return apiFetchFormData<LoginResponse>('/register', formData)
}

export async function logout(): Promise<void> {
  await apiFetch('/logout', { method: 'POST' })
}

export async function getCurrentUser(): Promise<AuthUser> {
  const res = await apiFetch<{ data: AuthUser }>('/user')
  return res.data
}

export { ApiError }
