import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

export function getSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) return null

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export async function requireAdminProfile() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) return { error: 'Supabase auth is not configured.', status: 503 as const }

  const cookieStore = cookies()
  const authClient = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll() {},
    },
  })

  const { data: userData } = await authClient.auth.getUser()
  if (!userData.user) return { error: 'Sign in as an admin.', status: 401 as const }

  const { data: adminProfile } = await authClient
    .from('app_users')
    .select('id, role, is_active')
    .eq('auth_user_id', userData.user.id)
    .eq('role', 'admin')
    .eq('is_active', true)
    .maybeSingle()

  if (!adminProfile) return { error: 'Only active admins can review applications.', status: 403 as const }

  return { adminProfile }
}
