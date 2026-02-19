import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: '/',
      destination: '/en/select-role',
      permanent: true,
      locale: false
    },
    {
      source: '/en',
      destination: '/en/select-role',
      permanent: true,
      locale: false
    }
  ]
}

export default nextConfig
