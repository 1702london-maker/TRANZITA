import 'server-only'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { PortalProfile } from '@/lib/server-portal'

type AssignmentRole = 'codriver' | 'nurse'

export async function requireAssignedChildAccess({
  service,
  profile,
  childId,
  role,
}: {
  service: SupabaseClient
  profile: PortalProfile
  childId: string | null
  role: AssignmentRole
}) {
  if (!childId) throw new Error('A verified child record is required for this action.')

  const crewColumn = role === 'codriver' ? 'codriver_id' : 'nurse_id'
  const { data: crew, error: crewError } = await service
    .from('crew_members')
    .select('id')
    .eq('user_id', profile.id)
    .eq('role', role)
    .eq('active', true)
    .maybeSingle()

  if (crewError) throw new Error('Crew access could not be verified.')
  if (!crew?.id) throw new Error('You do not have an active crew assignment.')

  const { data: child, error: childError } = await service
    .from('children')
    .select('id, school_id, full_name, active')
    .eq('id', childId)
    .eq('active', true)
    .maybeSingle()

  if (childError) throw new Error('Child access could not be verified.')
  if (!child?.id || !child.school_id) throw new Error('This child is not available for your assigned route.')

  if (profile.role === 'admin') return child

  const { data: assignments, error: assignmentError } = await service
    .from('route_assignments')
    .select('id')
    .eq(crewColumn, crew.id)
    .eq('service_date', new Date().toISOString().slice(0, 10))
    .in('status', ['scheduled', 'active', 'loading'])

  if (assignmentError) throw new Error('Route assignment could not be verified.')

  const assignmentIds = (assignments || []).map((assignment: any) => assignment.id).filter(Boolean)
  if (!assignmentIds.length) throw new Error('You do not have an active route assignment today.')

  const { data: manifest, error: manifestError } = await service
    .from('route_manifest')
    .select('id, route_assignment_id, child_id, route_session, status')
    .eq('child_id', child.id)
    .eq('service_date', new Date().toISOString().slice(0, 10))
    .in('route_assignment_id', assignmentIds)
    .not('status', 'eq', 'cancelled')
    .limit(1)
    .maybeSingle()

  if (manifestError) throw new Error('Route manifest could not be verified.')
  if (!manifest?.id) throw new Error('This child is not on your route manifest today.')
  return { ...child, manifest }
}

export async function resolveAssignedChildByName({
  service,
  profile,
  childName,
  role,
}: {
  service: SupabaseClient
  profile: PortalProfile
  childName: string
  role: AssignmentRole
}) {
  if (!childName.trim()) throw new Error('Child name is required.')

  if (profile.role === 'admin') {
    const { data, error } = await service
      .from('children')
      .select('id, school_id, full_name, active')
      .ilike('full_name', childName.trim())
      .eq('active', true)
      .limit(2)

    if (error) throw new Error('Child access could not be verified.')
    if (!data?.length) throw new Error('No active child record matches that name.')
    if (data.length > 1) throw new Error('More than one child matches that name. Use the verified child record.')
    return data[0]
  }

  const crewColumn = role === 'codriver' ? 'codriver_id' : 'nurse_id'
  const { data: crew, error: crewError } = await service
    .from('crew_members')
    .select('id')
    .eq('user_id', profile.id)
    .eq('role', role)
    .eq('active', true)
    .maybeSingle()

  if (crewError) throw new Error('Crew access could not be verified.')
  if (!crew?.id) throw new Error('You do not have an active crew assignment.')

  const { data: assignments, error: assignmentError } = await service
    .from('route_assignments')
    .select('id')
    .eq(crewColumn, crew.id)
    .eq('service_date', new Date().toISOString().slice(0, 10))
    .in('status', ['scheduled', 'active', 'loading'])

  if (assignmentError) throw new Error('Route assignment could not be verified.')
  const assignmentIds = (assignments || []).map((assignment: any) => assignment.id).filter(Boolean)

  if (!assignmentIds.length) throw new Error('You do not have an active route assignment today.')

  const { data: manifestRows, error: manifestError } = await service
    .from('route_manifest')
    .select('id, route_assignment_id, child_id, route_session, status, children!inner(id, school_id, full_name, active)')
    .eq('service_date', new Date().toISOString().slice(0, 10))
    .in('route_assignment_id', assignmentIds)
    .not('status', 'eq', 'cancelled')
    .ilike('children.full_name', childName.trim())
    .eq('children.active', true)
    .limit(2)

  if (manifestError) throw new Error('Route manifest could not be verified.')
  if (!manifestRows?.length) throw new Error('This child is not on your route manifest today.')
  if (manifestRows.length > 1) throw new Error('More than one child matches that name. Use the verified child record.')

  const row: any = manifestRows[0]
  const child = Array.isArray(row.children) ? row.children[0] : row.children
  return { ...child, manifest: { id: row.id, route_assignment_id: row.route_assignment_id, child_id: row.child_id, route_session: row.route_session, status: row.status } }
}
