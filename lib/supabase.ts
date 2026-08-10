import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export function getSupabaseBrowserClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

export const roleRedirects: Record<string, string> = {
  admin: '/admin',
  school: '/dashboard/school',
  parent: '/dashboard/parent',
  driver: '/dashboard/driver',
  codriver: '/dashboard/codriver',
  nurse: '/dashboard/nurse',
  partner: '/dashboard/partner',
}
