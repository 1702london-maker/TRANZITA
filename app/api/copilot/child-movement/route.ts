import { NextResponse } from 'next/server'
import { requireAssignedChildAccess } from '@/lib/child-access'
import { reportError } from '@/lib/error-monitoring'
import { requirePortalUser } from '@/lib/server-portal'

type MovementAction = 'tap_on' | 'tap_off' | 'absent'

const allowedActions = new Set<MovementAction>(['tap_on', 'tap_off', 'absent'])

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser(['codriver', 'admin'])
    const body = await request.json().catch(() => ({}))
    const action = body.action as MovementAction
    const childName = typeof body.childName === 'string' ? body.childName : 'Manifest child'
    const childId = typeof body.childId === 'string' && body.childId ? body.childId : null
    const routeLabel = typeof body.routeLabel === 'string' ? body.routeLabel : 'Assigned route'
    const note = typeof body.note === 'string' ? body.note : ''

    if (!allowedActions.has(action)) {
      return NextResponse.json({ error: 'A valid child movement action is required.' }, { status: 400 })
    }

    if (action === 'tap_on' || action === 'tap_off') {
      const child = await requireAssignedChildAccess({ service, profile, childId, role: 'codriver' })
      const manifestId = (child as any)?.manifest?.id
      const { data, error } = await service
        .from('tap_events')
        .insert({
          child_id: child.id,
          event_type: action === 'tap_on' ? 'pickup' : 'dropoff',
          guardian_notified: false,
          notification_attempted: action === 'tap_off',
          location_label: routeLabel,
        })
        .select('id')
        .single()

      if (error) throw error

      if (manifestId) {
        await service
          .from('route_manifest')
          .update(action === 'tap_on'
            ? { status: 'onboarded', boarded_at: new Date().toISOString() }
            : { status: 'dropped_off', dropped_off_at: new Date().toISOString() })
          .eq('id', manifestId)
      }

      await logMovementAudit(service, profile, action, child.full_name || childName, routeLabel, data.id, note)
      return NextResponse.json({
        ok: true,
        eventId: data.id,
        notificationMode: action === 'tap_off' ? 'manual_test_mode' : 'not_required',
      })
    }

    if (action === 'absent') {
      const child = await requireAssignedChildAccess({ service, profile, childId, role: 'codriver' })
      const manifestId = (child as any)?.manifest?.id
      const { data, error } = await service
        .from('incidents')
        .insert({
          child_id: child.id,
          severity: 'low',
          title: `Absent logged: ${child.full_name || childName}`,
          details: note || `${child.full_name || childName} was marked absent by copilot for ${routeLabel}.`,
          status: 'logged',
        })
        .select('id')
        .single()

      if (error) throw error

      if (manifestId) {
        await service
          .from('route_manifest')
          .update({ status: 'absent', notes: note || 'Marked absent by copilot.' })
          .eq('id', manifestId)
      }

      await logMovementAudit(service, profile, action, child.full_name || childName, routeLabel, data.id, note)
      return NextResponse.json({ ok: true, incidentId: data.id })
    }

    return NextResponse.json({ error: 'A verified child movement action is required.' }, { status: 400 })
  } catch (error) {
    reportError(error, { route: '/api/copilot/child-movement', operation: 'log_child_movement' })
    const message = error instanceof Error ? error.message : 'Unable to log child movement.'
    const status = message.includes('permission') ? 403 : message.includes('Sign in') || message.includes('active') ? 401 : 500
    return NextResponse.json({ error: message }, { status })
  }
}

async function logMovementAudit(
  service: ReturnType<typeof import('@/lib/server-portal').getServiceSupabase>,
  profile: Awaited<ReturnType<typeof requirePortalUser>>['profile'],
  action: MovementAction,
  childName: string,
  routeLabel: string,
  entityId: string,
  note: string,
) {
  await service.from('audit_events').insert({
    actor_id: profile.id,
    actor_role: profile.role,
    event_type: `copilot_${action}`,
    entity_type: action === 'absent' ? 'incident' : 'tap_event',
    entity_id: entityId,
    summary: `${profile.full_name} logged ${action.replace('_', ' ')} for ${childName}.`,
    metadata: { childName, routeLabel, note },
  })
}
