'use client'

import { LogOut } from 'lucide-react'
import { getSupabaseBrowserClient } from '@/lib/supabase'

export default function LogoutButton() {
  async function handleLogout() {
    const supabase = getSupabaseBrowserClient()
    if (supabase) await supabase.auth.signOut()
    window.localStorage.removeItem('tranzita_portal_role')
    window.sessionStorage.clear()
    window.location.href = '/auth/signin'
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full p-3"
      style={{ background: 'white', border: '1px solid #DDE9D2' }}
      aria-label="Logout"
      title="Logout"
    >
      <LogOut size={18} />
    </button>
  )
}
