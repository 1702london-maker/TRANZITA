import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const protectedPrefixes = ['/admin', '/dashboard']

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request })
  const pathname = request.nextUrl.pathname
  const isProtected = protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))

  if (!isProtected) return response

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/signin'
    redirectUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(redirectUrl)
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
    return NextResponse.redirect(redirectUrl)
  }

  const role = data.user.app_metadata?.role
  const allowed = allowedPrefixForRole(role)

  if (!allowed) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/signin'
    redirectUrl.searchParams.set('next', pathname)
    redirectUrl.searchParams.set('role', 'missing')
    return NextResponse.redirect(redirectUrl)
  }

  if (allowed && !pathname.startsWith(allowed) && !(role === 'admin' && pathname.startsWith('/admin'))) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = allowed
    return NextResponse.redirect(redirectUrl)
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
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}
