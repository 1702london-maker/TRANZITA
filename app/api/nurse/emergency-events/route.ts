import { NextResponse } from 'next/server'
import { resolveAssignedChildByName } from '@/lib/child-access'
import { reportError } from '@/lib/error-monitoring'
import { getServiceSupabase, requirePortalUser } from '@/lib/server-portal'

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser(['nurse', 'admin'])
    const body = await request.json().catch(() => ({}))
    const childName = String(body.child || body.childName || '').trim()
    const eventType = String(body.type || body.eventType || 'medical').trim()
    const severity = String(body.severity || 'high').trim()
    const status = String(body.status || 'open').trim()
    const note = String(body.note || '').trim()
    const parentNotificationAttempted = Boolean(body.notifyParent || body.parentNotificationAttempted)

    if (!childName) return NextResponse.json({ error: 'Child name is required.' }, { status: 400 })
    if (!eventType) return NextResponse.json({ error: 'Emergency type is required.' }, { status: 400 })
    if (!note) return NextResponse.json({ error: 'Emergency note is required.' }, { status: 400 })

    const child = await resolveAssignedChildByName({ service, profile, childName, role: 'nurse' })
    const nurseId = profile.role === 'nurse' ? await resolveCrewMemberId({ service, profileId: profile.id }) : null

    const { data, error } = await service
      .from('emergency_events')
      .insert({
        child_id: child.id,
        nurse_id: nurseId,
        event_type: eventType,
        severity,
        status,
        note,
        parent_notification_attempted: parentNotificationAttempted,
        metadata: {
          childName: child.full_name,
          loggedByRole: profile.role,
        },
      })
      .select('id, child_id, event_type, severity, status, note, parent_notification_attempted, created_at')
      .single()

    if (error) throw error

    await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: 'nurse_emergency_event_logged',
      entity_type: 'emergency_event',
      entity_id: data.id,
      summary: `${profile.full_name} logged ${severity} emergency event for ${child.full_name}.`,
      metadata: {
        childId: child.id,
        childName: child.full_name,
        eventType,
        severity,
        status,
        parentNotificationAttempted,
      },
    })

    return NextResponse.json({ ok: true, emergencyEvent: data })
  } catch (error) {
    reportError(error, { route: '/api/nurse/emergency-events', operation: 'create_emergency_event' })
    const message = error instanceof Error ? error.message : 'Emergency event could not be saved.'
    const status = message.includes('Sign in') || message.includes('active') ? 401 : message.includes('permission') || message.includes('assignment') || message.includes('manifest') ? 403 : 500
    return NextResponse.json({ error: message }, { status })
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
