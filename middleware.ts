import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const protectedPrefixes = ['/admin', '/dashboard']

export async function middleware(request: NextRequest) {
  const nonce = createNonce()
  const csp = createContentSecurityPolicy(nonce)
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('content-security-policy', csp)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  applySecurityHeaders(response, csp)

  const pathname = request.nextUrl.pathname
  const isProtected = protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))

  if (!isProtected) return response

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/signin'
    redirectUrl.searchParams.set('next', pathname)
    return secureRedirect(redirectUrl, csp)
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options)
        })
      },
    },
  })

  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/signin'
    redirectUrl.searchParams.set('next', pathname)
    return secureRedirect(redirectUrl, csp)
  }

  const role = data.user.app_metadata?.role
  const allowed = allowedPrefixForRole(role)

  if (!allowed) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/signin'
    redirectUrl.searchParams.set('next', pathname)
    redirectUrl.searchParams.set('role', 'missing')
    return secureRedirect(redirectUrl, csp)
  }

  if (allowed && !pathname.startsWith(allowed) && !(role === 'admin' && pathname.startsWith('/admin'))) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = allowed
    return secureRedirect(redirectUrl, csp)
  }

  return response
}

function allowedPrefixForRole(role: unknown) {
  if (role === 'admin') return '/admin'
  if (role === 'school') return '/dashboard/school'
  if (role === 'parent') return '/dashboard/parent'
  if (role === 'driver') return '/dashboard/driver'
  if (role === 'codriver') return '/dashboard/codriver'
  if (role === 'nurse') return '/dashboard/nurse'
  if (role === 'partner') return '/dashboard/partner'
  return null
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}

function createNonce() {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return btoa(String.fromCharCode(...Array.from(bytes)))
}

function createContentSecurityPolicy(nonce: string) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
    "img-src 'self' data: blob:",
    "font-src 'self' fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co https://api.openai.com https://api.resend.com https://*.ingest.sentry.io https://*.ingest.us.sentry.io",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ')
}

function applySecurityHeaders(response: NextResponse, csp: string) {
  response.headers.set('Content-Security-Policy', csp)
  response.headers.set('Content-Security-Policy-Report-Only', csp)
}

function secureRedirect(url: URL, csp: string) {
  const response = NextResponse.redirect(url)
  applySecurityHeaders(response, csp)
  return response
}
