import { NextResponse } from 'next/server'
import { resolveAssignedChildByName } from '@/lib/child-access'
import { reportError } from '@/lib/error-monitoring'
import { getServiceSupabase, requirePortalUser } from '@/lib/server-portal'

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser(['nurse', 'admin'])
    const body = await request.json().catch(() => ({}))
    const childName = String(body.child || body.childName || '').trim()
    const action = String(body.action || 'First aid readiness check').trim()
    const status = String(body.status || 'completed').trim()
    const note = String(body.note || '').trim()

    if (!childName) return NextResponse.json({ error: 'Child name is required.' }, { status: 400 })
    if (!action) return NextResponse.json({ error: 'First aid action is required.' }, { status: 400 })
    if (!note) return NextResponse.json({ error: 'First aid note is required.' }, { status: 400 })

    const child = await resolveAssignedChildByName({ service, profile, childName, role: 'nurse' })
    const nurseId = profile.role === 'nurse' ? await resolveCrewMemberId({ service, profileId: profile.id }) : null

    const { data, error } = await service
      .from('first_aid_actions')
      .insert({
        child_id: child.id,
        nurse_id: nurseId,
        action,
        status,
        note,
        metadata: {
          childName: child.full_name,
          loggedByRole: profile.role,
        },
      })
      .select('id, child_id, action, status, note, created_at')
      .single()

    if (error) throw error

    await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: 'nurse_first_aid_action_logged',
      entity_type: 'first_aid_action',
      entity_id: data.id,
      summary: `${profile.full_name} logged first aid action for ${child.full_name}.`,
      metadata: {
        childId: child.id,
        childName: child.full_name,
        action,
        status,
      },
    })

    return NextResponse.json({ ok: true, firstAidAction: data })
  } catch (error) {
    reportError(error, { route: '/api/nurse/first-aid-actions', operation: 'create_first_aid_action' })
    const message = error instanceof Error ? error.message : 'First aid action could not be saved.'
    const status = message.includes('Sign in') || message.includes('active') ? 401 : message.includes('permission') || message.includes('assignment') || message.includes('manifest') ? 403 : 500
    return NextResponse.json({ error: status === 500 ? 'First aid action could not be saved.' : message }, { status })
  }
}

async function resolveCrewMemberId({
  service,
  profileId,
}: {
  service: ReturnType<typeof getServiceSupabase>
  profileId: string
}) {
  const { data, error } = await service
    .from('crew_members')
    .select('id')
    .eq('user_id', profileId)
    .eq('role', 'nurse')
    .eq('active', true)
    .maybeSingle()

  if (error) throw new Error('Nurse crew record could not be verified.')
  if (!data?.id) throw new Error('You do not have an active nurse crew assignment.')
  return data.id
}
