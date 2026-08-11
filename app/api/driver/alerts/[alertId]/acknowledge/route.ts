import { NextResponse } from 'next/server'
import { reportError } from '@/lib/error-monitoring'
import { requirePortalUser } from '@/lib/server-portal'

export async function POST(request: Request, { params }: { params: { alertId: string } }) {
  try {
    const { profile, service } = await requirePortalUser(['driver', 'admin'])
    const body = await request.json().catch(() => ({}))
    const title = typeof body.title === 'string' ? body.title : params.alertId
    const note = typeof body.note === 'string' ? body.note : ''
    const { data: alert, error: alertError } = await service
      .from('alerts')
      .select('id, vehicle_id, resolved')
      .eq('id', params.alertId)
      .is('deleted_at', null)
      .maybeSingle()

    if (alertError) throw alertError
    if (!alert) return NextResponse.json({ error: 'Alert was not found.' }, { status: 404 })

    if (profile.role === 'driver') {
      const { data: crewRows, error: crewError } = await service
        .from('crew_members')
        .select('id')
        .eq('user_id', profile.id)
        .eq('role', 'driver')
        .eq('active', true)

      if (crewError) throw crewError
      const crewIds = (crewRows || []).map((row) => row.id)
      if (!crewIds.length || !alert.vehicle_id) {
        return NextResponse.json({ error: 'You do not have permission for this alert.' }, { status: 403 })
      }

      const { data: assignment, error: assignmentError } = await service
        .from('route_assignments')
        .select('id')
        .eq('vehicle_id', alert.vehicle_id)
        .in('driver_id', crewIds)
        .eq('service_date', new Date().toISOString().slice(0, 10))
        .maybeSingle()

      if (assignmentError) throw assignmentError
      if (!assignment) {
        return NextResponse.json({ error: 'You do not have permission for this alert.' }, { status: 403 })
      }
    }

    const { error: updateError } = await service
      .from('alerts')
      .update({ resolved: true, resolved_at: new Date().toISOString(), resolved_by: profile.id })
      .eq('id', alert.id)

    if (updateError) throw updateError

    const { error } = await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: 'driver_alert_acknowledged',
      entity_type: 'operation_alert',
      summary: `${profile.full_name} acknowledged driver alert: ${title}.`,
      metadata: { alertId: params.alertId, title, note },
    })

    if (error) throw error

    return NextResponse.json({ ok: true, acknowledgedAt: new Date().toISOString() })
  } catch (error) {
    reportError(error, { route: '/api/driver/alerts/[alertId]/acknowledge', operation: 'acknowledge_driver_alert', alertId: params.alertId })
    const message = error instanceof Error ? error.message : 'Unable to acknowledge alert.'
    const status = message.includes('permission') ? 403 : message.includes('Sign in') || message.includes('active') ? 401 : 500
    return NextResponse.json({ error: status === 500 ? 'Unable to acknowledge alert.' : message }, { status })
  }
}
