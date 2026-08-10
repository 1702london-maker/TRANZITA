import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { getSeedDashboardPayload, type DashboardRole } from '@/lib/dashboard-data'
import { getServiceSupabase } from '@/lib/server-portal'

const roles: DashboardRole[] = ['Admin', 'School', 'Parent', 'Driver', 'Copilot', 'Nurse', 'Partner']

export async function GET(_: Request, { params }: { params: { role: string } }) {
  const role = normaliseRole(params.role)
  if (!role) return NextResponse.json({ error: 'Unknown dashboard role' }, { status: 404 })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) return NextResponse.json({ error: 'Dashboard auth is not configured.' }, { status: 503 })

  const cookieStore = cookies()
  const authClient = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll() {},
    },
  })

  const { data: userData } = await authClient.auth.getUser()
  if (!userData.user) return NextResponse.json({ error: 'Sign in to view this dashboard.' }, { status: 401 })

  const userRole = userData.user.app_metadata?.role
  const requestedRole = apiRoleForDashboard(role)
  if (userRole !== 'admin' && userRole !== requestedRole) {
    return NextResponse.json({ error: 'You do not have access to this dashboard.' }, { status: 403 })
  }

  try {
    const supabase = getServiceSupabase()
    const { data: profile } = await supabase
      .from('app_users')
      .select('id, role, school_id')
      .or(`auth_user_id.eq.${userData.user.id},email.eq.${userData.user.email}`)
      .maybeSingle()

    if (!profile && userRole !== 'admin') {
      return NextResponse.json({ error: 'Dashboard profile could not be verified.' }, { status: 403 })
    }

    const scopedVehicleIds = await getScopedVehicleIds(supabase, role, profile as any)
    const vehicleQuery = supabase
      .from('vehicles')
      .select('id,registration_number,make,model,certification_status,owner_type')
      .limit(role === 'Partner' ? 12 : 6)

    const alertQuery = supabase
      .from('alerts')
      .select('id,alert_type,severity,created_at,vehicle_id')
      .limit(8)

    if (scopedVehicleIds) {
      if (!scopedVehicleIds.length) {
        const seed = getSeedDashboardPayload(role)
        return NextResponse.json({ ...seed, source: 'supabase', tableRows: [], alertRows: [] })
      }
      vehicleQuery.in('id', scopedVehicleIds)
      alertQuery.in('vehicle_id', scopedVehicleIds)
    }

    const [vehicles, alerts] = await Promise.all([
      vehicleQuery,
      alertQuery,
    ])

    if (vehicles.error || alerts.error) {
      return NextResponse.json({ error: vehicles.error?.message || alerts.error?.message || 'Dashboard data could not be loaded.' }, { status: 500 })
    }

    const seed = getSeedDashboardPayload(role)
    const safeVehicles = (vehicles.data || []).map((vehicle: any) => [
      vehicle.registration_number || vehicle.id,
      role === 'Partner' ? 'Approved Tranzita route' : vehicle.make || 'Tranzita',
      role === 'Partner' ? 'Children count only' : vehicle.model || 'Route assigned',
      vehicle.certification_status || 'Certified',
      role === 'Partner' ? 'No child identities' : 'Live',
      'Active',
    ])

    return NextResponse.json({
      ...seed,
      source: 'supabase',
      tableRows: safeVehicles,
      alertRows: (alerts.data || []).map((alert: any) => [
        alert.alert_type || 'Alert',
        alert.vehicle_id || 'Vehicle',
        alert.severity || 'Info',
        alert.created_at ? new Date(alert.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : 'Now',
      ]),
    })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Dashboard data could not be loaded.' }, { status: 500 })
  }
}

async function getScopedVehicleIds(supabase: ReturnType<typeof getServiceSupabase>, role: DashboardRole, profile?: { id: string; school_id: string | null }) {
  if (role === 'Admin') return null

  if (role === 'Partner' && profile?.id) {
    const { data, error } = await supabase.from('partner_vehicles').select('vehicle_id').eq('partner_id', profile.id).eq('status', 'active')
    if (error) throw new Error('Partner fleet scope could not be verified.')
    return (data || []).map((row: any) => row.vehicle_id).filter(Boolean)
  }

  if (role === 'Driver' && profile?.id) {
    const { data, error } = await supabase.from('vehicles').select('id').eq('current_driver_id', profile.id).eq('is_active', true)
    if (error) throw new Error('Driver fleet scope could not be verified.')
    return (data || []).map((row: any) => row.id).filter(Boolean)
  }

  if (!profile?.school_id) return []

  const { data, error } = await supabase
    .from('route_assignments')
    .select('vehicle_id, routes!inner(school_id)')
    .eq('routes.school_id', profile.school_id)
    .eq('service_date', new Date().toISOString().slice(0, 10))

  if (error) throw new Error('School route scope could not be verified.')
  return Array.from(new Set((data || []).map((row: any) => row.vehicle_id).filter(Boolean)))
}

function normaliseRole(value: string): DashboardRole | null {
  const found = roles.find((role) => role.toLowerCase() === value.toLowerCase())
  if (found) return found
  if (value.toLowerCase() === 'codriver') return 'Copilot'
  return null
}

function apiRoleForDashboard(role: DashboardRole) {
  if (role === 'Copilot') return 'codriver'
  return role.toLowerCase()
}
