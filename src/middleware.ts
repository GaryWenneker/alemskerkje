import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionFromRequest } from '@/lib/session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'

  if (!isAdminRoute) return NextResponse.next()

  const session = await getSessionFromRequest(request)

  // Niet ingelogd en admin-route → redirect naar login
  if (!isLoginPage && !session) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Al ingelogd en op de loginpagina → redirect naar dashboard
  if (isLoginPage && session) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
