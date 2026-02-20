import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from '@/configs/i18n'
import type { Locale } from '@/configs/i18n'
import { validRoles } from '@/types/userTypes'
import type { UserRole } from '@/types/userTypes'
import { publicRoutes, hasRouteAccess } from '@/configs/rolePermissions'

/**
 * Strip the locale prefix from a pathname.
 * e.g. '/en/property-owners' → '/property-owners'
 */
const stripLocale = (pathname: string): string => {
  const segments = pathname.split('/')

  // Check if second segment is a locale (e.g. /en/...)
  if (segments.length > 1 && i18n.locales.includes(segments[1] as Locale)) {
    return '/' + segments.slice(2).join('/')
  }

  return pathname
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Strip locale to get the actual route path
  const path = stripLocale(pathname)

  // Allow public routes (login, register, select-role, etc.)
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route))

  if (isPublicRoute || path === '/' || path === '') {
    return NextResponse.next()
  }

  // Get role from cookie
  const roleCookie = request.cookies.get('user-role')?.value
  const role = roleCookie && validRoles.includes(roleCookie as UserRole) ? (roleCookie as UserRole) : null

  // No role cookie = not logged in → redirect to select-role
  if (!role) {
    const url = request.nextUrl.clone()

    url.pathname = `/${i18n.defaultLocale}/select-role`

    return NextResponse.redirect(url)
  }

  // Check if the role has access to this route
  if (!hasRouteAccess(role, path)) {
    // Redirect to dashboard if they don't have access
    const url = request.nextUrl.clone()
    const locale = pathname.split('/')[1] || i18n.defaultLocale

    url.pathname = `/${locale}/dashboards/analytics`

    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  // Match all routes except static files, api, and _next
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)']
}
