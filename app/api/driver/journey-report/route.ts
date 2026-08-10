import { NextResponse } from 'next/server'
import { requirePortalUser } from '@/lib/server-portal'

export async function POST(request: Request) {
  try {
    const { profile, service } = await requirePortalUser(['driver', 'admin'])
    const body = await request.json().catch(() => ({}))
    const routeLabel = typeof body.routeLabel === 'string' ? body.routeLabel : 'Assigned route'
    const vehicleLabel = typeof body.vehicleLabel === 'string' ? body.vehicleLabel : 'Assigned vehicle'
    const summary = typeof body.summary === 'string' && body.summary.trim()
      ? body.summary.trim()
      : 'Journey completed with route compliance report submitted.'
    const incidents = Array.isArray(body.incidents) ? body.incidents : []

    const { data, error } = await service
      .from('portal_messages')
      .insert({
        submitted_by: profile.id,
        role: profile.role,
        channel: 'support',
        subject: `Driver journey report: ${routeLabel}`,
        body: summary,
        recipient_scope: 'operations',
        status: 'logged',
      })
      .select('id, created_at')
      .single()

    if (error) throw error

    await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: 'driver_journey_report_submitted',
      entity_type: 'portal_message',
      entity_id: data.id,
      summary: `${profile.full_name} submitted journey report for ${routeLabel}.`,
      metadata: { routeLabel, vehicleLabel, incidents },
    })

    return NextResponse.json({ ok: true, report: data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to submit journey report.'
    const status = message.includes('permission') ? 403 : message.includes('Sign in') || message.includes('active') ? 401 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
