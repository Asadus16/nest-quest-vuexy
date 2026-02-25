'use client'

// React Imports
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'

// Service Imports
import * as authService from '@/services/auth'
import type { AuthUser } from '@/services/auth'

// Type Imports
import type { UserRole } from '@/types/userTypes'
import { backendToRole } from '@/services/auth'

type AuthContextType = {
  user: AuthUser | null
  loading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (payload: authService.RegisterPayload | FormData) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: AuthUser | null) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const loadUser = useCallback(async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

    if (!token) {
      setLoading(false)
      return
    }

    try {
      const u = await authService.getCurrentUser()
      setUser(u)
    } catch {
      localStorage.removeItem('auth_token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await authService.login(email, password)
      localStorage.setItem('auth_token', res.token)
      setUser(res.data)

      const role = backendToRole[res.data.role] || res.data.role

      if (typeof document !== 'undefined' && role) {
        document.cookie = `user-role=${role}; path=/; max-age=${60 * 60 * 24 * 30}`
      }
    },
    []
  )

  const register = useCallback(async (payload: authService.RegisterPayload | FormData) => {
    const res = payload instanceof FormData
      ? await authService.registerWithFormData(payload)
      : await authService.register(payload)
    localStorage.setItem('auth_token', res.token)
    setUser(res.data)

    const role = backendToRole[res.data.role] || res.data.role

    if (typeof document !== 'undefined' && role) {
      document.cookie = `user-role=${role}; path=/; max-age=${60 * 60 * 24 * 30}`
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } catch {
      // Ignore network errors on logout
    }
    localStorage.removeItem('auth_token')
    document.cookie = 'user-role=; path=/; max-age=0'
    setUser(null)
  }, [])

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    setUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return ctx
}
