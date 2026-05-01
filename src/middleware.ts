import { NextRequest, NextResponse } from 'next/server'

// Portal routes that require authentication
const PROTECTED_PATHS = [
  '/profile',
  '/kundli',
  '/wallet',
  '/bookings',
  '/settings',
  '/affirmations',
  '/remedy-journey',
  '/astro-chat',
  '/booking-consultations',
  '/energy-reading',
  '/call-scheduling',
  '/learning-growth',
  '/wealth-tools',
  '/saved-reports',
  '/dashboard',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  const isProtected = PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect logged-in users away from /login
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/kundli/:path*',
    '/wallet/:path*',
    '/bookings/:path*',
    '/settings/:path*',
    '/affirmations/:path*',
    '/remedy-journey/:path*',
    '/astro-chat/:path*',
    '/booking-consultations/:path*',
    '/energy-reading/:path*',
    '/call-scheduling/:path*',
    '/learning-growth/:path*',
    '/wealth-tools/:path*',
    '/saved-reports/:path*',
    '/dashboard/:path*',
    '/login',
  ],
}
