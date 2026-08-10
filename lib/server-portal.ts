import 'server-only'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient, User } from '@supabase/supabase-js'

export type PortalRole = 'admin' | 'school' | 'parent' | 'driver' | 'codriver' | 'nurse' | 'partner'

type PortalProfile = {
  id: string
  auth_user_id: string | null
  email: string
  full_name: string
  role: PortalRole
  school_id: string | null
  is_active: boolean
}

export function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) throw new Error('Supabase service role is not configured.')
  return createClient(url, serviceKey, { auth: { persistSession: false } })
}

export async function requirePortalUser(allowedRoles?: PortalRole[]) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) throw new Error('Supabase auth is not configured.')

  const cookieStore = cookies()
  const authClient = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll() {},
    },
  })

  const { data, error } = await authClient.auth.getUser()
  if (error || !data.user) throw new Error('Sign in to continue.')

  const service = getServiceSupabase()
  const profile = await getProfileForUser(service, data.user)
  if (!profile?.is_active) throw new Error('Your portal access is not active yet.')
  if (allowedRoles?.length && !allowedRoles.includes(profile.role)) throw new Error('You do not have permission for this action.')

  return { user: data.user, profile, service }
}

async function getProfileForUser(service: SupabaseClient, user: User) {
  const { data } = await service
    .from('app_users')
    .select('id, auth_user_id, email, full_name, role, school_id, is_active')
    .or(`auth_user_id.eq.${user.id},email.eq.${user.email}`)
    .maybeSingle()

  return data as PortalProfile | null
}
