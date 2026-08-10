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
  if (profile.role === 'admin') return null
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

  const { data: assignments, error: assignmentError } = await service
    .from('route_assignments')
    .select('id, routes!inner(school_id)')
    .eq(crewColumn, crew.id)
    .eq('service_date', new Date().toISOString().slice(0, 10))
    .in('status', ['scheduled', 'active', 'loading'])

  if (assignmentError) throw new Error('Route assignment could not be verified.')

  const hasSchoolMatch = (assignments || []).some((assignment: any) => {
    const route = Array.isArray(assignment.routes) ? assignment.routes[0] : assignment.routes
    return route?.school_id === child.school_id
  })

  if (!hasSchoolMatch) throw new Error('This child is not assigned to your route today.')
  return child
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
    .select('routes!inner(school_id)')
    .eq(crewColumn, crew.id)
    .eq('service_date', new Date().toISOString().slice(0, 10))
    .in('status', ['scheduled', 'active', 'loading'])

  if (assignmentError) throw new Error('Route assignment could not be verified.')
  const schoolIds = Array.from(new Set((assignments || []).map((assignment: any) => {
    const route = Array.isArray(assignment.routes) ? assignment.routes[0] : assignment.routes
    return route?.school_id
  }).filter(Boolean)))

  if (!schoolIds.length) throw new Error('You do not have an active route assignment today.')

  const { data: children, error: childError } = await service
    .from('children')
    .select('id, school_id, full_name, active')
    .ilike('full_name', childName.trim())
    .in('school_id', schoolIds)
    .eq('active', true)
    .limit(2)

  if (childError) throw new Error('Child access could not be verified.')
  if (!children?.length) throw new Error('This child is not assigned to your route today.')
  if (children.length > 1) throw new Error('More than one child matches that name. Use the verified child record.')
  return children[0]
}
