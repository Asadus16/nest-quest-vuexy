const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function getAuthHeaders(): Promise<HeadersInit> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token')

    if (token) {
      ;(headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
    }
  }

  return headers
}

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`
  const headers = await getAuthHeaders()

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers as Record<string, string>)
    }
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const message = data?.message || (data?.errors ? Object.values(data.errors).flat()[0] : response.statusText)
    throw new ApiError(message as string, response.status, data)
  }

  return data as T
}

/** Fetch with FormData (multipart) - do not set Content-Type, browser sets it with boundary */
export async function apiFetchFormData<T>(endpoint: string, formData: FormData): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`

  const headers: HeadersInit = {
    Accept: 'application/json'
  }

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token')
    if (token) {
      ;(headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
    }
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: formData
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const message = data?.message || (data?.errors ? Object.values(data.errors).flat()[0] : response.statusText)
    throw new ApiError(message as string, response.status, data)
  }

  return data as T
}
