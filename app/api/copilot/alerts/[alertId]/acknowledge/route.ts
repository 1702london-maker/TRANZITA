import { NextResponse } from 'next/server'
import { requirePortalUser } from '@/lib/server-portal'

export async function POST(request: Request, { params }: { params: { alertId: string } }) {
  try {
    const { profile, service } = await requirePortalUser(['codriver', 'admin'])
    const body = await request.json().catch(() => ({}))
    const title = typeof body.title === 'string' ? body.title : params.alertId
    const note = typeof body.note === 'string' ? body.note : ''

    const { error } = await service.from('audit_events').insert({
      actor_id: profile.id,
      actor_role: profile.role,
      event_type: 'copilot_alert_acknowledged',
      entity_type: 'operation_alert',
      summary: `${profile.full_name} acknowledged copilot alert: ${title}.`,
      metadata: { alertId: params.alertId, title, note },
    })

    if (error) throw error

    return NextResponse.json({ ok: true, acknowledgedAt: new Date().toISOString() })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to acknowledge alert.'
    const status = message.includes('permission') ? 403 : message.includes('Sign in') || message.includes('active') ? 401 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
